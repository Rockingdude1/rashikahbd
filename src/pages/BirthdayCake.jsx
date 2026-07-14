import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell";

const CANDLE_COUNT = 5;
// A blow reads as loud, sustained broadband noise. We track the RMS of the
// live mic signal every animation frame and only trigger once it stays
// above BLOW_THRESHOLD for BLOW_HOLD_MS straight — long enough to rule out
// a cough, a tap on the mic, or background noise.
const BLOW_THRESHOLD = 32; // 0-128 scale
const BLOW_HOLD_MS = 350;

export default function BirthdayCake() {
  const [micState, setMicState] = useState("idle"); // idle | requesting | listening | denied | error
  const [level, setLevel] = useState(0);
  const [blownOut, setBlownOut] = useState(false);
  const [cut, setCut] = useState(false);

  const audioCtxRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const aboveSinceRef = useRef(null);

  const stopListening = () => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();
    streamRef.current = null;
    audioCtxRef.current = null;
  };

  useEffect(() => stopListening, []);

  const startListening = async () => {
    setMicState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);
      setMicState("listening");

      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sumSquares = 0;
        for (let i = 0; i < data.length; i++) {
          const centered = data[i] - 128;
          sumSquares += centered * centered;
        }
        const rms = Math.sqrt(sumSquares / data.length);
        setLevel(rms);

        if (rms > BLOW_THRESHOLD) {
          if (aboveSinceRef.current == null) aboveSinceRef.current = performance.now();
          if (performance.now() - aboveSinceRef.current > BLOW_HOLD_MS) {
            setBlownOut(true);
            stopListening();
            return;
          }
        } else {
          aboveSinceRef.current = null;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      setMicState("denied");
    }
  };

  useEffect(() => {
    if (!blownOut) return;
    const timer = setTimeout(() => setCut(true), 900);
    return () => clearTimeout(timer);
  }, [blownOut]);

  return (
    <PageShell eyebrow="make a wish" title="Blow Out The Candles">
      <p className="mx-auto mb-8 max-w-xs text-center font-body text-sm text-ink/70">
        {micState === "listening" && !blownOut
          ? "Take a breath, and blow into the mic."
          : "Let the mic hear you blow the candles out."}
      </p>

      <div className="relative mx-auto flex h-72 w-64 items-end justify-center">
        {/* plate shadow */}
        <div className="absolute bottom-6 h-6 w-56 rounded-[50%] bg-black/15 blur-sm" />

        <div className="relative">
          {/* candles */}
          <div className="relative z-20 mb-[-4px] flex justify-center gap-3">
            {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
              <div key={i} className="relative flex w-2 flex-col items-center">
                <AnimatePresence>
                  {!blownOut && (
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.2, y: 6 }}
                      transition={{ duration: 0.4 }}
                      animate={{
                        scaleY: [1, 1.15, 0.95, 1.1, 1],
                        opacity: [1, 0.9, 1, 0.92, 1],
                      }}
                      style={{ transformOrigin: "bottom" }}
                      className="h-4 w-2.5 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100"
                    />
                  )}
                </AnimatePresence>
                {blownOut && (
                  <motion.div
                    initial={{ opacity: 0.6, y: 0, scale: 0.6 }}
                    animate={{ opacity: 0, y: -18, scale: 1.4 }}
                    transition={{ duration: 1.1, delay: i * 0.05 }}
                    className="h-2 w-2 rounded-full bg-ink/30 blur-[1px]"
                  />
                )}
                <div className="h-6 w-1 bg-paper" />
              </div>
            ))}
          </div>

          {/* cake */}
          <div className="relative z-10 h-32 w-56 overflow-hidden rounded-[16px] bg-maroon shadow-[0_16px_30px_-12px_rgba(58,38,32,0.6)]">
            <div className="absolute inset-x-0 top-0 h-5 bg-blush" />
            <div
              className="absolute inset-x-0 top-3 h-3 bg-blush"
              style={{
                maskImage:
                  "repeating-radial-gradient(circle at 8px 0, transparent 0 5px, black 5px 6px)",
                WebkitMaskImage:
                  "repeating-radial-gradient(circle at 8px 0, transparent 0 5px, black 5px 6px)",
              }}
            />

            <AnimatePresence>
              {cut && (
                <motion.div
                  key="knife"
                  initial={{ x: -120, y: -60, rotate: -35, opacity: 0 }}
                  animate={{ x: 40, y: 80, rotate: -35, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.45, 0, 0.2, 1] }}
                  className="absolute left-1/2 top-1/2 z-30 h-40 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-paper via-paper to-paper-shadow shadow-[0_0_6px_rgba(0,0,0,0.4)]"
                />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={cut ? { x: 26, y: 10, rotate: 8 } : { x: 0, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 z-20 w-16 bg-maroon-deep"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 30% 100%)" }}
            >
              <div className="absolute inset-x-0 top-0 h-5 bg-blush" />
              <div className="absolute inset-0 flex items-end justify-center pb-2">
                <span className="text-[10px]">🍰</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {cut && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xs text-center font-hand text-2xl text-maroon/80"
          >
            happy birthday, Rashika 🎂
          </motion.p>
        )}
      </AnimatePresence>

      {!blownOut && (
        <div className="mt-8 flex flex-col items-center gap-3">
          {micState === "idle" && (
            <button
              type="button"
              onClick={startListening}
              className="rounded-full bg-maroon px-6 py-2.5 font-display text-sm font-semibold text-paper shadow-md"
            >
              🎤 Enable mic & blow
            </button>
          )}

          {micState === "requesting" && (
            <p className="font-hand text-lg text-maroon/70">asking for mic access...</p>
          )}

          {micState === "listening" && (
            <div className="h-2 w-40 overflow-hidden rounded-full bg-maroon/15">
              <div
                className="h-full rounded-full bg-maroon transition-[width] duration-75"
                style={{ width: `${Math.min(100, (level / BLOW_THRESHOLD) * 100)}%` }}
              />
            </div>
          )}

          {micState === "denied" && (
            <div className="text-center">
              <p className="mb-2 max-w-xs font-body text-sm text-ink/70">
                Mic access was blocked — you'll need to allow it to blow out the candles.
              </p>
              <button
                type="button"
                onClick={startListening}
                className="rounded-full border border-maroon/40 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-maroon"
              >
                try again →
              </button>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}
