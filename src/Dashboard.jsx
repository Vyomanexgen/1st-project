import React, { useState, useEffect } from 'react';
import Sidebar from './pages/admin/Sidebar';
import UserCard from './pages/admin/UserCard';
import UserDetail from './pages/admin/UserDetail';
import styles from './Dashboard.module.css'; 
import { useNavigate } from 'react-router-dom';
import supabase from './config/supabaseClient';
import ControlPanel from './pages/admin/ControlPanel';

const Dashboard = ({ onLogout }) => {
  const [selectedRole, setSelectedRole] = useState('Home');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);
  const [formOpen, setFormOpen] = useState(true);
  const [sectionStatus, setSectionStatus] = useState([]);
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissionData = async () => {
      const { data: submissions } = await supabase.from('Audition Form').select('id');
      if (submissions) setSubmissionCount(submissions.length);

      const { data: statusData } = await supabase
        .from('audition_form_status')
        .select('is_open')
        .eq('id', 1)
        .single();

      if (statusData) setFormOpen(statusData.is_open);
    };

    fetchSubmissionData();
  }, []);

  useEffect(() => {
    if (selectedRole === 'Home' || selectedRole === 'Control') return;

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('Audition Form')
        .select('*')
        .ilike('Categories', `%${selectedRole}%`);

      if (error || !data || data.length === 0) {
        setUsers([]);
        setErrorMsg('No records found or fetch error.');
      } else {
        setUsers(data);
        setErrorMsg('');
      }

      setSelectedUser(null);
    };

    fetchUsers();
  }, [selectedRole]);

  useEffect(() => {
    if (selectedRole !== 'Control') return;

    const fetchStatus = async () => {
      const { data } = await supabase.from('audition_section_status').select('*');
      if (data) setSectionStatus(data);
    };

    fetchStatus();
  }, [selectedRole]);

  
const toggleFormStatus = async () => {
  const newStatus = !formOpen;

  const { error: formError } = await supabase
    .from('audition_form_status')
    .update({ is_open: newStatus })
    .eq('id', 1);

  if (formError) return;

  setFormOpen(newStatus);

  
  if (newStatus) {
    const { data: sections } = await supabase.from('audition_section_status').select('*');
    if (sections) {
      const updates = sections.map(section =>
        supabase
          .from('audition_section_status')
          .update({ is_open: true })
          .eq('id', section.id)
      );
      await Promise.all(updates);
      setSectionStatus(sections.map(section => ({ ...section, is_open: true })));
    }
  }
};

  const toggleSectionVisibility = async (id, currentStatus) => {
    const { error } = await supabase
      .from('audition_section_status')
      .update({ is_open: !currentStatus })
      .eq('id', id);

    if (!error) {
      setSectionStatus(prev =>
        prev.map(section =>
          section.id === id ? { ...section, is_open: !currentStatus } : section
        )
      );
    }
  };

  // 
  useEffect(() => {
  const channel = supabase.channel('realtime-toggle-listener');

  channel.on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'audition_form_status',
    },
    (payload) => {
      setFormOpen(payload.new.is_open);
    }
  );

 
  channel.on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'audition_section_status',
    },
    (payload) => {
      setSectionStatus((prev) =>
        prev.map((section) =>
          section.id === payload.new.id ? payload.new : section
        )
      );
    }
  );

  channel.subscribe();

 
  return () => {
    channel.unsubscribe();
  };
}, []);


  return (
    <div className={styles.appContainer}>
      <div className={styles.appHeader}>
        <span>AVR Dashboard</span>
        <div className={styles.headerButtons}>
          <button onClick={onLogout}>Logout</button>
          <button onClick={() => window.location.href = '/#home'}>Home</button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar onRoleSelect={setSelectedRole} selectedRole={selectedRole} />
        </div>

        <div className={styles.content}>
          {selectedRole === 'Control' ? (
            <ControlPanel 
              sectionStatus={sectionStatus} 
              toggleSectionVisibility={toggleSectionVisibility} 
               formOpen={formOpen}
            />
          ) : selectedRole === 'Home' ? (
            <div className={styles.toggleContainer}>
              <p><strong>{submissionCount} / 24,000 Submissions</strong></p>
              <label className={styles.toggleSwitchLabel}>
                {formOpen ? '🟢 Audition Form Open' : '🔴 Audition Form Closed'}
                <div
                  className={`${styles.toggleSwitch} ${formOpen ? styles.on : ''}`}
                  onClick={toggleFormStatus}
                />
              </label>
              <div className={styles.welcomeMessage}>
                <h1>Hello, Welcome Back</h1>
                <h1>MR <span className={styles.highlight}>A.VEERA RAGAVAN</span></h1>
              </div>
            </div>
          ) : selectedUser ? (
            <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />
          ) : errorMsg ? (
            <div className={styles.errorDisplay}>{errorMsg}</div>
          ) : (
            <div className={styles.userList}>
              {users.map(user => (
                <UserCard key={user.id} user={user} onSelect={setSelectedUser} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;