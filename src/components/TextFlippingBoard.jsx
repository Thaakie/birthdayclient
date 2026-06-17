import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°";

const BOARD_ROWS = 6;
const BOARD_COLS = 22;

const BASE_COL_DELAY = 30;
const BASE_ROW_DELAY = 20;
const BASE_STEP_MS = 55;
const BASE_FLIP_S = 0.35;
const BASE_TOTAL_S =
  ((BOARD_COLS - 1) * BASE_COL_DELAY +
    (BOARD_ROWS - 1) * BASE_ROW_DELAY +
    8 * BASE_STEP_MS) /
  1000;

const ACCENT_COLORS = [
  { top: "bg-rose-200", bottom: "bg-rose-300", text: "text-rose-800" },
  { top: "bg-orange-100", bottom: "bg-orange-200", text: "text-orange-800" },
  { top: "bg-amber-100", bottom: "bg-amber-200", text: "text-amber-800" },
  { top: "bg-emerald-100", bottom: "bg-emerald-200", text: "text-emerald-800" },
  { top: "bg-sky-100", bottom: "bg-sky-200", text: "text-sky-800" },
  { top: "bg-purple-100", bottom: "bg-purple-200", text: "text-purple-800" },
  { top: "bg-white", bottom: "bg-pink-50/80", text: "text-pink-700" },
];

const CELL_TEXT_STYLE = {
  fontSize: "clamp(8px, 1.8vw, 22px)",
  lineHeight: 1,
};

const COLOR_MAP = {
  "{R}": "#fecdd3", // pastel red (rose-200)
  "{O}": "#ffedd5", // pastel orange (orange-100)
  "{Y}": "#fef3c7", // pastel yellow (amber-100)
  "{G}": "#d1fae5", // pastel green (emerald-100)
  "{B}": "#e0f2fe", // pastel blue (sky-100)
  "{V}": "#f3e8ff", // pastel purple (purple-100)
  "{W}": "#ffffff", // white
};

// ── Individual Split-Flap Character ───────────────────────────────────
const FlapCell = React.memo(
  function FlapCell({ target, delay, stepMs, flipDuration }) {
    const [current, setCurrent] = useState(" ");
    const [prev, setPrev] = useState(" ");
    const [flipId, setFlipId] = useState(0);
    const [accent, setAccent] = useState(null);
    const [prevAccent, setPrevAccent] = useState(null);
    const curRef = useRef(" ");
    const tgtRef = useRef(null);
    const accentRef = useRef(null);
    const startTimer = useRef(null);
    const stepTimer = useRef(null);

    useEffect(() => {
      if (startTimer.current) clearTimeout(startTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
      startTimer.current = null;
      stepTimer.current = null;

      const normalized = FLAP_CHARS.includes(target.toUpperCase())
        ? target.toUpperCase()
        : " ";
      if (normalized === tgtRef.current) return;
      tgtRef.current = normalized;

      if (normalized === " " && curRef.current === " ") return;

      const scrambleCount =
        normalized === " "
          ? 8 + Math.floor(Math.random() * 8)
          : 25 + Math.floor(Math.random() * 15);

      const runStep = (i) => {
        const isLast = i === scrambleCount;
        const ch = isLast
          ? normalized
          : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))];

        const newAccent = isLast
          ? null
          : Math.random() < 0.2
            ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
            : null;

        setPrev(curRef.current);
        setPrevAccent(accentRef.current);
        curRef.current = ch;
        accentRef.current = newAccent;
        setCurrent(ch);
        setAccent(newAccent);
        setFlipId((n) => n + 1);

        if (!isLast) {
          stepTimer.current = setTimeout(() => runStep(i + 1), stepMs);
        }
      };

      startTimer.current = setTimeout(() => runStep(1), delay);

      return () => {
        if (startTimer.current) clearTimeout(startTimer.current);
        if (stepTimer.current) clearTimeout(stepTimer.current);
        startTimer.current = null;
        stepTimer.current = null;
        tgtRef.current = null;
      };
    }, [target, delay, stepMs]);

    const show = current === " " ? "\u00A0" : current;
    const showPrev = prev === " " ? "\u00A0" : prev;

    const textCx =
      "absolute inset-x-0 flex select-none items-center justify-center font-mono font-bold tracking-wide";
    const topBg = accent?.top ?? "bg-pink-100/60";
    const bottomBg = accent?.bottom ?? "bg-pink-100/40";
    const textColor = accent?.text ?? "text-pink-800";

    const flapTopBg = prevAccent?.top ?? "bg-pink-50";
    const flapTextColor = prevAccent?.text ?? "text-pink-700";

    const bottomDelay = flipDuration * 0.5;

    return (
      <div className="flex aspect-[3/6] flex-col overflow-hidden rounded-[4px] border border-pink-200/70 md:border-2">
        <div className="relative flex-1" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          {/* Split line markers */}
          <div className="absolute inset-0 z-40 hidden flex-row items-center justify-center md:flex">
            <div className="h-1/2 w-px rounded-tr-sm rounded-br-sm bg-pink-200/50" />
            <div className="flex h-px flex-1 bg-pink-200/50" />
            <div className="h-1/2 w-px rounded-tl-sm rounded-bl-sm bg-pink-200/50" />
          </div>

          {/* Static top – new character top half */}
          <div className={cn("absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden rounded-t-[3px]", topBg)}>
            <div className={cn(textCx, textColor, "top-0 h-[200%]")} style={CELL_TEXT_STYLE}>
              {show}
            </div>
          </div>

          {/* Static bottom – new character bottom half */}
          <div className={cn("absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden rounded-b-[3px]", bottomBg)}>
            <div className={cn(textCx, textColor, "bottom-0 h-[200%]")} style={CELL_TEXT_STYLE}>
              {show}
            </div>
            {flipId > 0 && (
              <motion.div
                key={`s${flipId}`}
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.8),transparent_60%)]"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: flipDuration * 1.3, ease: "easeOut" }}
              />
            )}
          </div>

          {/* Flipping top flap – old character top half, drops down */}
          {flipId > 0 && (
            <motion.div
              key={flipId}
              className={cn(
                "absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden rounded-t-[3px]",
                flapTopBg
              )}
              style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -100 }}
              transition={{
                duration: flipDuration,
                ease: [0.55, 0.055, 0.675, 0.19],
              }}
            >
              <div className={cn(textCx, flapTextColor, "top-0 h-[200%]")} style={CELL_TEXT_STYLE}>
                {showPrev}
              </div>
              <motion.div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.5))]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: flipDuration }}
              />
            </motion.div>
          )}

          {/* Flipping bottom flap – new character bottom half, rises up */}
          {flipId > 0 && (
            <motion.div
              key={`b${flipId}`}
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden rounded-b-[3px]",
                bottomBg
              )}
              style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{
                duration: flipDuration * 0.85,
                delay: bottomDelay,
                ease: [0.33, 1.55, 0.64, 1],
              }}
            >
              <div className={cn(textCx, textColor, "bottom-0 h-[200%]")} style={CELL_TEXT_STYLE}>
                {show}
              </div>
              <motion.div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0),rgba(255,255,255,0.4))]"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: flipDuration * 0.85,
                  delay: bottomDelay,
                }}
              />
            </motion.div>
          )}

          {/* Split line */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-[0.5px] bg-pink-200/80" />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.target === nextProps.target &&
    prevProps.delay === nextProps.delay &&
    prevProps.stepMs === nextProps.stepMs &&
    prevProps.flipDuration === nextProps.flipDuration
);

// ── Color Tile ────────────────────────────────────────────────────────
const ColorCell = React.memo(function ColorCell({ color }) {
  return (
    <div
      className="aspect-[3/5] rounded-[3px] border border-pink-200/60"
      style={{ backgroundColor: color }}
    />
  );
});

// ── Row Parser ────────────────────────────────────────────────────────
function parseRow(row) {
  const cells = [];
  let i = 0;
  while (i < row.length) {
    if (row[i] === "{" && i + 2 < row.length && row[i + 2] === "}") {
      const code = row.substring(i, i + 3);
      if (COLOR_MAP[code]) {
        cells.push({ type: "color", hex: COLOR_MAP[code] });
        i += 3;
        continue;
      }
    }
    cells.push({ type: "char", value: row[i] });
    i++;
  }
  return cells;
}

// ── Word Wrap ─────────────────────────────────────────────────────────
function wrapParagraph(paragraph, maxCols) {
  const lines = [];
  const words = paragraph.split(/[ \t]+/).filter(Boolean);
  let currentLine = "";

  for (const word of words) {
    if (word.length > maxCols) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word.slice(0, maxCols));
      continue;
    }

    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxCols) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

function wrapText(input, maxCols) {
  return input
    .split("\n")
    .flatMap((paragraph) =>
      paragraph.trim() === "" ? [""] : wrapParagraph(paragraph, maxCols)
    );
}

// ── Main TextFlippingBoard Component ──────────────────────────────────
export function TextFlippingBoard({ rows, text, className, duration = BASE_TOTAL_S }) {
  const scale = duration / BASE_TOTAL_S;
  const colDelay = BASE_COL_DELAY * scale;
  const rowDelay = BASE_ROW_DELAY * scale;
  const stepMs = BASE_STEP_MS * scale;
  const flipDur = Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale));

  const board = useMemo(() => {
    const grid = Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLS }, () => ({
        type: "char",
        value: " ",
      }))
    );

    if (text) {
      const lines = wrapText(text, BOARD_COLS).slice(0, BOARD_ROWS);
      const startRow = Math.max(0, Math.floor((BOARD_ROWS - lines.length) / 2));
      lines.forEach((line, i) => {
        const row = startRow + i;
        if (row >= BOARD_ROWS) return;
        const parsed = parseRow(line);
        const startCol = Math.max(0, Math.floor((BOARD_COLS - parsed.length) / 2));
        parsed.forEach((cell, c) => {
          if (startCol + c < BOARD_COLS) {
            grid[row][startCol + c] = cell;
          }
        });
      });
    } else if (rows) {
      rows.forEach((row, r) => {
        if (r >= BOARD_ROWS) return;
        const parsed = parseRow(row);
        parsed.forEach((cell, c) => {
          if (c < BOARD_COLS) {
            grid[r][c] = cell;
          }
        });
      });
    }

    return grid;
  }, [rows, text]);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-2xl rounded-xl bg-pink-50/20 p-2 shadow-sm border border-pink-200/35 backdrop-blur-md",
        className
      )}
    >
      <div
        className="grid gap-[2px] md:gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) =>
            cell.type === "color" ? (
              <ColorCell key={`${r}-${c}`} color={cell.hex} />
            ) : (
              <FlapCell
                key={`${r}-${c}`}
                target={cell.value}
                delay={c * colDelay + r * rowDelay}
                stepMs={stepMs}
                flipDuration={flipDur}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
