import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './pages/admin/Sidebar';
import UserCard from './pages/admin/UserCard';
import UserDetail from './pages/admin/UserDetail';
import styles from './Dashboard.module.css'; 
import { useNavigate } from 'react-router-dom';
import supabase from './config/supabaseClient';

const Dashboard = ({ onLogout }) => {
  const [selectedRole, setSelectedRole] = useState('Home');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
console.log(supabase);
  useEffect(() => {
    if (selectedRole === 'Home') return;

    axios
      .get(`http://localhost:8080/api/users/role/${selectedRole}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUsers(response.data);
          setErrorMsg('');
        } else {
          setUsers([]);
          setErrorMsg('No records found for this role.');
        }
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setUsers([]);
        setErrorMsg('Failed to fetch data from backend.');
      });
  }, [selectedRole]);

 

  const handleLogout = () => {
    console.log("Logging out...");
    onLogout(); 
    navigate('/admin', { replace: true }); 
  };

  const goToHome = () => {
    window.location.href = '/#home';
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.appHeader}>
        <span>AVR Dashboard</span>
        <div className={styles.headerButtons}>
         
          <button className={styles.headerButton} onClick={handleLogout}>Logout</button>
          <button className={styles.headerButton} onClick={goToHome}>Home</button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar onRoleSelect={setSelectedRole} selectedRole={selectedRole} />
        </div>
        <div className={styles.content}>
          {selectedRole === 'Home' ? (
            <div className={styles.welcomeMessage}>
              <h1>Hello, Welcome Back</h1>
              <h1>
                MR <span className={styles.highlight}>A.VEERA RAGAVAN</span>
              </h1>
            </div>
          ) : selectedUser ? (
            <UserDetail user={selectedUser} />
          ) : errorMsg ? (
            <div className={styles.errorDisplay}>{errorMsg}</div>
          ) : (
            <div className={styles.userList}>
              {users.map((user) => (
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

