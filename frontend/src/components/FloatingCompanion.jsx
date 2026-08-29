import { useEffect, useState } from "react";

import trafalgarEvents from "../assets/companions/trafalgar-events.png";
import trafalgarJoin from "../assets/companions/trafalgar-join.png";
import trafalgarMain from "../assets/companions/trafalgar-main.png";
import trafalgarShare from "../assets/companions/trafalgar-share.png";
import trafalgarStory from "../assets/companions/trafalgar-story.png";

const companionBySection = {
  home: {
    image: trafalgarStory,
    eyebrow: "OSSEC STORY",
    message: "Explore the story...",
  },

  about: {
    image: trafalgarMain,
    eyebrow: "ABOUT OSSEC",
    message: "More than a club.",
  },

  ecosystem: {
    image: trafalgarShare,
    eyebrow: "OUR ECOSYSTEM",
    message: "Dare to Share.",
  },

  board: {
    image: trafalgarMain,
    eyebrow: "THE BOARD",
    message: "Meet the people behind OSSEC.",
  },

  events: {
    image: trafalgarEvents,
    eyebrow: "OSSEC EVENTS",
    message: "Check out our events!",
  },

  sponsors: {
    image: trafalgarMain,
    eyebrow: "OUR PARTNERS",
    message: "Meet those who support OSSEC.",
  },

  contact: {
    image: trafalgarJoin,
    eyebrow: "JOIN OSSEC",
    message: "Join the community!",
  },
};

const sectionIds = Object.keys(companionBySection);

const FloatingCompanion = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [autoMessageVisible, setAutoMessageVisible] = useState(false);

  const current =
    companionBySection[activeSection] ?? companionBySection.home;

  /*
   * -----------------------------------------------------------
   * Detect the section currently visible
   * -----------------------------------------------------------
   */
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );

        if (!visibleSections.length) {
          return;
        }

        const nextSection =
          visibleSections[0].target.id;

        setActiveSection(nextSection);
      },
      {
        threshold: [0.1, 0.25, 0.4, 0.6],
        rootMargin: "-15% 0px -30% 0px",
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * -----------------------------------------------------------
   * Briefly show a message when section changes
   * -----------------------------------------------------------
   */
  useEffect(() => {
    setAutoMessageVisible(true);

    const timeout = window.setTimeout(() => {
      setAutoMessageVisible(false);
    }, 2600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeSection]);

  const bubbleVisible =
    isOpen || autoMessageVisible;

  const scrollToContact = () => {
    const contact =
      document.getElementById("contact");

    if (!contact) {
      return;
    }

    contact.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsOpen(false);
  };

  return (
    <aside
      className="
        fixed
        bottom-3
        right-2
        z-[90]

        sm:bottom-4
        sm:right-4

        lg:bottom-5
        lg:right-6
      "
      aria-label="OSSEC website companion"
    >
      <div className="relative">
        {/* ================================================= */}
        {/* DESKTOP SPEECH BUBBLE                             */}
        {/* ================================================= */}

        <div
          className={`
            pointer-events-auto

            absolute
            bottom-[165px]
            right-8

            hidden
            w-[255px]

            rounded-[1.4rem]

            border
            border-[#122150]/10

            bg-white/95

            p-4

            shadow-[0_20px_60px_rgba(18,33,80,0.15)]

            backdrop-blur-xl

            transition-opacity
            duration-300

            dark:border-white/10
            dark:bg-[#0D1629]/95

            lg:block

            ${
              bubbleVisible
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase

                  tracking-[0.2em]

                  text-[#2A7999]
                "
              >
                {current.eyebrow}
              </p>

              <p
                className="
                  mt-2

                  text-[15px]
                  font-semibold

                  leading-6

                  text-[#122150]

                  dark:text-white
                "
              >
                {current.message}
              </p>
            </div>

            {isOpen && (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  flex
                  size-7
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  text-lg

                  text-[#122150]/40

                  transition-colors

                  hover:bg-[#122150]/5
                  hover:text-[#122150]

                  dark:text-white/40

                  dark:hover:bg-white/10
                  dark:hover:text-white
                "
                aria-label="Close companion message"
              >
                ×
              </button>
            )}
          </div>

          {activeSection !== "contact" && (
            <button
              type="button"
              onClick={scrollToContact}
              className="
                mt-4

                inline-flex
                items-center
                gap-2

                text-xs
                font-semibold

                text-[#2A7999]

                transition-opacity

                hover:opacity-70
              "
            >
              Join the community
              <span>→</span>
            </button>
          )}

          {/* Bubble tail */}
          <span
            className="
              absolute
              -bottom-2
              right-10

              size-4

              rotate-45

              border-b
              border-r
              border-[#122150]/10

              bg-white

              dark:border-white/10
              dark:bg-[#0D1629]
            "
          />
        </div>

        {/* ================================================= */}
        {/* MOBILE MESSAGE                                    */}
        {/* ================================================= */}

        <div
          className={`
            pointer-events-auto

            absolute
            bottom-[100px]
            right-0

            w-[215px]

            rounded-2xl

            border
            border-[#122150]/10

            bg-white/95

            p-3

            shadow-[0_18px_45px_rgba(18,33,80,0.15)]

            backdrop-blur-xl

            transition-opacity
            duration-300

            dark:border-white/10
            dark:bg-[#0D1629]/95

            lg:hidden

            ${
              isOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="
                  text-[9px]
                  font-semibold

                  uppercase

                  tracking-[0.18em]

                  text-[#2A7999]
                "
              >
                {current.eyebrow}
              </p>

              <p
                className="
                  mt-1

                  text-sm
                  font-semibold

                  leading-5

                  text-[#122150]

                  dark:text-white
                "
              >
                {current.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                text-lg

                text-[#122150]/40

                dark:text-white/40
              "
              aria-label="Close message"
            >
              ×
            </button>
          </div>

          {activeSection !== "contact" && (
            <button
              type="button"
              onClick={scrollToContact}
              className="
                mt-3

                text-xs
                font-semibold

                text-[#2A7999]
              "
            >
              Join OSSEC →
            </button>
          )}
        </div>

        {/* ================================================= */}
        {/* COMPANION IMAGE                                   */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="
            group

            relative

            flex
            items-end
            justify-end

            rounded-3xl

            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-[#2A7999]/25
          "
          aria-label="Open OSSEC companion"
          aria-expanded={isOpen}
        >
          {/* Ambient glow */}
          <span
            className="
              pointer-events-none

              absolute

              bottom-1
              right-1/2

              h-10
              w-20

              translate-x-1/2

              rounded-full

              bg-[#2A7999]/20

              blur-xl

              sm:h-14
              sm:w-28

              lg:h-20
              lg:w-36
            "
          />

          {/* Character */}
          <img
            key={activeSection}
            src={current.image}
            alt={`OSSEC companion - ${current.eyebrow}`}
            draggable="false"
            className="
              ossec-companion-image

              relative
              z-10

              h-auto

              max-h-[90px]
              max-w-[110px]

              select-none
              object-contain

              drop-shadow-[0_18px_20px_rgba(18,33,80,0.18)]

              sm:max-h-[120px]
              sm:max-w-[145px]

              lg:max-h-[180px]
              lg:max-w-[210px]
            "
          />

          {/* Online indicator */}
          <span
            className="
              absolute
              bottom-1
              right-1

              z-20

              size-3

              rounded-full

              border-2
              border-[#F8FBFC]

              bg-[#2A7999]

              shadow-md

              dark:border-[#080D1A]

              sm:size-3.5
            "
          />
        </button>

        {/* ================================================= */}
        {/* DESKTOP NAME TAG                                  */}
        {/* ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            bottom-1
            right-[150px]

            hidden

            whitespace-nowrap

            rounded-full

            border
            border-[#122150]/10

            bg-white/90

            px-3
            py-2

            shadow-[0_10px_30px_rgba(18,33,80,0.1)]

            backdrop-blur-xl

            dark:border-white/10
            dark:bg-[#0D1629]/90

            xl:block
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                size-2

                rounded-full

                bg-[#2A7999]
              "
            />

            <div>
              <p
                className="
                  text-[11px]
                  font-semibold

                  text-[#122150]

                  dark:text-white
                "
              >
                Trafalgar & OSSEC
              </p>

              <p
                className="
                  text-[9px]

                  text-[#122150]/45

                  dark:text-white/40
                "
              >
                Always exploring
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FloatingCompanion;