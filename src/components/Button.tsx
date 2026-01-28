import styles from './Button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  onClick,
  type="button",
  className,
  ...rest
}: ButtonProps ) {
  return (
    <button type={type} onClick={onClick} className={`${styles.btn} ${className}`} {...rest}>
      {children}
    </button>
  );
}
