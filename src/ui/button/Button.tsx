import { ButtonHTMLAttributes, Ref } from "react";
import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  semanticOnly?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export const Button = ({
  semanticOnly = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${className || ""}`}
      data-semantic-only={semanticOnly}
    >
      {props.children}
    </button>
  );
};
