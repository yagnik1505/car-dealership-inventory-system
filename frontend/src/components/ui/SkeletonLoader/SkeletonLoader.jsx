import styles from './SkeletonLoader.module.css';

export function SkeletonLine({ width = '100%', height = 16 }) {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.image}`} />
      <div className={styles.content}>
        <SkeletonLine width="70%" height={20} />
        <SkeletonLine width="40%" height={14} />
        <div className={styles.row}>
          <SkeletonLine width="30%" height={24} />
          <SkeletonLine width="25%" height={24} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function SkeletonLoader({ variant = 'card', count = 6 }) {
  if (variant === 'grid') return <SkeletonGrid count={count} />;
  if (variant === 'line') return <SkeletonLine />;
  return <SkeletonCard />;
}
