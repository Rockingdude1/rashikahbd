// Placeholder content — swap image/video URLs and copy for the real thing.
// Images: picsum.photos placeholders. Video: public sample clip for preview only.

export const PLACEHOLDER_VIDEO =
  "https://www.w3schools.com/html/mov_bbb.mp4";

const img = (seed, w = 700, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const firsts = [
  {
    id: "first-trip",
    label: "Our first trip",
    stamp: "01",
    caption: "The Jaipur trip none of us planned properly, and it was perfect anyway.",
    media: { type: "image", src: img("rashika-first-trip") },
  },
  {
    id: "first-fight",
    label: "Our first fight",
    stamp: "02",
    caption: "Over something so silly we still can't say it with a straight face.",
    media: { type: "image", src: img("rashika-first-fight") },
  },
  {
    id: "first-concert",
    label: "First concert",
    stamp: "03",
    caption: "Screaming lyrics neither of us fully knew, front row anyway.",
    media: { type: "video", src: PLACEHOLDER_VIDEO },
  },
  {
    id: "first-allnighter",
    label: "First all-nighter",
    stamp: "04",
    caption: "3am, one charger between us, and way too many opinions.",
    media: { type: "image", src: img("rashika-allnighter") },
  },
  {
    id: "first-gift",
    label: "First gift exchange",
    stamp: "05",
    caption: "You still have it. I still can't believe you kept it.",
    media: { type: "image", src: img("rashika-first-gift") },
  },
];

export const trips = [
  {
    id: "jaipur",
    name: "Jaipur",
    tagline: "Where it all began",
    year: "2023",
    video: PLACEHOLDER_VIDEO,
    photos: [img("jaipur-1"), img("jaipur-2"), img("jaipur-3")],
    note: "Pink walls, kulfi at 11pm, and getting hopelessly lost near Hawa Mahal.",
  },
  {
    id: "tirthan",
    name: "Tirthan Valley",
    tagline: "The trip that needed no wifi",
    year: "2023",
    video: PLACEHOLDER_VIDEO,
    photos: [img("tirthan-1"), img("tirthan-2"), img("tirthan-3")],
    note: "River sounds, bonfire smoke in our hair for a week straight.",
  },
  {
    id: "vrindavan",
    name: "Vrindavan",
    tagline: "The unexpectedly peaceful one",
    year: "2024",
    video: PLACEHOLDER_VIDEO,
    photos: [img("vrindavan-1"), img("vrindavan-2"), img("vrindavan-3")],
    note: "Temple bells at sunrise and the best kachori of our lives.",
  },
  {
    id: "mussoorie",
    name: "Mussoorie",
    tagline: "The one with all the fog",
    year: "2024",
    video: PLACEHOLDER_VIDEO,
    photos: [img("mussoorie-1"), img("mussoorie-2"), img("mussoorie-3")],
    note: "Couldn't see two feet ahead, laughed the entire way down Camel's Back Road.",
  },
  {
    id: "goa",
    name: "Goa",
    tagline: "The one we still talk about",
    year: "2025",
    video: PLACEHOLDER_VIDEO,
    photos: [img("goa-1"), img("goa-2"), img("goa-3")],
    note: "Sunburnt, salty, and refusing to let the trip end.",
  },
];

export const traditions = [
  {
    id: "secret-santa",
    name: "Secret Santa",
    highlight: "You somehow guessed it was me within five minutes, every single year.",
    media: [{ type: "image", src: img("secret-santa") }],
  },
  {
    id: "holi",
    name: "Holi",
    highlight: "The one day a year we ruin our clothes on purpose and love it.",
    media: [
      { type: "image", src: img("holi-1") },
      { type: "video", src: PLACEHOLDER_VIDEO },
    ],
  },
  {
    id: "concerts",
    name: "Concerts",
    highlight: "Losing our voices together has basically become the tradition.",
    media: [{ type: "image", src: img("concert-1") }],
  },
  {
    id: "freshers",
    name: "Freshers",
    highlight: "We walked in as strangers to everyone else, not to each other.",
    media: [{ type: "image", src: img("freshers-1") }],
  },
  {
    id: "clubs",
    name: "Clubs",
    highlight: "Terrible dance moves, worse selfies, best nights.",
    media: [
      { type: "image", src: img("clubs-1") },
      { type: "image", src: img("clubs-2") },
    ],
  },
];

export const quiz = [
  {
    id: "q1",
    question: "Who's more likely to cry during a sad movie?",
  },
  {
    id: "q2",
    question: "Who takes longer to reply to texts?",
  },
  {
    id: "q3",
    question: "Who's the designated trip planner?",
  },
  {
    id: "q4",
    question: "Who'd survive longer without their phone?",
  },
  {
    id: "q5",
    question: "Who's more likely to fall asleep first on a road trip?",
  },
];
