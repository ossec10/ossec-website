import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import darkLogo from "../assets/dark_logo.png";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

/* ======================================================== */
/* NAVIGATION LINKS                                         */
/* ======================================================== */

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Ecosystem",
    href: "/ecosystem",
  },
  {
    label: "Board",
    href: "/board",
  },
  {
    label: "Club Drop",
    href: "/shirt",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Sponsors",
    href: "/sponsors",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/* ======================================================== */
/* NAVBAR                                                   */
/* ======================================================== */

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0

        z-[100]

        border-b
        border-[#122150]/8

        bg-white/90

        backdrop-blur-xl

        dark:border-white/8
        dark:bg-[#080D1A]/90
      "
    >
      {/* ================================================== */}
      {/* MAIN NAVBAR                                        */}
      {/* ================================================== */}

      <nav
        className="
          mx-auto

          flex

          h-16

          max-w-7xl

          items-center
          justify-between

          px-4

          sm:h-[68px]
          sm:px-6

          md:h-[68px]
          md:px-8

          lg:h-[70px]
          lg:px-12
        "
      >
        {/* ================================================= */}
        {/* LOGO                                             */}
        {/* ================================================= */}

        <Link
          to="/"
          onClick={closeMenu}
          aria-label="OSSEC Home"
          className="
            flex
            shrink-0
            items-center
          "
        >
          {/* Light mode */}

          <img
            src={logo}
            alt="OSSEC"
            className="
              h-8
              w-auto

              object-contain

              transition-transform
              duration-300

              hover:scale-[1.03]

              dark:hidden

              sm:h-9
              md:h-9

              lg:h-[38px]
            "
          />

          {/* Dark mode */}

          <img
            src={darkLogo}
            alt="OSSEC"
            className="
              hidden

              h-8
              w-auto

              object-contain

              transition-transform
              duration-300

              hover:scale-[1.03]

              dark:block

              sm:h-9
              md:h-9

              lg:h-[38px]
            "
          />
        </Link>

        {/* ================================================= */}
        {/* DESKTOP NAVIGATION                               */}
        {/* ================================================= */}

        <ul
          className="
            hidden

            items-center

            md:flex
            md:gap-2.5

            lg:gap-6

            xl:gap-7
          "
        >
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="shrink-0"
            >
              <Link
                to={link.href}
                className="
                  relative

                  whitespace-nowrap

                  text-[11px]
                  font-normal

                  tracking-[0.01em]

                  text-[#122150]/75

                  transition-colors
                  duration-200

                  after:absolute
                  after:-bottom-2
                  after:left-0

                  after:h-px
                  after:w-0

                  after:bg-[#2A7999]

                  after:transition-all
                  after:duration-300

                  hover:text-[#122150]
                  hover:after:w-full

                  dark:text-white/70
                  dark:hover:text-white

                  lg:text-[13px]
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ================================================= */}
        {/* RIGHT ACTIONS                                    */}
        {/* ================================================= */}

        <div
          className="
            flex
            shrink-0

            items-center

            gap-2

            sm:gap-2.5

            lg:gap-3
          "
        >
          {/* ================================================= */}
          {/* JOIN US                                          */}
          {/* ================================================= */}

          <Link
            to="/contact"
            onClick={closeMenu}
            className="
              group

              hidden

              h-9

              items-center

              rounded-full

              bg-[#122150]

              px-4

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-[#2A7999]
              hover:shadow-md

              sm:flex

              md:h-9

              lg:px-[18px]

              dark:bg-[#2A7999]
              dark:hover:bg-[#348BAD]
            "
          >
            <AnimatedShinyText
              className="
                inline-flex

                items-center

                gap-2

                whitespace-nowrap

                text-[13px]
                font-medium

                text-white

                dark:text-white
              "
            >
              <span>Join Us</span>

              <span
                className="
                  text-[15px]
                  leading-none

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </AnimatedShinyText>
          </Link>

          {/* ================================================= */}
          {/* THEME TOGGLER                                    */}
          {/* ================================================= */}

          <AnimatedThemeToggler
            variant="circle"
            duration={500}
            className="
              flex

              size-9
              shrink-0

              items-center
              justify-center

              rounded-full

              bg-[#122150]/6

              text-[#122150]

              transition-all
              duration-300

              hover:bg-[#2A7999]/12
              hover:text-[#2A7999]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#2A7999]/40

              dark:bg-white/8
              dark:text-white

              dark:hover:bg-white/14

              [&_svg]:size-4
              [&_svg]:stroke-current

              sm:size-9
              sm:[&_svg]:size-4
            "
          />

          {/* ================================================= */}
          {/* MOBILE MENU BUTTON                               */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen(
                (current) => !current,
              )
            }
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="
              flex

              size-9
              shrink-0

              items-center
              justify-center

              rounded-full

              bg-[#122150]/6

              text-base
              text-[#122150]

              transition-colors
              duration-300

              hover:bg-[#2A7999]/12

              md:hidden

              dark:bg-white/8
              dark:text-white

              dark:hover:bg-white/14

              sm:size-9
              sm:text-lg
            "
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {/* ================================================== */}
      {/* MOBILE MENU                                       */}
      {/* ================================================== */}

      <div
        className={`
          overflow-hidden

          transition-all
          duration-300
          ease-out

          md:hidden

          ${
            isMenuOpen
              ? `
                max-h-[620px]

                border-t
                border-[#122150]/8

                opacity-100

                dark:border-white/8
              `
              : `
                max-h-0
                opacity-0
              `
          }
        `}
      >
        <div
          className="
            bg-white/95

            px-4
            py-3

            backdrop-blur-xl

            dark:bg-[#080D1A]/95

            sm:px-5
            sm:py-4
          "
        >
          {/* LINKS */}

          <ul
            className="
              flex
              flex-col

              gap-0.5
            "
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={closeMenu}
                  className="
                    block

                    rounded-xl

                    px-3
                    py-2.5

                    text-[13px]
                    font-medium

                    text-[#122150]/80

                    transition-colors
                    duration-200

                    hover:bg-[#2A7999]/8
                    hover:text-[#2A7999]

                    dark:text-white/75

                    dark:hover:bg-white/8
                    dark:hover:text-white

                    sm:px-4
                    sm:py-3
                    sm:text-sm
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ================================================= */}
          {/* MOBILE JOIN US                                   */}
          {/* ================================================= */}

          <Link
            to="/contact"
            onClick={closeMenu}
            className="
              group

              mt-3

              flex
              h-10

              items-center
              justify-center

              rounded-full

              bg-[#122150]

              transition-colors
              duration-300

              hover:bg-[#2A7999]

              dark:bg-[#2A7999]
              dark:hover:bg-[#348BAD]

              sm:mt-4
              sm:h-11
            "
          >
            <AnimatedShinyText
              className="
                inline-flex

                items-center

                gap-2

                text-[13px]
                font-medium

                text-white

                dark:text-white

                sm:text-sm
              "
            >
              <span>
                Join Us
              </span>

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
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;