import styles from './Card.module.css';

export default function Card({
  children,
  className = '',
  hover = false,
  glass = true,
  padding = 'md',
  onClick,
  ...props
}) {
  const classes = [
    styles.card,
    glass ? styles.glass : '',
    hover ? styles.hover : '',
    styles[`padding-${padding}`],
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} {...props}>
      {children}
    </div>
  );
}
