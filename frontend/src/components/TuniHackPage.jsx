import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { Backlight } from "@/components/ui/backlight";

import events from "../data/events";

/* ======================================================== */
/* MEDIA                                                    */
/* ======================================================== */

const LAST_EDITION_VIDEO =
  "/videos/tunihack-previous-edition.mp4";

/*
 * Add this later when the 2024 / 2025 video is ready:
 *
 * const EDITION_2024_2025_VIDEO =
 *   "/videos/tunihack-2024-2025.mp4";
 */
const EDITION_2024_2025_VIDEO = "";

/* ======================================================== */
/* TUNIHACK PHOTOS                                          */
/* ======================================================== */

const tunihackGalleryImages = [
  "/events/tunihack/DSC_0816.webp",
  "/events/tunihack/DSC_0884.webp",
  "/events/tunihack/DSC_0940.webp",
  "/events/tunihack/DSC_0969.webp",
  "/events/tunihack/DSC_1073.webp",
  "/events/tunihack/DSC_1121.webp",
  "/events/tunihack/DSC_1155.webp",
  "/events/tunihack/DSC_1158.webp",
  "/events/tunihack/DSC_90851.webp",
  "/events/tunihack/DSC09202.webp",
  "/events/tunihack/DSC09204.webp",
  "/events/tunihack/DSC09207.webp",
  "/events/tunihack/DSC09210.webp",
  "/events/tunihack/DSC09223.webp",
  "/events/tunihack/DSC09313.webp",
  "/events/tunihack/DSC09316.webp",
];

/* ======================================================== */
/* EXPERIENCES                                              */
/* ======================================================== */

const experiences = [
  {
    number: "01",
    code: "24H",
    label: "Hackathon",
    title: "The 24-hour build",
    description:
      "The heart of TuniHack. Teams work around one shared theme and spend 24 hours transforming an idea into a technological solution.",
    stages: [
      "Theme revealed",
      "Build & iterate",
      "Present the prototype",
    ],
    footer: "The core TuniHack challenge",
  },

  {
    number: "02",
    code: "PITCH",
    label: "PitchHack",
    title: "Turn a problem into a pitch",
    description:
      "PitchHack asks participants to identify a problem related to the TuniHack theme, shape a solution and turn it into a clear and convincing pitch.",
    stages: [
      "Choose the problem",
      "Shape the solution",
      "Pitch the idea",
    ],
    footer: "Ideas become stories",
  },

  {
    number: "03",
    code: "CTF",
    label: "Mini CTF",
    title: "A short security challenge",
    description:
      "A compact Capture The Flag competition adds a cybersecurity challenge to the weekend through technical puzzles, flags and competitive problem solving.",
    stages: [
      "Open the challenge",
      "Solve the flags",
      "Climb the board",
    ],
    footer: "Think like an attacker",
  },

  {
    number: "04",
    code: "CP",
    label: "Competitive programming",
    title: "Code against the clock",
    description:
      "An algorithmic competition where speed, logic and precision matter. Understand the problem, design the algorithm and submit before time runs out.",
    stages: [
      "Read the problem",
      "Find the algorithm",
      "Code & submit",
    ],
    footer: "Algorithms under pressure",
  },

  {
    number: "05",
    code: "CHESS",
    label: "Chess",
    title: "Strategy away from the keyboard",
    description:
      "A different kind of competition during the weekend. Chess brings participants together around anticipation, planning and strategic thinking.",
    stages: [
      "Read the board",
      "Plan ahead",
      "Make the move",
    ],
    footer: "Strategy in every move",
  },
];

/* ======================================================== */
/* PROGRAMME                                                */
/* ======================================================== */

const dayOneProgramme = [
  {
    time: "08:00",
    title: "Welcome",
    text: "Participants arrive and the TuniHack weekend begins.",
  },
  {
    time: "10:00",
    title: "Talks",
    text: "Technical talks and sessions with the community and partners.",
  },
  {
    time: "13:00",
    title: "Workshops",
    text: "Hands-on sessions before the main overnight challenge.",
  },
  {
    time: "18:30",
    title: "Activities",
    text: "A more social and playful part of the TuniHack experience.",
  },
  {
    time: "21:00",
    title: "Side competitions",
    text: "Competitive programming, Mini CTF and chess keep the night active.",
  },
];

const dayTwoProgramme = [
  {
    time: "07:00",
    title: "Breakfast",
    text: "Recharge after the overnight build.",
  },
  {
    time: "09:00",
    title: "Round table",
    text: "A shared exchange around technology, ideas and innovation.",
  },
  {
    time: "10:00",
    title: "PitchHack",
    text: "Problems become solutions, and solutions become pitches.",
  },
  {
    time: "13:00",
    title: "Hackathon finals",
    text: "Final hours of the main challenge and project preparation.",
  },
  {
    time: "16:00",
    title: "Closing",
    text: "Results, awards and the end of the TuniHack weekend.",
  },
];

/* ======================================================== */
/* HERO GALLERY PHOTO                                       */
/* ======================================================== */

const HeroGalleryPhoto = ({
  src,
  index,
  onSelect,
}) => {
  const heights = [
    "h-[115px] sm:h-[190px]",
    "h-[155px] sm:h-[245px]",
    "h-[135px] sm:h-[220px]",
    "h-[170px] sm:h-[270px]",
  ];

  return (
    <button
      type="button"
      onClick={() => onSelect(src)}
      className={`
        group
        relative

        w-full
        shrink-0

        overflow-hidden

        rounded-[1rem]

        border
        border-[#122150]/8

        bg-[#122150]/5

        dark:border-white/10

        sm:rounded-[1.3rem]

        ${heights[index % heights.length]}
      `}
    >
      <img
        src={src}
        alt="TuniHack moment"
        loading="lazy"
        decoding="async"
        draggable="false"
        className="
          h-full
          w-full

          select-none
          object-cover

          transition-transform
          duration-700
          ease-out

          group-hover:scale-[1.035]
        "
      />

      <span
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-t

          from-[#080D1A]/10
          via-transparent
          to-transparent
        "
      />
    </button>
  );
};

/* ======================================================== */
/* MOVING HERO COLUMN                                       */
/* ======================================================== */

const MovingHeroColumn = ({
  images,
  direction,
  onSelect,
}) => {
  const doubledImages = [
    ...images,
    ...images,
  ];

  return (
    <div
      className="
        min-w-0
        flex-1

        overflow-hidden
      "
    >
      <div
        className={`
          flex
          flex-col

          gap-2.5

          sm:gap-3

          ${
            direction === "up"
              ? "tunihack-gallery-up"
              : "tunihack-gallery-down"
          }
        `}
      >
        {doubledImages.map(
          (image, index) => (
            <HeroGalleryPhoto
              key={`${direction}-${image}-${index}`}
              src={image}
              index={index % images.length}
              onSelect={onSelect}
            />
          ),
        )}
      </div>
    </div>
  );
};

/* ======================================================== */
/* HERO GALLERY                                             */
/* ======================================================== */

const HeroGallery = ({
  onSelect,
}) => {
  const leftImages =
    tunihackGalleryImages.filter(
      (_, index) => index % 2 === 0,
    );

  const rightImages =
    tunihackGalleryImages.filter(
      (_, index) => index % 2 !== 0,
    );

  return (
    <div
      className="
        relative

        h-[360px]
        w-full

        overflow-hidden

        rounded-[1.5rem]

        border
        border-[#122150]/10

        bg-white/35

        p-3

        shadow-[0_25px_80px_rgba(18,33,80,0.10)]

        backdrop-blur-xl

        dark:border-white/10
        dark:bg-white/[0.025]

        sm:h-[500px]
        sm:rounded-[2rem]
        sm:p-4

        lg:h-[610px]
      "
    >
      {/* TOP FADE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-20

          h-12

          bg-gradient-to-b

          from-[#F8FBFC]
          via-[#F8FBFC]/55
          to-transparent

          dark:from-[#080D1A]
          dark:via-[#080D1A]/65

          sm:h-20
        "
      />

      {/* BOTTOM FADE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-20

          h-12

          bg-gradient-to-t

          from-[#F8FBFC]
          via-[#F8FBFC]/55
          to-transparent

          dark:from-[#080D1A]
          dark:via-[#080D1A]/65

          sm:h-20
        "
      />

      <div
        className="
          flex
          h-full

          min-w-0

          gap-2.5

          sm:gap-3
        "
      >
        <MovingHeroColumn
          images={leftImages}
          direction="up"
          onSelect={onSelect}
        />

        <MovingHeroColumn
          images={rightImages}
          direction="down"
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

/* ======================================================== */
/* EXPERIENCE NAV ITEM                                      */
/* ======================================================== */

const ExperienceNavItem = ({
  item,
  active,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={`
        group
        relative

        flex
        w-full

        items-center

        gap-4

        border-b
        border-[#122150]/8

        px-1
        py-4

        text-left

        transition-all
        duration-300

        last:border-b-0

        dark:border-white/[0.08]

        sm:gap-5
        sm:py-5

        ${
          active
            ? "text-[#122150] dark:text-white"
            : "text-[#122150]/50 hover:text-[#122150] dark:text-white/45 dark:hover:text-white"
        }
      `}
    >
      <span
        className={`
          relative
          z-10

          flex

          size-10
          shrink-0

          items-center
          justify-center

          rounded-full

          border

          text-[9px]
          font-semibold

          transition-all
          duration-300

          sm:size-11
          sm:text-[10px]

          ${
            active
              ? "border-[#2A7999] bg-[#2A7999] text-white shadow-[0_0_0_6px_rgba(42,121,153,0.08)]"
              : "border-[#2A7999]/15 bg-[#F8FBFC] text-[#2A7999] dark:bg-[#080D1A]"
          }
        `}
      >
        {item.number}
      </span>

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <p
          className="
            text-[9px]
            font-semibold

            uppercase

            tracking-[0.18em]

            text-[#2A7999]

            sm:text-[10px]
          "
        >
          {item.label}
        </p>

        <p
          className="
            mt-1

            text-sm
            font-semibold

            tracking-[-0.02em]

            sm:text-base
          "
        >
          {item.title}
        </p>
      </div>

      <span
        className={`
          text-lg

          transition-all
          duration-300

          ${
            active
              ? "translate-x-0 text-[#2A7999]"
              : "-translate-x-1 text-[#122150]/15 group-hover:translate-x-0 group-hover:text-[#2A7999] dark:text-white/15"
          }
        `}
      >
        →
      </span>
    </button>
  );
};

/* ======================================================== */
/* MOBILE EXPERIENCE SELECTOR                               */
/* ======================================================== */

const MobileExperienceSelector = ({
  activeExperience,
  setActiveExperience,
}) => {
  return (
    <div
      className="
        -mx-5

        overflow-x-auto

        px-5
        pb-2

        [scrollbar-width:none]

        [&::-webkit-scrollbar]:hidden

        lg:hidden
      "
    >
      <div
        className="
          flex
          w-max

          gap-2
        "
      >
        {experiences.map(
          (item, index) => {
            const active =
              activeExperience === index;

            return (
              <button
                key={item.number}
                type="button"
                onClick={() =>
                  setActiveExperience(index)
                }
                className={`
                  flex
                  shrink-0

                  items-center

                  gap-2.5

                  rounded-full

                  border

                  px-3
                  py-2.5

                  transition-all
                  duration-300

                  ${
                    active
                      ? "border-[#2A7999] bg-[#2A7999] text-white"
                      : "border-[#122150]/10 bg-white/40 text-[#122150] dark:border-white/10 dark:bg-white/[0.035] dark:text-white"
                  }
                `}
              >
                <span
                  className={`
                    text-[9px]
                    font-semibold

                    ${
                      active
                        ? "text-white/70"
                        : "text-[#2A7999]"
                    }
                  `}
                >
                  {item.number}
                </span>

                <span
                  className="
                    text-[10px]
                    font-semibold

                    uppercase

                    tracking-[0.1em]
                  "
                >
                  {item.label}
                </span>
              </button>
            );
          },
        )}
      </div>
    </div>
  );
};

/* ======================================================== */
/* EXPERIENCE VISUAL                                        */
/* ======================================================== */

const ExperienceVisual = ({
  item,
}) => {
  return (
    <div
      key={item.number}
      className="
        tunihack-panel-enter

        relative

        overflow-hidden

        rounded-[1.35rem]

        border
        border-[#122150]/10

        bg-white/55

        p-5

        shadow-[0_18px_50px_rgba(18,33,80,0.07)]

        backdrop-blur-xl

        dark:border-white/10
        dark:bg-white/[0.035]

        sm:rounded-[1.75rem]
        sm:p-6

        lg:p-7
      "
    >
      {/* BACKGROUND CODE */}

      <span
        className="
          pointer-events-none

          absolute

          right-3
          top-4

          text-[4rem]
          font-semibold

          leading-none

          tracking-[-0.08em]

          text-[#2A7999]/[0.045]

          sm:right-7
          sm:top-6
          sm:text-[7rem]

          lg:text-[8rem]
        "
      >
        {item.code}
      </span>

      <div
        className="
          relative
          z-10
        "
      >
        {/* ACTIVE */}

        <div
          className="
            flex

            items-center

            gap-3
          "
        >
          <span
            className="
              flex

              size-8

              items-center
              justify-center

              rounded-full

              bg-[#2A7999]

              text-[8px]
              font-semibold

              text-white

              sm:size-9
              sm:text-[9px]
            "
          >
            {item.number}
          </span>

          <span
            className="
              text-[8px]
              font-semibold

              uppercase

              tracking-[0.18em]

              text-[#2A7999]

              sm:text-[10px]
            "
          >
            Active track
          </span>
        </div>

        {/* CONTENT */}

        <div className="mt-5">
          <p
            className="
              text-[8px]
              font-semibold

              uppercase

              tracking-[0.18em]

              text-[#2A7999]

              sm:text-[10px]
            "
          >
            {item.label}
          </p>

          <h3
            className="
              mt-2

              max-w-3xl

              text-[1.6rem]
              font-semibold

              leading-[1.12]

              tracking-[-0.04em]

              sm:text-3xl

              lg:text-[2.1rem]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-4

              max-w-3xl

              text-[13px]
              leading-6

              text-[#122150]/56

              dark:text-white/52

              sm:text-[15px]
              sm:leading-7
            "
          >
            {item.description}
          </p>
        </div>

        {/* HOW IT MOVES */}

        <div className="mt-7">
          <p
            className="
              text-[8px]
              font-semibold

              uppercase

              tracking-[0.17em]

              text-[#122150]/30

              dark:text-white/30
            "
          >
            How it moves
          </p>

          <div
            className="
              mt-3

              grid
              grid-cols-3

              gap-2
            "
          >
            {item.stages.map(
              (
                stage,
                index,
              ) => (
                <div
                  key={stage}
                  className="
                    min-w-0

                    rounded-[0.85rem]

                    border
                    border-[#122150]/8

                    bg-[#F8FBFC]/75

                    px-2.5
                    py-3

                    dark:border-white/[0.07]
                    dark:bg-[#080D1A]/65

                    sm:px-4
                    sm:py-3.5
                  "
                >
                  <span
                    className="
                      flex

                      size-6

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#2A7999]/20

                      text-[7px]
                      font-semibold

                      text-[#2A7999]

                      sm:size-7
                      sm:text-[8px]
                    "
                  >
                    0{index + 1}
                  </span>

                  <p
                    className="
                      mt-2

                      text-[10px]
                      font-semibold

                      leading-[1.25]

                      tracking-[-0.015em]

                      sm:text-[13px]
                    "
                  >
                    {stage}
                  </p>
                </div>
              ),
            )}
          </div>

          <div
            className="
              mt-4

              flex

              items-center

              gap-3
            "
          >
            <span
              className="
                h-px
                w-6

                bg-[#2A7999]
              "
            />

            <span
              className="
                text-[7px]
                font-semibold

                uppercase

                tracking-[0.15em]

                text-[#2A7999]

                sm:text-[9px]
              "
            >
              {item.footer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ======================================================== */
/* PROGRAMME COLUMN                                         */
/* ======================================================== */

const ProgrammeColumn = ({
  number,
  title,
  items,
}) => {
  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[1.4rem]

        border
        border-[#122150]/10

        bg-white/45

        p-5

        backdrop-blur-xl

        dark:border-white/[0.08]
        dark:bg-white/[0.025]

        sm:rounded-[1.75rem]
        sm:p-7
      "
    >
      <div
        className="
          flex

          items-end
          justify-between

          gap-4

          border-b
          border-[#122150]/8

          pb-4

          dark:border-white/[0.08]

          sm:pb-5
        "
      >
        <div>
          <p
            className="
              text-[8px]
              font-semibold

              uppercase

              tracking-[0.2em]

              text-[#2A7999]

              sm:text-[9px]
            "
          >
            Day {number}
          </p>

          <h3
            className="
              mt-2

              text-xl
              font-semibold

              tracking-[-0.035em]

              sm:text-3xl
            "
          >
            {title}
          </h3>
        </div>

        <span
          className="
            text-[3rem]
            font-semibold

            leading-none

            tracking-[-0.08em]

            text-[#2A7999]/10

            sm:text-[3.5rem]
          "
        >
          0{number}
        </span>
      </div>

      <div>
        {items.map(
          (item) => (
            <div
              key={`${item.time}-${item.title}`}
              className="
                grid

                grid-cols-[50px_1fr]

                gap-3

                border-b
                border-[#122150]/7

                py-3.5

                last:border-b-0

                dark:border-white/[0.06]

                sm:grid-cols-[70px_1fr]
                sm:gap-4
                sm:py-5
              "
            >
              <span
                className="
                  pt-0.5

                  text-[9px]
                  font-semibold

                  text-[#2A7999]

                  sm:text-xs
                "
              >
                {item.time}
              </span>

              <div>
                <p
                  className="
                    text-[13px]
                    font-semibold

                    tracking-[-0.02em]

                    sm:text-base
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-1

                    max-w-md

                    text-[11px]
                    leading-5

                    text-[#122150]/48

                    dark:text-white/43

                    sm:text-[13px]
                    sm:leading-6
                  "
                >
                  {item.text}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

/* ======================================================== */
/* VIDEO CARD                                               */
/* ======================================================== */

const TuniHackVideo = ({
  eyebrow,
  title,
  description,
  src,
  placeholder = false,
}) => {
  return (
    <article
      className="
        min-w-0
      "
    >
      <Backlight
        blur={38}
        className="
          w-full

          rounded-[1.4rem]

          sm:rounded-[1.75rem]
        "
      >
        <div
          className="
            relative

            overflow-hidden

            rounded-[1.4rem]

            border
            border-[#122150]/10

            bg-white/50

            p-3

            shadow-[0_20px_65px_rgba(18,33,80,0.08)]

            backdrop-blur-xl

            dark:border-white/10
            dark:bg-white/[0.035]

            sm:rounded-[1.75rem]
            sm:p-4
          "
        >
          {/* WINDOW BAR */}

          <div
            className="
              flex

              items-center
              justify-between

              border-b
              border-[#122150]/8

              px-1
              pb-3

              dark:border-white/10

              sm:px-2
            "
          >
            {/* ONE DOT */}

            <span
              className="
                size-3

                rounded-full

                bg-[#2A7999]
              "
            />

            <span
              className="
                text-[8px]
                font-semibold

                uppercase

                tracking-[0.16em]

                text-[#122150]/30

                dark:text-white/30

                sm:text-[9px]
              "
            >
              tunihack / video
            </span>
          </div>

          {/* PLAYER */}

          <div
            className="
              relative

              mt-3

              aspect-video

              overflow-hidden

              rounded-[1.1rem]

              bg-[#080D1A]

              sm:mt-4
              sm:rounded-[1.4rem]
            "
          >
            {!placeholder && src ? (
              <video
                controls
                playsInline
                preload="metadata"
                className="
                  h-full
                  w-full

                  bg-[#080D1A]

                  object-cover
                "
              >
                <source
                  src={src}
                  type="video/mp4"
                />

                Your browser does not
                support video playback.
              </video>
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full

                  flex-col

                  items-center
                  justify-center

                  gap-3

                  bg-[#122150]/[0.04]

                  px-6

                  text-center

                  dark:bg-white/[0.025]
                "
              >
                <span
                  className="
                    flex

                    size-11

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#2A7999]/20

                    bg-[#2A7999]/10

                    text-sm

                    text-[#2A7999]

                    sm:size-12
                    sm:text-lg
                  "
                >
                  ▶
                </span>

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold

                      sm:text-base
                    "
                  >
                    Video coming soon
                  </p>

                  <p
                    className="
                      mt-1

                      text-[10px]

                      text-[#122150]/40

                      dark:text-white/35

                      sm:text-xs
                    "
                  >
                    2024 / 2025 edition
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Backlight>

      {/* INFO */}

      <div
        className="
          px-1
          pt-4

          sm:px-2
          sm:pt-6
        "
      >
        <p
          className="
            text-[8px]
            font-semibold

            uppercase

            tracking-[0.18em]

            text-[#2A7999]

            sm:text-[10px]
          "
        >
          {eyebrow}
        </p>

        <h3
          className="
            mt-2

            text-lg
            font-semibold

            tracking-[-0.03em]

            sm:text-2xl
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2.5

            max-w-xl

            text-[11px]
            leading-5

            text-[#122150]/48

            dark:text-white/43

            sm:mt-3
            sm:text-sm
            sm:leading-7
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
};

/* ======================================================== */
/* MAIN PAGE                                                */
/* ======================================================== */

const TuniHackPage = () => {
  const [
    activeExperience,
    setActiveExperience,
  ] = useState(0);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  const eventExists = events.some(
    (item) =>
      item.slug === "tunihack",
  );

  /* ====================================================== */
  /* PAGE START                                             */
  /* ====================================================== */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  /* ====================================================== */
  /* LIGHTBOX                                               */
  /* ====================================================== */

  useEffect(() => {
    if (!selectedImage) {
      return undefined;
    }

    const handleKeyDown = (
      keyboardEvent,
    ) => {
      if (
        keyboardEvent.key === "Escape"
      ) {
        setSelectedImage(null);
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [selectedImage]);

  if (!eventExists) {
    return null;
  }

  return (
    <>
      <main
        className="
          min-h-screen

          bg-transparent

          text-[#122150]

          dark:text-white
        "
      >
        {/* ================================================= */}
        {/* LOCAL ANIMATIONS                                 */}
        {/* ================================================= */}

        <style>
          {`
            @keyframes tunihackPanelIn {
              from {
                opacity: 0;
                transform: translateY(8px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes tunihackPulse {
              0%,
              100% {
                opacity: 0.35;
              }

              50% {
                opacity: 1;
              }
            }

            @keyframes tunihackGalleryUp {
              from {
                transform: translateY(0);
              }

              to {
                transform:
                  translateY(
                    calc(-50% - 6px)
                  );
              }
            }

            @keyframes tunihackGalleryDown {
              from {
                transform:
                  translateY(
                    calc(-50% - 6px)
                  );
              }

              to {
                transform: translateY(0);
              }
            }

            .tunihack-gallery-up {
              animation:
                tunihackGalleryUp
                34s
                linear
                infinite;
            }

            .tunihack-gallery-down {
              animation:
                tunihackGalleryDown
                34s
                linear
                infinite;
            }

            .tunihack-gallery-up:hover,
            .tunihack-gallery-down:hover {
              animation-play-state:
                paused;
            }

            .tunihack-panel-enter {
              animation:
                tunihackPanelIn
                420ms
                cubic-bezier(
                  0.22,
                  1,
                  0.36,
                  1
                )
                both;
            }

            .tunihack-pulse {
              animation:
                tunihackPulse
                2.2s
                ease-in-out
                infinite;
            }

            @media (
              prefers-reduced-motion:
              reduce
            ) {
              .tunihack-panel-enter,
              .tunihack-pulse,
              .tunihack-gallery-up,
              .tunihack-gallery-down {
                animation: none;
              }
            }
          `}
        </style>

        {/* ================================================= */}
        {/* HERO                                             */}
        {/* ================================================= */}

        <section
          className="
            relative

            overflow-hidden

            px-5

            pb-12
            pt-24

            sm:px-8
            sm:pb-20
            sm:pt-36

            lg:px-12
            lg:pb-24
          "
        >
          {/* GLOWS */}

          <div
            className="
              pointer-events-none

              absolute

              -right-40
              -top-40

              size-[520px]

              rounded-full

              bg-[#2A7999]/10

              blur-[140px]
            "
          />

          <div
            className="
              pointer-events-none

              absolute

              left-[31%]
              top-[32%]

              size-[400px]

              rounded-full

              bg-[#2A7999]/[0.045]

              blur-[120px]
            "
          />

          <div
            className="
              relative

              mx-auto

              max-w-7xl
            "
          >
            {/* BACK */}

            <Link
              to="/events"
              className="
                inline-flex

                items-center

                gap-2

                rounded-full

                border
                border-[#122150]/10

                bg-white/60

                px-3.5
                py-2

                text-[11px]
                font-semibold

                text-[#122150]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:border-[#2A7999]/30
                hover:text-[#2A7999]

                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-white

                sm:px-4
                sm:text-sm
              "
            >
              ← Back to events
            </Link>

            <div
              className="
                mt-12

                grid

                items-center

                gap-9

                sm:mt-16
                sm:gap-10

                lg:grid-cols-[0.78fr_1.22fr]
                lg:gap-12

                xl:grid-cols-[0.72fr_1.28fr]
                xl:gap-16
              "
            >
              {/* LEFT */}

              <div>
                <div
                  className="
                    flex
                    flex-wrap

                    items-center

                    gap-3
                  "
                >
                  <span
                    className="
                      rounded-full

                      border
                      border-[#2A7999]/20

                      bg-[#2A7999]/10

                      px-3
                      py-1.5

                      text-[9px]
                      font-semibold

                      uppercase

                      tracking-[0.18em]

                      text-[#2A7999]

                      sm:px-4
                      sm:py-2
                      sm:text-xs
                    "
                  >
                    TuniHack 2026
                  </span>

                  <span
                    className="
                      text-[9px]
                      font-semibold

                      uppercase

                      tracking-[0.16em]

                      text-[#122150]/35

                      dark:text-white/35

                      sm:text-xs
                    "
                  >
                    28 — 29 NOV 2026
                  </span>
                </div>

                <h1
                  className="
                    mt-7

                    max-w-[650px]

                    text-[3rem]
                    font-semibold

                    leading-[0.96]

                    tracking-[-0.06em]

                    sm:text-6xl

                    lg:text-[4.8rem]

                    xl:text-[5.2rem]
                  "
                >
                  Build what

                  <span
                    className="
                      block

                      text-[#2A7999]
                    "
                  >
                    comes next.
                  </span>
                </h1>

                <p
                  className="
                    mt-6

                    max-w-xl

                    text-[13px]
                    leading-7

                    text-[#122150]/60

                    dark:text-white/55

                    sm:text-lg
                    sm:leading-8
                  "
                >
                  A 24-hour innovation
                  challenge inside a full
                  weekend of building,
                  pitching, cybersecurity,
                  algorithms, strategy,
                  workshops and shared
                  experiences.
                </p>

                <div
                  className="
                    mt-7

                    flex

                    items-center

                    gap-4

                    sm:mt-8
                  "
                >
                  <span
                    className="
                      tunihack-pulse

                      size-2

                      rounded-full

                      bg-[#2A7999]
                    "
                  />

                  <span
                    className="
                      text-[8px]
                      font-semibold

                      uppercase

                      tracking-[0.16em]

                      text-[#122150]/40

                      dark:text-white/40

                      sm:text-[10px]
                      sm:tracking-[0.18em]
                    "
                  >
                    24 hours · 5 tracks ·
                    one weekend
                  </span>
                </div>
              </div>

              {/* RIGHT */}

              <HeroGallery
                onSelect={
                  setSelectedImage
                }
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* WHAT IS TUNIHACK                                 */}
        {/* ================================================= */}

        <section
          className="
            relative

            px-5
            py-12

            sm:px-8
            sm:py-20

            lg:px-12
            lg:py-28
          "
        >
          <div
            className="
              mx-auto

              grid
              max-w-7xl

              gap-8

              lg:grid-cols-[0.7fr_1.3fr]
              lg:items-start
              lg:gap-20
            "
          >
            {/* STICKY LEFT */}

            <div
              className="
                lg:sticky
                lg:top-28
                lg:self-start
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-[#2A7999]

                  sm:text-xs
                "
              >
                What is TuniHack?
              </p>

              <h2
                className="
                  mt-3

                  max-w-[340px]

                  text-[2.15rem]
                  font-semibold

                  leading-[1.08]

                  tracking-[-0.045em]

                  sm:max-w-md
                  sm:text-5xl

                  lg:text-[3.6rem]
                "
              >
                24 hours to turn an idea

                <span
                  className="
                    block

                    text-[#2A7999]
                  "
                >
                  into something real.
                </span>
              </h2>

              <div
                className="
                  mt-7

                  hidden

                  items-center

                  gap-3

                  lg:flex
                "
              >
                <span
                  className="
                    h-px
                    w-10

                    bg-[#2A7999]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold

                    uppercase

                    tracking-[0.18em]

                    text-[#122150]/35

                    dark:text-white/35
                  "
                >
                  TuniHack
                </span>
              </div>
            </div>

            {/* RIGHT */}

            <div>
              <p
                className="
                  max-w-4xl

                  text-[14px]
                  leading-7

                  text-[#122150]/62

                  dark:text-white/58

                  sm:text-xl
                  sm:leading-9
                "
              >
                A hackathon is a 24-hour
                marathon where developers,
                designers and innovators
                collaborate around one
                theme to create solutions.
                TuniHack expands that idea
                into an entire weekend for
                students from universities
                across Tunisia.
              </p>

              <p
                className="
                  mt-5

                  max-w-4xl

                  text-[13px]
                  leading-7

                  text-[#122150]/50

                  dark:text-white/46

                  sm:mt-7
                  sm:text-base
                  sm:leading-8
                "
              >
                The central build is
                surrounded by talks,
                workshops, PitchHack and
                smaller competitions that
                keep the experience moving
                even when participants step
                away from their main
                prototype.
              </p>

              {/* PRINCIPLES */}

              <div
                className="
                  mt-8

                  grid
                  grid-cols-3

                  border-y
                  border-[#122150]/8

                  dark:border-white/[0.08]

                  sm:mt-12
                "
              >
                {[
                  [
                    "01",
                    "Theme",
                    "One shared challenge.",
                  ],
                  [
                    "02",
                    "Build",
                    "24 hours to create.",
                  ],
                  [
                    "03",
                    "Experience",
                    "More than one challenge.",
                  ],
                ].map(
                  (
                    [
                      number,
                      title,
                      description,
                    ],
                    index,
                  ) => (
                    <div
                      key={number}
                      className={`
                        min-w-0

                        py-4

                        ${
                          index > 0
                            ? "border-l border-[#122150]/8 dark:border-white/[0.08]"
                            : ""
                        }

                        sm:px-5
                        sm:py-6
                      `}
                    >
                      <p
                        className="
                          px-2

                          text-[7px]
                          font-semibold

                          uppercase

                          tracking-[0.13em]

                          text-[#2A7999]

                          sm:px-0
                          sm:text-[9px]
                          sm:tracking-[0.18em]
                        "
                      >
                        {number} · {title}
                      </p>

                      <p
                        className="
                          mt-2

                          px-2

                          text-[11px]
                          font-semibold

                          leading-[1.35]

                          tracking-[-0.02em]

                          sm:px-0
                          sm:text-lg
                        "
                      >
                        {description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* INSIDE THE WEEKEND                               */}
        {/* ================================================= */}

        <section
          className="
            relative

            overflow-hidden

            px-5
            py-12

            sm:px-8
            sm:py-20

            lg:px-12
            lg:py-24
          "
        >
          <div
            className="
              pointer-events-none

              absolute

              -left-40
              top-[25%]

              size-[460px]

              rounded-full

              bg-[#2A7999]/[0.065]

              blur-[140px]
            "
          />

          <div
            className="
              relative

              mx-auto

              max-w-7xl
            "
          >
            {/* HEADING */}

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-[#2A7999]

                  sm:text-xs
                "
              >
                Inside the weekend
              </p>

              <h2
                className="
                  mt-3

                  max-w-4xl

                  text-[2rem]
                  font-semibold

                  leading-[1.08]

                  tracking-[-0.045em]

                  sm:text-5xl
                "
              >
                A hackathon followed by

                <span
                  className="
                    text-[#2A7999]
                  "
                >
                  {" "}
                  several fun activities.
                </span>
              </h2>
            </div>

            {/* ================================================= */}
            {/* MOBILE / TABLET                                  */}
            {/* ================================================= */}

            <div
              className="
                mt-8

                sm:mt-12

                lg:hidden
              "
            >
              <MobileExperienceSelector
                activeExperience={
                  activeExperience
                }
                setActiveExperience={
                  setActiveExperience
                }
              />

              <div className="mt-5">
                <ExperienceVisual
                  item={
                    experiences[
                      activeExperience
                    ]
                  }
                />
              </div>
            </div>

            {/* ================================================= */}
            {/* DESKTOP                                          */}
            {/* ================================================= */}

            <div
              className="
                mt-14

                hidden

                lg:grid
                lg:grid-cols-[0.72fr_1.28fr]
                lg:items-start
                lg:gap-10

                xl:gap-14
              "
            >
              {/* NAV */}

              <div
                className="
                  relative

                  border-y
                  border-[#122150]/8

                  dark:border-white/[0.08]
                "
              >
                <div
                  className="
                    pointer-events-none

                    absolute

                    bottom-0
                    left-[22px]
                    top-0

                    w-px

                    bg-[#2A7999]/12
                  "
                />

                {experiences.map(
                  (
                    item,
                    index,
                  ) => (
                    <ExperienceNavItem
                      key={item.number}
                      item={item}
                      active={
                        activeExperience ===
                        index
                      }
                      onSelect={() =>
                        setActiveExperience(
                          index,
                        )
                      }
                    />
                  ),
                )}
              </div>

              {/* ACTIVE */}

              <ExperienceVisual
                item={
                  experiences[
                    activeExperience
                  ]
                }
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* PROGRAMME                                        */}
        {/* ================================================= */}

        <section
          className="
            px-5
            py-12

            sm:px-8
            sm:py-20

            lg:px-12
            lg:py-24
          "
        >
          <div
            className="
              mx-auto

              max-w-7xl
            "
          >
            <div
              className="
                grid

                gap-4

                lg:grid-cols-[0.85fr_1.15fr]
                lg:items-end
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold

                    uppercase

                    tracking-[0.2em]

                    text-[#2A7999]

                    sm:text-xs
                  "
                >
                  The weekend
                </p>

                <h2
                  className="
                    mt-3

                    text-[2rem]
                    font-semibold

                    leading-[1.08]

                    tracking-[-0.045em]

                    sm:text-5xl
                  "
                >
                  From arrival to

                  <span
                    className="
                      text-[#2A7999]
                    "
                  >
                    {" "}
                    final build.
                  </span>
                </h2>
              </div>

              <p
                className="
                  max-w-xl

                  text-[12px]
                  leading-6

                  text-[#122150]/48

                  dark:text-white/43

                  sm:text-base
                  sm:leading-8

                  lg:justify-self-end
                "
              >
                Talks, workshops,
                overnight challenges and
                PitchHack surround the
                main 24-hour build.
              </p>
            </div>

            <div
              className="
                mt-8

                grid

                gap-4

                sm:mt-14

                lg:grid-cols-2
                lg:gap-5
              "
            >
              <ProgrammeColumn
                number="1"
                title="Build the momentum."
                items={dayOneProgramme}
              />

              <ProgrammeColumn
                number="2"
                title="Bring it together."
                items={dayTwoProgramme}
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* VIDEOS                                           */}
        {/* ================================================= */}

        <section
          className="
            relative

            overflow-hidden

            px-5
            py-12

            sm:px-8
            sm:py-20

            lg:px-12
            lg:py-24
          "
        >
          <div
            className="
              pointer-events-none

              absolute

              left-1/2
              top-1/2

              size-[650px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-[#2A7999]/5

              blur-[150px]
            "
          />

          <div
            className="
              relative

              mx-auto

              max-w-7xl
            "
          >
            {/* HEADING */}

            <div
              className="
                grid

                gap-4

                lg:grid-cols-[0.8fr_1.2fr]
                lg:items-end
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold

                    uppercase

                    tracking-[0.2em]

                    text-[#2A7999]

                    sm:text-xs
                  "
                >
                  TuniHack on film
                </p>

                <h2
                  className="
                    mt-3

                    max-w-2xl

                    text-[2rem]
                    font-semibold

                    leading-[1.08]

                    tracking-[-0.045em]

                    sm:text-5xl
                  "
                >
                  Relive the

                  <span
                    className="
                      text-[#2A7999]
                    "
                  >
                    {" "}
                    experience.
                  </span>
                </h2>
              </div>

              <p
                className="
                  max-w-xl

                  text-[12px]
                  leading-6

                  text-[#122150]/48

                  dark:text-white/43

                  sm:text-base
                  sm:leading-8

                  lg:justify-self-end
                "
              >
                A look back at TuniHack
                through the teams,
                atmosphere and moments of
                previous editions.
              </p>
            </div>

            {/* TWO VIDEOS */}

            <div
              className="
                mt-8

                grid

                gap-9

                sm:mt-14

                lg:grid-cols-2
                lg:gap-6

                xl:gap-8
              "
            >
              <TuniHackVideo
                eyebrow="Previous edition"
                title="Experience TuniHack"
                description="Relive the energy, collaboration and atmosphere of a previous TuniHack edition."
                src={LAST_EDITION_VIDEO}
              />

              <TuniHackVideo
                eyebrow="2024 / 2025 edition"
                title="TuniHack 2024 / 2025"
                src={
                  EDITION_2024_2025_VIDEO
                }
                placeholder={
                  !EDITION_2024_2025_VIDEO
                }
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* CTA                                              */}
        {/* ================================================= */}

        <section
          className="
            px-5

            pb-20
            pt-4

            sm:px-8
            sm:pb-28

            lg:px-12
          "
        >
          <div
            className="
              mx-auto

              flex
              max-w-7xl

              flex-col

              items-center

              rounded-[1.5rem]

              border
              border-[#2A7999]/15

              bg-[#2A7999]/[0.055]

              px-6
              py-9

              text-center

              sm:rounded-[2rem]
              sm:px-10
              sm:py-16
            "
          >
            <p
              className="
                text-[8px]
                font-semibold

                uppercase

                tracking-[0.2em]

                text-[#2A7999]

                sm:text-xs
              "
            >
              28 — 29 November 2026
            </p>

            <h2
              className="
                mt-3

                max-w-3xl

                text-2xl
                font-semibold

                tracking-[-0.035em]

                sm:text-4xl
              "
            >
              Build something worth
              presenting.
            </h2>

            <p
              className="
                mt-4

                max-w-xl

                text-[11px]
                leading-6

                text-[#122150]/45

                dark:text-white/40

                sm:text-sm
                sm:leading-7
              "
            >
              One theme. One weekend.
              Different ways to build,
              think and compete.
            </p>

            <Link
              to="/events"
              className="
                mt-6

                inline-flex

                items-center

                gap-3

                rounded-full

                bg-[#122150]

                px-5
                py-3

                text-xs
                font-semibold

                text-white

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#2A7999]

                dark:bg-[#2A7999]
                dark:hover:bg-[#348BAD]

                sm:mt-7
                sm:text-sm
              "
            >
              Explore all events

              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ================================================== */}
      {/* LIGHTBOX                                          */}
      {/* ================================================== */}

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-[999]

            flex

            items-center
            justify-center

            bg-[#050914]/95

            p-4

            backdrop-blur-md

            sm:p-8
          "
          onClick={() =>
            setSelectedImage(null)
          }
        >
          <button
            type="button"
            onClick={() =>
              setSelectedImage(null)
            }
            aria-label="Close image"
            className="
              absolute

              right-5
              top-5
              z-20

              flex

              size-11

              items-center
              justify-center

              rounded-full

              border
              border-white/15

              bg-white/10

              text-xl
              text-white

              backdrop-blur-md

              transition

              hover:bg-white/20

              sm:right-8
              sm:top-8
              sm:size-12
              sm:text-2xl
            "
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="TuniHack fullscreen"
            onClick={(clickEvent) =>
              clickEvent.stopPropagation()
            }
            className="
              max-h-[90vh]
              max-w-[95vw]

              rounded-[1.25rem]

              object-contain

              shadow-2xl

              sm:rounded-[1.5rem]
            "
          />
        </div>
      )}
    </>
  );
};

export default TuniHackPage;