import React from 'react';
import styles from './UserCard.css';

const UserCard = ({ user, onSelect }) => {
  return (
    <div className={styles.userCard} onClick={() => onSelect(user)}>
      <img src={user.photoUrl} alt={user.name} />
      <p>{user.name}</p>
    </div>
  );
};

export default UserCard;
