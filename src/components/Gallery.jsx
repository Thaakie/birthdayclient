import { useEffect } from "react";
import { Link } from "react-router-dom";
import { memories } from "../data/memories";
import StoryText from "./StoryText";

function Gallery({ progressItems, onComplete }) {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card page-scene">
        <div className="section-heading reveal reveal-1">
       
          <h2>Our Memories</h2>
          <StoryText
            text="This page is prepared for our future photos. But... there should be photos here, right? Hmm, what if we start filling it up after this, matching the titles? >_<"
            delay={150}
            speed={60}
          />
        </div>

        <div className="memory-grid reveal reveal-2">
          {memories.map((memory, index) => (
            <article
              key={memory.title}
              className="memory-card memory-card-animated"
              style={{
                animationDelay: `${0.2 + index * 0.12}s`,
                "--rot": index % 4 === 0 ? "-3.2deg" : index % 4 === 1 ? "2.5deg" : index % 4 === 2 ? "-1.8deg" : "3deg"
              }}
            >
              {/* Decorative Pushpin */}
              <div className="polaroid-pin">
                <svg viewBox="0 0 24 24" width="26" height="26">
                  <ellipse cx="10" cy="18" rx="2.5" ry="1" fill="rgba(0, 0, 0, 0.18)" />
                  <line x1="12" y1="12" x2="10" y2="17" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 8 7 L 16 7 L 14 12 L 10 12 Z" fill="#f28aa5" />
                  <circle cx="12" cy="6" r="4.5" fill="#de6c8e" />
                  <circle cx="10.5" cy="4.5" r="1.5" fill="rgba(255, 255, 255, 0.55)" />
                </svg>
              </div>

              <div className={`memory-photo ${memory.tone} ${memory.isPlaceholder ? "is-placeholder" : ""}`}>
                {memory.isPlaceholder && (
                  <div className="polaroid-placeholder-overlay">
                    <span className="polaroid-placeholder-question">?</span>
                    <span className="polaroid-placeholder-text">Soon! ❤️</span>
                  </div>
                )}
              </div>
              <strong>{memory.title}</strong>
              <span>{memory.caption}</span>
            </article>
          ))}
        </div>

        <div className="back-actions">
          <Link to="/dashboard" className="back-button-tab">
            Kembali
          </Link>
        </div>

        <div className="welcome-actions">
          <Link to="/love-letter" className="primary-button welcome-start">
            Selanjutnya
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
