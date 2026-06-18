import { Link } from "react-router-dom";
import { reasons } from "../data/memories";
import StoryText from "./StoryText";

function LoveLetter({ progressItems }) {
  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card page-scene">
        <div className="section-heading reveal reveal-1">
          
          <h2>A Secret Note</h2>
          <StoryText
            text="The last page stays separate so it feels more intimate, like opening the final envelope after the rest of the journey."
            delay={150}
            speed={60}
          />
        </div>

        <div className="content-grid">
          <article className="panel note-panel reveal reveal-2">
            <div className="letter-paper">
              <StoryText text="My dearest," delay={350} speed={75} />
              <StoryText
                text="Thank you for being one of the softest, brightest parts of my world. I wanted this whole birthday project to feel less like a website and more like a sequence of little feelings made visible."
                delay={900}
                speed={50}
              />
              <StoryText
                text="I hope this day holds calm joy, pretty moments, and every kind of love you deserve. If this page could hug you, it would."
                delay={2200}
                speed={50}
              />
              <StoryText text="Forever yours." delay={3500} speed={80} />
            </div>
          </article>

          <article className="panel reveal reveal-3">
            <h3>Why you?</h3>
            <div className="reasons-grid">
              {reasons.map((reason) => (
                <div key={reason} className="reason-card">
                  <span className="heart-dot" aria-hidden="true">
                    Love
                  </span>
                  <p>{reason}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="back-actions">
          <Link to="/gallery" className="back-button-tab">
            Kembali
          </Link>
        </div>

        <div className="welcome-actions">
          <Link to="/" className="primary-button welcome-start">
            Ke Awal
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoveLetter;
