import { motion } from 'framer-motion';
import styles from './StatCard.module.css';

export default function StatCard({ icon: Icon, label, value, trend, color = 'accent', delay = 0 }) {
  return (
    <motion.div
      className={`${styles.card} ${styles[color]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className={styles.iconWrapper}>
        <Icon size={22} />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {trend && <span className={styles.trend}>{trend}</span>}
      </div>
    </motion.div>
  );
}
