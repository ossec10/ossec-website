import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";

/* ======================================================== */
/* ECOSYSTEM                                                */
/* ======================================================== */

const ecosystemCategories = [
  {
    id: "open-source",
    name: "Open Source",
    items: [
      "GNU / Linux",
      "Knowledge Sharing",
      "OSSEC Magazine",
    ],
  },
  {
    id: "learning",
    name: "Learning",
    items: [
      "Workshops",
      "Competitions",
      "Hackathons",
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    items: [
      "Security Challenges",
      "CTF & Competitions",
      "Technical Projects",
    ],
  },
  {
    id: "events",
    name: "Events",
    items: [
      "Install Party",
      "TuniHack",
      "Capture The Cup",
      "Fork & Flag",
    ],
  },
  {
    id: "community",
    name: "Community",
    items: [
      "Collaboration",
      "Innovation",
      "Dare To Share",
    ],
  },
];

/* ======================================================== */
/* PROJECTS                                                 */
/* ======================================================== */

const projectCategories = [
  {
    id: "ai-data",
    name: "AI & Data",
    projects: [
      {
        id: "network-traffic-anomaly-defender",
        number: "01",
        name: "Network Traffic Anomaly Defender",
        type: "Last year",
      },
      {
        id: "phishing-analyser",
        number: "02",
        name: "Phishing Analyser",
        type: "Last year",
      },
      {
        id: "threat-intelligence-dashboard",
        number: "03",
        name: "Threat Intelligence Dashboard",
        type: "Concept",
      },
    ],
  },

  {
    id: "cybersecurity-projects",
    name: "Cybersecurity",
    projects: [
      {
        id: "malware-sandbox",
        number: "04",
        name: "Malware Sandbox",
        type: "Last year",
      },
      {
        id: "ctf-platform",
        number: "05",
        name: "CTF Platform",
        type: "Last year",
      },
      {
        id: "secure-file-scanner",
        number: "06",
        name: "Secure File Scanner",
        type: "Concept",
      },
    ],
  },

  {
    id: "open-source-projects",
    name: "Open Source",
    projects: [
      {
        id: "honeybot",
        number: "07",
        name: "HoneyBot",
        type: "Last year",
      },
    ],
  },
];

/* ======================================================== */
/* GALLERY                                                  */
/* ======================================================== */

const galleryImages = [
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

const leftGalleryImages = galleryImages.filter(
  (_, index) => index % 2 === 0,
);

const rightGalleryImages = galleryImages.filter(
  (_, index) => index % 2 !== 0,
);

/* ======================================================== */
/* WINDOW MODES                                             */
/* ======================================================== */

const windowModes = [
  {
    id: "ecosystem",
    label: "Ecosystem",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "gallery",
    label: "Gallery",
  },
];

/* ======================================================== */
/* ECOSYSTEM FOLDER                                         */
/* ======================================================== */

const EcosystemFolder = ({
  category,
  isOpen,
  onToggle,
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          flex
          w-full
          items-center

          gap-1.5

          rounded-lg

          py-[2px]

          text-left

          transition-colors
          duration-200

          hover:text-[#2A7999]

          sm:gap-2
          sm:py-[3px]

          lg:py-[1px]
        "
      >
        {isOpen ? (
          <ChevronDown
            size={12}
            strokeWidth={1.7}
            className="
              shrink-0
              text-[#2A7999]

              sm:size-[14px]
            "
          />
        ) : (
          <ChevronRight
            size={12}
            strokeWidth={1.7}
            className="
              shrink-0
              text-[#2A7999]

              sm:size-[14px]
            "
          />
        )}

        {isOpen ? (
          <FolderOpen
            size={14}
            strokeWidth={1.7}
            className="
              shrink-0
              text-[#2A7999]

              sm:size-4
            "
          />
        ) : (
          <Folder
            size={14}
            strokeWidth={1.7}
            className="
              shrink-0
              text-[#2A7999]

              sm:size-4
            "
          />
        )}

        <span
          className="
            text-[11px]
            font-medium

            leading-4

            text-[#122150]/90

            dark:text-white/90

            sm:text-sm
            sm:leading-5

            lg:leading-[1.15rem]
          "
        >
          {category.name}
        </span>
      </button>

      <div
        className={`
          grid

          transition-[grid-template-rows,opacity]
          duration-300
          ease-out

          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div
            className="
              ml-[19px]

              border-l
              border-[#2A7999]/15

              pl-3

              sm:ml-[22px]
              sm:pl-3.5
            "
          >
            {category.items.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center

                  gap-2

                  py-[1px]

                  sm:py-[2px]

                  lg:py-[1px]
                "
              >
                <FileText
                  size={11}
                  strokeWidth={1.6}
                  className="
                    shrink-0

                    text-[#122150]/45

                    dark:text-white/45

                    sm:size-[13px]
                  "
                />

                <span
                  className="
                    text-[10px]

                    leading-4

                    text-[#122150]/70

                    dark:text-white/70

                    sm:text-[13px]
                    sm:leading-5

                    lg:leading-[1.1rem]
                  "
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ======================================================== */
/* ECOSYSTEM VIEW                                           */
/* ======================================================== */

const EcosystemView = () => {
  const [openFolders, setOpenFolders] =
    useState({
      "open-source": true,
      learning: true,
      cybersecurity: true,
      events: true,
      community: true,
    });

  const toggleFolder = (id) => {
    setOpenFolders((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div
      className="
        h-full

        overflow-hidden

        rounded-[1.25rem]

        border
        border-[#122150]/8

        bg-[#F8FBFC]/80

        p-3

        dark:border-white/10
        dark:bg-[#080D1A]/50

        sm:rounded-[1.5rem]
        sm:p-4

        lg:p-3.5
      "
    >
      {/* Root */}
      <div
        className="
          flex
          items-center

          gap-2

          pb-2

          lg:pb-1.5
        "
      >
        <FolderOpen
          size={15}
          strokeWidth={1.7}
          className="
            text-[#2A7999]

            sm:size-[18px]
          "
        />

        <span
          className="
            text-[12px]
            font-semibold

            text-[#122150]

            dark:text-white

            sm:text-base
          "
        >
          OSSEC
        </span>
      </div>

      {/* Folders */}
      <div
        className="
          ml-1

          space-y-[1px]

          sm:ml-2
          sm:space-y-[2px]

          lg:space-y-0
        "
      >
        {ecosystemCategories.map(
          (category) => (
            <EcosystemFolder
              key={category.id}
              category={category}
              isOpen={
                openFolders[
                  category.id
                ]
              }
              onToggle={() =>
                toggleFolder(
                  category.id,
                )
              }
            />
          ),
        )}
      </div>
    </div>
  );
};

/* ======================================================== */
/* PROJECT CATEGORY                                         */
/* ======================================================== */

const ProjectCategory = ({
  category,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className="
        overflow-hidden

        rounded-xl

        border
        border-[#122150]/8

        bg-white/40

        dark:border-white/[0.07]
        dark:bg-white/[0.025]
      "
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          flex
          w-full

          items-center

          gap-2

          px-3
          py-1.5

          text-left

          transition-colors

          hover:bg-[#2A7999]/5

          dark:hover:bg-white/[0.035]

          sm:px-4
          sm:py-2
        "
      >
        {isOpen ? (
          <ChevronDown
            size={13}
            className="
              shrink-0
              text-[#2A7999]
            "
          />
        ) : (
          <ChevronRight
            size={13}
            className="
              shrink-0
              text-[#2A7999]
            "
          />
        )}

        {isOpen ? (
          <FolderOpen
            size={15}
            strokeWidth={1.7}
            className="
              shrink-0
              text-[#2A7999]
            "
          />
        ) : (
          <Folder
            size={15}
            strokeWidth={1.7}
            className="
              shrink-0
              text-[#2A7999]
            "
          />
        )}

        <span
          className="
            min-w-0
            flex-1

            text-[11px]
            font-medium

            text-[#122150]

            dark:text-white

            sm:text-[13px]
          "
        >
          {category.name}
        </span>

        <span
          className="
            flex
            size-5
            shrink-0

            items-center
            justify-center

            rounded-full

            bg-[#2A7999]/10

            text-[8px]
            font-semibold

            text-[#2A7999]

            sm:text-[9px]
          "
        >
          {category.projects.length}
        </span>
      </button>

      <div
        className={`
          grid

          transition-[grid-template-rows,opacity]
          duration-300
          ease-out

          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div
            className="
              mx-3

              border-l
              border-[#2A7999]/15

              pb-1
              pl-3

              sm:mx-4
              sm:pl-4
            "
          >
            {category.projects.map(
              (project) => (
                <div
                  key={project.id}
                  className="
                    flex
                    min-w-0

                    items-center

                    gap-2

                    py-[4px]

                    sm:gap-2.5
                    sm:py-[5px]
                  "
                >
                  <div
                    className="
                      flex
                      size-6
                      shrink-0

                      items-center
                      justify-center

                      rounded-md

                      bg-[#2A7999]/8

                      text-[#2A7999]

                      sm:size-7
                    "
                  >
                    <FileText
                      size={12}
                      strokeWidth={1.7}
                    />
                  </div>

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        break-words

                        text-[10px]
                        font-medium

                        leading-[1.2]

                        text-[#122150]/85

                        dark:text-white/85

                        sm:text-[12px]
                      "
                    >
                      {project.name}
                    </p>

                    <p
                      className="
                        mt-[1px]

                        text-[7px]
                        font-medium

                        uppercase

                        tracking-[0.09em]

                        text-[#122150]/35

                        dark:text-white/30

                        sm:text-[8px]
                      "
                    >
                      {project.type}
                    </p>
                  </div>

                  <span
                    className="
                      shrink-0

                      text-[8px]
                      font-semibold

                      text-[#2A7999]/60

                      sm:text-[9px]
                    "
                  >
                    {project.number}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ======================================================== */
/* PROJECTS VIEW                                            */
/* ======================================================== */

const ProjectsView = () => {
  const [openCategories, setOpenCategories] =
    useState({
      "ai-data": true,
      "cybersecurity-projects": true,
      "open-source-projects": true,
    });

  const toggleCategory = (id) => {
    setOpenCategories((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div
      className="
        flex
        h-full

        flex-col

        overflow-hidden

        rounded-[1.25rem]

        border
        border-[#122150]/8

        bg-[#F8FBFC]/80

        dark:border-white/10
        dark:bg-[#080D1A]/50

        sm:rounded-[1.5rem]
      "
    >
      <div
        className="
          shrink-0

          border-b
          border-[#122150]/8

          px-3
          py-2

          dark:border-white/10

          sm:px-4
          sm:py-3
        "
      >
        <div
          className="
            flex
            items-end
            justify-between

            gap-3
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-semibold

                uppercase

                tracking-[0.18em]

                text-[#2A7999]

                sm:text-[9px]
              "
            >
              Project archive
            </p>

            <h4
              className="
                mt-[2px]

                text-[13px]
                font-semibold

                tracking-[-0.02em]

                sm:text-base
              "
            >
              Built & explored by OSSEC
            </h4>
          </div>

          <span
            className="
              rounded-full

              bg-[#2A7999]/10

              px-2
              py-1

              text-[8px]
              font-semibold

              uppercase

              tracking-[0.1em]

              text-[#2A7999]

              sm:px-2.5
              sm:text-[9px]
            "
          >
            08 projects
          </span>
        </div>
      </div>

      <div
        className="
          min-h-0
          flex-1

          overflow-hidden

          p-2

          sm:p-2.5
        "
      >
        <div className="space-y-1.5">
          {projectCategories.map(
            (category) => (
              <ProjectCategory
                key={category.id}
                category={category}
                isOpen={
                  openCategories[
                    category.id
                  ]
                }
                onToggle={() =>
                  toggleCategory(
                    category.id,
                  )
                }
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

/* ======================================================== */
/* GALLERY IMAGE                                            */
/* ======================================================== */

const GalleryImage = ({
  src,
  index,
}) => {
  const heights = [
    "h-[120px] sm:h-[175px]",
    "h-[145px] sm:h-[205px]",
    "h-[130px] sm:h-[185px]",
    "h-[155px] sm:h-[215px]",
  ];

  return (
    <div
      className={`
        relative

        w-full
        shrink-0

        overflow-hidden

        rounded-xl

        border
        border-[#122150]/8

        bg-[#122150]/5

        dark:border-white/10

        sm:rounded-[1.25rem]

        ${
          heights[
            index % heights.length
          ]
        }
      `}
    >
      <img
        src={src}
        alt="TuniHack memory"
        loading="lazy"
        draggable="false"
        className="
          h-full
          w-full

          select-none
          object-cover

          transition-transform
          duration-700

          hover:scale-[1.035]
        "
      />
    </div>
  );
};

/* ======================================================== */
/* GALLERY COLUMN                                           */
/* ======================================================== */

const GalleryColumn = ({
  images,
  direction,
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
              ? "ecosystem-gallery-up"
              : "ecosystem-gallery-down"
          }
        `}
      >
        {doubledImages.map(
          (image, index) => (
            <GalleryImage
              key={`${direction}-${image}-${index}`}
              src={image}
              index={
                index % images.length
              }
            />
          ),
        )}
      </div>
    </div>
  );
};

/* ======================================================== */
/* GALLERY VIEW                                             */
/* ======================================================== */

const GalleryView = () => {
  return (
    <div
      className="
        relative

        h-full

        overflow-hidden

        rounded-[1.25rem]

        border
        border-[#122150]/8

        bg-[#F8FBFC]/80

        p-2

        dark:border-white/10
        dark:bg-[#080D1A]/50

        sm:rounded-[1.5rem]
        sm:p-3
      "
    >
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
          to-transparent

          dark:from-[#080D1A]

          sm:h-16
        "
      />

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
          to-transparent

          dark:from-[#080D1A]

          sm:h-16
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
        <GalleryColumn
          images={leftGalleryImages}
          direction="up"
        />

        <GalleryColumn
          images={rightGalleryImages}
          direction="down"
        />
      </div>
    </div>
  );
};

/* ======================================================== */
/* MAIN SECTION                                             */
/* ======================================================== */

const EcosystemSection = () => {
  const [activeMode, setActiveMode] =
    useState("ecosystem");

  const activeModeData =
    windowModes.find(
      (mode) =>
        mode.id === activeMode,
    );

  return (
    <section
      id="ecosystem"
      className="
        relative

        overflow-x-clip

        scroll-mt-20

        bg-transparent

        px-4
        py-12

        text-[#122150]

        dark:text-white

        sm:scroll-mt-28
        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-28
      "
    >
      <style>
        {`
          @keyframes ecosystemPanelIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .ecosystem-panel-enter {
            animation:
              ecosystemPanelIn
              350ms
              cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          @keyframes ecosystemGalleryUp {
            from {
              transform: translateY(0);
            }

            to {
              transform:
                translateY(
                  calc(-50% - 5px)
                );
            }
          }

          @keyframes ecosystemGalleryDown {
            from {
              transform:
                translateY(
                  calc(-50% - 5px)
                );
            }

            to {
              transform: translateY(0);
            }
          }

          .ecosystem-gallery-up {
            animation:
              ecosystemGalleryUp
              25s
              linear
              infinite;
          }

          .ecosystem-gallery-down {
            animation:
              ecosystemGalleryDown
              25s
              linear
              infinite;
          }

          .ecosystem-gallery-up:hover,
          .ecosystem-gallery-down:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .ecosystem-panel-enter,
            .ecosystem-gallery-up,
            .ecosystem-gallery-down {
              animation: none;
            }
          }
        `}
      </style>

      <div
        className="
          relative
          mx-auto

          w-full
          max-w-7xl
        "
      >
        {/* ================================================= */}
        {/* HEADING                                          */}
        {/* ================================================= */}

        <div className="text-center">
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
            OSSEC Ecosystem
          </span>

          <h2
            className="
              mx-auto

              mt-4
              max-w-[340px]

              text-[1.9rem]
              font-semibold

              leading-[1.08]

              tracking-[-0.04em]

              sm:mt-6
              sm:max-w-3xl
              sm:text-5xl

              lg:text-[3.6rem]
            "
          >
            Learn. Build.

            <span className="text-[#2A7999]">
              {" "}
              Share.
            </span>
          </h2>

          <p
            className="
              mx-auto

              mt-4
              max-w-[330px]

              text-left

              text-[13px]
              leading-[1.7]

              text-[#122150]/60

              dark:text-white/55

              sm:mt-5
              sm:max-w-2xl
              sm:text-center
              sm:text-base
              sm:leading-8

              lg:text-lg
            "
          >
            Explore the different areas
            that shape the OSSEC community,
            from open source and technical
            learning to cybersecurity,
            projects and events.
          </p>
        </div>

        {/* ================================================= */}
        {/* CONTENT                                          */}
        {/* ================================================= */}

        <div
          className="
            mt-9

            grid
            min-w-0

            gap-8

            sm:mt-14
            sm:gap-12

            lg:grid-cols-[0.65fr_1.35fr]
            lg:items-center
            lg:gap-20
          "
        >
          {/* =============================================== */}
          {/* PHILOSOPHY                                      */}
          {/* =============================================== */}

          <div
            className="
              min-w-0

              lg:self-center
            "
          >
            <p
              className="
                text-center

                text-[10px]
                font-semibold

                uppercase

                tracking-[0.2em]

                text-[#2A7999]

                sm:text-left
                sm:text-xs
              "
            >
              Our philosophy
            </p>

            <h3
              className="
                mx-auto

                mt-3
                max-w-[330px]

                text-center

                text-[1.65rem]
                font-semibold

                leading-[1.12]

                tracking-[-0.035em]

                sm:mx-0
                sm:mt-4
                sm:max-w-none
                sm:text-left
                sm:text-4xl
              "
            >
              Knowledge grows

              <span
                className="
                  block
                  text-[#2A7999]
                "
              >
                when it is shared.
              </span>
            </h3>

            <p
              className="
                mx-auto

                mt-5
                max-w-[330px]

                text-left

                text-[13px]
                leading-[1.7]

                text-[#122150]/60

                dark:text-white/55

                sm:mx-0
                sm:mt-6
                sm:max-w-lg
                sm:text-base
                sm:leading-8
              "
            >
              OSSEC connects students
              through open source, Linux,
              cybersecurity, technical
              workshops, projects and major
              community events.
            </p>

            {/* Desktop / tablet motto */}
            <div
              className="
                mt-8

                hidden

                items-center
                gap-4

                sm:flex
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
                  font-pinyon

                  text-5xl
                  leading-none

                  text-[#2A7999]
                "
              >
                Dare To Share
              </span>
            </div>
          </div>

          {/* =============================================== */}
          {/* INTERACTIVE WINDOW                              */}
          {/* =============================================== */}

          <div
            className="
              relative

              flex
              min-w-0

              flex-col

              overflow-hidden

              rounded-[1.5rem]

              border
              border-[#122150]/10

              bg-white/80

              p-3.5

              shadow-[0_22px_65px_rgba(18,33,80,0.08)]

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.04]

              h-[550px]

              sm:h-[590px]
              sm:rounded-[2rem]
              sm:p-6

              lg:h-[625px]
              lg:p-7

              xl:h-[640px]
            "
          >
            <div
              className="
                pointer-events-none

                absolute

                -right-24
                -top-24

                size-72

                rounded-full

                bg-[#2A7999]/10

                blur-[90px]
              "
            />

            {/* Header */}
            <div
              className="
                relative
                z-20

                flex
                shrink-0

                items-center
                justify-between

                border-b
                border-[#122150]/8

                pb-3

                dark:border-white/10

                sm:pb-4
              "
            >
              <div
                className="
                  flex
                  items-center

                  gap-0.5

                  sm:gap-1
                "
              >
                {windowModes.map(
                  (mode) => {
                    const isActive =
                      activeMode ===
                      mode.id;

                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          setActiveMode(
                            mode.id,
                          )
                        }
                        aria-label={`Open ${mode.label}`}
                        aria-pressed={
                          isActive
                        }
                        title={
                          mode.label
                        }
                        className="
                          group

                          flex
                          size-7

                          items-center
                          justify-center

                          rounded-full

                          outline-none

                          sm:size-8

                          focus-visible:ring-2
                          focus-visible:ring-[#2A7999]/50
                        "
                      >
                        <span
                          className={`
                            block

                            size-2.5

                            rounded-full

                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "scale-110 bg-[#2A7999] shadow-[0_0_14px_rgba(42,121,153,0.35)]"
                                : "bg-[#122150]/15 group-hover:bg-[#2A7999]/45 dark:bg-white/20"
                            }
                          `}
                        />
                      </button>
                    );
                  },
                )}
              </div>

              <span
                className="
                  text-[8px]
                  font-semibold

                  uppercase

                  tracking-[0.14em]

                  text-[#122150]/35

                  dark:text-white/35

                  sm:text-[10px]
                  sm:tracking-[0.18em]
                "
              >
                ossec /{" "}
                {activeModeData?.label}
              </span>
            </div>

            {/* Body */}
            <div
              key={activeMode}
              className="
                ecosystem-panel-enter

                relative
                z-10

                mt-3

                min-h-0
                min-w-0

                flex-1

                overflow-hidden

                sm:mt-4
              "
            >
              {activeMode ===
                "ecosystem" && (
                <EcosystemView />
              )}

              {activeMode ===
                "projects" && (
                <ProjectsView />
              )}

              {activeMode ===
                "gallery" && (
                <GalleryView />
              )}
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* PHONE DARE TO SHARE                               */}
        {/* ================================================= */}

        <div
          className="
            mt-7

            flex
            items-center
            justify-center

            gap-3

            sm:hidden
          "
        >
          <span
            className="
              h-px
              w-8

              bg-[#2A7999]
            "
          />

          <span
            className="
              font-pinyon

              whitespace-nowrap

              text-[2.5rem]
              leading-none

              text-[#2A7999]
            "
          >
            Dare To Share
          </span>

          <span
            className="
              h-px
              w-8

              bg-[#2A7999]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;