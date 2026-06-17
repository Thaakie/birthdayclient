import { useEffect } from "react";
import { Link } from "react-router-dom";
import StoryText from "./StoryText";
import { TextFlippingBoard } from "./TextFlippingBoard";

function Reward({ progressItems, onComplete }) {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card reward-card page-scene">
        <div className="section-heading reveal reveal-1">
          <p className="eyebrow">Route three</p>
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
            Ke Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Reward;
