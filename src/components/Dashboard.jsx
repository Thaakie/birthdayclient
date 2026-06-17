import { useEffect } from "react";
import { Link } from "react-router-dom";
import StoryText from "./StoryText";

function Dashboard({ progressItems, onComplete }) {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card page-scene">
        <div className="section-heading reveal reveal-1">
          <p className="eyebrow">Route four</p>
          <h2>Birthday Dashboard</h2>
          <StoryText
            text="This page works like the route map, but still follows your locked flow. Later pages stay unavailable until this one is finished."
            delay={150}
            speed={60}
          />
        </div>

        <div className="progress-grid reveal reveal-2">
          {progressItems.map((item, index) => (
            <article key={item.path} className={`progress-card ${item.active ? "is-active" : ""}`}>
              <span className="progress-step">0{index + 1}</span>
              <strong>{item.label}</strong>
              <span>{item.unlocked ? "Unlocked" : "Locked"}</span>
            </article>
          ))}
        </div>

        <div className="panel reveal reveal-3">
          <h3>The vibe so far</h3>
          <StoryText
            text="Opening story done, questions answered, reward page passed. This is the moment where the experience starts feeling more complete."
            delay={550}
            speed={58}
          />
        </div>

        <div className="back-actions">
          <Link to="/reward" className="back-button-tab">
            Kembali
          </Link>
        </div>

        <div className="welcome-actions">
          <Link to="/gallery" className="primary-button welcome-start">
            Ke Gallery
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
