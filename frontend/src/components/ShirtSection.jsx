import { useEffect, useRef, useState } from "react";

import trafalgarMain from "../assets/companions/trafalgar-main.png";
import trafalgarShare from "../assets/companions/trafalgar-share.png";

/* ======================================================== */
/* DETAILS                                                  */
/* ======================================================== */

const details = [
  {
    number: "01",
    title: "OSSEC identity",
    description: "The wordmark and club emblem.",
  },
  {
    number: "02",
    title: "Kali dragon",
    description: "A nod to Kali Linux and OSSEC’s cyber spirit.",
  },
  {
    number: "03",
    title: "Arabic signature",
    description: "A local touch woven into the composition.",
  },
  {
    number: "04",
    title: "20six / seven*",
    description: "A playful nod to the famous 6–7 meme.",
  },
];

/* ======================================================== */
/* HELPERS                                                  */
/* ======================================================== */

const clamp01 = (value) => {
  return Math.min(1, Math.max(0, value));
};

const smoothStep = (
  start,
  end,
  value,
) => {
  const progress = clamp01(
    (value - start) / (end - start),
  );

  return (
    progress *
    progress *
    (3 - 2 * progress)
  );
};

/* ======================================================== */
/* DESKTOP CALLOUT                                          */
/* ======================================================== */

const DesktopCallout = ({
  number,
  title,
  className = "",
}) => {
  return (
    <div
      className={`
        absolute z-40

        flex
        items-center

        gap-2

        rounded-2xl

        border
        border-[#2A7999]/20

        bg-[#F8FBFC]/95

        px-3
        py-2.5

        shadow-[0_12px_35px_rgba(18,33,80,0.12)]

        backdrop-blur-xl

        dark:border-[#2A7999]/30
        dark:bg-[#0D1629]/95

        ${className}
      `}
    >
      <span
        className="
          flex
          size-7
          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[#2A7999]/10

          text-[10px]
          font-semibold

          text-[#2A7999]
        "
      >
        {number}
      </span>

      <span
        className="
          whitespace-nowrap

          text-xs
          font-semibold

          text-[#122150]

          dark:text-white
        "
      >
        {title}
      </span>
    </div>
  );
};

/* ======================================================== */
/* MOBILE NUMBER BUTTON                                     */
/* ======================================================== */

const MobileNumberButton = ({
  label,
  active,
  onClick,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        absolute
        z-30

        flex
        size-11

        items-center
        justify-center

        rounded-full

        border-2

        text-xs
        font-bold

        shadow-[0_8px_25px_rgba(18,33,80,0.18)]

        transition-all
        duration-300

        ${
          active
            ? `
              border-[#2A7999]
              bg-[#2A7999]
              text-white
            `
            : `
              border-[#2A7999]/20
              bg-white
              text-[#2A7999]

              dark:bg-[#0D1629]
            `
        }

        ${className}
      `}
    >
      {label}
    </button>
  );
};

/* ======================================================== */
/* SHIRT SECTION                                            */
/* ======================================================== */

const ShirtSection = () => {
  /* Desktop progress */
  const backStoryRef = useRef(null);

  /* Mobile / tablet progress */
  const mobileStoryRef = useRef(null);

  const [backProgress, setBackProgress] =
    useState(0);

  const [
    mobileProgress,
    setMobileProgress,
  ] = useState(0);

  const [
    activeMobileDetail,
    setActiveMobileDetail,
  ] = useState(0);

  /* ====================================================== */
  /* SCROLL PROGRESS                                        */
  /* ====================================================== */

  useEffect(() => {
    let frameId = null;

    const updateProgress = () => {
      const isDesktop =
        window.innerWidth >= 1024;

      /* ================================================== */
      /* DESKTOP                                             */
      /* ================================================== */

      if (isDesktop) {
        const element =
          backStoryRef.current;

        if (element) {
          const rect =
            element.getBoundingClientRect();

          const start =
            window.innerHeight * 0.78;

          const end =
            window.innerHeight * 0.42;

          const progress =
            (start - rect.top) /
            (start - end);

          setBackProgress(
            clamp01(progress),
          );
        }

        return;
      }

      /* ================================================== */
      /* MOBILE / TABLET                                     */
      /* ================================================== */

      const element =
        mobileStoryRef.current;

      if (!element) {
        return;
      }

      const rect =
        element.getBoundingClientRect();

      /*
       * Match the sticky top position.
       *
       * Phone:
       * navbar ~ 64px
       *
       * Tablet:
       * navbar ~ 82px
       */
      const stickyTop =
        window.innerWidth >= 640
          ? 96
          : 72;

      /*
       * Distance available while the
       * sticky visual is pinned.
       */
      const travelDistance =
        Math.max(
          element.offsetHeight -
            window.innerHeight +
            stickyTop,
          1,
        );

      const progress =
        (stickyTop - rect.top) /
        travelDistance;

      setMobileProgress(
        clamp01(progress),
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

  /* ====================================================== */
  /* DESKTOP ANIMATION VALUES                               */
  /* ====================================================== */

  const frontOpacity =
    1 - backProgress;

  const backOpacity =
    backProgress;

  const annotationsOpacity =
    Math.min(
      1,
      Math.max(
        0,
        (backProgress - 0.62) /
          0.38,
      ),
    );

  /* ====================================================== */
  /* MOBILE ANIMATION VALUES                                */
  /* ====================================================== */

  /*
   * 0.00 — 0.24
   * Front stays completely visible.
   *
   * 0.24 — 0.56
   * Front smoothly becomes back.
   */
  const mobileTurnProgress =
    smoothStep(
      0.24,
      0.56,
      mobileProgress,
    );

  const mobileFrontOpacity =
    1 - mobileTurnProgress;

  const mobileBackOpacity =
    mobileTurnProgress;

  /*
   * Small product-style breathing
   * effect during the transition:
   *
   * 1 → 0.975 → 1
   */
  const mobileVisualScale =
    1 -
    Math.sin(
      mobileTurnProgress * Math.PI,
    ) *
      0.025;

  /*
   * Narrative title transition.
   */
  const mobileFrontTextOpacity =
    1 -
    smoothStep(
      0.32,
      0.5,
      mobileProgress,
    );

  const mobileBackTextOpacity =
    smoothStep(
      0.42,
      0.6,
      mobileProgress,
    );

  /*
   * Details arrive after the
   * back design is clearly visible.
   */
  const mobileDetailsOpacity =
    smoothStep(
      0.62,
      0.8,
      mobileProgress,
    );

  const mobileDetail =
    details[
      activeMobileDetail
    ] ?? details[0];

  return (
    <section
      id="shirt"
      className="
        relative

        scroll-mt-32

        bg-transparent

        py-24

        text-[#122150]

        dark:text-white

        sm:py-28

        lg:py-32
      "
    >
      <div
        className="
          mx-auto

          max-w-7xl

          px-5

          sm:px-8

          lg:px-12
        "
      >
        {/* ================================================= */}
        {/* INTRO                                             */}
        {/* ================================================= */}

        <div
          className="
            mx-auto

            max-w-3xl

            text-center
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

              text-xs
              font-semibold

              uppercase

              tracking-[0.2em]

              text-[#2A7999]
            "
          >
            OSSEC Club Drop
          </span>

          <h2
            className="
              mt-7

              text-4xl
              font-semibold

              leading-[1.05]

              tracking-[-0.045em]

              sm:text-5xl

              lg:text-6xl
            "
          >
            Wear the

            <span
              className="
                text-[#2A7999]
              "
            >
              {" "}
              community.
            </span>
          </h2>

          <p
            className="
              mx-auto

              mt-6
              max-w-xl

              text-base
              leading-8

              text-[#122150]/60

              dark:text-white/55

              sm:text-lg
            "
          >
            OSSEC identity, cybersecurity
            and community culture brought
            together in one design.
          </p>
        </div>

        {/* ================================================= */}
        {/* DESKTOP                                           */}
        {/* ================================================= */}

        <div
          className="
            mt-20

            hidden

            lg:grid
            lg:grid-cols-[0.88fr_1.12fr]
            lg:items-start
            lg:gap-16

            xl:gap-20
          "
        >
          {/* =============================================== */}
          {/* LEFT STORY                                      */}
          {/* =============================================== */}

          <div>
            {/* ============================================= */}
            {/* FRONT                                         */}
            {/* ============================================= */}

            <article
              className="
                flex
                min-h-[90vh]

                flex-col
                justify-center
              "
            >
              <p
                className="
                  text-xs
                  font-semibold

                  uppercase

                  tracking-[0.22em]

                  text-[#2A7999]
                "
              >
                01 / Meet the drop
              </p>

              <h3
                className="
                  mt-5
                  max-w-xl

                  text-4xl
                  font-semibold

                  leading-tight

                  tracking-[-0.04em]
                "
              >
                Trafalgar and the mascot
                are wearing OSSEC.
              </h3>

              <p
                className="
                  mt-6
                  max-w-md

                  text-lg
                  leading-8

                  text-[#122150]/60

                  dark:text-white/55
                "
              >
                White base. OSSEC blue
                details. Club emblem on
                the chest.
              </p>

              <div
                className="
                  mt-9

                  flex
                  flex-wrap

                  gap-3
                "
              >
                {[
                  "OSSEC Blue",
                  "White Polo",
                  "Club Identity",
                ].map((label) => (
                  <span
                    key={label}
                    className="
                      rounded-full

                      border
                      border-[#122150]/10

                      bg-white/55

                      px-4
                      py-2

                      text-xs
                      font-semibold

                      uppercase

                      tracking-[0.13em]

                      dark:border-white/10
                      dark:bg-white/[0.035]
                    "
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div
                className="
                  mt-12

                  flex
                  items-center

                  gap-4

                  text-sm
                  font-medium

                  text-[#2A7999]
                "
              >
                <span
                  className="
                    h-px
                    w-10

                    bg-[#2A7999]/50
                  "
                />

                Scroll to turn it around

                <span>↓</span>
              </div>
            </article>

            {/* ============================================= */}
            {/* BACK                                          */}
            {/* ============================================= */}

            <article
              ref={backStoryRef}
              className="
                flex
                min-h-[110vh]

                flex-col
                justify-center

                pb-[18vh]
              "
            >
              <p
                className="
                  text-xs
                  font-semibold

                  uppercase

                  tracking-[0.22em]

                  text-[#2A7999]
                "
              >
                02 / Turn it around
              </p>

              <h3
                className="
                  mt-5
                  max-w-xl

                  text-4xl
                  font-semibold

                  leading-tight

                  tracking-[-0.04em]
                "
              >
                The back tells the story.
              </h3>

              <p
                className="
                  mt-5
                  max-w-md

                  text-lg
                  leading-8

                  text-[#122150]/60

                  dark:text-white/55
                "
              >
                Four details. One OSSEC
                identity.
              </p>

              <div
                className="
                  mt-10

                  space-y-6
                "
              >
                {details.map(
                  (detail) => (
                    <div
                      key={
                        detail.number
                      }
                      className="
                        flex
                        items-start

                        gap-4
                      "
                    >
                      <span
                        className="
                          flex
                          size-10
                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-[#2A7999]/10

                          text-xs
                          font-semibold

                          text-[#2A7999]
                        "
                      >
                        {
                          detail.number
                        }
                      </span>

                      <div>
                        <h4
                          className="
                            font-semibold

                            text-[#122150]

                            dark:text-white
                          "
                        >
                          {
                            detail.title
                          }
                        </h4>

                        <p
                          className="
                            mt-1

                            text-sm
                            leading-6

                            text-[#122150]/50

                            dark:text-white/45
                          "
                        >
                          {
                            detail.description
                          }
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </article>
          </div>

          {/* =============================================== */}
          {/* RIGHT STICKY VISUAL                             */}
          {/* =============================================== */}

          <div
            className="
              sticky
              top-24

              self-start
            "
          >
            <div
              className="
                relative

                h-[calc(100vh-7.5rem)]

                min-h-[590px]
                max-h-[760px]

                overflow-hidden

                rounded-[2.5rem]

                border
                border-[#122150]/10

                bg-white/55

                shadow-[0_30px_90px_rgba(18,33,80,0.10)]

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              <div
                className="
                  pointer-events-none

                  absolute

                  bottom-[14%]
                  left-[15%]
                  right-[15%]
                  top-[16%]

                  rounded-full

                  bg-[#2A7999]/15

                  blur-[95px]
                "
              />

              {/* =========================================== */}
              {/* FRONT IMAGE                                 */}
              {/* =========================================== */}

              <div
                className="
                  absolute
                  inset-0

                  flex

                  items-center
                  justify-center
                "
                style={{
                  opacity:
                    frontOpacity,
                }}
              >
                <img
                  src={
                    trafalgarMain
                  }
                  alt="Trafalgar and OSSEC mascot wearing the OSSEC polo"
                  draggable="false"
                  className="
                    max-h-[88%]
                    max-w-[90%]

                    select-none

                    object-contain

                    drop-shadow-[0_30px_35px_rgba(18,33,80,0.18)]
                  "
                />
              </div>

              {/* =========================================== */}
              {/* BACK IMAGE                                  */}
              {/* =========================================== */}

              <div
                className="
                  absolute
                  inset-0

                  flex

                  items-center
                  justify-center
                "
                style={{
                  opacity:
                    backOpacity,
                }}
              >
                <img
                  src={
                    trafalgarShare
                  }
                  alt="Trafalgar and the OSSEC mascot showing the back of the polo"
                  draggable="false"
                  className="
                    max-h-[91%]
                    max-w-[90%]

                    select-none

                    object-contain

                    drop-shadow-[0_30px_35px_rgba(18,33,80,0.18)]
                  "
                />
              </div>

              {/* =========================================== */}
              {/* DESKTOP ANNOTATIONS                         */}
              {/* =========================================== */}

              <div
                className="
                  pointer-events-none

                  absolute
                  inset-0
                  z-30
                "
                style={{
                  opacity:
                    annotationsOpacity,
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="
                    absolute
                    inset-0

                    h-full
                    w-full
                  "
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="desktop-shirt-arrow"
                      markerWidth="5"
                      markerHeight="5"
                      refX="4"
                      refY="2.5"
                      orient="auto"
                    >
                      <path
                        d="M0 0 L5 2.5 L0 5 Z"
                        fill="#2A7999"
                      />
                    </marker>
                  </defs>

                  {/* 01 -> OSSEC wordmark */}
                  <path
                    d="M 22.6 14.6 C 28.5 24.5, 35.2 36.2, 43.4 50.2"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.35"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#desktop-shirt-arrow)"
                  />

                  {/* 02 -> Kali dragon */}
                  <path
                    d="M 73.4 43.4 C 67.8 46.4, 62.8 50.6, 55.3 56.0"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.35"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#desktop-shirt-arrow)"
                  />

                  {/* 03 -> Arabic */}
                  <path
                    d="M 23.5 76.0 C 29.5 73.8, 34.8 71.0, 41.8 66.9"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.35"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#desktop-shirt-arrow)"
                  />

                  {/* 04 -> 20six / seven */}
                  <path
                    d="M 81.5 82.6 C 72.4 78.4, 63.2 73.0, 51.8 67.7"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.35"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#desktop-shirt-arrow)"
                  />
                </svg>

                <DesktopCallout
                  number="01"
                  title="OSSEC identity"
                  className="
                    left-[2.2%]
                    top-[11.2%]
                  "
                />

                <DesktopCallout
                  number="02"
                  title="Kali dragon"
                  className="
                    right-[2.2%]
                    top-[36.5%]
                  "
                />

                <DesktopCallout
                  number="03"
                  title="Arabic signature"
                  className="
                    bottom-[16.2%]
                    left-[2.2%]
                  "
                />

                <DesktopCallout
                  number="04"
                  title="20six / seven*"
                  className="
                    bottom-[8.2%]
                    right-[2.2%]
                  "
                />
              </div>

              {/* =========================================== */}
              {/* FRONT / BACK INDICATOR                      */}
              {/* =========================================== */}

              <div
                className="
                  absolute

                  bottom-5
                  left-1/2
                  z-50

                  flex

                  -translate-x-1/2

                  items-center

                  gap-2

                  rounded-full

                  border
                  border-[#122150]/10

                  bg-white/95

                  px-4
                  py-2

                  shadow-[0_8px_30px_rgba(18,33,80,0.10)]

                  backdrop-blur-xl

                  dark:border-white/10
                  dark:bg-[#0D1629]/95
                "
              >
                <span
                  className={`
                    size-2
                    rounded-full

                    ${
                      backProgress <
                      0.5
                        ? "bg-[#2A7999]"
                        : "bg-[#122150]/15 dark:bg-white/15"
                    }
                  `}
                />

                <span
                  className={`
                    size-2
                    rounded-full

                    ${
                      backProgress >=
                      0.5
                        ? "bg-[#2A7999]"
                        : "bg-[#122150]/15 dark:bg-white/15"
                    }
                  `}
                />

                <span
                  className="
                    ml-2

                    text-[10px]
                    font-semibold

                    uppercase

                    tracking-[0.18em]

                    text-[#122150]/45

                    dark:text-white/45
                  "
                >
                  {backProgress <
                  0.5
                    ? "Front"
                    : "Back Design"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* MOBILE / TABLET — SCROLL STORY                    */}
        {/* ================================================= */}

        <div
          ref={mobileStoryRef}
          className="
            relative

            mt-14

            h-[190svh]

            lg:hidden

            sm:mt-16
            sm:h-[195svh]
          "
        >
          {/* =============================================== */}
          {/* STICKY STAGE                                    */}
          {/* =============================================== */}

          <div
            className="
              sticky

              top-[72px]

              sm:top-[96px]
            "
          >
            {/* ============================================= */}
            {/* DYNAMIC STORY TEXT                            */}
            {/* ============================================= */}

            <div
              className="
                relative

                h-[112px]

                sm:h-[122px]
              "
            >
              {/* Front text */}
              <div
                className="
                  absolute
                  inset-0

                  transition-opacity
                  duration-100
                "
                style={{
                  opacity:
                    mobileFrontTextOpacity,
                  transform: `translateY(${
                    (1 -
                      mobileFrontTextOpacity) *
                    -6
                  }px)`,
                }}
              >
                <p
                  className="
                    text-[10px]
                    font-semibold

                    uppercase

                    tracking-[0.2em]

                    text-[#2A7999]

                    sm:text-xs
                  "
                >
                  01 / Meet the drop
                </p>

                <h3
                  className="
                    mt-3

                    max-w-[350px]

                    text-[1.65rem]
                    font-semibold

                    leading-[1.12]

                    tracking-[-0.035em]

                    sm:mt-4
                    sm:max-w-xl
                    sm:text-3xl
                  "
                >
                  Trafalgar and the mascot
                  are wearing OSSEC.
                </h3>
              </div>

              {/* Back text */}
              <div
                className="
                  absolute
                  inset-0

                  transition-opacity
                  duration-100
                "
                style={{
                  opacity:
                    mobileBackTextOpacity,
                  transform: `translateY(${
                    (1 -
                      mobileBackTextOpacity) *
                    6
                  }px)`,
                }}
              >
                <p
                  className="
                    text-[10px]
                    font-semibold

                    uppercase

                    tracking-[0.2em]

                    text-[#2A7999]

                    sm:text-xs
                  "
                >
                  02 / Turn it around
                </p>

                <h3
                  className="
                    mt-3

                    text-[1.65rem]
                    font-semibold

                    leading-[1.12]

                    tracking-[-0.035em]

                    sm:mt-4
                    sm:text-3xl
                  "
                >
                  The back tells the story.
                </h3>

                <p
                  className="
                    mt-2

                    text-[12px]

                    text-[#122150]/50

                    dark:text-white/45

                    sm:text-sm
                  "
                >
                  Tap a number to discover
                  each detail.
                </p>
              </div>
            </div>

            {/* ============================================= */}
            {/* ONE SHARED VISUAL                             */}
            {/* ============================================= */}

            <div
              className="
                relative

                mt-3

                h-[52svh]

                min-h-[380px]
                max-h-[500px]

                overflow-hidden

                rounded-[1.75rem]

                border
                border-[#122150]/10

                bg-white/55

                shadow-[0_20px_55px_rgba(18,33,80,0.08)]

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.03]

                sm:mt-4
                sm:h-[58svh]
                sm:min-h-[470px]
                sm:max-h-[580px]
                sm:rounded-[2rem]
              "
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none

                  absolute

                  bottom-[12%]
                  left-[12%]
                  right-[12%]
                  top-[12%]

                  rounded-full

                  bg-[#2A7999]/12

                  blur-[75px]
                "
              />

              {/* =========================================== */}
              {/* IMAGE STAGE                                 */}
              {/* =========================================== */}

              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  transform: `scale(${mobileVisualScale})`,
                  transformOrigin:
                    "center center",
                }}
              >
                {/* Front */}
                <div
                  className="
                    absolute
                    inset-0

                    flex

                    items-center
                    justify-center
                  "
                  style={{
                    opacity:
                      mobileFrontOpacity,
                  }}
                >
                  <img
                    src={
                      trafalgarMain
                    }
                    alt="Trafalgar and OSSEC mascot wearing the OSSEC polo"
                    draggable="false"
                    className="
                      max-h-[92%]
                      w-[92%]

                      select-none

                      object-contain

                      drop-shadow-[0_24px_30px_rgba(18,33,80,0.16)]

                      sm:max-h-[94%]
                      sm:w-[88%]
                    "
                  />
                </div>

                {/* Back */}
                <div
                  className="
                    absolute
                    inset-0

                    flex

                    items-center
                    justify-center
                  "
                  style={{
                    opacity:
                      mobileBackOpacity,
                  }}
                >
                  <img
                    src={
                      trafalgarShare
                    }
                    alt="Back design of the OSSEC polo"
                    draggable="false"
                    className="
                      max-h-[94%]
                      w-[72%]

                      select-none

                      object-contain

                      drop-shadow-[0_24px_30px_rgba(18,33,80,0.16)]

                      sm:w-[68%]
                    "
                  />
                </div>
              </div>

              {/* =========================================== */}
              {/* BACK ANNOTATIONS                            */}
              {/* =========================================== */}

              <div
                className="
                  absolute
                  inset-0
                  z-30
                "
                style={{
                  opacity:
                    mobileDetailsOpacity,

                  pointerEvents:
                    mobileDetailsOpacity >
                    0.45
                      ? "auto"
                      : "none",
                }}
              >
                {/* ========================================= */}
                {/* ARROWS                                    */}
                {/* ========================================= */}

                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="
                    pointer-events-none

                    absolute
                    inset-0
                    z-20

                    h-full
                    w-full
                  "
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="mobile-shirt-arrow"
                      markerWidth="5"
                      markerHeight="5"
                      refX="4"
                      refY="2.5"
                      orient="auto"
                    >
                      <path
                        d="M0 0 L5 2.5 L0 5 Z"
                        fill="#2A7999"
                      />
                    </marker>
                  </defs>

                  {/* 01 -> OSSEC wordmark */}
                  <path
                    d="M 13.8 20.8 C 22.2 29.8, 31.0 39.6, 43.7 49.8"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.3"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#mobile-shirt-arrow)"
                  />

                  {/* 02 -> Kali dragon */}
                  <path
                    d="M 84.8 37.8 C 75.8 43.0, 66.3 49.2, 54.3 57.1"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.3"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#mobile-shirt-arrow)"
                  />

                  {/* 03 -> Arabic lettering */}
                  <path
                    d="M 14.2 79.8 C 23.0 76.4, 31.0 72.8, 41.7 67.6"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.3"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#mobile-shirt-arrow)"
                  />

                  {/* 04 -> 20six / seven */}
                  <path
                    d="M 85.0 84.5 C 74.5 79.6, 63.8 74.2, 50.8 68.3"
                    fill="none"
                    stroke="#2A7999"
                    strokeWidth="1.3"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    markerEnd="url(#mobile-shirt-arrow)"
                  />
                </svg>

                {/* ========================================= */}
                {/* NUMBER BUTTONS                            */}
                {/* ========================================= */}

                <MobileNumberButton
                  label="01"
                  active={
                    activeMobileDetail ===
                    0
                  }
                  onClick={() =>
                    setActiveMobileDetail(
                      0,
                    )
                  }
                  className="
                    left-3
                    top-[18%]
                  "
                  ariaLabel="OSSEC identity"
                />

                <MobileNumberButton
                  label="02"
                  active={
                    activeMobileDetail ===
                    1
                  }
                  onClick={() =>
                    setActiveMobileDetail(
                      1,
                    )
                  }
                  className="
                    right-3
                    top-[35%]
                  "
                  ariaLabel="Kali dragon"
                />

                <MobileNumberButton
                  label="03"
                  active={
                    activeMobileDetail ===
                    2
                  }
                  onClick={() =>
                    setActiveMobileDetail(
                      2,
                    )
                  }
                  className="
                    bottom-[23%]
                    left-3
                  "
                  ariaLabel="Arabic signature"
                />

                <MobileNumberButton
                  label="04"
                  active={
                    activeMobileDetail ===
                    3
                  }
                  onClick={() =>
                    setActiveMobileDetail(
                      3,
                    )
                  }
                  className="
                    bottom-[14%]
                    right-3
                  "
                  ariaLabel="20six / seven"
                />
              </div>
            </div>

            {/* ============================================= */}
            {/* SELECTED DETAIL                               */}
            {/* ============================================= */}

            <div
              key={
                mobileDetail.number
              }
              className="
                mt-3

                min-h-[86px]

                rounded-[1.25rem]

                border
                border-[#122150]/10

                bg-white/65

                p-3.5

                shadow-[0_10px_28px_rgba(18,33,80,0.05)]

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-white/[0.035]

                sm:mt-4
                sm:min-h-[100px]
                sm:rounded-[1.5rem]
                sm:p-5
              "
              style={{
                opacity:
                  mobileDetailsOpacity,

                transform: `translateY(${
                  (1 -
                    mobileDetailsOpacity) *
                  8
                }px)`,

                pointerEvents:
                  mobileDetailsOpacity >
                  0.45
                    ? "auto"
                    : "none",
              }}
            >
              <div
                className="
                  flex
                  items-start

                  gap-3

                  sm:gap-4
                "
              >
                <span
                  className="
                    flex
                    size-9
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-[#2A7999]/10

                    text-[10px]
                    font-semibold

                    text-[#2A7999]

                    sm:size-10
                    sm:text-xs
                  "
                >
                  {mobileDetail.number}
                </span>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <h4
                    className="
                      text-[13px]
                      font-semibold

                      text-[#122150]

                      dark:text-white

                      sm:text-base
                    "
                  >
                    {mobileDetail.title}
                  </h4>

                  <p
                    className="
                      mt-1

                      text-[11px]
                      leading-5

                      text-[#122150]/50

                      dark:text-white/45

                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    {
                      mobileDetail.description
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShirtSection;