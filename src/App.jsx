import { useRef, useState } from "react";
import PageTransition from "./components/PageTransition";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import OurFirsts from "./pages/OurFirsts";
import OurTrips from "./pages/OurTrips";
import OurTraditions from "./pages/OurTraditions";
import WhoDoYouThink from "./pages/WhoDoYouThink";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "firsts", label: "Our Firsts" },
  { id: "trips", label: "Our Trips" },
  { id: "traditions", label: "Our Traditions" },
  { id: "quiz", label: "Who Do You Think" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const direction = useRef(1);

  const goTo = (next) => {
    if (next === index) return;
    direction.current = next > index ? 1 : -1;
    setIndex(next);
  };

  const renderPage = () => {
    switch (PAGES[index].id) {
      case "home":
        return <Home onNext={() => goTo(1)} />;
      case "firsts":
        return <OurFirsts onNext={() => goTo(2)} />;
      case "trips":
        return <OurTrips onNext={() => goTo(3)} />;
      case "traditions":
        return <OurTraditions onNext={() => goTo(4)} />;
      case "quiz":
        return <WhoDoYouThink />;
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
        <PageTransition pageKey={PAGES[index].id} direction={direction.current}>
          {renderPage()}
        </PageTransition>

        <BottomNav pages={PAGES} activeIndex={index} onSelect={goTo} />
      </div>
    </div>
  );
}
