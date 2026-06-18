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
          <h2>Sengaja ya bikin aku marah? {'>'}:D</h2>
        </div>

        <div className="panel reveal reveal-2 angry-panel" style={{ textAlign: "center", margin: "24px auto", maxWidth: "480px" }}>
          <div className="angry-emoji-container" style={{ marginBottom: "16px" }}>
            <motion.img
              src="/maruh.jpg"
              alt="Marah"
              animate={{
                scale: [1, 1.05, 1.05, 1, 1],
                rotate: [0, -3, 3, -3, 3, 0],
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(125, 64, 83, 0.15)",
                border: "6px solid #fff",
                margin: "0 auto 12px"
              }}
            />
          </div>
          <p className="angry-text" style={{ fontSize: "1.2rem", fontWeight: "600", color: "#813549" }}>
            mw di pukul?
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
