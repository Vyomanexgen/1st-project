import React, { useState } from 'react';
import eyeOpen from './images/images.png';
import eyeOff from './images/clodedeye.png';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

  
   if (username === 'veeraraghavan' && password === 'V3r@G8') {
      setError('');
      console.log("Login successful! Calling onLogin()...");
      onLogin(); 
      console.log("Navigating to /dashboard...");
      navigate('/dashboard'); 
    } else {
      setError('Invalid username or password');
      console.log("Login failed: Invalid credentials.");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        <p className={styles.loginSubtitle}>Please sign in to your account</p>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
            className={styles.loginInput}
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={`${styles.loginInput} ${styles.passwordInput}`}
            />
            <button
              type="button"
              className={styles.togglePasswordBtn}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <img
                src={showPassword ? eyeOpen : eyeOff}
                alt={showPassword ? 'Hide password' : 'Show password'}
                style={{ width: '32px', height: '32px', pointerEvents: 'none', marginTop:'-50px', userSelect: 'none',
    transition: 'none',
    filter: 'none' }}

              />
            </button>
          </div>

          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>

          <button type="submit" className={styles.loginBtn}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
