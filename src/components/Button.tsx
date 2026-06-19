import { forwardRef } from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, onClick, type = "button", className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
