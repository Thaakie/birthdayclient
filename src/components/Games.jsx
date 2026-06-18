import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../data/questions";
import StoryText from "./StoryText";

function Games({ progressItems, onComplete }) {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [wrongPopup, setWrongPopup] = useState(null);
  const [correctToast, setCorrectToast] = useState(false);
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

    setCorrectToast(true);

    if (activeQuestion === questions.length - 1) {
      setIsComplete(true);
      onComplete();
      window.setTimeout(() => {
        setCorrectToast(false);
        navigate("/reward");
      }, 2000);
      return;
    }

    window.setTimeout(() => {
      setCorrectToast(false);
      setSelectedChoice("");
      setActiveQuestion((current) => current + 1);
    }, 2000);
  };

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card page-scene quiz-scene">
        <div className="section-heading reveal reveal-1">
        
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

        <div className="question-shell question-shell-game reveal reveal-3" style={{ position: "relative", overflow: "hidden", minHeight: "350px" }}>
          <AnimatePresence mode="wait">
            <motion.article
              key={currentQuestion.id}
              className="question-card question-card-game"
              initial={{ opacity: 0, x: 20, filter: "blur(2px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(2px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <span className="story-badge">Question {currentQuestion.id}</span>
              <h3>{currentQuestion.prompt}</h3>
              <StoryText
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
            </motion.article>
          </AnimatePresence>
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
            <div style={{ margin: "12px auto 16px", display: "flex", justifyContent: "center" }}>
              <img
                src="/nangus.jpg"
                alt="Nangis"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "4px solid #fff",
                  boxShadow: "0 6px 16px rgba(125, 64, 83, 0.15)"
                }}
              />
            </div>
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

      {correctToast && (
        <div className="correct-toast-backdrop">
          <div className="correct-toast-content">
            <img src="/lovu.jpg" alt="Correct Answer" className="correct-toast-image" />
            <h3>Correct! ❤️</h3>
          </div>
        </div>
      )}
    </main>
  );
}

export default Games;
