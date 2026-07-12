import styles from './Input.module.css';

export default function Input({
  label,
  error,
  hint,
  icon: Icon,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`}>
      {label && (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''}`}>
        {Icon && (
          <span className={styles.icon}>
            <Icon size={18} />
          </span>
        )}
        <input className={`${styles.input} ${Icon ? styles.withIcon : ''} ${className}`} {...props} />
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
