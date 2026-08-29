import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CalendarDays,
  UserPlus,
  UsersRound,
} from "lucide-react";

import SectionReveal from "./SectionReveal";

const values = [
  {
    number: "01",
    title: "Learn",
    description:
      "Discover cybersecurity through practical workshops, technical sessions and shared knowledge.",
  },
  {
    number: "02",
    title: "Practice",
    description:
      "Develop real technical skills by solving challenges and participating in CTF competitions.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Join a community of students driven by curiosity, collaboration and continuous growth.",
  },
];

const AboutSection = () => {
  const statsRef = useRef(null);

  const animationFrameRef = useRef(null);
  const animationDelayRef = useRef(null);

  /*
   * Prevents the observer from restarting the animation
   * several times during the same visit.
   *
   * Once the statistics leave the viewport,
   * this becomes false again.
   */
  const hasPlayedThisPassRef = useRef(false);

  const [statsProgress, setStatsProgress] =
    useState(0);

  /* ====================================================== */
  /* REPLAYABLE SYNCHRONIZED STATISTICS                     */
  /* ====================================================== */

  useEffect(() => {
    const element = statsRef.current;

    if (!element) {
      return;
    }

    const stopAnimation = () => {
      window.clearTimeout(
        animationDelayRef.current,
      );

      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current = null;
      }
    };

    const startAnimation = () => {
      stopAnimation();

      /*
       * Restart every counter from zero.
       */
      setStatsProgress(0);

      const delay = 150;
      const duration = 1500;

      animationDelayRef.current =
        window.setTimeout(() => {
          const startTime =
            performance.now();

          const animate = (
            currentTime,
          ) => {
            const elapsed =
              currentTime - startTime;

            const linearProgress =
              Math.min(
                elapsed / duration,
                1,
              );

            /*
             * Smooth ease-out.
             *
             * ALL counters use this exact
             * same progress value.
             *
             * Therefore 2012, 10000 and 120
             * all finish on the same frame.
             */
            const easedProgress =
              1 -
              Math.pow(
                1 - linearProgress,
                3,
              );

            setStatsProgress(
              easedProgress,
            );

            if (linearProgress < 1) {
              animationFrameRef.current =
                requestAnimationFrame(
                  animate,
                );
            } else {
              setStatsProgress(1);
              animationFrameRef.current =
                null;
            }
          };

          animationFrameRef.current =
            requestAnimationFrame(
              animate,
            );
        }, delay);
    };

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          /*
           * START
           *
           * When around 35% of the statistics
           * block enters the viewport.
           */
          if (
            entry.intersectionRatio >=
              0.35 &&
            !hasPlayedThisPassRef.current
          ) {
            hasPlayedThisPassRef.current =
              true;

            startAnimation();

            return;
          }

          /*
           * RESET
           *
           * Once almost all of the statistics
           * block has left the viewport,
           * prepare it for the next visit.
           */
          if (
            entry.intersectionRatio <=
            0.05
          ) {
            hasPlayedThisPassRef.current =
              false;

            stopAnimation();

            setStatsProgress(0);
          }
        },
        {
          threshold: [
            0,
            0.05,
            0.35,
          ],
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();

      stopAnimation();
    };
  }, []);

  /*
   * Same progress for all three.
   */
  const animatedYear = Math.round(
    2012 * statsProgress,
  );

  const animatedFollowers = Math.round(
    10000 * statsProgress,
  );

  const animatedMembers = Math.round(
    120 * statsProgress,
  );

  return (
    <section
      id="about"
      className="
        relative
        overflow-x-clip

        scroll-mt-24

        bg-transparent

        pb-10
        pt-12

        text-[#122150]

        dark:text-white

        sm:scroll-mt-32
        sm:pb-14
        sm:pt-24
      "
    >
      {/* ================================================== */}
      {/* DECORATIVE LEFT GLOW                               */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none

          absolute
          -left-44
          top-10

          size-[300px]

          rounded-full

          bg-[#2A7999]/8

          blur-[100px]

          sm:-left-52
          sm:top-16
          sm:size-[460px]
          sm:bg-[#2A7999]/10
          sm:blur-[120px]
        "
      />

      {/* ================================================== */}
      {/* DECORATIVE RIGHT GLOW                              */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none

          absolute
          -right-44
          bottom-10

          size-[320px]

          rounded-full

          bg-[#122150]/7

          blur-[110px]

          dark:bg-[#2A7999]/8

          sm:-right-52
          sm:bottom-20
          sm:size-[500px]
          sm:bg-[#122150]/10
          sm:blur-[130px]

          dark:sm:bg-[#2A7999]/10
        "
      />

      <SectionReveal variant="rise">
        <div
          className="
            relative

            mx-auto

            w-full
            max-w-7xl

            px-4

            sm:px-8
            lg:px-12
          "
        >
          {/* ================================================= */}
          {/* ABOUT BADGE                                       */}
          {/* ================================================= */}

          <div
            className="
              mb-5

              flex
              justify-center

              sm:mb-9
            "
          >
            <span
              className="
                inline-flex

                rounded-full

                border
                border-[#2A7999]/20

                bg-[#2A7999]/10

                px-3
                py-1.5

                text-[10px]
                font-semibold
                uppercase

                tracking-[0.18em]

                text-[#2A7999]

                sm:px-4
                sm:py-2
                sm:text-xs
                sm:tracking-[0.2em]
              "
            >
              About OSSEC
            </span>
          </div>

          {/* ================================================= */}
          {/* INTRODUCTION                                      */}
          {/* ================================================= */}

          <div
            className="
              grid
              items-center

              gap-5

              sm:gap-10

              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-16
            "
          >
            {/* Title */}
            <div>
              <h2
                className="
                  mx-auto
                  max-w-[340px]

                  text-center

                  text-[1.65rem]
                  font-semibold

                  leading-[1.1]

                  tracking-[-0.04em]

                  [text-wrap:balance]

                  sm:mx-0
                  sm:max-w-none
                  sm:text-left
                  sm:text-5xl
                  sm:leading-tight
                  sm:tracking-[-0.045em]

                  lg:text-[3.4rem]
                "
              >
                More than a club.

                <span
                  className="
                    mt-1
                    block

                    text-[#2A7999]

                    sm:mt-0
                  "
                >
                  An Open Source &amp;
                  Cybersecurity Community.
                </span>
              </h2>
            </div>

            {/* Description */}
            <div
              className="
                mx-auto

                w-full
                max-w-[350px]

                sm:mx-0
                sm:max-w-2xl
              "
            >
              <p
                className="
                  text-left

                  text-[13px]
                  leading-[1.7]

                  text-[#122150]/65

                  [text-wrap:pretty]

                  dark:text-white/60

                  sm:text-lg
                  sm:leading-9
                "
              >
                OSSEC brings together ENSI students
                interested in open source,
                cybersecurity, technology and
                practical learning. It creates a
                space where members can discover
                new fields, exchange knowledge and
                grow through teamwork.
              </p>

              <p
                className="
                  mt-3

                  text-left

                  text-[13px]
                  leading-[1.7]

                  text-[#122150]/65

                  [text-wrap:pretty]

                  dark:text-white/60

                  sm:mt-5
                  sm:text-lg
                  sm:leading-9
                "
              >
                Through workshops, technical
                activities, competitions and
                hands-on challenges, members
                transform curiosity into real
                experience.
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* STATISTICS                                        */}
          {/* ================================================= */}

          <div
            ref={statsRef}
            className="
              mt-7

              grid
              gap-2.5

              sm:mt-14
              sm:grid-cols-2
              sm:gap-4

              lg:mt-16
              lg:grid-cols-3
            "
          >
            {/* =============================================== */}
            {/* LAUNCH YEAR                                     */}
            {/* =============================================== */}

            <article
              className="
                group

                relative
                overflow-hidden

                rounded-[1.2rem]

                border
                border-[#122150]/10

                bg-white/75

                p-3.5

                shadow-[0_8px_25px_rgba(18,33,80,0.05)]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#2A7999]/25

                dark:border-white/10
                dark:bg-white/[0.04]

                sm:rounded-[1.4rem]
                sm:p-5
                sm:shadow-[0_12px_35px_rgba(18,33,80,0.055)]
              "
            >
              <div
                className="
                  pointer-events-none

                  absolute
                  -right-14
                  -top-14

                  size-32

                  rounded-full

                  bg-[#2A7999]/8

                  blur-3xl

                  sm:-right-16
                  sm:-top-16
                  sm:size-40
                  sm:bg-[#2A7999]/10
                "
              />

              <div
                className="
                  relative
                  z-10

                  flex
                  items-center
                  gap-3

                  sm:block
                "
              >
                <div
                  className="
                    flex
                    size-10
                    shrink-0

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-[#2A7999]/10

                    bg-[#2A7999]/10

                    text-[#2A7999]

                    sm:size-12
                  "
                  aria-hidden="true"
                >
                  <CalendarDays
                    size={19}
                    strokeWidth={1.8}
                    className="sm:size-[21px]"
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1

                    sm:mt-5
                  "
                >
                  <span
                    className="
                      whitespace-pre-wrap

                      text-[1.9rem]
                      font-semibold

                      leading-none

                      tracking-[-0.05em]

                      text-[#122150]

                      dark:text-white

                      sm:text-[2.7rem]
                    "
                  >
                    {animatedYear}
                  </span>

                  <h3
                    className="
                      mt-1.5

                      text-[13px]
                      font-semibold

                      leading-5

                      text-[#122150]

                      dark:text-white

                      sm:mt-2
                      sm:text-base
                    "
                  >
                    The beginning of OSSEC
                  </h3>

                  <p
                    className="
                      mt-0.5

                      text-[11px]
                      leading-4

                      text-[#122150]/50

                      dark:text-white/45

                      sm:mt-1.5
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    Building the community since
                    2012.
                  </p>
                </div>
              </div>
            </article>

            {/* =============================================== */}
            {/* SOCIAL FOLLOWERS                                */}
            {/* =============================================== */}

            <article
              className="
                group

                relative
                overflow-hidden

                rounded-[1.2rem]

                border
                border-[#122150]/10

                bg-white/75

                p-3.5

                shadow-[0_8px_25px_rgba(18,33,80,0.05)]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#2A7999]/25

                dark:border-white/10
                dark:bg-white/[0.04]

                sm:rounded-[1.4rem]
                sm:p-5
                sm:shadow-[0_12px_35px_rgba(18,33,80,0.055)]
              "
            >
              <div
                className="
                  pointer-events-none

                  absolute
                  -right-14
                  -top-14

                  size-32

                  rounded-full

                  bg-[#122150]/7

                  blur-3xl

                  dark:bg-[#2A7999]/8

                  sm:-right-16
                  sm:-top-16
                  sm:size-40
                  sm:bg-[#122150]/10

                  dark:sm:bg-[#2A7999]/10
                "
              />

              <div
                className="
                  relative
                  z-10

                  flex
                  items-center
                  gap-3

                  sm:block
                "
              >
                <div
                  className="
                    flex
                    size-10
                    shrink-0

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-[#2A7999]/10

                    bg-[#2A7999]/10

                    text-[#2A7999]

                    sm:size-12
                  "
                  aria-hidden="true"
                >
                  <UsersRound
                    size={19}
                    strokeWidth={1.8}
                    className="sm:size-[21px]"
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1

                    sm:mt-5
                  "
                >
                  <div
                    className="
                      flex
                      items-baseline
                      gap-1
                    "
                  >
                    <span
                      className="
                        whitespace-pre-wrap

                        text-[1.9rem]
                        font-semibold

                        leading-none

                        tracking-[-0.05em]

                        text-[#122150]

                        dark:text-white

                        sm:text-[2.7rem]
                      "
                    >
                      {animatedFollowers.toLocaleString()}
                    </span>

                    <span
                      className="
                        text-lg
                        font-semibold

                        text-[#2A7999]

                        sm:text-3xl
                      "
                    >
                      +
                    </span>
                  </div>

                  <h3
                    className="
                      mt-1.5

                      text-[13px]
                      font-semibold

                      leading-5

                      text-[#122150]

                      dark:text-white

                      sm:mt-2
                      sm:text-base
                    "
                  >
                    Social media followers
                  </h3>

                  <p
                    className="
                      mt-0.5

                      text-[11px]
                      leading-4

                      text-[#122150]/50

                      dark:text-white/45

                      sm:mt-1.5
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    Following OSSEC activities
                    and events.
                  </p>
                </div>
              </div>
            </article>

            {/* =============================================== */}
            {/* ACTIVE MEMBERS                                  */}
            {/* =============================================== */}

            <article
              className="
                group

                relative
                overflow-hidden

                rounded-[1.2rem]

                border
                border-[#122150]/10

                bg-white/75

                p-3.5

                shadow-[0_8px_25px_rgba(18,33,80,0.05)]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#2A7999]/25

                dark:border-white/10
                dark:bg-white/[0.04]

                sm:rounded-[1.4rem]
                sm:p-5
                sm:shadow-[0_12px_35px_rgba(18,33,80,0.055)]
              "
            >
              <div
                className="
                  pointer-events-none

                  absolute
                  -right-14
                  -top-14

                  size-32

                  rounded-full

                  bg-[#2A7999]/8

                  blur-3xl

                  sm:-right-16
                  sm:-top-16
                  sm:size-40
                  sm:bg-[#2A7999]/10
                "
              />

              <div
                className="
                  relative
                  z-10

                  flex
                  items-center
                  gap-3

                  sm:block
                "
              >
                <div
                  className="
                    flex
                    size-10
                    shrink-0

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-[#2A7999]/10

                    bg-[#2A7999]/10

                    text-[#2A7999]

                    sm:size-12
                  "
                  aria-hidden="true"
                >
                  <UserPlus
                    size={19}
                    strokeWidth={1.8}
                    className="sm:size-[21px]"
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1

                    sm:mt-5
                  "
                >
                  <div
                    className="
                      flex
                      items-baseline
                      gap-1
                    "
                  >
                    <span
                      className="
                        whitespace-pre-wrap

                        text-[1.9rem]
                        font-semibold

                        leading-none

                        tracking-[-0.05em]

                        text-[#122150]

                        dark:text-white

                        sm:text-[2.7rem]
                      "
                    >
                      {animatedMembers.toLocaleString()}
                    </span>

                    <span
                      className="
                        text-lg
                        font-semibold

                        text-[#2A7999]

                        sm:text-3xl
                      "
                    >
                      +
                    </span>
                  </div>

                  <h3
                    className="
                      mt-1.5

                      text-[13px]
                      font-semibold

                      leading-5

                      text-[#122150]

                      dark:text-white

                      sm:mt-2
                      sm:text-base
                    "
                  >
                    Active members each year
                  </h3>

                  <p
                    className="
                      mt-0.5

                      text-[11px]
                      leading-4

                      text-[#122150]/50

                      dark:text-white/45

                      sm:mt-1.5
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    Students learning, building
                    and sharing together.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* ================================================= */}
          {/* VALUES                                            */}
          {/* ================================================= */}

          <div
            className="
              mt-10

              sm:mt-20
              lg:mt-24
            "
          >
            <div
              className="
                mb-5

                text-center

                sm:mb-10
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase

                  tracking-[0.18em]

                  text-[#2A7999]

                  sm:text-xs
                  sm:tracking-[0.2em]
                "
              >
                Our values
              </p>

              <h3
                className="
                  mt-2

                  text-xl
                  font-semibold

                  leading-tight

                  tracking-[-0.035em]

                  sm:mt-4
                  sm:text-4xl
                "
              >
                Learn together. Grow together.
              </h3>
            </div>

            <div
              className="
                grid
                gap-2.5

                sm:gap-4

                md:grid-cols-3
              "
            >
              {values.map((value) => (
                <article
                  key={value.number}
                  className="
                    rounded-[1.2rem]

                    border
                    border-[#122150]/10

                    bg-white/70

                    p-4

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#2A7999]/25

                    dark:border-white/10
                    dark:bg-white/[0.035]

                    sm:rounded-[1.4rem]
                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-3

                      md:block
                    "
                  >
                    <span
                      className="
                        flex
                        size-8
                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        bg-[#2A7999]/10

                        text-xs
                        font-semibold

                        text-[#2A7999]

                        sm:size-10
                        sm:text-sm
                      "
                    >
                      {value.number}
                    </span>

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <h3
                        className="
                          text-base
                          font-semibold

                          tracking-[-0.03em]

                          sm:text-2xl

                          md:mt-5
                        "
                      >
                        {value.title}
                      </h3>

                      <p
                        className="
                          mt-1

                          text-[12px]
                          leading-5

                          text-[#122150]/60

                          dark:text-white/55

                          sm:mt-3
                          sm:text-base
                          sm:leading-7
                        "
                      >
                        {value.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default AboutSection;