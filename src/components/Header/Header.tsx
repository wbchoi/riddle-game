import logo from "../../assets/logo.png";
import restart from "../../assets/restart.svg";
import styles from "./Header.module.css";

type Props = {
  current: number;
  max: number;
  onRestart: () => void;
};

export default function Header({ current, max, onRestart }: Props) {
  return (
    <div className={styles.container}>
      <img src={logo} alt="" />
      <header>
        <span>
          <strong>{current}</strong> de {max} tentativas
        </span>

        <button type="button" onClick={onRestart}>
          <img src={restart} alt="ícone de reiniciar" />
        </button>
      </header>
    </div>
  );
}
