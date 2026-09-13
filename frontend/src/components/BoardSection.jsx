import {
  useEffect,
  useRef,
  useState,
} from "react";

import asserPhoto from "../assets/staff/asser.jpg";
import saharPhoto from "../assets/staff/sahar.jpg";
import youssefPhoto from "../assets/staff/youssef.jpg";
import israPhoto from "../assets/staff/isra.jpg";
import khouloudPhoto from "../assets/staff/khouloud.jpg";
import fediPhoto from "../assets/staff/fedi.jpg";

import houssemPhoto from "../assets/staff/houssem.jpg";
import omarPhoto from "../assets/staff/omar.jpg";
import bilelPhoto from "../assets/staff/bilel.jpg";
import ghaithPhoto from "../assets/staff/ghaith.jpg";
import zinePhoto from "../assets/staff/zin.png";

/* ======================================================== */
/* EXECUTIVE BOARD                                          */
/* ======================================================== */

const executiveBoard = [
  {
    name: "Asser Saadaoui",
    role: "Chairman",
    initials: "AS",
    image: asserPhoto,
  },
  {
    name: "Sahar Zemzmi",
    role: "Vice Chairwoman & Treasurer",
    initials: "SZ",
    image: saharPhoto,
  },
  {
    name: "Youssef Sahnoun",
    role: "Design Manager",
    initials: "YS",
    image: youssefPhoto,
  },
  {
    name: "Isra Askri",
    role: "Project Manager",
    initials: "IA",
    image: israPhoto,
  },
  {
    name: "Khouloud Boudhiba",
    role: "Sponsoring Manager",
    initials: "KB",
    image: khouloudPhoto,
  },
  {
    name: "Fedi Thabet",
    role: "Human Resources Manager",
    initials: "FT",
    image: fediPhoto,
  },
];

/* ======================================================== */
/* TECHNICAL TEAM                                           */
/* ======================================================== */

const technicalTeam = [
  {
    name: "Houssem Hedi",
    role: "Technical Team",
    initials: "HH",
    image: houssemPhoto,
  },
  {
    name: "Omar Brika",
    role: "Technical Team",
    initials: "OB",
    image: omarPhoto,
  },
  {
    name: "Bilel Hrizi",
    role: "Technical Team",
    initials: "BH",
    image: bilelPhoto,
  },
  {
    name: "Ghaith Lassoued",
    role: "Technical Team",
    initials: "GL",
    image: ghaithPhoto,
  },
  {
    name: "Belhaj Zineddine",
    role: "Technical Team",
    initials: "BZ",
    image: zinePhoto,
  },
];

/* ======================================================== */
/* MEMBER CARD                                              */
/* ======================================================== */

const BoardCard = ({
  member,
  memberKey,
  isActive,
  onToggle,
}) => {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${member.name}, ${member.role}`}
      onClick={() => onToggle(memberKey)}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

          onToggle(memberKey);
        }
      }}
      className={`
        group

        relative

        w-[68vw]
        max-w-[245px]
        shrink-0

        cursor-pointer
        select-none

        overflow-hidden

        rounded-[1.35rem]

        border

        bg-white/70

        p-2.5

        shadow-[0_12px_35px_rgba(18,33,80,0.07)]

        backdrop-blur-xl

        transition-all
        duration-300

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#2A7999]/30

        dark:bg-white/[0.04]

        sm:w-[250px]
        sm:max-w-none
        sm:rounded-[1.6rem]
        sm:p-3.5

        lg:w-[270px]

        ${
          isActive
            ? `
              border-[#2A7999]/45

              shadow-[0_18px_45px_rgba(42,121,153,0.16)]

              ring-1
              ring-[#2A7999]/15
            `
            : `
              border-[#122150]/10

              dark:border-white/10
            `
        }

        md:hover:-translate-y-1
        md:hover:border-[#2A7999]/30
        md:hover:shadow-[0_20px_50px_rgba(42,121,153,0.14)]
      `}
    >
      {/* ================================================== */}
      {/* PHOTO                                              */}
      {/* ================================================== */}

      <div
        className="
          relative

          h-[190px]

          overflow-hidden

          rounded-[1rem]

          bg-gradient-to-br
          from-[#2A7999]/15
          via-[#2A7999]/5
          to-[#122150]/10

          dark:from-[#2A7999]/20
          dark:via-[#122150]/20
          dark:to-[#080D1A]

          sm:h-[220px]
          sm:rounded-[1.2rem]
        "
      >
        {/* Glow */}
        <div
          className="
            pointer-events-none

            absolute

            -right-14
            -top-14

            size-36

            rounded-full

            bg-[#2A7999]/15

            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none

            absolute

            -bottom-16
            -left-14

            size-36

            rounded-full

            bg-[#122150]/15

            blur-3xl
          "
        />

        {member.image ? (
          <img
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            loading="lazy"
            draggable="false"
            className={`
              pointer-events-none

              relative
              z-10

              h-full
              w-full

              select-none

              object-cover
              object-top

              transition-transform

              duration-700

              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isActive
                  ? "scale-[1.05]"
                  : "scale-100"
              }

              md:group-hover:scale-[1.05]
            `}
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full

              items-center
              justify-center
            "
          >
            <div
              className="
                flex
                size-20

                items-center
                justify-center

                rounded-full

                bg-[#122150]

                text-xl
                font-semibold

                text-white

                dark:bg-[#2A7999]
              "
            >
              {member.initials}
            </div>
          </div>
        )}

        {/* Image gradient */}
        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-20

            bg-gradient-to-t

            from-[#122150]/25
            via-transparent
            to-transparent
          "
        />

        {/* Badge */}
        <span
          className="
            pointer-events-none

            absolute

            bottom-3
            right-3
            z-30

            rounded-full

            border
            border-white/30

            bg-[#080D1A]/65

            px-2.5
            py-1

            text-[8px]
            font-semibold

            uppercase

            tracking-[0.16em]

            text-white

            backdrop-blur-xl

            sm:bottom-4
            sm:right-4

            sm:px-3
            sm:py-1.5
            sm:text-[9px]
          "
        >
          OSSEC
        </span>

        {/* Selected outline */}
        <div
          className={`
            pointer-events-none

            absolute
            inset-0
            z-30

            rounded-[1rem]

            border
            border-[#2A7999]

            transition-opacity
            duration-300

            sm:rounded-[1.2rem]

            ${
              isActive
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />
      </div>

      {/* ================================================== */}
      {/* MEMBER INFORMATION                                 */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none

          px-1
          pb-1
          pt-3

          sm:px-1.5
          sm:pt-4
        "
      >
        <p
          className="
            min-h-[18px]

            text-[8px]
            font-semibold

            uppercase

            leading-[1.35]

            tracking-[0.13em]

            text-[#2A7999]

            sm:text-[10px]
          "
        >
          {member.role}
        </p>

        <h3
          className="
            mt-1.5

            text-[15px]
            font-semibold

            leading-tight

            tracking-[-0.025em]

            text-[#122150]

            dark:text-white

            sm:mt-2
            sm:text-lg
          "
        >
          {member.name}
        </h3>
      </div>
    </article>
  );
};

/* ======================================================== */
/* AUTOMATIC + DRAGGABLE MARQUEE                            */
/* ======================================================== */

const BoardMarquee = ({
  members,
  prefix,
  activeMember,
  onToggle,
  reverse = false,
}) => {
  const containerRef = useRef(null);

  const frameRef = useRef(null);

  const lastFrameRef = useRef(null);

  const isDraggingRef =
    useRef(false);

  const hasDraggedRef =
    useRef(false);

  const startXRef =
    useRef(0);

  const startYRef =
    useRef(0);

  const startScrollRef =
    useRef(0);

  const suppressClickRef =
    useRef(false);

  /* ====================================================== */
  /* ORIGINAL-STYLE AUTOMATIC MOVEMENT                      */
  /* ====================================================== */

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return undefined;
    }

    let initializationFrame;

    /*
     * The content is duplicated.
     * Half of scrollWidth therefore
     * represents one complete board.
     */
    const initialize = () => {
      const halfWidth =
        container.scrollWidth / 2;

      if (
        reverse &&
        halfWidth > 0
      ) {
        container.scrollLeft =
          halfWidth;
      }
    };

    initializationFrame =
      requestAnimationFrame(
        initialize,
      );

    const animate = (time) => {
      if (
        lastFrameRef.current ===
        null
      ) {
        lastFrameRef.current =
          time;
      }

      const delta =
        Math.min(
          time -
            lastFrameRef.current,
          32,
        );

      lastFrameRef.current =
        time;

      const halfWidth =
        container.scrollWidth / 2;

      /*
       * Movement stops ONLY while
       * the visitor is actively
       * holding and dragging.
       */
      if (
        !isDraggingRef.current &&
        halfWidth > 0
      ) {
        /*
         * ~28px / second.
         *
         * Slow continuous movement
         * similar to the original
         * marquee component.
         */
        const distance =
          delta * 0.028;

        if (reverse) {
          container.scrollLeft -=
            distance;
        } else {
          container.scrollLeft +=
            distance;
        }

        /* Forward infinite loop */
        if (
          !reverse &&
          container.scrollLeft >=
            halfWidth
        ) {
          container.scrollLeft -=
            halfWidth;
        }

        /* Reverse infinite loop */
        if (
          reverse &&
          container.scrollLeft <= 0
        ) {
          container.scrollLeft +=
            halfWidth;
        }
      }

      frameRef.current =
        requestAnimationFrame(
          animate,
        );
    };

    frameRef.current =
      requestAnimationFrame(
        animate,
      );

    return () => {
      cancelAnimationFrame(
        initializationFrame,
      );

      if (frameRef.current) {
        cancelAnimationFrame(
          frameRef.current,
        );
      }

      lastFrameRef.current =
        null;
    };
  }, [reverse]);

  /* ====================================================== */
  /* START MANUAL DRAG                                      */
  /* ====================================================== */

  const handlePointerDown = (
    event,
  ) => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    isDraggingRef.current =
      true;

    hasDraggedRef.current =
      false;

    startXRef.current =
      event.clientX;

    startYRef.current =
      event.clientY;

    startScrollRef.current =
      container.scrollLeft;

    if (
      event.pointerType ===
      "mouse"
    ) {
      container.setPointerCapture?.(
        event.pointerId,
      );
    }
  };

  /* ====================================================== */
  /* MANUAL MOVEMENT                                        */
  /* ====================================================== */

  const handlePointerMove = (
    event,
  ) => {
    if (
      !isDraggingRef.current
    ) {
      return;
    }

    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    const differenceX =
      event.clientX -
      startXRef.current;

    const differenceY =
      event.clientY -
      startYRef.current;

    /*
     * Do not hijack normal vertical
     * phone scrolling.
     */
    if (
      Math.abs(differenceX) <
        6 &&
      !hasDraggedRef.current
    ) {
      return;
    }

    if (
      Math.abs(differenceX) >
      Math.abs(differenceY)
    ) {
      hasDraggedRef.current =
        true;

      if (event.cancelable) {
        event.preventDefault();
      }

      container.scrollLeft =
        startScrollRef.current -
        differenceX;
    }
  };

  /* ====================================================== */
  /* RELEASE                                                */
  /* ====================================================== */

  const handlePointerEnd = (
    event,
  ) => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    if (
      hasDraggedRef.current
    ) {
      suppressClickRef.current =
        true;

      setTimeout(() => {
        suppressClickRef.current =
          false;
      }, 0);
    }

    /*
     * The automatic movement resumes
     * immediately after release.
     */
    isDraggingRef.current =
      false;

    const halfWidth =
      container.scrollWidth / 2;

    /*
     * Normalize position after
     * manual dragging.
     */
    if (
      halfWidth > 0 &&
      container.scrollLeft >=
        halfWidth
    ) {
      container.scrollLeft -=
        halfWidth;
    }

    if (
      halfWidth > 0 &&
      container.scrollLeft <=
        0
    ) {
      container.scrollLeft +=
        halfWidth;
    }

    if (
      event?.pointerType ===
      "mouse"
    ) {
      try {
        container.releasePointerCapture?.(
          event.pointerId,
        );
      } catch {
        // Pointer already released.
      }
    }
  };

  /* ====================================================== */
  /* ONE COPY OF MEMBERS                                    */
  /* ====================================================== */

  const MemberSet = ({
    copy,
  }) => {
    return (
      <div
        className="
          flex
          shrink-0

          gap-3
          pr-3

          sm:gap-4
          sm:pr-4

          lg:gap-5
          lg:pr-5
        "
      >
        {members.map((member) => {
          const memberKey =
            `${prefix}-${member.name}`;

          return (
            <BoardCard
              key={`${copy}-${memberKey}`}
              member={member}
              memberKey={memberKey}
              isActive={
                activeMember ===
                memberKey
              }
              onToggle={onToggle}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="
        relative

        w-full
      "
    >
      {/* ================================================== */}
      {/* DRAGGABLE MOVING TRACK                             */}
      {/* ================================================== */}

      <div
        ref={containerRef}
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          handlePointerEnd
        }
        onPointerCancel={
          handlePointerEnd
        }
        onPointerLeave={(
          event,
        ) => {
          if (
            isDraggingRef.current &&
            event.pointerType ===
              "mouse"
          ) {
            handlePointerEnd(
              event,
            );
          }
        }}
        onClickCapture={(
          event,
        ) => {
          /*
           * Dragging a card should
           * not count as clicking it.
           */
          if (
            suppressClickRef.current
          ) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        className="
          flex

          w-full

          cursor-grab

          overflow-x-scroll
          overflow-y-hidden

          px-4
          pb-4
          pt-2

          active:cursor-grabbing

          touch-pan-y

          select-none

          [scrollbar-width:none]

          [&::-webkit-scrollbar]:hidden

          sm:px-8

          lg:px-12
        "
      >
        <div
          className="
            flex
            w-max
          "
        >
          <MemberSet copy="first" />

          <MemberSet copy="second" />
        </div>
      </div>

      {/* ================================================== */}
      {/* EDGE FADES                                         */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-0
          z-30

          w-3

          bg-gradient-to-r

          from-[#F8FBFC]
          to-transparent

          dark:from-[#080D1A]

          sm:w-12
        "
      />

      <div
        className="
          pointer-events-none

          absolute
          inset-y-0
          right-0
          z-30

          w-3

          bg-gradient-to-l

          from-[#F8FBFC]
          to-transparent

          dark:from-[#080D1A]

          sm:w-12
        "
      />
    </div>
  );
};

/* ======================================================== */
/* TEAM HEADING                                             */
/* ======================================================== */

const TeamHeading = ({
  number,
  title,
  description,
}) => {
  return (
    <div
      className="
        mx-auto

        mb-4

        max-w-7xl

        px-4

        sm:mb-6
        sm:px-8

        lg:px-12
      "
    >
      <div
        className="
          flex
          items-center

          gap-3

          sm:gap-4
        "
      >
        <span
          className="
            text-[10px]
            font-semibold

            tracking-[0.18em]

            text-[#2A7999]

            sm:text-xs
          "
        >
          {number}
        </span>

        <span
          className="
            h-px
            w-6

            bg-[#2A7999]/45

            sm:w-9
          "
        />

        <div>
          <h3
            className="
              text-[16px]
              font-semibold

              tracking-[-0.025em]

              sm:text-xl
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-0.5

              text-[11px]
              leading-4

              text-[#122150]/45

              dark:text-white/40

              sm:mt-1
              sm:text-sm
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ======================================================== */
/* BOARD SECTION                                            */
/* ======================================================== */

const BoardSection = () => {
  const [
    activeMember,
    setActiveMember,
  ] = useState(null);

  const toggleMember = (
    memberKey,
  ) => {
    setActiveMember(
      (current) =>
        current === memberKey
          ? null
          : memberKey,
    );
  };

  return (
    <section
      id="board"
      className="
        relative

        overflow-x-clip

        scroll-mt-20

        bg-transparent

        py-12

        text-[#122150]

        dark:text-white

        sm:scroll-mt-28
        sm:py-24

        lg:py-28
      "
    >
      {/* ================================================== */}
      {/* AMBIENT GLOWS                                      */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          -left-40
          top-28

          size-[300px]

          rounded-full

          bg-[#2A7999]/8

          blur-[100px]

          sm:-left-52
          sm:size-[460px]
          sm:blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none

          absolute

          -right-44
          top-[46%]

          size-[320px]

          rounded-full

          bg-[#122150]/6

          blur-[110px]

          dark:bg-[#2A7999]/7

          sm:-right-52
          sm:size-[500px]
          sm:blur-[130px]
        "
      />

      {/* ================================================== */}
      {/* SECTION HEADING                                    */}
      {/* ================================================== */}

      <div
        className="
          relative

          mx-auto

          max-w-7xl

          px-4

          text-center

          sm:px-8

          lg:px-12
        "
      >
        <span
          className="
            text-[9px]
            font-semibold

            uppercase

            tracking-[0.2em]

            text-[#2A7999]

            sm:text-xs
            sm:tracking-[0.22em]
          "
        >
          The people behind OSSEC
        </span>

        <h2
          className="
            mx-auto

            mt-3

            max-w-[340px]

            text-[1.9rem]
            font-semibold

            leading-[1.08]

            tracking-[-0.04em]

            sm:mt-5
            sm:max-w-3xl
            sm:text-5xl
          "
        >
          Meet our board and technical team
        </h2>

        <p
          className="
            mx-auto

            mt-4

            max-w-[330px]

            text-[13px]
            leading-6

            text-[#122150]/55

            dark:text-white/50

            sm:mt-5
            sm:max-w-2xl
            sm:text-base
            sm:leading-8
          "
        >
          A dedicated team working together
          to organize activities, guide
          members and develop the OSSEC
          community.
        </p>
      </div>

      {/* ================================================== */}
      {/* EXECUTIVE BOARD                                    */}
      {/* ================================================== */}

      <div
        className="
          relative

          mt-10

          sm:mt-16
        "
      >
        <TeamHeading
          number="01"
          title="Executive Board"
          description="Leadership and club management"
        />

        <BoardMarquee
          members={executiveBoard}
          prefix="executive"
          activeMember={activeMember}
          onToggle={toggleMember}
        />
      </div>

      {/* ================================================== */}
      {/* TECHNICAL TEAM                                     */}
      {/* ================================================== */}

      <div
        className="
          relative

          mt-12

          sm:mt-20
        "
      >
        <TeamHeading
          number="02"
          title="Technical Team"
          description="Technical knowledge and cybersecurity activities"
        />

        <BoardMarquee
          members={technicalTeam}
          prefix="technical"
          activeMember={activeMember}
          onToggle={toggleMember}
          reverse
        />
      </div>
    </section>
  );
};

export default BoardSection;