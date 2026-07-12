import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  Search,
  PlusCircle,
  Home,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/vehicles', icon: Car, label: 'Inventory' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/vehicles/add', icon: PlusCircle, label: 'Add Vehicle' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.homeLink} onClick={onClose}>
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          <div className={styles.divider} />

          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={onClose}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <p className={styles.footerText}>AutoVault v1.0</p>
          <p className={styles.footerSub}>Premium Inventory System</p>
        </div>
      </aside>
    </>
  );
}
