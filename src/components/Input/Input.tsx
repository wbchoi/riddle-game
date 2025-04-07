import { ComponentProps } from "react";
import styles from "./Input.module.css";

type Props = ComponentProps<"input">;

export function Input({ ...rest }: Props) {
  return <input type="text" className={styles.input} {...rest} />;
}
