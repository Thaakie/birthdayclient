import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StoryText from "./StoryText";

function Angry() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/games");
  };

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card page-scene quiz-scene angry-scene">
        <div className="section-heading reveal reveal-1">
          <p className="eyebrow">Game Over</p>
          <h2>Sengaja ya bikin aku marah? 😤</h2>
        </div>

        <div className="panel reveal reveal-2 angry-panel" style={{ textAlign: "center", margin: "24px auto", maxWidth: "480px" }}>
          <div className="angry-emoji-container">
            <motion.span
              role="img"
              aria-label="angry"
              className="angry-emoji"
              animate={{
                scale: [1, 1.15, 1.15, 1, 1],
                rotate: [0, -8, 8, -8, 8, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              style={{ display: "inline-block", fontSize: "4.5rem", marginBottom: "16px" }}
            >
              😤
            </motion.span>
          </div>
          <p className="angry-text" style={{ fontSize: "1.2rem", fontWeight: "600", color: "#813549" }}>
            (sengaja ya bikin aku marah) wkwk
          </p>
          <p style={{ marginTop: "10px", fontSize: "0.95rem", color: "#7d5360", lineHeight: "1.6" }}>
            Masa tebakan tentang aku salah terus... Sini minta maaf dulu terus coba lagi! 🥺👉👈
          </p>
        </div>

        <div className="answer-row reveal reveal-3">
          <button type="button" className="primary-button" onClick={handleRetry}>
            Minta Maaf & Main Lagi 🥺
          </button>
        </div>
      </section>
    </main>
  );
}

export default Angry;
