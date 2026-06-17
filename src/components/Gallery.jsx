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
          <p className="eyebrow">Route five</p>
          <h2>Our Memories</h2>
          <StoryText
            text="This is the gallery page, separated from the dashboard so it feels like its own chapter instead of one long landing page."
            delay={150}
            speed={60}
          />
        </div>

        <div className="memory-grid reveal reveal-2">
          {memories.map((memory, index) => (
            <article
              key={memory.title}
              className="memory-card memory-card-animated"
              style={{ animationDelay: `${0.2 + index * 0.12}s` }}
            >
              <div className={`memory-photo ${memory.tone}`} />
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
            Ke Surat Cinta
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
