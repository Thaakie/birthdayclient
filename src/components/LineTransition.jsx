import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const routeFlow = [
  { path: "/", label: "Opening" },
  { path: "/games", label: "Questions" },
  { path: "/reward", label: "Reward" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/gallery", label: "Gallery" },
  { path: "/love-letter", label: "Love Letter" },
];

export default function LineTransition({ isTransitioning, fromIndex, toIndex, onComplete }) {
  const pathRef = useRef(null);
  const [heartPos, setHeartPos] = useState({ x: 50 + fromIndex * 180, y: fromIndex % 2 === 0 ? 80 : 40 });
  const [viewBoxX, setViewBoxX] = useState(0);
  const [burst, setBurst] = useState(false);

  const pathD = "M 50,80 C 140,80 140,40 230,40 C 320,40 320,80 410,80 C 500,80 500,40 590,40 C 680,40 680,80 770,80 C 860,80 860,40 950,40";

  useEffect(() => {
    if (!isTransitioning) return;

    let animationFrameId;
    let startTime = null;
    const duration = 1600; // 1.6s for a gorgeous, smooth glide

    const checkAndStart = () => {
      if (!pathRef.current) {
        animationFrameId = requestAnimationFrame(checkAndStart);
        return;
      }

      const totalLength = pathRef.current.getTotalLength();
      const startLength = (fromIndex / 5) * totalLength;
      const endLength = (toIndex / 5) * totalLength;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function: easeInOutCubic
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentLength = startLength + (endLength - startLength) * ease;
        const pt = pathRef.current.getPointAtLength(currentLength);

        setHeartPos({ x: pt.x, y: pt.y });

        // Camera follows: center the viewBox X on the heart (width 400), clamp within SVG dimensions [0, 1000]
        const targetViewBoxX = Math.max(0, Math.min(600, pt.x - 200));
        setViewBoxX(targetViewBoxX);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Heart burst explosion
          setBurst(true);
          setTimeout(() => {
            setBurst(false);
            onComplete();
          }, 500);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(checkAndStart);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTransitioning, fromIndex, toIndex, onComplete]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="transition-overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="transition-overlay-content">
            <h2 className="transition-title">Traveling to {routeFlow[toIndex]?.label}...</h2>
            
            <div className="transition-svg-container">
              <svg 
                className="transition-svg" 
                viewBox={`${viewBoxX} 0 400 120`}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="trans-gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f3a7bb" />
                    <stop offset="50%" stopColor="#f28aa5" />
                    <stop offset="100%" stopColor="#de6c8e" />
                  </linearGradient>
                  <filter id="trans-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="heart-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* The main path */}
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="url(#trans-gradient-line)"
                  strokeWidth="4"
                  strokeDasharray="6,6"
                  filter="url(#trans-glow)"
                />

                {/* Render the 6 nodes */}
                {routeFlow.map((route, i) => {
                  const x = 50 + i * 180;
                  const y = i % 2 === 0 ? 80 : 40;
                  const isActive = i === toIndex;
                  const isPassed = i <= toIndex;
                  return (
                    <g key={route.path}>
                      <circle
                        cx={x}
                        cy={y}
                        r={12}
                        fill={isActive ? "#813549" : isPassed ? "#f28aa5" : "#fff"}
                        stroke="#813549"
                        strokeWidth="2.5"
                        className={isActive ? "active-node-pulse" : ""}
                      />
                      <text
                        x={x}
                        y={y + (i % 2 === 0 ? -22 : 28)}
                        textAnchor="middle"
                        fill="#813549"
                        fontSize="11"
                        fontWeight="bold"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        0{i + 1}
                      </text>
                    </g>
                  );
                })}

                {/* The traveling heart */}
                <g transform={`translate(${heartPos.x - 12}, ${heartPos.y - 12})`}>
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#de6c8e"
                    filter="url(#heart-glow)"
                  />
                </g>
              </svg>

              {/* Heart burst particle effect positioned dynamically near the heart */}
              {burst && (
                <div 
                  className="burst-particles"
                  style={{
                    left: `${((heartPos.x - viewBoxX) / 400) * 100}%`,
                    top: `${(heartPos.y / 120) * 100}%`
                  }}
                >
                  <span className="burst-heart h1">❤️</span>
                  <span className="burst-heart h2">💖</span>
                  <span className="burst-heart h3">💝</span>
                  <span className="burst-heart h4">💕</span>
                  <span className="burst-heart h5">❤️</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
