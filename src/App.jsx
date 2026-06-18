import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Gallery from "./components/Gallery";
import Games from "./components/Games";
import LoveLetter from "./components/LoveLetter";
import Reward from "./components/Reward";
import Welcome from "./components/Welcome";
import Angry from "./components/Angry";
import LineTransition from "./components/LineTransition";
import "./App.css";

const routeFlow = [
  { path: "/", key: "welcome", label: "Opening" },
  { path: "/games", key: "games", label: "Questions" },
  { path: "/reward", key: "reward", label: "Reward" },
  { path: "/dashboard", key: "dashboard", label: "Dashboard" },
  { path: "/gallery", key: "gallery", label: "Gallery" },
  { path: "/love-letter", key: "love-letter", label: "Love Letter" },
];

const storageKey = "birthday-route-progress";

function BirthdayRouter() {
  const location = useLocation();
  const [furthestStep, setFurthestStep] = useState(() => {
    const saved = window.localStorage.getItem(storageKey);
    const parsed = Number(saved);
    return Number.isFinite(parsed) ? parsed : 0;
  });

  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionIndices, setTransitionIndices] = useState({ from: 0, to: 0 });

  useEffect(() => {
    window.localStorage.setItem(storageKey, String(furthestStep));
  }, [furthestStep]);

  useEffect(() => {
    const fromIdx = routeFlow.findIndex((r) => r.path === displayLocation.pathname);
    const toIdx = routeFlow.findIndex((r) => r.path === location.pathname);

    // If both are valid, distinct steps in the flow, play the line transition animation
    if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
      setTransitionIndices({ from: fromIdx, to: toIdx });
      setIsTransitioning(true);
    } else {
      // Direct jump (e.g. /angry or initial load)
      setDisplayLocation(location);
    }
  }, [location]);

  const handleTransitionComplete = () => {
    setDisplayLocation(location);
    setIsTransitioning(false);
  };

  const currentIndex = routeFlow.findIndex((route) => route.path === location.pathname);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const canAccess = safeIndex <= furthestStep;

  const markComplete = (path) => {
    const index = routeFlow.findIndex((route) => route.path === path);
    if (index === -1) {
      return;
    }

    setFurthestStep((current) => Math.max(current, index + 1));
  };

  const progressItems = routeFlow.map((route, index) => ({
    ...route,
    unlocked: index <= furthestStep,
    active: location.pathname === route.path,
  }));

  if (!canAccess) {
    return <Navigate to={routeFlow[furthestStep].path} replace />;
  }

  return (
    <>
      <Routes location={displayLocation}>
        <Route
          path="/"
          element={
            <Welcome
              progressItems={progressItems}
              onComplete={() => markComplete("/")}
            />
          }
        />
        <Route
          path="/games"
          element={
            <Games
              progressItems={progressItems}
              onComplete={() => markComplete("/games")}
            />
          }
        />
        <Route
          path="/reward"
          element={
            <Reward
              progressItems={progressItems}
              onComplete={() => markComplete("/reward")}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              progressItems={progressItems}
              onComplete={() => markComplete("/dashboard")}
            />
          }
        />
        <Route
          path="/gallery"
          element={
            <Gallery
              progressItems={progressItems}
              onComplete={() => markComplete("/gallery")}
            />
          }
        />
        <Route
          path="/love-letter"
          element={<LoveLetter progressItems={progressItems} />}
        />
        <Route
          path="/angry"
          element={<Angry />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LineTransition
        isTransitioning={isTransitioning}
        fromIndex={transitionIndices.from}
        toIndex={transitionIndices.to}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <BirthdayRouter />
    </BrowserRouter>
  );
}

export default App;
