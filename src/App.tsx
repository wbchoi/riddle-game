import Header from "./components/Header/Header";
import styles from "./App.module.css";
import { WORDS, Challenge } from "./utils/words";
import { useEffect, useState } from "react";
import { Tip } from "./components/Tip/Tip";
import { Letter } from "./components/Letter/Letter";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import {
  UsedLetters,
  UsedLettersProps,
} from "./components/UsedLetters/UsedLetters";

function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  const [usedLetters, setUsedLetters] = useState<UsedLettersProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const AddAttemptMaxLimit = 5;

  function handleRestartGame() {
    const isConfirmed = confirm("Reiniciar o jogo?");

    if (isConfirmed) {
      startGame();
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);

    setScore(0);
    setLetter("");
    setUsedLetters([]);
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite a letra");
    }

    const value = letter.toUpperCase();
    const exists = usedLetters.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      setLetter("");
      return alert(`Letra ${value} já foi utilizada!`);
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setUsedLetters((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter("");
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você venceu!");
      }

      const attemptLimit = challenge.word.length + AddAttemptMaxLimit;
      if (usedLetters.length === attemptLimit) {
        return endGame("Game over!");
      }
    }, 200);
  }, [score, usedLetters.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={usedLetters.length}
          max={challenge.word.length + AddAttemptMaxLimit}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const usedLetter = usedLetters.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            );
            return (
              <Letter
                key={index}
                value={usedLetter?.value}
                color={usedLetter?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <UsedLetters data={usedLetters} />
      </main>
    </div>
  );
}

export default App;
