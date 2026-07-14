import { useState } from "react";
import PageTransition from "./components/PageTransition";
import PageArrows from "./components/PageArrows";
import Home from "./pages/Home";
import OurFirsts from "./pages/OurFirsts";
import OurTrips from "./pages/OurTrips";
import OurTraditions from "./pages/OurTraditions";
import WhoDoYouThink from "./pages/WhoDoYouThink";
import ClosingNote from "./pages/ClosingNote";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "firsts", label: "Our Firsts" },
  { id: "trips", label: "Our Trips" },
  { id: "traditions", label: "Our Traditions" },
  { id: "quiz", label: "Who Do You Think" },
  { id: "closing", label: "One Last Thing" },
];

export default function App() {
  const [index, setIndex] = useState(0);

  const goTo = (next) => {
    if (next === index) return;
    setIndex(next);
  };

  const renderPage = () => {
    switch (PAGES[index].id) {
      case "home":
        return <Home />;
      case "firsts":
        return <OurFirsts />;
      case "trips":
        return <OurTrips />;
      case "traditions":
        return <OurTraditions />;
      case "quiz":
        return <WhoDoYouThink />;
      case "closing":
        return <ClosingNote />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-maroon-deep sm:p-8">
      <div
        className="relative h-dvh w-full overflow-hidden sm:h-[860px] sm:max-h-[92vh] sm:w-[420px] sm:rounded-[36px] sm:border-[10px] sm:border-maroon-deep sm:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.03), transparent 60%)",
        }}
      >
        <PageTransition pageKey={PAGES[index].id}>
          {renderPage()}
        </PageTransition>

        <PageArrows
          onPrev={() => goTo(index - 1)}
          onNext={() => goTo(index + 1)}
          disablePrev={index === 0}
          disableNext={index === PAGES.length - 1}
        />
      </div>
    </div>
  );
}
