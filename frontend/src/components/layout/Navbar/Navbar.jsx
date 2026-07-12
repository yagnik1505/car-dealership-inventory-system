import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../ui/Button';
import styles from './Navbar.module.css';

export default function Navbar({ onMenuToggle, sidebarOpen }) {
  const { isAuthenticated, userEmail, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/dashboard" className={styles.logo}>
          <span className={styles.logoIcon}>AV</span>
          <span className={styles.logoText}>AutoVault</span>
        </Link>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
        </button>

        {isAuthenticated ? (
          <div className={styles.userMenu}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <User size={18} />
              </div>
              <div className={styles.userDetails}>
                <span className={styles.email}>{userEmail}</span>
                <span className={`${styles.roleBadge} ${styles[userRole]}`}>
                  {userRole === 'ADMIN' && <Shield size={10} className={styles.roleIcon} />}
                  {userRole}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" icon={LogOut} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
