import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { Pointer } from "@/components/ui/pointer";

import excitedMascot from "../assets/excited_mascot.png";
import events from "../data/events";

/* ======================================================== */
/* EVENTS                                                   */
/* ======================================================== */

const sortedEvents = [...events].sort(
  (a, b) =>
    new Date(a.rawDate) -
    new Date(b.rawDate),
);

/* ======================================================== */
/* HELPERS                                                  */
/* ======================================================== */

const clamp01 = (value) =>
  Math.min(1, Math.max(0, value));

const getEventSlug = (event) => {
  return (
    event.slug ||
    event.id ||
    event.title
      ?.toLowerCase()
      .replaceAll(" ", "-")
  );
};

const isTuniHackEvent = (event) => {
  const slug =
    getEventSlug(event)?.toLowerCase();

  return (
    slug === "tunihack" ||
    event.title
      ?.toLowerCase()
      .includes("tunihack")
  );
};

/* ======================================================== */
/* UPCOMING EVENTS                                          */
/* ======================================================== */

const isUpcomingEvent = (event) => {
  const slug =
    getEventSlug(event)?.toLowerCase();

  const title =
    event.title?.toLowerCase();

  return (
    slug?.includes("capture-the-cup") ||
    slug?.includes("fork-and-flag") ||
    title?.includes("capture the cup") ||
    title?.includes("fork and flag")
  );
};

const getEventActionLabel = (event) => {
  return isUpcomingEvent(event)
    ? "Upcoming"
    : "Discover the event";
};

/* ======================================================== */
/* CARD WRAPPER                                             */
/* ======================================================== */

/*
 * Upcoming events:
 * - render as a normal div
 * - no URL
 * - no navigation
 *
 * Existing events:
 * - render as React Router Link
 */
const EventCardShell = ({
  event,
  className,
  style,
  children,
}) => {
  if (isUpcomingEvent(event)) {
    return (
      <div
        className={className}
        style={style}
        aria-disabled="true"
      >
        {children}
      </div>
    );
  }

  return (
    <Link
      to={`/${getEventSlug(event)}`}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
};

/* ======================================================== */
/* SCROLL-LINKED CARD PROGRESS                              */
/* ======================================================== */

const useEventScrollProgress = () => {
  const elementRef = useRef(null);

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    let frameId = null;

    const updateProgress = () => {
      const element =
        elementRef.current;

      if (!element) {
        return;
      }

      const reduceMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      if (reduceMotion) {
        setProgress(1);
        return;
      }

      const rect =
        element.getBoundingClientRect();

      const start =
        window.innerHeight * 0.92;

      const end =
        window.innerHeight * 0.48;

      const value =
        (start - rect.top) /
        (start - end);

      setProgress(
        clamp01(value),
      );
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId =
        window.requestAnimationFrame(
          () => {
            updateProgress();
            frameId = null;
          },
        );
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(
          frameId,
        );
      }
    };
  }, []);

  return [
    elementRef,
    progress,
  ];
};

/* ======================================================== */
/* MOBILE TIMELINE PROGRESS                                 */
/* ======================================================== */

const useTimelineProgress = () => {
  const timelineRef = useRef(null);

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    let frameId = null;

    const updateProgress = () => {
      const timeline =
        timelineRef.current;

      if (!timeline) {
        return;
      }

      const rect =
        timeline.getBoundingClientRect();

      const start =
        window.innerHeight * 0.68;

      const distance =
        Math.max(
          rect.height -
            window.innerHeight * 0.32,
          1,
        );

      const value =
        (start - rect.top) /
        distance;

      setProgress(
        clamp01(value),
      );
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId =
        window.requestAnimationFrame(
          () => {
            updateProgress();
            frameId = null;
          },
        );
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(
          frameId,
        );
      }
    };
  }, []);

  return [
    timelineRef,
    progress,
  ];
};

/* ======================================================== */
/* LOGO                                                     */
/* ======================================================== */

const EventLogo = ({
  event,
  large = false,
}) => {
  if (event.logo) {
    return (
      <img
        src={event.logo}
        alt={`${event.title} logo`}
        draggable="false"
        className={`
          select-none
          object-contain

          ${
            large
              ? "max-h-[150px] max-w-[220px]"
              : "h-9 w-9 sm:h-11 sm:w-11"
          }
        `}
      />
    );
  }

  return (
    <div
      className={`
        flex
        flex-col

        items-center
        justify-center

        text-center

        ${
          large
            ? "gap-2"
            : ""
        }
      `}
    >
      <span
        className={`
          font-semibold

          uppercase

          tracking-[0.18em]

          text-[#122150]/45

          dark:text-white/45

          ${
            large
              ? "text-[11px]"
              : "text-[8px]"
          }
        `}
      >
        Logo
      </span>

      <span
        className={`
          uppercase

          tracking-[0.12em]

          text-[#122150]/25

          dark:text-white/25

          ${
            large
              ? "text-[9px]"
              : "mt-1 text-[7px]"
          }
        `}
      >
        Placeholder
      </span>
    </div>
  );
};

/* ======================================================== */
/* TAGS                                                     */
/* ======================================================== */

const EventTags = ({
  event,
  mobile = false,
}) => {
  const tags = event.tags || [];

  const visibleTags = mobile
    ? tags.slice(0, 2)
    : tags.slice(0, 3);

  return (
    <div
      className="
        flex
        flex-wrap
        gap-2
      "
    >
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className="
            rounded-full

            border
            border-[#122150]/8

            bg-[#122150]/[0.035]

            px-2.5
            py-1.5

            text-[8px]
            font-semibold

            uppercase

            tracking-[0.11em]

            text-[#122150]/60

            dark:border-white/10
            dark:bg-white/[0.05]
            dark:text-white/55

            sm:px-3
            sm:text-[9px]
          "
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

/* ======================================================== */
/* MOBILE EVENT CARD                                        */
/* ======================================================== */

const MobileEventCard = ({
  event,
}) => {
  const [
    cardRef,
    progress,
  ] = useEventScrollProgress();

  const featured =
    isTuniHackEvent(event);

  const upcoming =
    isUpcomingEvent(event);

  const opacity =
    0.55 +
    progress * 0.45;

  const translateY =
    18 * (1 - progress);

  return (
    <article
      ref={cardRef}
      className="
        relative
        pl-9
      "
    >
      {/* Timeline point */}

      <div
        className="
          absolute

          left-[1px]
          top-[3px]

          z-20

          flex
          size-3

          items-center
          justify-center

          rounded-full

          border-2
          border-[#2A7999]

          bg-[#080D1A]
        "
      >
        <span
          className="
            size-1
            rounded-full
            bg-[#2A7999]
          "
        />
      </div>

      {/* Date */}

      <p
        className="
          mb-3

          text-[10px]
          font-semibold

          uppercase

          tracking-[0.18em]

          text-[#2A7999]
        "
      >
        {event.date}
      </p>

      {/* Card */}

      <EventCardShell
        event={event}
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0)`,
        }}
        className={`
          group
          relative

          flex
          min-h-[310px]

          w-full
          flex-col

          overflow-hidden

          rounded-[1.6rem]

          border

          bg-white/70

          p-5

          shadow-[0_14px_40px_rgba(18,33,80,0.07)]

          backdrop-blur-xl

          will-change-transform

          dark:bg-white/[0.04]

          ${
            upcoming
              ? "cursor-default"
              : "active:scale-[0.985]"
          }

          ${
            featured
              ? `
                border-[#2A7999]/40
                shadow-[0_16px_48px_rgba(42,121,153,0.12)]
              `
              : `
                border-[#122150]/10
                dark:border-white/10
              `
          }
        `}
      >
        {/* Glow */}

        <div
          className="
            pointer-events-none

            absolute

            -right-16
            -top-16

            size-48

            rounded-full

            opacity-15

            blur-3xl
          "
          style={{
            backgroundColor:
              event.accent ||
              "#2A7999",
          }}
        />

        {/* Grid */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-[0.025]

            [background-image:linear-gradient(#122150_1px,transparent_1px),linear-gradient(90deg,#122150_1px,transparent_1px)]

            [background-size:28px_28px]

            dark:opacity-[0.04]

            dark:[background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          "
        />

        <div
          className="
            relative
            z-10

            flex
            h-full

            flex-1
            flex-col
          "
        >
          {/* Logo */}

          <div
            className="
              flex
              size-14

              items-center
              justify-center

              rounded-[1rem]

              border
              border-[#122150]/10

              bg-white/65

              shadow-[0_8px_22px_rgba(18,33,80,0.06)]

              dark:border-white/10
              dark:bg-white/[0.05]
            "
          >
            <EventLogo
              event={event}
            />
          </div>

          {/* Content */}

          <div className="mt-5">
            <h3
              className="
                text-[1.4rem]
                font-semibold

                leading-tight

                tracking-[-0.035em]

                text-[#122150]

                dark:text-white
              "
            >
              {event.title}
            </h3>

            <p
              className="
                mt-3

                text-[13px]
                leading-6

                text-[#122150]/55

                dark:text-white/50
              "
            >
              {
                event.shortDescription
              }
            </p>
          </div>

          {/* Footer */}

          <div
            className="
              mt-auto
              pt-5
            "
          >
            <EventTags
              event={event}
              mobile
            />

            <div
              className="
                mt-5

                flex

                items-end
                justify-between

                gap-3

                border-t
                border-[#122150]/8

                pt-4

                dark:border-white/10
              "
            >
              <span
                className={`
                  pb-1

                  text-[12px]
                  font-semibold

                  ${
                    upcoming
                      ? "text-[#2A7999]"
                      : "text-[#122150] dark:text-white"
                  }
                `}
              >
                {getEventActionLabel(event)}
              </span>

              {/* Nothing clickable for upcoming events */}

              {!upcoming && (
                <div
                  className="
                    flex
                    shrink-0

                    items-end
                    gap-2
                  "
                >
                  <img
                    src={excitedMascot}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                    className="
                      pointer-events-none

                      h-12
                      w-12

                      select-none
                      object-contain

                      drop-shadow-[0_8px_10px_rgba(18,33,80,0.22)]
                    "
                  />

                  <span
                    className="
                      flex
                      size-10

                      items-center
                      justify-center

                      rounded-full

                      bg-[#122150]

                      text-lg
                      text-white

                      dark:bg-[#2A7999]
                    "
                  >
                    ↗
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </EventCardShell>
    </article>
  );
};

/* ======================================================== */
/* MOBILE EVENT TIMELINE                                    */
/* ======================================================== */

const MobileEventsTimeline = () => {
  const [
    timelineRef,
    timelineProgress,
  ] = useTimelineProgress();

  return (
    <div
      ref={timelineRef}
      className="
        relative
        mt-10

        lg:hidden
      "
    >
      {/* Timeline background */}

      <div
        className="
          absolute

          bottom-5
          left-[6px]
          top-2

          w-px

          bg-[#122150]/10

          dark:bg-white/10
        "
      />

      {/* Timeline progress */}

      <div
        className="
          absolute

          bottom-5
          left-[6px]
          top-2

          w-px

          origin-top

          bg-[#2A7999]

          will-change-transform
        "
        style={{
          transform: `scaleY(${timelineProgress})`,
        }}
      />

      <div className="space-y-8">
        {sortedEvents.map(
          (event) => (
            <MobileEventCard
              key={event.id}
              event={event}
            />
          ),
        )}
      </div>
    </div>
  );
};

/* ======================================================== */
/* DESKTOP COMPACT EVENT                                    */
/* ======================================================== */

const DesktopCompactEvent = ({
  event,
}) => {
  const [
    cardRef,
    progress,
  ] = useEventScrollProgress();

  const upcoming =
    isUpcomingEvent(event);

  const opacity =
    0.45 +
    progress * 0.55;

  const translateY =
    30 * (1 - progress);

  const scale =
    0.97 +
    progress * 0.03;

  return (
    <div
      ref={cardRef}
      className="
        relative
        z-0

        h-full

        overflow-visible

        hover:z-50
        focus-within:z-50
      "
    >
      <EventCardShell
        event={event}
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        }}
        className={`
          group
          relative

          flex
          min-h-[390px]
          h-full

          w-full
          flex-col

          overflow-hidden

          rounded-[2rem]

          border
          border-[#122150]/10

          bg-white/75

          p-7

          text-left

          shadow-[0_18px_50px_rgba(18,33,80,0.07)]

          backdrop-blur-xl

          transition-[border-color,box-shadow]
          duration-500

          will-change-transform

          dark:border-white/10
          dark:bg-white/[0.04]

          ${
            upcoming
              ? "cursor-default"
              : `
                hover:border-[#2A7999]/35

                hover:shadow-[0_28px_75px_rgba(42,121,153,0.15)]

                focus-visible:outline-none

                focus-visible:ring-4
                focus-visible:ring-[#2A7999]/25
              `
          }
        `}
      >
        {/* Glow */}

        <div
          className={`
            pointer-events-none

            absolute

            -right-20
            -top-20

            size-60

            rounded-full

            opacity-15

            blur-3xl

            transition-transform
            duration-700

            ${
              upcoming
                ? ""
                : "group-hover:scale-125"
            }
          `}
          style={{
            backgroundColor:
              event.accent ||
              "#2A7999",
          }}
        />

        {/* Grid */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-[0.025]

            [background-image:linear-gradient(#122150_1px,transparent_1px),linear-gradient(90deg,#122150_1px,transparent_1px)]

            [background-size:32px_32px]

            dark:opacity-[0.04]

            dark:[background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          "
        />

        <div
          className="
            relative
            z-10

            flex
            h-full

            flex-1
            flex-col
          "
        >
          {/* Top */}

          <div
            className="
              flex

              items-start
              justify-between

              gap-5
            "
          >
            <div
              className="
                flex
                size-20

                items-center
                justify-center

                rounded-2xl

                border
                border-[#122150]/10

                bg-white/65

                shadow-[0_10px_25px_rgba(18,33,80,0.07)]

                dark:border-white/10
                dark:bg-white/[0.05]
              "
            >
              <EventLogo
                event={event}
              />
            </div>

            <span
              className="
                inline-flex

                rounded-full

                border
                border-[#2A7999]/18

                bg-[#2A7999]/10

                px-3.5
                py-1.5

                text-[10px]
                font-semibold

                uppercase

                tracking-[0.16em]

                text-[#2A7999]
              "
            >
              {event.date}
            </span>
          </div>

          {/* Text */}

          <div className="mt-9">
            <h3
              className="
                text-[2rem]
                font-semibold

                tracking-[-0.04em]

                text-[#122150]

                dark:text-white
              "
            >
              {event.title}
            </h3>

            <p
              className="
                mt-4

                max-w-lg

                text-[15px]
                leading-7

                text-[#122150]/55

                dark:text-white/50
              "
            >
              {
                event.shortDescription
              }
            </p>
          </div>

          {/* Footer */}

          <div
            className="
              mt-auto
              pt-7
            "
          >
            <EventTags
              event={event}
            />

            <div
              className="
                mt-6

                flex

                items-end
                justify-between

                gap-4

                border-t
                border-[#122150]/8

                pt-5

                dark:border-white/10
              "
            >
              <span
                className={`
                  text-sm
                  font-semibold

                  ${
                    upcoming
                      ? "text-[#2A7999]"
                      : "text-[#122150] dark:text-white"
                  }
                `}
              >
                {getEventActionLabel(event)}
              </span>

              {!upcoming && (
                <div
                  className="
                    flex
                    items-end
                    gap-2
                  "
                >
                  <img
                    src={excitedMascot}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                    className="
                      pointer-events-none

                      h-14
                      w-14

                      select-none
                      object-contain

                      drop-shadow-[0_8px_10px_rgba(18,33,80,0.22)]
                    "
                  />

                  <span
                    className="
                      flex
                      size-11

                      items-center
                      justify-center

                      rounded-full

                      bg-[#122150]

                      text-lg
                      text-white

                      transition-all
                      duration-300

                      group-hover:translate-x-1
                      group-hover:bg-[#2A7999]

                      dark:bg-[#2A7999]
                    "
                  >
                    ↗
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </EventCardShell>

      {/* Cursor mascot only for real pages */}

      {!upcoming && (
        <Pointer
          className="
            hidden
            z-[100]

            lg:block
          "
        >
          <div
            className="
              pointer-events-none

              relative
              z-[100]

              flex
              size-28

              items-center
              justify-center
            "
          >
            <img
              src={excitedMascot}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="
                pointer-events-none

                h-28
                w-28

                select-none
                object-contain

                drop-shadow-[0_14px_16px_rgba(18,33,80,0.38)]
              "
            />
          </div>
        </Pointer>
      )}
    </div>
  );
};

/* ======================================================== */
/* DESKTOP FEATURE EVENT                                    */
/* ======================================================== */

const DesktopFeatureEvent = ({
  event,
  reverse = false,
}) => {
  const [
    cardRef,
    progress,
  ] = useEventScrollProgress();

  const featured =
    isTuniHackEvent(event);

  const upcoming =
    isUpcomingEvent(event);

  const opacity =
    0.45 +
    progress * 0.55;

  const translateY =
    30 * (1 - progress);

  const scale =
    0.975 +
    progress * 0.025;

  const textParallax =
    20 * (1 - progress);

  const visualParallax =
    8 * (1 - progress);

  return (
    <div
      ref={cardRef}
      className="
        relative
        z-0

        overflow-visible

        hover:z-50
        focus-within:z-50
      "
    >
      <EventCardShell
        event={event}
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        }}
        className={`
          group
          relative

          block

          min-h-[440px]

          overflow-hidden

          rounded-[2.25rem]

          border

          bg-white/75

          p-8

          shadow-[0_22px_65px_rgba(18,33,80,0.08)]

          backdrop-blur-xl

          transition-[border-color,box-shadow]
          duration-500

          will-change-transform

          dark:bg-white/[0.04]

          ${
            upcoming
              ? "cursor-default"
              : `
                hover:shadow-[0_32px_90px_rgba(42,121,153,0.14)]

                focus-visible:outline-none

                focus-visible:ring-4
                focus-visible:ring-[#2A7999]/25
              `
          }

          ${
            featured
              ? `
                border-[#2A7999]/35

                shadow-[0_26px_80px_rgba(42,121,153,0.12)]
              `
              : `
                border-[#122150]/10

                ${
                  upcoming
                    ? ""
                    : "hover:border-[#2A7999]/30"
                }

                dark:border-white/10
              `
          }
        `}
      >
        {/* Ambient glow */}

        <div
          className={`
            pointer-events-none

            absolute

            -right-28
            -top-28

            size-[420px]

            rounded-full

            opacity-[0.14]

            blur-[100px]

            transition-transform
            duration-700

            ${
              upcoming
                ? ""
                : "group-hover:scale-110"
            }
          `}
          style={{
            backgroundColor:
              event.accent ||
              "#2A7999",
          }}
        />

        <div
          className="
            pointer-events-none

            absolute

            -bottom-36
            -left-28

            size-[360px]

            rounded-full

            bg-[#2A7999]/[0.07]

            blur-[100px]
          "
        />

        {/* Grid */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-[0.025]

            [background-image:linear-gradient(#122150_1px,transparent_1px),linear-gradient(90deg,#122150_1px,transparent_1px)]

            [background-size:38px_38px]

            dark:opacity-[0.04]

            dark:[background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          "
        />

        <div
          className="
            relative
            z-10

            grid

            min-h-[375px]

            grid-cols-[1.05fr_0.95fr]

            items-center

            gap-12
          "
        >
          {/* Text */}

          <div
            className={`
              ${
                reverse
                  ? "order-2"
                  : "order-1"
              }
            `}
            style={{
              transform: `translate3d(0, ${textParallax}px, 0)`,
            }}
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  inline-flex

                  rounded-full

                  border
                  border-[#2A7999]/20

                  bg-[#2A7999]/10

                  px-4
                  py-2

                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[0.17em]

                  text-[#2A7999]
                "
              >
                {event.date}
              </span>

              <span
                className="
                  h-px
                  w-10

                  bg-[#2A7999]/35
                "
              />
            </div>

            <h3
              className="
                mt-7

                max-w-xl

                text-[2.75rem]
                font-semibold

                leading-[1.05]

                tracking-[-0.045em]

                text-[#122150]

                dark:text-white

                xl:text-5xl
              "
            >
              {event.title}
            </h3>

            <p
              className="
                mt-6

                max-w-xl

                text-base
                leading-8

                text-[#122150]/55

                dark:text-white/50

                xl:text-lg
              "
            >
              {
                event.shortDescription
              }
            </p>

            <div className="mt-7">
              <EventTags
                event={event}
              />
            </div>

            <div
              className="
                mt-10

                flex
                items-center

                gap-4
              "
            >
              <span
                className={`
                  text-sm
                  font-semibold

                  ${
                    upcoming
                      ? "text-[#2A7999]"
                      : "text-[#122150] dark:text-white"
                  }
                `}
              >
                {getEventActionLabel(event)}
              </span>

              {!upcoming && (
                <span
                  className="
                    flex
                    size-11

                    items-center
                    justify-center

                    rounded-full

                    bg-[#122150]

                    text-lg
                    text-white

                    transition-all
                    duration-300

                    group-hover:translate-x-1
                    group-hover:bg-[#2A7999]

                    dark:bg-[#2A7999]
                  "
                >
                  ↗
                </span>
              )}
            </div>
          </div>

          {/* Visual */}

          <div
            className={`
              ${
                reverse
                  ? "order-1"
                  : "order-2"
              }
            `}
            style={{
              transform: `translate3d(0, ${visualParallax}px, 0)`,
            }}
          >
            <div
              className="
                relative

                flex
                min-h-[330px]

                items-center
                justify-center

                overflow-hidden

                rounded-[1.8rem]

                border
                border-[#122150]/10

                bg-[#F8FBFC]/60

                shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]

                dark:border-white/10
                dark:bg-[#080D1A]/45
              "
            >
              <div
                className="
                  pointer-events-none

                  absolute
                  inset-0

                  opacity-[0.035]

                  [background-image:linear-gradient(#122150_1px,transparent_1px),linear-gradient(90deg,#122150_1px,transparent_1px)]

                  [background-size:30px_30px]

                  dark:opacity-[0.05]

                  dark:[background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
                "
              />

              <div
                className="
                  pointer-events-none

                  absolute

                  left-1/2
                  top-1/2

                  size-[260px]

                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-full

                  opacity-15

                  blur-[75px]
                "
                style={{
                  backgroundColor:
                    event.accent ||
                    "#2A7999",
                }}
              />

              <div
                className="
                  relative
                  z-10

                  flex
                  min-h-[250px]

                  w-[78%]

                  items-center
                  justify-center

                  rounded-[1.5rem]

                  border
                  border-[#2A7999]/15

                  bg-white/40

                  dark:bg-white/[0.025]
                "
              >
                <EventLogo
                  event={event}
                  large
                />
              </div>

              <img
                src={excitedMascot}
                alt=""
                aria-hidden="true"
                draggable="false"
                className={`
                  pointer-events-none

                  absolute

                  bottom-3
                  right-4
                  z-20

                  h-20
                  w-20

                  select-none
                  object-contain

                  drop-shadow-[0_12px_16px_rgba(18,33,80,0.28)]

                  transition-transform
                  duration-500

                  ${
                    upcoming
                      ? ""
                      : "group-hover:-translate-y-1"
                  }
                `}
              />
            </div>
          </div>
        </div>
      </EventCardShell>

      {/* Follow-cursor mascot removed for upcoming events */}

      {!upcoming && (
        <Pointer
          className="
            hidden
            z-[100]

            lg:block
          "
        >
          <div
            className="
              pointer-events-none

              relative
              z-[100]

              flex
              size-28

              items-center
              justify-center
            "
          >
            <img
              src={excitedMascot}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="
                pointer-events-none

                h-28
                w-28

                select-none
                object-contain

                drop-shadow-[0_14px_16px_rgba(18,33,80,0.38)]
              "
            />
          </div>
        </Pointer>
      )}
    </div>
  );
};

/* ======================================================== */
/* DESKTOP EVENTS                                           */
/* ======================================================== */

const DesktopEvents = () => {
  const compactEvents =
    sortedEvents.slice(0, 2);

  const featureEvents =
    sortedEvents.slice(2);

  return (
    <div
      className="
        mt-14

        hidden

        lg:block
      "
    >
      {/* First two */}

      <div
        className="
          grid

          grid-cols-2

          gap-5

          xl:gap-6
        "
      >
        {compactEvents.map(
          (event) => (
            <DesktopCompactEvent
              key={event.id}
              event={event}
            />
          ),
        )}
      </div>

      {/* Feature cards */}

      <div
        className="
          mt-6
          space-y-6
        "
      >
        {featureEvents.map(
          (event, index) => (
            <DesktopFeatureEvent
              key={event.id}
              event={event}
              reverse={
                index % 2 === 1
              }
            />
          ),
        )}
      </div>
    </div>
  );
};

/* ======================================================== */
/* EVENTS SECTION                                           */
/* ======================================================== */

const EventsSection = () => {
  return (
    <section
      id="events"
      className="
        relative
        isolate

        overflow-x-clip

        scroll-mt-24

        bg-transparent

        py-14

        text-[#122150]

        dark:text-white

        sm:scroll-mt-28
        sm:py-20

        lg:py-24
      "
    >
      <div
        className="
          relative
          z-10

          mx-auto

          max-w-7xl

          px-5

          sm:px-8

          lg:px-12
        "
      >
        {/* ================================================= */}
        {/* BADGE                                            */}
        {/* ================================================= */}

        <div
          className="
            mb-7

            flex
            justify-center

            sm:mb-10
          "
        >
          <span
            className="
              inline-flex

              rounded-full

              border
              border-[#2A7999]/20

              bg-[#2A7999]/10

              px-4
              py-2

              text-[10px]
              font-semibold

              uppercase

              tracking-[0.2em]

              text-[#2A7999]

              sm:text-xs
            "
          >
            Events
          </span>
        </div>

        {/* ================================================= */}
        {/* INTRO                                            */}
        {/* ================================================= */}

        <div
          className="
            grid

            items-start

            gap-5

            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-end
            lg:gap-14
          "
        >
          <div>
            <h2
              className="
                mx-auto

                max-w-[350px]

                text-center

                text-[2rem]
                font-semibold

                leading-[1.08]

                tracking-[-0.045em]

                sm:max-w-2xl
                sm:text-5xl

                lg:mx-0
                lg:text-left
                lg:text-[3.6rem]
              "
            >
              Learn, compete

              <span
                className="
                  block
                  text-[#2A7999]
                "
              >
                and build through
                experience.
              </span>
            </h2>
          </div>

          <div
            className="
              mx-auto

              max-w-[350px]

              lg:mx-0
              lg:max-w-xl
              lg:justify-self-end
              lg:pb-1
            "
          >
            <p
              className="
                text-left

                text-[13px]
                leading-6

                text-[#122150]/55

                dark:text-white/50

                sm:text-center
                sm:text-base
                sm:leading-8

                lg:text-left
                lg:text-lg
                lg:leading-9
              "
            >
              From Linux workshops to
              hackathons and CTF
              competitions, discover the
              experiences that shape the
              OSSEC community.
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* MOBILE                                           */}
        {/* ================================================= */}

        <MobileEventsTimeline />

        {/* ================================================= */}
        {/* DESKTOP                                          */}
        {/* ================================================= */}

        <DesktopEvents />
      </div>
    </section>
  );
};

export default EventsSection;