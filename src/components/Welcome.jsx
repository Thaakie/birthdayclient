import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StoryText from "./StoryText";

function Welcome({ onComplete }) {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Play music globally (stored on window to avoid duplicates)
    if (!window.bgMusic) {
      window.bgMusic = new Audio("https://upload.wikimedia.org/wikipedia/commons/3/3d/Nocturne_in_E_flat_major%2C_Op._9_no._2.mp3");
      window.bgMusic.loop = true;
      window.bgMusic.volume = 0.45; // Sweet, soft background volume
    }
    window.bgMusic.play().catch((err) => console.log("Audio play failed:", err));
  };

  const handleStart = () => {
    if (isLeaving) {
      return;
    }

    setIsLeaving(true);
    onComplete();

    window.setTimeout(() => {
      navigate("/games");
    }, 820);
  };

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="hero-card welcome-scene page-scene">
        <div className="welcome-layout">
          <motion.div
            className={`welcome-note reveal reveal-2 ${isOpened ? "is-open" : "is-closed"}`}
            onClick={handleOpenEnvelope}
            style={{ cursor: isOpened ? "default" : "pointer" }}
            initial={false}
            animate={
              isLeaving
                ? {
                    rotateY: -108,
                    x: 86,
                    scale: 0.985,
                    opacity: 0.04,
                    filter: "blur(1.5px)",
                  }
                : {
                    rotateY: 0,
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                  }
            }
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`envelope-card ${isOpened ? "is-open" : "is-closed"}`}>
              {/* Bouncing guide arrow (fades out when opened) */}
              <AnimatePresence>
                {!isOpened && (
                  <motion.div
                    className="envelope-guide"
                    initial={{ opacity: 0, y: 10, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -10, x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Buka suratnya disini 💌</span>
                    <svg className="guide-arrow" viewBox="0 0 24 24">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="envelope-flap" aria-hidden="true" />
              <div className="envelope-pocket" aria-hidden="true" />
              <div className="welcome-paper envelope-letter">
                <p className="eyebrow">For someone deeply special</p>
                <h1>Dear, My Love</h1>
                {isOpened && (
                  <>
                    <StoryText
                      className="hero-copy"
                      text="This page opens like a little letter first, just the way I wanted. Soft, personal, and made only for you."
                      delay={220}
                      speed={62}
                    />
                    <StoryText
                      text="Happy birthday, sayang. Before the games and surprises begin, I wanted this first note to hold a warm hello and a quiet wish for your sweetest day."
                      delay={760}
                      speed={54}
                    />
                    <StoryText
                      text="May today feel loved, lovely, and full of gentle moments."
                      delay={2350}
                      speed={56}
                    />
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="cake-showcase reveal reveal-3"
            aria-hidden="true"
            initial={false}
            animate={
              isLeaving
                ? { x: 28, opacity: 0.18, scale: 0.95, rotate: 4 }
                : { x: 0, opacity: 1, scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cake-glow" />
            <div className="cake-card">
              <div className="cake-candle">
                <span className="candle-flame" />
              </div>
              <div className="cake-top">
                <span className="frosting-dot frosting-dot-left" />
                <span className="frosting-dot frosting-dot-right" />
              </div>
              <div className="cake-middle" />
              <div className="cake-bottom" />
              <div className="cake-plate" />
            </div>
            <p className="cake-caption">A tiny cake beside your letter.</p>
          </motion.div>
        </div>

        {/* Start button only fades in after envelope is opened */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              className="welcome-actions"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <button
                type="button"
                className="primary-button welcome-start"
                onClick={handleStart}
                disabled={isLeaving}
              >
                {isLeaving ? "Sebentar..." : "Yuk mulai!"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default Welcome;
