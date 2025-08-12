// import React from 'react';
// import styles from './UserCard.module.css'; 

// const fallbackImage = '/images/contact-icon-illustration-isolat.png'; 

// const UserCard = ({ user, onSelect }) => {
//   const handleImageError = (e) => {
//     e.target.src = fallbackImage;
//   };

//   return (
//     <div className={styles.userCard} onClick={() => onSelect(user)}>
//       <div className={styles.cardImageContainer}>
//         <img
//           src={user.head_shot_photo || fallbackImage}
//           alt={user.full_name || 'No Name'}
//           onError={handleImageError}
//           className={styles.userImage}
//         />
//       </div>
//       <p className={styles.userName}>{user.full_name || 'No Name'}</p>
//     </div>
//   );
// };

// export default UserCard;

import React from 'react';
import styles from './UserCard.module.css'; 

const fallbackImage = '/images/contact-icon-illustration-isolat.png'; 

const UserCard = ({ user, onSelect, onDelete }) => {
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className={styles.userCard}>
      <div 
        className={styles.cardImageContainer} 
        onClick={() => onSelect(user)}
      >
        <img
          src={user.head_shot_photo || fallbackImage}
          alt={user.full_name || 'No Name'}
          onError={handleImageError}
          className={styles.userImage}
        />
      </div>
      <p 
        className={styles.userName} 
        onClick={() => onSelect(user)}
      >
        {user.full_name || 'No Name'}
      </p>

      {/* ✅ Delete Button */}
      <button 
        className={styles.deleteBtn} 
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering onSelect
          onDelete(user.id);
        }}
      >
         Delete
      </button>
    </div>
  );
};

export default UserCard;
