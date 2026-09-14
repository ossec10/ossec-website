import captureTheCupLogo from "../assets/logos/CTC.png";
import forkAndFlagLogo from "../assets/logos/F&F.png";
import installPartyLogo from "../assets/logos/InstallParty.png";
import tuniHackLogo from "../assets/logos/TuniHack-nobackground.png";

const events = [
  {
    id: "install-party",
    slug: "install-party",
    title: "Install Party",
    date: "27 Sep 2026",
    rawDate: "2026-09-27",
    shortDescription:
      "A morning of workshops and Linux installation sessions, followed by a party later in the day.",
    tags: ["Linux", "Open Source", "Party"],
    accent: "#2A7999",
    status: "Upcoming",
    logo: installPartyLogo,
  },
  {
    id: "capture-the-cup",
    slug: "capture-the-cup",
    title: "Capture the Cup",
    date: "18 Oct 2026",
    rawDate: "2026-10-18",
    shortDescription:
      "A beginner-friendly CTF competition designed as an introduction to the CTF world.",
    tags: ["CTF Competition", "Beginners", "Intro to CTF"],
    accent: "#122150",
    status: "Upcoming",
    logo: captureTheCupLogo,
  },
  {
    id: "tunihack",
    slug: "tunihack",
    title: "TuniHack",
    date: "28–29 Nov 2026",
    rawDate: "2026-11-28",
    shortDescription:
      "A hackathon experience that also includes a pitch competition for teams to present their ideas.",
    tags: ["Hackathon", "Pitch Competition", "Innovation"],
    accent: "#2A7999",
    status: "Upcoming",
    logo: tuniHackLogo,
  },
  {
    id: "fork-and-flag",
    slug: "fork-and-flag",
    title: "Fork & Flag",
    date: "24–25 Apr 2027",
    rawDate: "2027-04-24",
    shortDescription:
      "An external CTF competition focused on challenge-solving, teamwork and competitive spirit.",
    tags: ["CTF Competition", "External"],
    accent: "#122150",
    status: "Upcoming",
    logo: forkAndFlagLogo,
  },
];

export default events;