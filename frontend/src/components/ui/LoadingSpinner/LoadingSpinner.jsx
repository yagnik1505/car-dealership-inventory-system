import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ size = 'md', fullPage = false, label = 'Loading...' }) {
  const spinner = (
    <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label={label}>
      <div className={styles.ring} />
      <div className={styles.ringInner} />
    </div>
  );

  if (fullPage) {
    return (
      <div className={styles.fullPage}>
        {spinner}
        {label && <p className={styles.label}>{label}</p>}
      </div>
    );
  }

  return spinner;
}
