// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
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
// console.log(supabase);
//   useEffect(() => {
//     if (selectedRole === 'Home') return;

//     axios
//       .get(`http://localhost:8080/api/users/role/${selectedRole}`)
//       .then((response) => {
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           setUsers(response.data);
//           setErrorMsg('');
//         } else {
//           setUsers([]);
//           setErrorMsg('No records found for this role.');
//         }
//         setSelectedUser(null);
//       })
//       .catch((error) => {
//         console.error('Error fetching users:', error);
//         setUsers([]);
//         setErrorMsg('Failed to fetch data from backend.');
//       });
//   }, [selectedRole]);

 

//   const handleLogout = () => {
//     console.log("Logging out...");
//     onLogout(); 
//     navigate('/admin', { replace: true }); 
//   };

//   const goToHome = () => {
//     window.location.href = '/#home';
//   };

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
//             <UserDetail user={selectedUser} />
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


// ✅ Updated Dashboard.jsx with Supabase Integration
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
//     const fetchUsers = async () => {
//       if (selectedRole === 'Home') return;

//       const { data, error } = await supabase
//         .from('Audition Form')
//         .select('*')
//         .ilike('special_skills', `%${selectedRole}%`);

//       if (error) {
//         console.error('Supabase fetch error:', error);
//         setUsers([]);
//         setErrorMsg('Failed to fetch data from Supabase.');
//       } else if (data.length === 0) {
//         setUsers([]);
//         setErrorMsg('No records found for this role.');
//       } else {
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
// useEffect(() => {
//   const testConnection = async () => {
//     const { error } = await supabase.from('Audition Form').select('*').limit(1);
//     if (!error) {
//       console.log("✅ Supabase connection is successful");
//     } else {
//       console.error("❌ Supabase connection failed", error);
//     }
//   };

//   testConnection();
// }, []);
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
//             <UserDetail user={selectedUser} />
//           ) : errorMsg ? (
//             <div className={styles.errorDisplay}>{errorMsg}</div>
//           ) : (
//             <div className={styles.userList}>
//               {users.map((user) => (
//                 <UserCard
//                   key={user.id}
//                   user={{
//                     name: user.full_name,
//                     photoUrl: user.head_shot_photo,
//                     email: user.email,
//                     phone: user.phone_number,
//                     address: user.address,
//                     role: selectedRole,
//                     fullData: user,
//                   }}
//                   onSelect={(selected) => setSelectedUser(selected.fullData)}
//                 />
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
import { List } from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const [selectedRole, setSelectedRole] = useState('Home');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRole === 'Home') return;

    const fetchUsers = async () => {
      const trimmedRole = selectedRole.toLowerCase().trim();
        

      const { data, error } = await supabase
        .from('Audition Form')
        .select('*')
        .ilike('special_skills', `%${trimmedRole}%`);
        console.log('🌐 All records:', data);
       
      if (error) {
        console.error('❌ Supabase fetch error:', error);
        setUsers([]);
        setErrorMsg('Failed to fetch data from Supabase.');
      } else if (!data || data.length === 0) {
        setUsers([]);
        setErrorMsg('No records found for this role.');
        console.warn('⚠️ No data found for role:', trimmedRole);
      } else {
        
        setUsers(data);
        setErrorMsg('');

        
      }

      setSelectedUser(null);
    };

    fetchUsers();
  }, [selectedRole]);

  const handleLogout = () => {
    onLogout(); 
    navigate('/admin', { replace: true }); 
  };

  const goToHome = () => {
    window.location.href = '/#home';
  };

useEffect(() => {
  const fetchAllRecords = async () => {
    const { data, error } = await supabase
      .from('Audition Form')
      .select('*');

    if (error) {
      console.error('Error fetching all records:', error);
    } else {
      console.log('✅ Total Records:', data.length);
      console.log('📋 First Record Fields:', Object.keys(data[0] || {}));
    }
  };
  fetchAllRecords();
}, []);



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
            <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)}/>
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
