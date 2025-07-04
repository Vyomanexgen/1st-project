// import React, { useState, useEffect } from 'react';
// import Sidebar from './pages/admin/Sidebar';
// import UserCard from './pages/admin/UserCard';
// import UserDetail from './pages/admin/UserDetail';
// import styles from './Dashboard.module.css';
// import { useNavigate } from 'react-router-dom';
// import supabase from './config/supabaseClient';

// const Dashboard = ({ onLogout }) => {
//   const [selectedRole, setSelectedRole] = useState('Home');
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [errorMsg, setErrorMsg] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedRole === 'Home') return;

//     const fetchUsers = async () => {
//       const trimmedRole = selectedRole.toLowerCase().trim();

//       const { data, error } = await supabase
//         .from('Audition Form')
//         .select('*')
//         .ilike('Categories', `%${trimmedRole}%`);

//       if (error) {
//         console.error('❌ Supabase fetch error:', error);
//         setUsers([]);
//         setErrorMsg('Failed to fetch data from Supabase.');
//       } else if (!data || data.length === 0) {
//         setUsers([]);
//         setErrorMsg('No records found for this role.');
//         console.warn('⚠️ No data found for role:', trimmedRole);
//       } else {
//         console.log('🌐 All records:', data);
//         console.log(`✅ ${data.length} users fetched for category: ${trimmedRole}`);
//         setUsers(data);
//         setErrorMsg('');
//       }

//       setSelectedUser(null);
//     };

//     fetchUsers();
//   }, [selectedRole]);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/admin', { replace: true });
//   };

//   const goToHome = () => {
//     window.location.href = '/#home';
//   };

//   useEffect(() => {
//     const fetchAllRecords = async () => {
//       const { data, error } = await supabase
//         .from('Audition Form')
//         .select('*');

//       if (error) {
//         console.error('Error fetching all records:', error);
//       } else {
//         console.log('✅ Total Records:', data.length);
//         console.log('📋 First Record Fields:', Object.keys(data[0] || {}));
//       }
//     };
//     fetchAllRecords();
//   }, []);

//   return (
//     <div className={styles.appContainer}>
//       <div className={styles.appHeader}>
//         <span>AVR Dashboard</span>
//         <div className={styles.headerButtons}>
//           <button className={styles.headerButton} onClick={handleLogout}>Logout</button>
//           <button className={styles.headerButton} onClick={goToHome}>Home</button>
//         </div>
//       </div>

//       <div className={styles.main}>
//         <div className={styles.sidebar}>
//           <Sidebar onRoleSelect={setSelectedRole} selectedRole={selectedRole} />
//         </div>
//         <div className={styles.content}>
//           {selectedRole === 'Home' ? (
//             <div className={styles.welcomeMessage}>
//               <h1>Hello, Welcome Back</h1>
//               <h1>
//                 MR <span className={styles.highlight}>A.VEERA RAGAVAN</span>
//               </h1>
//             </div>
//           ) : selectedUser ? (
//             <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />
//           ) : errorMsg ? (
//             <div className={styles.errorDisplay}>{errorMsg}</div>
//           ) : (
//             <div className={styles.userList}>
//               {users.map((user) => (
//                 <UserCard key={user.id} user={user} onSelect={setSelectedUser} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import Sidebar from './pages/admin/Sidebar';
import UserCard from './pages/admin/UserCard';
import UserDetail from './pages/admin/UserDetail';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import supabase from './config/supabaseClient';

const Dashboard = ({ onLogout }) => {
  const [selectedRole, setSelectedRole] = useState('Home');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For search filter
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRole === 'Home') return;

    const fetchUsers = async () => {
      const trimmedRole = selectedRole.toLowerCase().trim();

      const { data, error } = await supabase
        .from('Audition Form')
        .select('*')
        .ilike('Categories', `%${trimmedRole}%`);

      if (error) {
        console.error('❌ Supabase fetch error:', error);
        setUsers([]);
        setFilteredUsers([]);
        setErrorMsg('Failed to fetch data from Supabase.');
      } else if (!data || data.length === 0) {
        setUsers([]);
        setFilteredUsers([]);
        setErrorMsg('No records found for this role.');
      } else {
        console.log(`✅ ${data.length} users fetched for category: ${trimmedRole}`);
        setUsers(data);
        setFilteredUsers(data);
        setErrorMsg('');
      }

      setSelectedUser(null);
    };

    fetchUsers();
  }, [selectedRole]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleLogout = () => {
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
            <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />
          ) : errorMsg ? (
            <div className={styles.errorDisplay}>{errorMsg}</div>
          ) : (
            <>
              {/* ✅ Search Bar */}
              <div className={styles.searchContainer}>
                <input
                type="text"
               placeholder="Search by name..."
              value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
                />
             <button className={styles.searchButton}>
  <img src="/images/search.png" alt="Search" className={styles.searchIcon} />
</button>
            </div>


              <div className={styles.userList}>
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} onSelect={setSelectedUser} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

