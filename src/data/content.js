// Placeholder content — swap image/video URLs and copy for the real thing.
// Images: picsum.photos placeholders. Video: public sample clip for preview only.

import hero2023 from "../assets/media/hero_2023.jpeg";
import hero2024 from "../assets/media/hero_2024.jpeg";
import hero2025 from "../assets/media/hero_2025.jpeg";
import hero2026 from "../assets/media/hero_2026.jpeg";

import firstTrip from "../assets/media/first_trip.png";
import firstOuting from "../assets/media/first_outing.jpeg";
import firstParty from "../assets/media/first_party.jpeg";
import firstConcert from "../assets/media/first_concert.mp4";
import firstReel from "../assets/media/first_reel.mp4";
import firstChallenge from "../assets/media/first_challenge.mp4";
import firstIshq from "../assets/media/first_ishq.mp4";
import firstWedding from "../assets/media/first_wedding.jpeg";
import firstChedna from "../assets/media/first_chedna.mp4";
import firstVape from "../assets/media/first_vape.mp4";
import firstPass from "../assets/media/first_pass.mp4";

import jaipurVideo from "../assets/media/jaipur_video.mp4";
import jaipurPhoto1 from "../assets/media/jaipur_photo_1.png";
import jaipurPhoto2 from "../assets/media/jaipur_photo_2.png";
import jaipurPhoto3 from "../assets/media/jaipur_photo_3.png";

import tirthanVideo from "../assets/media/tirthan_video.mp4";
import tirthanPhoto1 from "../assets/media/tirthan_photo_1.png";
import tirthanPhoto2 from "../assets/media/tirthan_photo_2.png";
import tirthanPhoto3 from "../assets/media/tirthan_photo_3.png";

import mussoorieVideo from "../assets/media/mussorie_video.mp4";
import mussooriePhoto1 from "../assets/media/mussorie_photo_1.png";
import mussooriePhoto2 from "../assets/media/mussorie_photo_2.png";
import mussooriePhoto3 from "../assets/media/musoorie_photo_3.png";

import goaVideo from "../assets/media/goa_video.mp4";
import goaPhoto1 from "../assets/media/goa_photo_1.png";
import goaPhoto2 from "../assets/media/goa_photo_2.png";
import goaPhoto3 from "../assets/media/goa_photo_3.png";

export const homePhotos = [
  { year: "2023", src: hero2023 },
  { year: "2024", src: hero2024 },
  { year: "2025", src: hero2025 },
  { year: "2026", src: hero2026 },
];

export const firsts = [
  {
    id: "first-trip",
    label: "Our first trip",
    stamp: "01",
    caption: "The Jaipur trip none of us planned properly, and it was perfect anyway.",
    media: { type: "image", src: firstTrip, aspect: 352 / 640 },
  },
  {
    id: "first-outing",
    label: "First outing",
    stamp: "02",
    caption: "the day you got lucky!",
    media: { type: "image", src: firstOuting, aspect: 3088 / 2316 },
  },
  {
    id: "first-party",
    label: "First party",
    stamp: "03",
    caption: "Sanvi fell.",
    media: { type: "image", src: firstParty, aspect: 3024 / 4032 },
  },
  {
    id: "first-concert",
    label: "First concert",
    stamp: "04",
    caption: "When we just started to think that Neal seems like a good guy.",
    media: { type: "video", src: firstConcert, aspect: 480 / 848 },
  },
  {
    id: "first-reel",
    label: "First reel",
    stamp: "05",
    caption: "Filmed fifteen times until it looked effortless.",
    media: { type: "video", src: firstReel, aspect: 384 / 832 },
  },
  {
    id: "first-challenge",
    label: "First challenge",
    stamp: "06",
    caption: "17 FUCKING KATORIS!!!",
    media: { type: "video", src: firstChallenge, aspect: 1024 / 576 },
  },
  {
    id: "first-ishq",
    label: "First ishq era",
    stamp: "07",
    caption: "A revelation for Aayush",
    media: { type: "video", src: firstIshq, aspect: 544 / 960 },
  },
  {
    id: "first-wedding",
    label: "First wedding",
    stamp: "08",
    caption: "The photo none of us remembers.",
    media: { type: "image", src: firstWedding, aspect: 576 / 1280 },
  },
  {
    id: "first-chedna",
    label: "First chedna",
    stamp: "09",
    caption: "the goons were going to climb 208 first ofc.",
    media: { type: "video", src: firstChedna, aspect: 480 / 848 },
  },
  {
    id: "first-vape",
    label: "First (and last) puff",
    stamp: "10",
    caption: "Coughed, regretted it, never again — allegedly.",
    media: { type: "video", src: firstVape, aspect: 848 / 480 },
  },
  {
    id: "first-pass",
    label: "First pass",
    stamp: "11",
    caption: "cute.",
    media: { type: "video", src: firstPass, aspect: 1280 / 720 },
  },
];

export const trips = [
  {
    id: "jaipur",
    name: "Jaipur",
    tagline: "Where it all began",
    year: "2023",
    video: jaipurVideo,
    photos: [jaipurPhoto1, jaipurPhoto2, jaipurPhoto3],
    note: "Pink walls, kulfi at 11pm, and getting hopelessly lost near Hawa Mahal.",
  },
  {
    id: "tirthan",
    name: "Tirthan Valley",
    tagline: "The trip that needed no wifi",
    year: "2023",
    video: tirthanVideo,
    photos: [tirthanPhoto1, tirthanPhoto2, tirthanPhoto3],
    note: "River sounds, bonfire smoke in our hair for a week straight.",
  },
  {
    id: "mussoorie",
    name: "Mussoorie",
    tagline: "The one with all the fog",
    year: "2024",
    video: mussoorieVideo,
    photos: [mussooriePhoto1, mussooriePhoto2, mussooriePhoto3],
    note: "Couldn't see two feet ahead, laughed the entire way down Camel's Back Road.",
  },
  {
    id: "goa",
    name: "Goa",
    tagline: "The one we still talk about",
    year: "2025",
    video: goaVideo,
    photos: [goaPhoto1, goaPhoto2, goaPhoto3],
    note: "Sunburnt, salty, and refusing to let the trip end.",
  },
];

export const traditions = [
  {
    id: "secret-santa",
    name: "Secret Santa",
    highlight:
      "From the times that we used to gift each other gifts and some people cheated by using their points while others cheated by knowing who is giving gifts to whom, to the times when you gave such \"heartfelt\" gifts to Kanika that she didn't even use. Of course, we're gonna continue those traditions, ofc we'll keep sending those cutesy gifts to each other but after all, we'll always miss having the big big 6 in one pizza together, as this was the tradition where we had the fun of having that pizza together and coincidentally enough, that pizza stayed with us till one of the very last days of us being together.",
  },
  {
    id: "holi",
    name: "Holi",
    highlight:
      "Ahh, as always, the favourite memory is always the food, be it gunjiyan or that thandai, but then we got introduced to a new concept: BHAANG. Trust me, it was not even known to humankind that something can hit you after 8 fucking hours, but one fact is def true: you can experience the most random shit ever — from Sanvi getting validation about her jokes, to watching a movie jisme kuch bhi ho raha hai. While someone went to do wall painting, all three of us were painting the floors with ourselves (this is Sanvi, and I had to crack a bad joke here).",
  },
  {
    id: "concerts",
    name: "Concerts",
    highlight:
      "Oh damn, this is gonna be a fun one. I know all four of us have never been to a concert together — by the way, this should def be on our bucket list!!! — but when remembering concerts, I can just remember so many things. Who thought that a shitty DTU concert could turn into such a fun night? Or who even thought that we'll grow to WORSHIP PRATEEK FUCKING KUHAD, or that sufi concerts can be so fun and make us shop so much, or even that we can only remember Sunidhi Chauhan as our Indian Taylor Swift. Ofc we also remember people that only go to concerts for videos (not naming him uhm uhm), but how can we forget being thrown water bottles at a place like this.",
  },
  {
    id: "freshers",
    name: "Freshers",
    highlight:
      "I asked Tanisha to write her best memory about freshers and the only two words she could remember was \"SANVI FELL.\" Brother :)) But one thing I can't forget is how Rashika used to navigate us to all the SRCC people and we used to make out who's dating who and who is this Aditya Rathi who every girl is falling for, and most importantly, we understood the socialising power of Mr. NDP. Yes, and speaking about this day, how can we forget how Shireesh was hitting on Tanisha and how we are such dumbfucks that we agreed to those mfs. But trust me, if the ending wouldn't have been bad, that would've been my favourite story to tell my kids.",
  },
  {
    id: "clubs",
    name: "Clubs",
    highlight:
      "Let us take you back to the first clubbing with the cool gang we did. Y'know, let's rather remember the dance we did, the sunrise we saw, and the cute picture Vedant clicked of the three of us. Let's remember Hammerz, let's remember Purple Martini, but above all, let's remember and thank Miss Rashika Ghiraiya for always, always taking care of us when we were bhand.",
  },
];

export const closingNote = [
  {
    id: "note-1",
    stamp: "01",
    label: "from Deepika",
    message:
      "happy birthdayy rashikkkka!!\n\ncan't believe its been almost 4 years now. so many misunderstandings along the way, but now I know, this one's gonna last, we're stuck for life.\n\nI will forever be grateful for the time when Sanvi and Rashika were both not there and we bonded. Bonded on so many things and from that day, you somehow became my comfort person. Anytime I felt bad, I would come to you to vent — be it about boys, other friends, family, college or Kanika. And you always listened, next day exam ho agar tabhi bhi mana nhi krti thi. That one night on the terrace where we tried new food and almost fell sick (iykyk) and mam came and I was suddenly alright but you were still sick, it was very funny 🤣\n\nI will always cherish that, probably gonna tell my kids that.\n\nI will miss seeing you in cafeteria upon entering (kyuki tum hamesha wahi rehti thi) kabhi bhi jao. Your creativity with food omg oolalaa!!\n\nThankyou for everything. You have the kindest soul. Oh also, thankyou for the perfect liner wing always. Thankyou for taking care of me when I fell sick. Thankyou for listening. Thankyou for never judging. Thankyou for just being there.\n\nyou say you dont want kids, bht trust me you'll be the best mom ever, cus you have the mom instinct — the best one.\n\nI love you so much and I'm so grateful that you're my friend.",
  },
  {
    id: "note-2",
    stamp: "02",
    label: "from Sanvi",
    message:
      "Hii Rashika,\n\nA very happy birthday to you.\n\nI'm honestly very skeptical in what to say to you. Because there hasn't been a day since the past 2 years where I haven't talked to you. I miss you. Every day. Every moment I feel like taking a break from work, I feel like going to your room and talking to you. I don't want to make this an emo moment but I'm still not over the fact that we're not living together anymore. I do not have a lot of time, so hear me out. I know I tell you this every day, but I'm gonna say it again. I'm there for you, and I know that you'll do wonders in life. I know that you're gonna make me so proud and I know that the reasons you hate yourself today, will be your motivators to achieve everything in life.\n\nHere's to a new beginning, a new you, with more positivity and self love🤍",
  },
  {
    id: "note-3",
    stamp: "03",
    label: "from Tanisha",
    message:
      "Happy birthday rashikaa🥳🥳 You are the kindest person I know. We have been through a lot of ups and downs but still we are standing here next to each other. I really cherish the time spent together from playing games to watching Splitsvilla. I love you. To be continued….",
  },
];

export const quiz = [
  {
    id: "q1",
    question: "Who's more likely to cry during a sad movie?",
  },
  {
    id: "q2",
    question: "Who'd survive longer without their phone?",
  },
  {
    id: "q3",
    question: "Who's most likely to show up an hour late and act like it's normal?",
  },
  {
    id: "q4",
    question: "Who'd survive a horror movie the longest?",
  },
  {
    id: "q5",
    question: "Who's most likely to become famous for something completely random?",
  },
  {
    id: "q6",
    question: "Who's more likely to convince everyone into a bad decision at 2am?",
  },
];
