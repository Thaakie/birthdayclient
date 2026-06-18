import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StoryText from "./StoryText";

function LoveLetter({ progressItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="love-letter-page-bg">
      <div className="floating-hearts" aria-hidden="true" />

      <div className="love-letter-flow-container">
        <div className={`envelope-wrapper-romantic ${isOpen ? "is-open" : "is-closed"}`}>
          {/* Envelope Back Flap */}
          <div className="envelope-back-bg">
            <div className="envelope-flap-top" />
          </div>

          {/* Postage Stamp Letter Paper */}
          <div className="stamp-letter">
            <div className="letter-header-row">
              <div className="letter-metadata">
                <div className="meta-field">
                  <span className="meta-label">TO:</span>
                  <span className="meta-value">Clara</span>
                </div>
                <div className="meta-field">
                  <span className="meta-label">FROM:</span>
                  <span className="meta-value">Allen</span>
                </div>
              </div>

              <div className="letter-stamps">
                <div className="mini-stamp" style={{ transform: "rotate(-4deg)" }}>
                  <img src="/bungu.jpg" alt="Stamp 1" />
                </div>
                <div className="mini-stamp" style={{ transform: "rotate(6deg)" }}>
                  <img src="/bungu.jpg" alt="Stamp 2" style={{ transform: "scaleX(-1)" }} />
                </div>
              </div>
            </div>

            <h2 className="love-letter-subheader">My Love, Clara</h2>

            <div className="letter-body-content">
              {isOpen ? (
                <>
                  <StoryText
                    text="My dearest,"
                    delay={300}
                    speed={60}
                    style={{ fontWeight: "bold", display: "block", marginBottom: "12px", fontFamily: "Georgia, serif" }}
                  />
                  <StoryText
                    text="Thank you for being one of the softest, brightest parts of my world. I wanted this whole birthday project to feel less like a website and more like a sequence of little feelings made visible."
                    delay={700}
                    speed={45}
                  />
                  <StoryText
                    text="I hope this day holds calm joy, pretty moments, and every kind of love you deserve. If this page could hug you, it would."
                    delay={2200}
                    speed={45}
                    style={{ marginTop: "14px", display: "block" }}
                  />
                </>
              ) : (
                <p style={{ opacity: 0 }}>Letter content hidden</p>
              )}
            </div>

            <div className="letter-footer">
              {isOpen && (
                <StoryText
                  className="signature"
                  text="—your bf, Allen"
                  delay={4500}
                  speed={60}
                />
              )}
            </div>

            {/* Made with love circular stamp */}
            <div className="made-with-love-stamp">
              <svg viewBox="0 0 100 100" width="75" height="75">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text fontFamily="monospace" fontSize="8.5" fill="rgba(122, 29, 36, 0.35)" letterSpacing="0.8">
                  <textPath xlinkHref="#circlePath">
                    MADE WITH LOVE • ALWAYS & FOREVER •
                  </textPath>
                </text>
                <path d="M 42 50 A 8 8 0 0 1 58 50 A 8 8 0 0 1 42 50 Z" fill="rgba(122, 29, 36, 0.08)" />
                <path d="M 46 48 C 46 45, 54 45, 54 48 C 54 52, 50 54, 50 56 C 50 54, 46 52, 46 48 Z" fill="rgba(122, 29, 36, 0.2)" />
              </svg>
            </div>
          </div>

          {/* Envelope Front Folds */}
          <div className="envelope-front-fg">
            <div className="envelope-pocket-bottom" />
            <div className="heart-wax-seal" onClick={() => setIsOpen(true)}>
              <div className="seal-heart-shape" />
            </div>
          </div>
        </div>

        {/* Actions positioned inline under envelope, fading in */}
        {isOpen && (
          <motion.div
            className="love-letter-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.5, duration: 0.6 }}
          >
            <Link to="/gallery" className="back-button-tab love-letter-btn-secondary">
              Kembali
            </Link>
            <Link to="/" className="primary-button welcome-start love-letter-btn-primary">
              Ke Awal
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default LoveLetter;
