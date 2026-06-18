import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoryText from "./StoryText";

function Dashboard({ progressItems, onComplete }) {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  // --- Countdown Logic ---
  const calculateTimeLeft = () => {
    const now = new Date();
    let year = now.getFullYear();
    // Target is August 9th
    let target = new Date(`August 9, ${year} 00:00:00`);
    
    // If today is past August 9th, target is August 9th of next year
    if (now > target) {
      target = new Date(`August 9, ${year + 1} 00:00:00`);
    }
    
    const difference = target - now;
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Sweet Wish Generator Logic ---
  const wishes = [
    "Hari ini adalah hari istimewamu, semoga senyummu terus mekar... 💖",
    "Apapun yang terjadi hari ini dan seterusnya, ingatlah bahwa kamu sangat disayangi dan berharga. ✨",
    "Semoga tahun ini membawa lebih banyak tawa, ketenangan jiwa, dan mimpi-mimpi indah yang menjadi nyata. 🌸",
    "Setiap detak detik adalah doa manis untuk kebahagiaanmu. Terima kasih sudah lahir dan membawa kehangatan. 🍰",
    "Aku berharap matamu selalu dipenuhi dengan binar bahagia, dan hatimu selalu merasa aman serta dicintai. 💕",
    "Selamat bertambah usia! Semoga harimu seindah tawa ceriamu yang selalu menenangkan dunia. 🎈",
    "Kamu adalah hadiah terindah bagi orang-orang di sekitarmu. Semoga hari ini penuh dengan keajaiban kecil! 🌟",
    "Di umur yang baru ini, semoga langkahmu selalu diringankan dan harimu selalu dipenuhi dengan pelukan hangat. 🧸"
  ];

  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wishes.length);
    setCurrentWishIndex(randomIndex);
  }, []);

  const handleNextWish = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentWishIndex((prevIndex) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * wishes.length);
        } while (nextIndex === prevIndex);
        return nextIndex;
      });
      setIsFading(false);
    }, 250);
  };

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true" />

      <section className="shell-card page-scene">
        <div className="section-heading reveal reveal-1">
          
          <h2>Our Story Timeline</h2>
          <StoryText
            text="This page works like the route map, but still follows your locked flow. Later pages stay unavailable until this one is finished."
            delay={150}
            speed={60}
          />
        </div>

        {/* Countdown Section */}
        <div className="countdown-section reveal reveal-2">
          <div className="countdown-title">Countdown to August 9th 🎂</div>
          <div className="countdown-container">
            <div className="countdown-box">
              <span className="countdown-num">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-num">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-num">{timeLeft.minutes}</span>
              <span className="countdown-label">Mins</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-num">{timeLeft.seconds}</span>
              <span className="countdown-label">Secs</span>
            </div>
          </div>
        </div>

        {/* Romantic Timeline */}
        <div className="romantic-timeline-container reveal reveal-3">
          <svg className="timeline-svg" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f3a7bb" />
                <stop offset="50%" stopColor="#f28aa5" />
                <stop offset="100%" stopColor="#de6c8e" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M 50,80 C 140,80 140,40 230,40 C 320,40 320,80 410,80 C 500,80 500,40 590,40 C 680,40 680,80 770,80 C 860,80 860,40 950,40"
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="4"
              strokeDasharray="6,6"
              filter="url(#glow)"
            />
          </svg>

          {progressItems.map((item, index) => {
            const positions = [
              { left: "5%", top: "75%" },
              { left: "23%", top: "25%" },
              { left: "41%", top: "75%" },
              { left: "59%", top: "25%" },
              { left: "77%", top: "75%" },
              { left: "95%", top: "25%" },
            ];
            const pos = positions[index];
            const isUnlocked = item.unlocked;
            const isLabelOnTop = index % 2 !== 0;

            const content = (
              <>
                <div
                  className={`timeline-node-circle ${item.active ? "is-active" : ""} ${
                    isUnlocked ? "is-unlocked" : "is-locked"
                  }`}
                >
                  {isUnlocked ? (
                    <span className="node-num">0{index + 1}</span>
                  ) : (
                    <span className="node-lock">🔒</span>
                  )}
                </div>
                <div className="timeline-node-info">
                  <strong>{item.label}</strong>
                  <span className="node-status">{isUnlocked ? "Unlocked" : "Locked"}</span>
                </div>
              </>
            );

            if (isUnlocked) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`timeline-node ${isLabelOnTop ? "label-top" : ""}`}
                  style={{ left: pos.left, top: pos.top }}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={item.path}
                className={`timeline-node is-disabled ${isLabelOnTop ? "label-top" : ""}`}
                style={{ left: pos.left, top: pos.top }}
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* Bottom panel: Full-width Wish Generator */}
        <div className="panel wish-panel reveal reveal-4">
          <h3>A Little Wish for You</h3>
          <div className={`wish-text ${isFading ? "fade-out" : ""}`}>
            {wishes[currentWishIndex]}
          </div>
          <button type="button" className="wish-action-btn" onClick={handleNextWish}>
            Next Wish ✨
          </button>
        </div>

        <div className="back-actions">
          <Link to="/reward" className="back-button-tab">
            Kembali
          </Link>
        </div>

        <div className="welcome-actions">
          <Link to="/gallery" className="primary-button welcome-start">
            Selanjutnya
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
