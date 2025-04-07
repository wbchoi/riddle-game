import styles from "./UsedLetters.module.css";
import { Letter } from "../Letter/Letter";

export type UsedLettersProps = {
  value: string;
  correct: boolean;
};

type Props = {
  data: UsedLettersProps[];
};

export function UsedLetters({ data }: Props) {
  return (
    <div className={styles.usedLetters}>
      <h5>Letras utilizadas</h5>

      <div>
        {data.map(({ value, correct }) => (
          <Letter
            key={value}
            value={value}
            size="small"
            color={correct ? "correct" : "wrong"}
          />
        ))}
      </div>
    </div>
  );
}
