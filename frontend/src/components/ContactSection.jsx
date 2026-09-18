import SocialMediaBeam from "./SocialMediaBeam";
import SectionReveal from "./SectionReveal";
//
const ContactSection = () => {
  return (
    <section
      id="contact"
      className="
        relative
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

            mx-auto

            max-w-7xl

            px-4

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

              mb-8

              max-w-3xl

              text-center

              sm:mb-12

              lg:mb-14
            "
          >
            {/* Badge */}
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
              Contact OSSEC
            </span>

            {/* Heading */}
            <h2
              className="
                mx-auto

                mt-5

                max-w-[350px]

                text-[2rem]
                font-semibold

                leading-[1.08]

                tracking-[-0.045em]

                sm:mt-6
                sm:max-w-3xl
                sm:text-5xl

                lg:text-6xl
              "
            >
              Stay connected with

              <span
                className="
                  block

                  text-[#2A7999]
                "
              >
                the OSSEC community.
              </span>
            </h2>

            {/* Description */}
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
              "
            >
              Follow our activities,
              announcements, workshops and
              upcoming cybersecurity events
              across our social media
              platforms.
            </p>
          </div>

          {/* ================================================= */}
          {/* SOCIAL MEDIA BEAM                                 */}
          {/* ================================================= */}

          {/* PHONE */}
          <div
            className="
              relative

              mx-auto

              h-[390px]
              max-w-[390px]

              overflow-hidden

              sm:hidden
            "
          >
            <div
              className="
                absolute

                left-1/2
                top-0

                w-[118%]

                origin-top

                -translate-x-1/2

                scale-[0.84]
              "
            >
              <SocialMediaBeam />
            </div>
          </div>

          {/* TABLET + DESKTOP */}
          <div
            className="
              hidden

              sm:block
            "
          >
            <SocialMediaBeam />
          </div>

          {/* ================================================= */}
          {/* FOOTER                                            */}
          {/* ================================================= */}

          <div
            className="
              mx-auto

              mt-8
              max-w-4xl

              border-t
              border-[#122150]/10

              pt-5

              text-center

              dark:border-white/10

              sm:mt-12
              sm:pt-7

              lg:mt-14
              lg:pt-8
            "
          >
            <p
              className="
                text-[11px]
                leading-5

                text-[#122150]/45

                dark:text-white/40

                sm:text-sm
                sm:leading-7
              "
            >
              Open Source Software ENSI Club
              · OSSEC
            </p>

            <p
              className="
                mt-2

                text-[9px]
                font-medium

                uppercase

                tracking-[0.2em]

                text-[#2A7999]

                sm:text-xs
                sm:tracking-[0.16em]
              "
            >
              Dare To Share
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default ContactSection;