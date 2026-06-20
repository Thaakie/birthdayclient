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
                  <span className="meta-value">Sabrina</span>
                </div>
                <div className="meta-field">
                  <span className="meta-label">FROM:</span>
                  <span className="meta-value">Rezy</span>
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

            <h2 className="love-letter-subheader">My Love, Sabrina</h2>

            <div className="letter-body-content">
              {isOpen ? (
                <>
                  <StoryText
                    text="My dearest,"
                    delay={300}
                    speed={50}
                    style={{ fontWeight: "bold", display: "block", marginBottom: "12px", fontFamily: "Georgia, serif" }}
                  />
                  <StoryText
                    text="Happy Birthday, love."
                    delay={700}
                    speed={50}
                    style={{ display: "block", marginBottom: "12px" }}
                  />
                  <br />
                  <StoryText
                    text="Thank you for being the kindest, softest, and brightest part of my life. You make ordinary days feel special just by being yourself, and I hope you never forget how deeply loved you are."
                    delay={1100}
                    speed={45}
                    style={{ display: "block", marginBottom: "12px" }}
                  />
                  <br />
                  <StoryText
                    text="I didn't want this birthday gift to be just another website. I wanted it to hold a little piece of my heart—a place where I could put all the little things I feel for you but don't always know how to say out loud."
                    delay={3000}
                    speed={45}
                    style={{ display: "block", marginBottom: "12px" }}
                  />
                  <br />
                  <StoryText
                    text="I hope today brings you lots of smiles, peaceful moments, and everything that makes you happy. You deserve all the love, kindness, and happiness this world has to offer."
                    delay={5200}
                    speed={45}
                    style={{ display: "block", marginBottom: "12px" }}
                  />
                  <StoryText
                    text="And if this page could do one more thing, I hope it could give you the biggest hug and remind you that no matter where we are, a part of my heart is always with you."
                    delay={7000}
                    speed={45}
                    style={{ display: "block", marginBottom: "12px" }}
                  />
                  <br />
                  <StoryText
                    text="Happy Birthday, my love."
                    delay={9000}
                    speed={50}
                    style={{ display: "block", marginBottom: "12px" }}
                  />
                  <StoryText
                    text="I love you, always."
                    delay={9600}
                    speed={50}
                    style={{ display: "block" }}
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
                  text="—your bf, eji"
                  delay={10200}
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
            transition={{ delay: 11.0, duration: 0.6 }}
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
