import styles from './Button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  onClick,
  type,
  className,
  ...props
}: ButtonProps ) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${className}`}>
      {children}
    </button>
  );
}
