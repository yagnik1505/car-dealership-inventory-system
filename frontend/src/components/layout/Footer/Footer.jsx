import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>AV</span>
          <span>AutoVault</span>
        </div>
        <p className={styles.tagline}>
          Premium dealership inventory management
        </p>
        <div className={styles.links}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/vehicles">Inventory</Link>
          <Link to="/search">Search</Link>
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} AutoVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
