import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Backlight } from "@/components/ui/backlight";

const galleryImages = [
  "/events/install-party/web/IMG_2714.webp",
  "/events/install-party/web/IMG_5943.webp",
  "/events/install-party/web/IMG_5991.webp",
  "/events/install-party/web/IMG_6040.webp",
  "/events/install-party/web/IMG_6062.webp",
  "/events/install-party/web/IMG_6081.webp",
  "/events/install-party/web/IMG_6134.webp",
  "/events/install-party/web/IMG_6210.webp",
];

const eventVideo = "/events/install-party/Install%20Party.mp4";

const programme = [
  {
    time: "09:00",
    number: "01",
    title: "Welcome to OSSEC",
    text: "Meet the club, the people around you and the community you are joining.",
  },
  {
    time: "10:00",
    number: "02",
    title: "Cybersecurity, from the inside",
    text: "A senior member shares the first ideas, tools and paths into cybersecurity.",
  },
  {
    time: "11:30",
    number: "03",
    title: "Install Linux",
    text: "Bring your laptop and leave with a Linux setup ready for learning and building.",
  },
  {
    time: "13:30",
    number: "04",
    title: "Lunch together",
    text: "Take a break, compare notes and get to know the people at your table.",
  },
  {
    time: "15:00",
    number: "05",
    title: "Activities",
    text: "Low pressure challenges and games to make the first conversations easy.",
  },
  {
    time: "18:00",
    number: "06",
    title: "Party",
    text: "Celebrate the start of the year with music, good company and a full room.",
  },
  {
    time: "19:00",
    number: "07",
    title: "DJ set",
    text: "Turn the welcome into a proper celebration and end the day together.",
  },
];

const programmeColumns = [
  programme.slice(0, 4),
  programme.slice(4),
];

const benefits = [
  {
    number: "01",
    label: "Find your people",
    title: "Build a network before the first project",
    text: "Meet students from different years, discover what they are working on and find the people you will learn with throughout the year.",
  },
  {
    number: "02",
    label: "Start with confidence",
    title: "A friendly first step into cybersecurity",
    text: "Ask questions without pressure, hear a real student perspective and get a clearer idea of how to start exploring cyber.",
  },
  {
    number: "03",
    label: "Learn by doing",
    title: "Leave with Linux on your laptop",
    text: "The install session turns curiosity into a working environment you can use for coding, security labs and open source projects.",
  },
];

const GalleryTile = ({ src, index, onSelect }) => {
  const heights = ["h-[130px] sm:h-[210px]", "h-[165px] sm:h-[270px]", "h-[145px] sm:h-[235px]", "h-[185px] sm:h-[300px]"];

  return (
    <button
      type="button"
      onClick={() => onSelect(src)}
      className={`group relative w-full overflow-hidden rounded-[1.2rem] border border-[#122150]/10 bg-white/35 ${heights[index % heights.length]} dark:border-white/10 dark:bg-white/[0.03]`}
    >
      <img
        src={src}
        alt="Install Party community moment"
        loading={index > 2 ? "lazy" : "eager"}
        decoding="async"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080D1A]/35 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80 opacity-0 transition group-hover:opacity-100">
        Open photo
      </span>
    </button>
  );
};

const MovingGalleryColumn = ({ images, direction, onSelect }) => {
  const doubledImages = [...images, ...images];

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div className={`flex flex-col gap-3 sm:gap-4 ${direction === "up" ? "install-party-gallery-up" : "install-party-gallery-down"}`}>
        {doubledImages.map((src, index) => (
          <GalleryTile
            key={`${direction}-${src}-${index}`}
            src={src}
            index={index % images.length}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

const MovingGallery = ({ onSelect }) => {
  const leftImages = galleryImages.filter((_, index) => index % 2 === 0);
  const rightImages = galleryImages.filter((_, index) => index % 2 !== 0);

  return (
    <div className="relative h-[430px] w-full overflow-hidden rounded-[1.5rem] border border-[#122150]/10 bg-white/35 p-3 shadow-[0_25px_80px_rgba(18,33,80,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.025] sm:h-[620px] sm:rounded-[2rem] sm:p-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#F8FBFC] via-[#F8FBFC]/60 to-transparent dark:from-[#080D1A] dark:via-[#080D1A]/65 sm:h-24" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[#F8FBFC] via-[#F8FBFC]/60 to-transparent dark:from-[#080D1A] dark:via-[#080D1A]/65 sm:h-24" />
      <div className="flex h-full min-w-0 gap-3 sm:gap-4">
        <MovingGalleryColumn images={leftImages} direction="up" onSelect={onSelect} />
        <MovingGalleryColumn images={rightImages} direction="down" onSelect={onSelect} />
      </div>
    </div>
  );
};

const InstallPartyPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes installPartyGalleryUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }

        @keyframes installPartyGalleryDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }

        .install-party-gallery-up,
        .install-party-gallery-down {
          animation-duration: 42s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        .install-party-gallery-up { animation-name: installPartyGalleryUp; }
        .install-party-gallery-down { animation-name: installPartyGalleryDown; }

        .install-party-gallery-up:hover,
        .install-party-gallery-down:hover { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .install-party-gallery-up,
          .install-party-gallery-down { animation: none; }
        }
      `}</style>
      <main className="relative z-10 overflow-hidden">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2A7999] sm:text-[10px]">
                <span className="h-px w-8 bg-[#2A7999]" />
                OSSEC welcomes you
              </div>

              <h1 className="mt-6 max-w-xl text-[3.6rem] font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl lg:text-[6.8rem]">
                Install
                <br />
                <span className="text-[#2A7999]">Party</span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-[#122150]/60 dark:text-white/58 sm:text-lg sm:leading-8">
                Your first day with the club. Meet the community, discover cybersecurity, install Linux and celebrate the start of something new.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#2A7999]/20 bg-[#2A7999]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2A7999]">
                  27 September 2026
                </span>
                <span className="rounded-full border border-[#122150]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#122150]/55 dark:border-white/10 dark:text-white/55">
                  First years welcome
                </span>
              </div>

              <div className="mt-10 flex items-center gap-5">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-3 rounded-full bg-[#122150] px-5 py-3 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2A7999] dark:bg-[#2A7999] dark:hover:bg-[#348BAD]"
                >
                  See all events <span>→</span>
                </Link>
                <a href="#programme" className="text-xs font-semibold text-[#122150]/55 transition hover:text-[#2A7999] dark:text-white/55">
                  View the day ↓
                </a>
              </div>
            </div>

            <MovingGallery onSelect={setSelectedImage} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="grid gap-8 border-y border-[#122150]/10 py-10 dark:border-white/10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#122150]/10 sm:py-12 dark:sm:divide-white/10">
            <div className="sm:px-8 sm:first:pl-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2A7999]">Bring</p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.035em]">Your laptop</p>
              <p className="mt-2 text-sm leading-6 text-[#122150]/50 dark:text-white/45">We will help you get Linux ready for the year ahead.</p>
            </div>
            <div className="sm:px-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2A7999]">Meet</p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.035em]">Your community</p>
              <p className="mt-2 text-sm leading-6 text-[#122150]/50 dark:text-white/45">Senior members, new friends and future teammates in one room.</p>
            </div>
            <div className="sm:px-8 sm:last:pr-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2A7999]">Leave with</p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.035em]">A story to tell</p>
              <p className="mt-2 text-sm leading-6 text-[#122150]/50 dark:text-white/45">A new skill, a few contacts and a very good reason to come back.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2A7999]">A day worth replaying</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Meet, learn, install, celebrate.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#122150]/52 dark:text-white/48">Get a glimpse of the energy behind the Install Party, from the first introductions to the last song of the night.</p>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#122150]/10 bg-[#080D1A] p-3 shadow-[0_20px_65px_rgba(18,33,80,0.1)] dark:border-white/10 sm:rounded-[1.9rem] sm:p-4">
              <video controls playsInline preload="metadata" className="aspect-video w-full rounded-[1.1rem] bg-[#080D1A] object-cover sm:rounded-[1.4rem]">
                <source src={eventVideo} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </section>

        <section id="programme" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2A7999]">The day, in order</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">One welcome. Seven ways to get involved.</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#122150]/48 dark:text-white/43">Come for the Linux install. Stay for the people, the activities and the music.</p>
          </div>

          <Backlight blur={38} className="rounded-[1.5rem] sm:rounded-[1.9rem]">
            <div className="grid rounded-[1.5rem] border border-[#122150]/10 bg-white/45 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.025] sm:grid-cols-2 sm:rounded-[1.9rem]">
              {programmeColumns.map((column, columnIndex) => (
                <div key={columnIndex} className={columnIndex === 1 ? "border-[#122150]/10 dark:border-white/10 sm:border-l" : ""}>
                  {column.map((item) => (
                    <div key={item.number} className="grid grid-cols-[58px_1fr] gap-4 border-b border-[#122150]/8 px-5 py-5 last:border-b-0 dark:border-white/[0.08] sm:grid-cols-[70px_1fr] sm:gap-5 sm:px-8 sm:py-6">
                      <span className="pt-0.5 text-[10px] font-semibold text-[#2A7999] sm:text-xs">{item.time}</span>
                      <div>
                        <p className="text-base font-semibold tracking-[-0.025em] sm:text-lg">{item.title}</p>
                        <p className="mt-2 text-xs leading-5 text-[#122150]/50 dark:text-white/45 sm:text-sm sm:leading-6">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Backlight>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="mb-10 sm:mb-14">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2A7999]">Why come along</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">A good first day has more than one payoff.</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.number} className="rounded-[1.4rem] border border-[#122150]/10 bg-white/45 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.025] sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#2A7999] text-[10px] font-semibold text-white">{benefit.number}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#2A7999]">{benefit.label}</span>
                </div>
                <h3 className="mt-12 text-2xl font-semibold leading-tight tracking-[-0.045em]">{benefit.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#122150]/52 dark:text-white/48">{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center rounded-[1.5rem] border border-[#2A7999]/15 bg-[#2A7999]/[0.055] px-6 py-9 text-center sm:rounded-[2rem] sm:px-10 sm:py-16">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#2A7999] sm:text-xs">
              27 September 2026
            </p>

            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Come curious. Leave connected.
            </h2>

            <p className="mt-4 max-w-xl text-[11px] leading-6 text-[#122150]/45 dark:text-white/40 sm:text-sm sm:leading-7">
              Meet the club, learn something new and start the year with a community around you.
            </p>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#122150] px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2A7999] dark:bg-[#2A7999] dark:hover:bg-[#348BAD] sm:mt-7 sm:text-sm"
            >
              Talk to the club
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      {selectedImage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050914]/95 p-4 backdrop-blur-md sm:p-8" onClick={() => setSelectedImage(null)}>
          <button type="button" aria-label="Close image" onClick={() => setSelectedImage(null)} className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white transition hover:bg-white/20 sm:right-8 sm:top-8">×</button>
          <img src={selectedImage} alt="Install Party fullscreen" onClick={(event) => event.stopPropagation()} className="max-h-[90vh] max-w-[95vw] rounded-[1.25rem] object-contain shadow-2xl" />
        </div>
      )}
    </>
  );
};

export default InstallPartyPage;