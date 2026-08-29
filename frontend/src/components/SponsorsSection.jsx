import { BlurFade } from "@/components/ui/blur-fade";

import SectionReveal from "./SectionReveal";

/* ======================================================== */
/* SPONSORS                                                 */
/* ======================================================== */

const sponsors = [
  {
    name: "Talan",
    logo: "/sponsors/talan.png",
  },
  {
    name: "ODDO BHF",
    logo: "/sponsors/oddo-bhf.png",
  },
  {
    name: "STB Bank",
    logo: "/sponsors/stb-bank.png",
  },
  {
    name: "FNZ",
    logo: "/sponsors/fnz.png",
  },
  {
    name: "GOMYCODE",
    logo: "/sponsors/gomycode.png",
  },
  {
    name: "Pristine",
    logo: "/sponsors/pristine.png",
  },
  {
    name: "Orange",
    logo: "/sponsors/orange.png",
  },
  {
    name: "AccessNow",
    logo: "/sponsors/accessnow.png",
  },
  {
    name: "Infor",
    logo: "/sponsors/infor.png",
  },
  {
    name: "Linux Professional Institute",
    logo: "/sponsors/linux-professional-institute.png",
  },
  {
    name: "Tritux",
    logo: "/sponsors/tritux.png",
  },
  {
    name: "FIS",
    logo: "/sponsors/fis.png",
  },
  {
    name: "DataVora",
    logo: "/sponsors/datavora.png",
  },
  {
    name: "CNI",
    logo: "/sponsors/cni.png",
  },
  {
    name: "JBMA",
    logo: "/sponsors/jbma.png",
  },
  {
    name: "Maghreb",
    logo: "/sponsors/maghreb.png",
  },
];

/* ======================================================== */
/* SPONSOR CARD                                             */
/* ======================================================== */

const SponsorCard = ({
  sponsor,
}) => {
  return (
    <article
      className="
        group

        relative

        flex

        h-[92px]

        items-center
        justify-center

        overflow-hidden

        rounded-[1.15rem]

        border
        border-[#122150]/8

        bg-white/45

        p-2

        shadow-[0_8px_24px_rgba(18,33,80,0.045)]

        backdrop-blur-xl

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#2A7999]/25
        hover:shadow-[0_14px_35px_rgba(42,121,153,0.10)]

        dark:border-white/8
        dark:bg-white/[0.035]

        sm:h-[118px]
        sm:rounded-[1.35rem]
        sm:p-3

        lg:h-[145px]
        lg:rounded-[1.6rem]
        lg:p-4
      "
    >
      {/* ================================================== */}
      {/* SUBTLE GLOW                                        */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          -right-10
          -top-10

          size-24

          rounded-full

          bg-[#2A7999]/8

          blur-2xl

          transition-transform
          duration-500

          group-hover:scale-125
        "
      />

      {/* ================================================== */}
      {/* LOGO PLATE                                         */}
      {/* ================================================== */}

      <div
        className="
          relative
          z-10

          flex

          h-[72px]
          w-full

          items-center
          justify-center

          overflow-hidden

          rounded-[0.9rem]

          border
          border-[#122150]/5

          bg-white/95

          px-3
          py-2

          shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]

          transition-transform
          duration-300

          group-hover:scale-[1.025]

          sm:h-[92px]
          sm:rounded-[1rem]
          sm:px-4
          sm:py-3

          lg:h-[112px]
          lg:rounded-[1.2rem]
          lg:px-5
          lg:py-4
        "
      >
        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          loading="lazy"
          draggable="false"
          className="
            max-h-[46px]
            max-w-[88%]

            select-none

            object-contain

            transition-transform
            duration-300

            group-hover:scale-[1.035]

            sm:max-h-[58px]

            lg:max-h-[72px]
          "
        />
      </div>
    </article>
  );
};

/* ======================================================== */
/* SPONSORS SECTION                                         */
/* ======================================================== */

const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="
        relative
        isolate

        overflow-x-clip

        scroll-mt-20

        bg-transparent

        py-14

        text-[#122150]

        dark:text-white

        sm:scroll-mt-28
        sm:py-20

        lg:py-24
      "
    >
      <SectionReveal>
        <div
          className="
            relative
            z-10

            mx-auto

            max-w-7xl

            px-4

            sm:px-8

            lg:px-12
          "
        >
          {/* ================================================= */}
          {/* BADGE                                            */}
          {/* ================================================= */}

          <BlurFade
            delay={0.04}
            inView
          >
            <div
              className="
                flex
                justify-center
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
                Sponsors & Partners
              </span>
            </div>
          </BlurFade>

          {/* ================================================= */}
          {/* HEADING                                          */}
          {/* ================================================= */}

          <div
            className="
              mx-auto

              mt-6

              max-w-3xl

              text-center

              sm:mt-9
            "
          >
            <BlurFade
              delay={0.08}
              inView
            >
              <h2
                className="
                  text-[2rem]
                  font-semibold

                  leading-[1.08]

                  tracking-[-0.045em]

                  sm:text-5xl

                  lg:text-[3.6rem]
                "
              >
                They trusted

                <span
                  className="
                    text-[#2A7999]
                  "
                >
                  {" "}
                  OSSEC.
                </span>
              </h2>
            </BlurFade>

            <BlurFade
              delay={0.12}
              inView
            >
              <p
                className="
                  mx-auto

                  mt-4

                  max-w-[340px]

                  text-[13px]
                  leading-6

                  text-[#122150]/55

                  dark:text-white/50

                  sm:mt-6
                  sm:max-w-2xl
                  sm:text-base
                  sm:leading-8

                  lg:text-lg
                  lg:leading-9
                "
              >
                Organizations that have
                supported TuniHack and OSSEC
                across previous editions,
                helping our community learn,
                build and innovate.
              </p>
            </BlurFade>
          </div>

          {/* ================================================= */}
          {/* LOGOS                                            */}
          {/* ================================================= */}

          <div
            className="
              mt-9

              grid
              grid-cols-2

              gap-2.5

              sm:mt-12
              sm:grid-cols-3
              sm:gap-3.5

              lg:mt-14
              lg:grid-cols-4
              lg:gap-5
            "
          >
            {sponsors.map(
              (
                sponsor,
                index,
              ) => (
                <BlurFade
                  key={
                    sponsor.name
                  }
                  delay={
                    0.025 *
                    Math.min(
                      index,
                      8,
                    )
                  }
                  inView
                  className="
                    h-full
                  "
                >
                  <SponsorCard
                    sponsor={
                      sponsor
                    }
                  />
                </BlurFade>
              ),
            )}
          </div>

          {/* ================================================= */}
          {/* HISTORICAL NOTE                                  */}
          {/* ================================================= */}

          <BlurFade
            delay={0.18}
            inView
          >
            <p
              className="
                mx-auto

                mt-7

                max-w-[330px]

                text-center

                text-[10px]
                leading-5

                text-[#122150]/35

                dark:text-white/30

                sm:mt-8
                sm:max-w-2xl
                sm:text-xs
                sm:leading-6
              "
            >
              Featured organizations are
              drawn from previous OSSEC and
              TuniHack editions and do not
              necessarily represent current
              sponsorships.
            </p>
          </BlurFade>
        </div>
      </SectionReveal>
    </section>
  );
};

export default SponsorsSection;