import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { quiz } from "../data/content";

const REACTIONS = [
  "noted, and slightly suspicious 👀",
  "interesting choice...",
  "the tea has been spilled ☕",
  "writing this down forever",
  "okay valid, actually",
];

export default function WhoDoYouThink() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);

  const finished = step >= quiz.length;
  const current = quiz[step];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setJustSubmitted(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnswer("");
      setJustSubmitted(false);
    }, 900);
  };

  return (
    <PageShell eyebrow="a little game for you" title="Who Do You Think?">
      <p className="mx-auto mb-8 max-w-xs text-center font-body text-sm text-ink/70">
        No wrong answers here — just you and 3 years of evidence.
      </p>

      <div className="relative mx-auto flex min-h-[300px] w-full max-w-xs flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.form
              key={current.id}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -24, rotate: 2 }}
              transition={{ duration: 0.4 }}
              className="w-full rounded-2xl border-2 border-maroon/25 bg-blush p-6 text-center shadow-[0_16px_28px_-12px_rgba(58,38,32,0.5)]"
            >
              <span className="mb-3 inline-block rounded-full bg-maroon/90 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-paper">
                {step + 1} / {quiz.length}
              </span>
              <p className="mb-5 font-display text-xl font-semibold text-maroon">
                {current.question}
              </p>

              <AnimatePresence mode="wait">
                {justSubmitted ? (
                  <motion.p
                    key="reaction"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-hand text-lg text-rose"
                  >
                    {REACTIONS[step % REACTIONS.length]}
                  </motion.p>
                ) : (
                  <motion.div key="input" className="flex flex-col items-center gap-3">
                    <input
                      autoFocus
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type a name..."
                      className="w-full rounded-full border-2 border-maroon/30 bg-paper px-4 py-2.5 text-center font-hand text-lg text-ink outline-none placeholder:text-ink/40 focus:border-rose"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-maroon px-6 py-2 font-display text-sm font-semibold text-paper shadow-md"
                    >
                      Lock it in
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          ) : (
            <motion.div
              key="outro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="text-4xl">🎂</span>
              <p className="font-script text-3xl text-maroon">
                Happy 21st, Rashika
              </p>
              <p className="max-w-[240px] font-hand text-lg text-ink/75">
                Here's to the next chapter — I'm so glad I get to be there for it,
                like every one before.
              </p>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-2 rounded-full border border-maroon/40 px-5 py-2 font-display text-xs font-semibold uppercase tracking-wide text-maroon"
              >
                play again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
