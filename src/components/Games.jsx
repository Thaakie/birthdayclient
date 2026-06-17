import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import StoryText from "./StoryText";

function Games({ progressItems, onComplete }) {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [wrongPopup, setWrongPopup] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [lives, setLives] = useState(3);

  const currentQuestion = questions[activeQuestion];
  const progressLabel = useMemo(
    () => `${activeQuestion + 1} / ${questions.length}`,
    [activeQuestion],
  );

  const handleChoice = (choice) => {
    setSelectedChoice(choice);

    if (choice !== currentQuestion.correctChoice) {
      const nextLives = lives - 1;
      setLives(nextLives);

      if (nextLives <= 0) {
        window.setTimeout(() => {
          navigate("/angry");
        }, 600);
      } else {
        setWrongPopup({
          title: "Oops, not this one",
          message: currentQuestion.wrongMessage,
          hint: currentQuestion.hint,
        });
      }
      return;
    }

    if (activeQuestion === questions.length - 1) {
      setIsComplete(true);
      onComplete();
      window.setTimeout(() => {
        navigate("/reward");
      }, 700);
      return;
    }

    window.setTimeout(() => {
      setSelectedChoice("");
      setActiveQuestion((current) => current + 1);
    }, 450);
  };

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card page-scene quiz-scene">
        <div className="section-heading reveal reveal-1">
          <p className="eyebrow">Route two</p>
          <h2>Birthday Questions</h2>
          <StoryText
            text="Answer them one by one. The next page only opens after every answer is correct."
            delay={160}
            speed={62}
          />
        </div>

        <div className="quiz-header reveal reveal-2" aria-hidden="true">
          <div className="pixel-hearts">
            <span className={lives < 1 ? "is-lost" : ""} />
            <span className={lives < 2 ? "is-lost" : ""} />
            <span className={lives < 3 ? "is-lost" : ""} />
          </div>
          <div className="quiz-counter">Question {progressLabel}</div>
        </div>

        <div className="question-shell question-shell-game reveal reveal-3">
          <article className="question-card question-card-game">
            <span className="story-badge">Question {currentQuestion.id}</span>
            <h3>{currentQuestion.prompt}</h3>
            <StoryText
              key={currentQuestion.id}
              text={currentQuestion.hint}
              className="quiz-hint"
              delay={120}
              speed={60}
            />

            <div className="quiz-choice-grid">
              {currentQuestion.choices.map((choice) => {
                const isActive = selectedChoice === choice;
                const isCorrect =
                  selectedChoice === currentQuestion.correctChoice &&
                  choice === currentQuestion.correctChoice;

                return (
                  <button
                    key={choice}
                    type="button"
                    className={`quiz-choice ${isActive ? "is-active" : ""} ${isCorrect ? "is-correct" : ""}`}
                    onClick={() => handleChoice(choice)}
                    disabled={isComplete}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {isComplete ? (
              <div className="quiz-success">
                <strong>All answers correct.</strong>
                <p>The reward page is unlocked now.</p>
              </div>
            ) : null}
          </article>
        </div>

        <div className="back-actions">
          <Link to="/" className="back-button-tab">
            Kembali
          </Link>
        </div>
      </section>

      {wrongPopup ? (
        <div className="quiz-popup-backdrop" role="presentation">
          <div
            className="quiz-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wrong-answer-title"
          >
            <p className="quiz-popup-kicker">Wrong answer</p>
            <h3 id="wrong-answer-title">{wrongPopup.title}</h3>
            <p>{wrongPopup.message}</p>
            <p className="quiz-popup-hint">Hint: {wrongPopup.hint}</p>
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                setWrongPopup(null);
                setSelectedChoice("");
              }}
            >
              Try again
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default Games;
