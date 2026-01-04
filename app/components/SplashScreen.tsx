"use client";

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (visible) {
      document.body.style.overflow = "hidden";
      t = setTimeout(() => {
        document.body.style.overflow = "";
        setVisible(false);
      }, 1800);
    }

    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden">
      <div className="flex flex-col items-center gap-0">
        <div className="w-100 h-100 rounded-2xl bg-white flex items-center justify-center">
          <SignalWave />
        </div>
      </div>
    </div>
  );
}
function SignalWave() {
  return (
    <svg
      width="96"
      height="48"
      viewBox="0 0 120 60"
      fill="none"
      className="stroke-black"
    >
      <path
        d="M5 30
           H32
           L44 22
           L58 38
           L74 14
           L90 30
           H115"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="signal-path"
      />
    </svg>
  );
}
