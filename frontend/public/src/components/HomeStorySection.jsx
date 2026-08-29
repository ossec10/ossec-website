import { useEffect, useRef, useState } from "react";

import confusedMascot from "../assets/confused_mascot.png";
import sadMascot from "../assets/sad_mascot.png";
import excitedMascot from "../assets/excited_mascot.png";
import neutralMascot from "../assets/neutral_mascot.png";

import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

const steps = [
  {
    number: "01",
    label: "Arrival",
    icon: "⌂",
    title: "A new student enters ENSI",
    description:
      "Everything feels new. There are many clubs, activities and paths, but he still does not know where he belongs.",
    quote: "Where do I belong?",
    accent: "#2A7999",
  },
  {
    number: "02",
    label: "Lost",
    icon: "?",
    title: "He starts feeling lost",
    description:
      "He wants to learn, create and meet people who share his curiosity, but he has not yet found the right community.",
    quote: "Maybe there is no place for me...",
    accent: "#122150",
  },
  {
    number: "03",
    label: "Meeting",
    icon: "✉",
    title: "Then Trafalgar reaches out",
    description:
      "A simple conversation introduces him to OSSEC and opens the door to the world of cybersecurity.",
    quote: "Have you ever explored cybersecurity?",
    accent: "#2A7999",
  },
  {
    number: "04",
    label: "Discovery",
    icon: "◆",
    title: "He discovers OSSEC",
    description:
      "CTF challenges, workshops, teamwork and cybersecurity suddenly become more than words. They become opportunities.",
    quote: "This is exactly what I was searching for!",
    accent: "#2A7999",
  },
  {
    number: "05",
    label: "Belonging",
    icon: "✦",
    title: "He finally finds his place",
    description:
      "He did not simply discover a club. He found a community where he could learn, compete, create and grow.",
    quote: "Now your journey can begin too.",
    accent: "#122150",
  },
];

const chatChoices = [
  "What is cybersecurity?",
  "What is OSSEC?",
  "Show me what the club does",
];

const trafalgarMessages = [
  {
    id: "noticed",
    message: "You seem lost.",
  },
  {
    id: "talk",
    message: "Can we talk?",
  },
];

const floatingChipStyle = {
  padding:
    "clamp(0.65rem, 1.5vw, 0.9rem) clamp(0.95rem, 2vw, 1.5rem)",
  fontSize: "clamp(0.82rem, 1.4vw, 1rem)",
};

const TrafalgarNotification = ({ message }) => {
  return (
    <div
      className="
        w-full
        rounded-xl
        border border-[#2A7999]/20
        bg-white/95
        p-3

        sm:rounded-2xl sm:p-4
        text-left
        shadow-[0_16px_45px_rgba(18,33,80,0.14)]
        backdrop-blur-xl

        dark:border-white/10
        dark:bg-[#101A2E]/95
        dark:shadow-[0_18px_50px_rgba(0,0,0,0.25)]
      "
    >
      <div className="flex items-center gap-3">
        {/* Trafalgar avatar */}
        <span
          className="
            flex size-9
            shrink-0

            sm:size-11
            items-center justify-center
            rounded-full
            bg-[#122150]
            font-semibold
            text-white

            dark:bg-[#2A7999]
          "
        >
          T
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold sm:text-base">
              Trafalgar
            </p>

            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#2A7999]" />

              <span
                className="
                  text-[10px]
                  font-medium
                  text-[#122150]/35
                  dark:text-white/35
                "
              >
                now
              </span>
            </div>
          </div>

          <p
            className="
              mt-1
              text-xs leading-5

              sm:text-sm
              text-[#122150]/60
              dark:text-white/60
            "
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

const HomeStorySection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highestUnlockedStep, setHighestUnlockedStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");

  const transitionTimer = useRef(null);
  const choiceTimer = useRef(null);

  const activeStep = steps[currentStep];

  const changeStep = (nextStep) => {
    if (
      isTransitioning ||
      nextStep < 0 ||
      nextStep >= steps.length ||
      nextStep === currentStep
    ) {
      return;
    }

    setIsTransitioning(true);

    window.clearTimeout(transitionTimer.current);

    transitionTimer.current = window.setTimeout(() => {
      setCurrentStep(nextStep);

      setHighestUnlockedStep((current) =>
        Math.max(current, nextStep),
      );

      setIsTransitioning(false);
      setSelectedChoice("");
    }, 320);
  };

  const handleChatChoice = (choice) => {
    if (selectedChoice) {
      return;
    }

    setSelectedChoice(choice);

    window.clearTimeout(choiceTimer.current);

    choiceTimer.current = window.setTimeout(() => {
      changeStep(3);
    }, 550);
  };

  const handleTrailClick = (index) => {
    if (index <= highestUnlockedStep) {
      changeStep(index);
    }
  };

  const handleFirstSceneClick = () => {
    if (currentStep === 0) {
      changeStep(1);
    }
  };

  const handleFirstSceneKeyDown = (event) => {
    if (
      currentStep === 0 &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      changeStep(1);
    }
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(transitionTimer.current);
      window.clearTimeout(choiceTimer.current);
    };
  }, []);

  return (
    <section
      id="home"
      className="
        relative flex
        min-h-[calc(100vh-4rem)]
        items-center overflow-hidden overflow-x-clip
        overscroll-x-none touch-pan-y
        bg-transparent
        px-3 pb-8 pt-20

        sm:px-8 sm:pb-10
        text-[#122150]

        dark:text-white

        lg:px-12
      "
    >
      {/* Background lights */}
      <div
        className="
          pointer-events-none
          absolute -left-40 top-24
          size-[420px]
          rounded-full
          bg-[#2A7999]/10
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-40 bottom-16
          size-[500px]
          rounded-full
          bg-[#122150]/10
          blur-[130px]

          dark:bg-[#2A7999]/10
          sm:bottom-20
        "
      />

      <div className="relative mx-auto mt-5 w-full min-w-0 max-w-7xl sm:mt-8">
        {/* Section badge */}
        <div className="mb-5 flex justify-center sm:mb-8">
          <span
            className="
              inline-flex rounded-full
              border border-[#2A7999]/20
              bg-[#2A7999]/10
              px-3 py-1.5
              text-[10px] font-semibold uppercase

              sm:px-4 sm:py-2 sm:text-xs
              tracking-[0.2em]
              text-[#2A7999]
            "
          >
            OSSEC Story
          </span>
        </div>

        {/* Desktop story trail */}
        <div className="mb-8 hidden md:block">
          <div className="relative mx-auto max-w-4xl">
            <div
              className="
                absolute left-7 right-7 top-6
                h-px
                bg-[#122150]/10
                dark:bg-white/10
              "
            />

            <div
              className="
                absolute left-7 top-6
                h-px
                bg-[#2A7999]
                transition-all duration-700
              "
              style={{
                width: `calc(${
                  currentStep / (steps.length - 1)
                } * (100% - 3.5rem))`,
              }}
            />

            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const isActive = currentStep === index;
                const isUnlocked = index <= highestUnlockedStep;

                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => handleTrailClick(index)}
                    disabled={!isUnlocked}
                    className={`
                      group
                      flex flex-col
                      items-center gap-2
                      transition-all duration-300

                      ${
                        isUnlocked
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-35"
                      }
                    `}
                    aria-label={`Open ${step.label} scene`}
                  >
                    <span
                      className={`
                        relative z-10
                        flex size-12
                        items-center justify-center
                        rounded-full
                        border
                        text-sm font-semibold
                        transition-all duration-300

                        ${
                          isActive
                            ? "scale-110 border-[#2A7999] bg-[#2A7999] text-white shadow-lg shadow-[#2A7999]/25"
                            : isUnlocked
                              ? "border-[#122150]/10 bg-white text-[#122150] group-hover:border-[#2A7999]/40 dark:border-white/10 dark:bg-[#0D1629] dark:text-white"
                              : "border-[#122150]/10 bg-white text-[#122150]/40 dark:border-white/10 dark:bg-[#0D1629] dark:text-white/40"
                        }
                      `}
                    >
                      {step.icon}
                    </span>

                    <span
                      className={`
                        text-[11px] font-semibold
                        uppercase tracking-[0.14em]

                        ${
                          isActive
                            ? "text-[#2A7999]"
                            : "text-[#122150]/45 dark:text-white/40"
                        }
                      `}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main cinematic card */}
        <div
          className="
            relative overflow-hidden
            rounded-[1.75rem]
            border border-[#122150]/8
            bg-white/70
            shadow-[0_35px_100px_rgba(18,33,80,0.12)]
            backdrop-blur-xl

            dark:border-white/10
            dark:bg-white/[0.035]
            dark:shadow-[0_35px_100px_rgba(0,0,0,0.35)]

            sm:rounded-[2.25rem]
          "
        >
          <div
            key={currentStep}
            className={`
              grid min-h-0 min-w-0
              items-center
              gap-5
              p-4

              sm:gap-8 sm:p-8

              lg:min-h-[620px]
              lg:grid-cols-[0.92fr_1.08fr]
              lg:gap-14
              lg:p-14

              ${
                isTransitioning
                  ? "story-interactive-exit"
                  : "story-interactive-enter"
              }
            `}
          >
            {/* Left content */}
            <div className="relative z-20">
              <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
                <span
                  className="
                    flex size-9
                    shrink-0
                    items-center justify-center
                    rounded-full
                    text-xs font-semibold

                    sm:size-11 sm:text-sm
                    text-white
                  "
                  style={{
                    backgroundColor: activeStep.accent,
                  }}
                >
                  {activeStep.number}
                </span>

                <span
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.22em]
                  "
                  style={{
                    color: activeStep.accent,
                  }}
                >
                  {activeStep.label}
                </span>
              </div>

              <h1
                className="
                  max-w-2xl
                  text-[2rem] font-semibold
                  leading-[1.08]
                  tracking-[-0.04em]

                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {activeStep.title}
              </h1>

              <p
                className="
                  mt-4 max-w-xl
                  text-sm leading-6
                  text-[#122150]/65

                  dark:text-white/60

                  sm:mt-6 sm:text-lg sm:leading-8
                "
              >
                {activeStep.description}
              </p>

              <blockquote
                className="
                  mt-5 max-w-xl
                  rounded-xl
                  border border-[#122150]/8
                  bg-white/60
                  px-4 py-3
                  text-sm font-medium italic

                  sm:mt-7 sm:rounded-2xl
                  text-[#122150]/85

                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:text-white/85

                  sm:px-6
                  sm:py-5
                  sm:text-lg
                "
              >
                “{activeStep.quote}”
              </blockquote>

              {/* Arrival helper */}
              {currentStep === 0 && (
                <p
                  className="
                    mt-4
                    text-xs font-medium

                    sm:mt-6 sm:text-sm
                    text-[#2A7999]
                  "
                >
                  Tap the mascot to explore his story.
                </p>
              )}

              {/* Lost helper */}
              {currentStep === 1 && (
                <p
                  className="
                    mt-6
                    text-sm font-medium
                    text-[#2A7999]
                  "
                >
                  Someone has noticed that he feels lost…
                </p>
              )}

              {/* Final CTA */}
              {currentStep === 4 && (
                <a
                  href="#join"
                  className="
                    group
                    mt-8 inline-flex
                    items-center
                    rounded-full
                    bg-[#122150]
                    px-6 py-3.5
                    shadow-lg
                    shadow-[#122150]/15
                    transition-all duration-300

                    hover:-translate-y-1
                    hover:bg-[#2A7999]

                    dark:bg-[#2A7999]
                    dark:hover:bg-[#348CAD]
                  "
                >
                  <AnimatedShinyText
                    className="
                      inline-flex
                      items-center gap-3
                      text-sm font-semibold
                      text-white
                    "
                  >
                    <span>Join OSSEC</span>

                    <span
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  </AnimatedShinyText>
                </a>
              )}
            </div>

            {/* Right interactive area */}
            <div
              className={`
                relative isolate
                flex min-h-[320px] min-w-0 max-w-full
                items-center justify-center

                sm:min-h-[470px]

                ${
                  currentStep === 0
                    ? "cursor-pointer touch-manipulation"
                    : ""
                }
              `}
              onClick={
                currentStep === 0
                  ? handleFirstSceneClick
                  : undefined
              }
              onKeyDown={
                currentStep === 0
                  ? handleFirstSceneKeyDown
                  : undefined
              }
              role={
                currentStep === 0
                  ? "button"
                  : undefined
              }
              tabIndex={
                currentStep === 0
                  ? 0
                  : undefined
              }
              aria-label={
                currentStep === 0
                  ? "Continue to the next story scene"
                  : undefined
              }
            >
              {/* Ambient glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  size-[230px]
                  rounded-full
                  blur-[70px]
                  transition-colors duration-700

                  sm:size-[420px] sm:blur-[90px]
                "
                style={{
                  backgroundColor:
                    currentStep === 1
                      ? "rgba(18, 33, 80, 0.14)"
                      : "rgba(42, 121, 153, 0.17)",
                }}
              />

              {/* ================================================== */}
              {/* SCENE 1 — ARRIVAL                                  */}
              {/* ================================================== */}

              {currentStep === 0 && (
                <div
                  className="
                    pointer-events-none
                    relative
                    flex min-h-[300px]
                    w-full min-w-0 max-w-full
                    items-center justify-center

                    sm:min-h-[450px]
                  "
                >
                  <span
                    className="
                      story-club-chip
                      pointer-events-none
                      absolute
                      left-[1%]
                      top-[6%]

                      sm:left-[6%]
                      sm:top-[15%]
                    "
                    style={floatingChipStyle}
                  >
                    AI
                  </span>

                  <span
                    className="
                      story-club-chip
                      story-delay-one
                      pointer-events-none
                      absolute
                      right-[0%]
                      top-[9%]

                      sm:right-[5%]
                      sm:top-[21%]
                    "
                    style={floatingChipStyle}
                  >
                    Robotics
                  </span>

                  <span
                    className="
                      story-club-chip
                      story-delay-two
                      pointer-events-none
                      absolute
                      bottom-[12%]
                      left-[0%]

                      sm:bottom-[20%]
                      sm:left-[4%]
                    "
                    style={floatingChipStyle}
                  >
                    Web
                  </span>

                  <span
                    className="
                      story-club-chip
                      story-delay-three
                      pointer-events-none
                      absolute
                      bottom-[5%]
                      right-[0%]

                      sm:bottom-[13%]
                      sm:right-[4%]
                    "
                    style={floatingChipStyle}
                  >
                    Cybersecurity
                  </span>

                  <img
                    src={confusedMascot}
                    alt="Confused mascot"
                    draggable="false"
                    className="
                      story-mascot-float
                      pointer-events-none
                      relative z-10
                      max-h-[185px]
                      w-auto max-w-[72%]
                      select-none
                      object-contain
                      drop-shadow-[0_30px_30px_rgba(18,33,80,0.22)]

                      sm:max-h-[300px] sm:max-w-none
                      lg:max-h-[340px]
                    "
                  />
                </div>
              )}

              {/* ================================================== */}
              {/* SCENE 2 — LOST + ANIMATED TRAFALGAR MESSAGES       */}
              {/* ================================================== */}

              {currentStep === 1 && (
                <div
                  className="
                    relative
                    flex min-h-[390px]
                    w-full min-w-0 max-w-full
                    flex-col
                    items-center
                    justify-center
                    gap-5

                    sm:block
                    sm:min-h-[470px]
                  "
                >
                  {/* PHONE mascot */}
                  <div
                    className="
                      relative
                      flex h-[165px]
                      w-full
                      shrink-0
                      items-center justify-center

                      sm:hidden
                    "
                  >
                    <img
                      src={sadMascot}
                      alt="Sad mascot"
                      draggable="false"
                      className="
                        pointer-events-none
                        max-h-[160px]
                        w-auto max-w-[70%]
                        select-none
                        object-contain
                        drop-shadow-[0_30px_30px_rgba(18,33,80,0.22)]
                      "
                    />
                  </div>

                  {/* TABLET / DESKTOP mascot */}
                  <img
                    src={sadMascot}
                    alt=""
                    draggable="false"
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-[27%]
                      top-1/2
                      z-10
                      hidden
                      max-h-[310px]
                      w-auto
                      -translate-x-1/2
                      -translate-y-1/2
                      select-none
                      object-contain
                      drop-shadow-[0_30px_30px_rgba(18,33,80,0.22)]

                      sm:block

                      lg:left-[30%]
                      lg:max-h-[340px]
                    "
                  />

                  {/* Animated Trafalgar notifications */}
                  <div
                    className="
                      relative z-30
                      w-full min-w-0
                      max-w-[290px]

                      sm:absolute
                      sm:right-[0%]
                      sm:top-[7%]
                      sm:w-[300px]
                      sm:max-w-[330px]
                    "
                  >
                    <AnimatedList
                      delay={650}
                      className="gap-2.5"
                    >
                      {trafalgarMessages.map((item) => (
                        <TrafalgarNotification
                          key={item.id}
                          message={item.message}
                        />
                      ))}

                      {/* Appears after the messages */}
                      <button
                        type="button"
                        onClick={() => changeStep(2)}
                        className="
                          group
                          w-full
                          touch-manipulation
                          rounded-xl
                          border border-[#2A7999]/20
                          bg-[#2A7999]/10
                          px-4 py-3
                          text-left
                          transition-all duration-300

                          hover:-translate-y-0.5
                          hover:border-[#2A7999]/40
                          hover:bg-[#2A7999]/15

                          active:scale-[0.98]

                          dark:border-[#2A7999]/25
                          dark:bg-[#2A7999]/10
                        "
                      >
                        <div
                          className="
                            flex items-center
                            justify-between gap-3
                          "
                        >
                          <span
                            className="
                              text-xs font-semibold
                              uppercase
                              tracking-[0.14em]
                              text-[#2A7999]
                            "
                          >
                            Open message
                          </span>

                          <span
                            className="
                              text-lg
                              text-[#2A7999]
                              transition-transform duration-300
                              group-hover:translate-x-1
                            "
                          >
                            →
                          </span>
                        </div>
                      </button>
                    </AnimatedList>
                  </div>
                </div>
              )}

              {/* ================================================== */}
              {/* SCENE 3 — MEETING / CHAT                           */}
              {/* ================================================== */}

              {currentStep === 2 && (
                <div
                  className="
                    relative
                    w-full
                    max-w-[540px]
                  "
                >
                  <img
                    src={neutralMascot}
                    alt="Mascot listening to Trafalgar"
                    draggable="false"
                    className="
                      pointer-events-none
                      absolute
                      -bottom-6 -left-8
                      hidden
                      max-h-[220px]
                      w-auto
                      select-none
                      object-contain
                      opacity-90
                      drop-shadow-[0_20px_20px_rgba(18,33,80,0.18)]

                      sm:block
                    "
                  />

                  <div
                    className="
                      relative z-20
                      ml-auto
                      w-full min-w-0
                      max-w-[440px]
                      rounded-[1.25rem]
                      border border-[#122150]/8
                      bg-white/90
                      p-3
                      shadow-[0_25px_70px_rgba(18,33,80,0.15)]

                      dark:border-white/10
                      dark:bg-[#101A2E]/90

                      sm:rounded-[2rem]
                      sm:p-5
                    "
                  >
                    <div
                      className="
                        flex items-center gap-2.5
                        border-b border-[#122150]/8
                        pb-3

                        sm:gap-3 sm:pb-4

                        dark:border-white/10
                      "
                    >
                      <span
                        className="
                          flex size-9
                          shrink-0

                          sm:size-11
                          items-center justify-center
                          rounded-full
                          bg-[#122150]
                          font-semibold
                          text-white

                          dark:bg-[#2A7999]
                        "
                      >
                        T
                      </span>

                      <div>
                        <p className="font-semibold">
                          Trafalgar
                        </p>

                        <p className="text-xs text-[#2A7999]">
                          Online now
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-5">
                      <div
                        className="
                          max-w-[95%]
                          rounded-xl
                          rounded-tl-sm
                          bg-[#122150]
                          px-3 py-2.5
                          text-xs
                          leading-5

                          sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm sm:leading-6
                          text-white

                          dark:bg-[#2A7999]

                          sm:max-w-[90%]
                        "
                      >
                        Cybersecurity is about curiosity, teamwork and
                        protecting the digital world. What would you like to
                        discover?
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:gap-2.5">
                        {chatChoices.map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() =>
                              handleChatChoice(choice)
                            }
                            disabled={Boolean(selectedChoice)}
                            className={`
                              touch-manipulation
                              rounded-xl
                              border
                              px-3 py-2.5
                              text-left
                              text-xs font-medium

                              sm:px-4 sm:py-3 sm:text-sm
                              transition-all duration-300

                              ${
                                selectedChoice === choice
                                  ? "translate-x-1 border-[#2A7999] bg-[#2A7999] text-white sm:translate-x-2"
                                  : selectedChoice
                                    ? "cursor-wait border-[#122150]/10 bg-[#122150]/[0.025] opacity-50 dark:border-white/10 dark:bg-white/[0.035]"
                                    : "border-[#122150]/10 bg-[#122150]/[0.025] hover:border-[#2A7999]/40 hover:bg-[#2A7999]/5 sm:hover:translate-x-2 dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.07]"
                              }
                            `}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================== */}
              {/* SCENE 4 — DISCOVERY                                */}
              {/* ================================================== */}

              {currentStep === 3 && (
                <div
                  className="
                    relative
                    flex min-h-[330px]
                    w-full min-w-0 max-w-full
                    flex-col
                    items-center
                    justify-center
                    gap-3

                    sm:min-h-[470px]
                  "
                >
                  {/* Visual stage */}
                  <div
                    className="
                      relative
                      h-[250px]
                      w-full min-w-0 max-w-full
                      shrink-0

                      sm:h-[365px]
                      lg:h-[380px]
                    "
                  >
                    {/* Orbit */}
                    <div
                      className="
                        story-orbit
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[47%]
                        size-[200px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        border
                        border-dashed
                        border-[#2A7999]/25

                        sm:size-[320px]
                        lg:size-[350px]
                      "
                    />

                    <span
                      className="
                        story-orbit-chip
                        pointer-events-none
                        absolute
                        left-[0%]
                        top-[3%]

                        sm:left-[5%]
                        sm:top-[11%]
                      "
                      style={floatingChipStyle}
                    >
                      CTF
                    </span>

                    <span
                      className="
                        story-orbit-chip
                        story-delay-one
                        pointer-events-none
                        absolute
                        right-[0%]
                        top-[3%]

                        sm:right-[5%]
                        sm:top-[11%]
                      "
                      style={floatingChipStyle}
                    >
                      Linux
                    </span>

                    <span
                      className="
                        story-orbit-chip
                        story-delay-two
                        pointer-events-none
                        absolute
                        bottom-[4%]
                        left-[0%]

                        sm:bottom-[10%]
                        sm:left-[2%]
                      "
                      style={floatingChipStyle}
                    >
                      Workshops
                    </span>

                    <span
                      className="
                        story-orbit-chip
                        story-delay-three
                        pointer-events-none
                        absolute
                        bottom-[4%]
                        right-[0%]

                        sm:bottom-[10%]
                        sm:right-[2%]
                      "
                      style={floatingChipStyle}
                    >
                      Teamwork
                    </span>

                    <img
                      src={excitedMascot}
                      alt="Excited mascot"
                      draggable="false"
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[47%]
                        z-10
                        max-h-[170px]
                        w-auto max-w-[65%]
                        -translate-x-1/2
                        -translate-y-1/2
                        select-none
                        object-contain
                        drop-shadow-[0_30px_30px_rgba(18,33,80,0.22)]

                        sm:max-h-[270px] sm:max-w-none
                        lg:max-h-[300px]
                      "
                    />
                  </div>

                  {/* CTA below mascot */}
                  <button
                    type="button"
                    onClick={() => changeStep(4)}
                    className="
                      story-shield-button
                      relative z-30
                      w-full
                      max-w-[190px]
                      touch-manipulation
                      rounded-xl
                      bg-[#122150]
                      px-5 py-3

                      sm:max-w-[215px] sm:rounded-2xl sm:px-6 sm:py-3.5
                      text-center
                      text-white
                      shadow-xl
                      shadow-[#122150]/25
                      transition-all duration-300

                      hover:-translate-y-1
                      hover:bg-[#2A7999]

                      active:scale-[0.98]

                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-[#2A7999]/30

                      dark:bg-[#2A7999]
                    "
                  >
                    <span
                      className="
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white/65

                        sm:text-xs
                      "
                    >
                      Discover
                    </span>

                    <span
                      className="
                        mt-1 block
                        text-lg font-bold

                        sm:text-xl
                      "
                    >
                      OSSEC ◆
                    </span>
                  </button>
                </div>
              )}

              {/* ================================================== */}
              {/* SCENE 5 — BELONGING                                */}
              {/* ================================================== */}

              {currentStep === 4 && (
                <div
                  className="
                    relative
                    flex min-h-[300px]
                    w-full min-w-0 max-w-full
                    items-center
                    justify-center

                    sm:min-h-[450px]
                  "
                >
                  <div
                    className="
                      story-final-glow
                      pointer-events-none
                      absolute
                      size-[230px]
                      rounded-full
                      bg-[#2A7999]/20
                      blur-[70px]

                      sm:size-[360px]
                    "
                  />

                  <span
                    className="
                      story-spark
                      pointer-events-none
                      absolute
                      left-[12%]
                      top-[15%]
                      text-3xl
                      text-[#2A7999]

                      sm:left-[15%]
                      sm:top-[19%]
                    "
                  >
                    ✦
                  </span>

                  <span
                    className="
                      story-spark
                      story-delay-one
                      pointer-events-none
                      absolute
                      right-[10%]
                      top-[20%]
                      text-4xl
                      text-[#122150]

                      dark:text-white

                      sm:right-[14%]
                      sm:top-[24%]
                    "
                  >
                    ✦
                  </span>

                  <span
                    className="
                      story-spark
                      story-delay-two
                      pointer-events-none
                      absolute
                      bottom-[16%]
                      left-[10%]
                      text-2xl
                      text-[#122150]

                      dark:text-white

                      sm:bottom-[20%]
                      sm:left-[12%]
                    "
                  >
                    ★
                  </span>

                  <img
                    src={excitedMascot}
                    alt="Excited OSSEC mascot"
                    draggable="false"
                    className="
                      story-celebration
                      pointer-events-none
                      relative z-10
                      max-h-[210px]
                      w-auto max-w-[72%]
                      select-none
                      object-contain
                      drop-shadow-[0_30px_30px_rgba(18,33,80,0.22)]

                      sm:max-h-[330px] sm:max-w-none
                      lg:max-h-[370px]
                    "
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile story progress */}
          <div
            className="
              border-t
              border-[#122150]/8
              px-4 py-4

              sm:px-6 sm:py-5

              dark:border-white/10

              md:hidden
            "
          >
            <div
              className="
                flex items-center
                justify-center
                gap-2
              "
            >
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() =>
                    handleTrailClick(index)
                  }
                  disabled={
                    index > highestUnlockedStep
                  }
                  className={`
                    h-2.5
                    rounded-full
                    transition-all duration-300

                    ${
                      currentStep === index
                        ? "w-9 bg-[#2A7999]"
                        : index <= highestUnlockedStep
                          ? "w-2.5 bg-[#122150]/25 dark:bg-white/30"
                          : "w-2.5 cursor-not-allowed bg-[#122150]/8 dark:bg-white/10"
                    }
                  `}
                  aria-label={`Open ${step.label} scene`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStorySection;