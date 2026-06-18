import { useState, useEffect } from "react";
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

    // Play Coldplay - Sparks globally (stored on window to avoid duplicates)
    const trackUrl = "/@coldplay  - Sparks (Lyrics).mp3";
    if (!window.bgMusic) {
      window.bgMusic = new Audio(trackUrl);
      window.bgMusic.loop = true;
      window.bgMusic.volume = 0.45; // Sweet, soft background volume
    } else {
      const currentSrc = decodeURIComponent(window.bgMusic.src);
      if (!currentSrc.includes(trackUrl)) {
        window.bgMusic.src = trackUrl;
      }
    }
    window.bgMusic.play().catch((err) => console.log("Audio play failed:", err));
  };

  useEffect(() => {
    if (isOpened) {
      const trackUrl = "/@coldplay  - Sparks (Lyrics).mp3";
      if (window.bgMusic) {
        const currentSrc = decodeURIComponent(window.bgMusic.src);
        if (!currentSrc.includes(trackUrl)) {
          window.bgMusic.src = trackUrl;
          window.bgMusic.play().catch((err) => console.log("Audio play failed:", err));
        }
      }
    }
  }, [isOpened]);

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

      <motion.section
        className="hero-card welcome-scene page-scene"
        initial={false}
        animate={
          isLeaving
            ? { opacity: 0, y: -15, scale: 0.985, filter: "blur(1px)" }
            : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`welcome-layout ${isOpened ? "is-open" : "is-closed"}`}>
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
                    <span>Buka suratnya disini</span>
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

          <AnimatePresence>
            {isOpened && (
              <motion.div
                className="cake-showcase"
                initial={{ opacity: 0, scale: 0.82, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.82, x: 50 }}
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                aria-hidden="true"
              >
                <div className="cake-glow" />
                <div className="cake-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "12px", height: "300px" }}>
                  <img 
                    src="/caku.jpg" 
                    alt="Cake" 
                    style={{ 
                      width: "100%", 
                      height: "240px", 
                      objectFit: "cover", 
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                    }} 
                  />
                  <div className="cake-plate" style={{ position: "relative", bottom: "0", marginTop: "8px" }} />
                </div>
                <p className="cake-caption">A tiny cake beside your letter.</p>
              </motion.div>
            )}
          </AnimatePresence>
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
      </motion.section>
    </main>
  );
}

export default Welcome;
