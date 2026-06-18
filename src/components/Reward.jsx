import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StoryText from "./StoryText";
import { TextFlippingBoard } from "./TextFlippingBoard";

function Reward({ progressItems, onComplete }) {
  useEffect(() => {
    onComplete();

    // Play The 1975 - About You globally on mount
    const trackUrl = "/The 1975 - About You (Official).mp3";
    if (!window.bgMusic) {
      window.bgMusic = new Audio(trackUrl);
      window.bgMusic.loop = true;
      window.bgMusic.volume = 0.45;
    } else {
      const currentSrc = decodeURIComponent(window.bgMusic.src);
      if (!currentSrc.includes(trackUrl)) {
        window.bgMusic.src = trackUrl;
      }
    }
    window.bgMusic.play().catch((err) => console.log("Audio play failed:", err));
  }, [onComplete]);

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card reward-card page-scene">
        <div className="section-heading reveal reveal-1" style={{ position: "relative" }}>
          {/* Left Floating Photo */}
          <motion.div
            className="floating-photo-container-left"
            animate={{
              y: [0, -8, 0],
              rotate: [-12, -9, -12]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <img
              src="/bungu.jpg"
              alt="Photo Left"
              className="floating-photo-img"
            />
          </motion.div>

          {/* Right Floating Photo */}
          <motion.div
            className="floating-photo-container-right"
            animate={{
              y: [0, -10, 0],
              rotate: [14, 11, 14]
            }}
            transition={{
              duration: 3.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <img
              src="/bungu.jpg"
              alt="Photo Right"
              className="floating-photo-img"
            />
          </motion.div>

          <h2>Your Little Reward</h2>
          <StoryText
            text="A small in-between page before the main dashboard opens. Think of it as a soft pause."
            delay={150}
            speed={62}
          />
        </div>

        <div className="panel reward-panel reveal reveal-2" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <span className="story-badge">Special pause</span>
          
          <TextFlippingBoard
            text={` HAPPY BIRTHDAY!\nYOU ARE SO WONDERFUL\n\n THIS LITTLE SPACE\n  IS MADE WITH LOVE\n {R}{O}{Y}{G}{B}{V}{W}`}
            duration={1.5}
          />

          <h3 style={{ marginTop: "12px" }}>If I could wrap a feeling...</h3>
          <StoryText
            text="...it would be this one. Pink skies, your favorite song, and one quiet promise that your day deserves to feel sweet from start to finish."
            delay={1500}
            speed={55}
          />
        </div>

        <div className="back-actions">
          <Link to="/games" className="back-button-tab">
            Kembali
          </Link>
        </div>

        <div className="welcome-actions">
          <Link to="/dashboard" className="primary-button welcome-start">
            Selanjutnya
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Reward;
