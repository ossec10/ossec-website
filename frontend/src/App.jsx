import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AboutSection from "./components/AboutSection";
import BoardSection from "./components/BoardSection";
import ContactSection from "./components/ContactSection";
import DarkModeAura from "./components/DarkModeAura";
import EcosystemSection from "./components/EcosystemSection";
import EventsSection from "./components/EventsSection";
import HomeStorySection from "./components/HomeStorySection";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import ShirtSection from "./components/ShirtSection";
import SponsorsSection from "./components/SponsorsSection";

/* ======================================================== */
/* INDEPENDENT EVENT PAGES                                  */
/* ======================================================== */

import TuniHackPage from "./components/TuniHackPage";

const LOADING_DISPLAY_TIME = 4000;
const LOADING_FADE_TIME = 700;

/* ======================================================== */
/* HOME PAGE                                                */
/* ======================================================== */

const HomePage = () => {
  return (
    <main className="relative z-10">
      <HomeStorySection />

      <AboutSection />

      <EcosystemSection />

      <BoardSection />

      <ShirtSection />

      <EventsSection />

      <SponsorsSection />

      <ContactSection />
    </main>
  );
};

/* ======================================================== */
/* SECTION PAGE                                             */
/* ======================================================== */

const SectionPage = ({ sectionId }) => {
  useEffect(() => {
    const scrollToSection = () => {
      if (sectionId === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const timeout = setTimeout(
      scrollToSection,
      100,
    );

    return () => clearTimeout(timeout);
  }, [sectionId]);

  return <HomePage />;
};

/* ======================================================== */
/* APP                                                      */
/* ======================================================== */

function App() {
  const [isLoading, setIsLoading] =
    useState(true);

  const [isLeaving, setIsLeaving] =
    useState(false);

  /* ====================================================== */
  /* INITIAL LOADING SCREEN                                 */
  /* ====================================================== */

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, LOADING_DISPLAY_TIME);

    const finishTimer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DISPLAY_TIME + LOADING_FADE_TIME);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        isLeaving={isLeaving}
      />
    );
  }

  return (
    <div
      className="
        relative
        min-h-screen

        overflow-x-clip

        bg-[#F8FBFC]
        text-[#122150]

        dark:bg-[#080D1A]
        dark:text-white
      "
    >
      {/* ====================================================== */}
      {/* ONE GLOBAL WEBSITE BACKGROUND                         */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
        "
        aria-hidden="true"
      >
        {/* ==================================================== */}
        {/* CONTINUOUS GRID                                      */}
        {/* ==================================================== */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.025]

            [background-image:linear-gradient(#122150_1px,transparent_1px),linear-gradient(90deg,#122150_1px,transparent_1px)]
            [background-size:55px_55px]

            dark:opacity-[0.035]

            dark:[background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          "
        />

        {/* ==================================================== */}
        {/* GLOBAL LEFT AMBIENT GLOW                             */}
        {/* ==================================================== */}

        <div
          className="
            absolute

            -left-64
            top-[15vh]

            size-[520px]

            rounded-full

            bg-[#2A7999]/[0.08]

            blur-[140px]

            dark:bg-[#2A7999]/[0.09]
          "
        />

        {/* ==================================================== */}
        {/* GLOBAL RIGHT AMBIENT GLOW                            */}
        {/* ==================================================== */}

        <div
          className="
            absolute

            -right-64
            top-[55vh]

            size-[560px]

            rounded-full

            bg-[#122150]/[0.06]

            blur-[150px]

            dark:bg-[#2A7999]/[0.07]
          "
        />
      </div>

      {/* ====================================================== */}
      {/* DARK MODE KALI AURA                                    */}
      {/* ====================================================== */}

      <DarkModeAura />

      {/* ====================================================== */}
      {/* NAVBAR                                                 */}
      {/* ====================================================== */}

      <NavBar />

      {/* ====================================================== */}
      {/* ROUTES                                                 */}
      {/* ====================================================== */}

      <div className="relative z-10">
        <Routes>
          {/* ================================================== */}
          {/* HOME                                              */}
          {/* ================================================== */}

          <Route
            path="/"
            element={
              <SectionPage sectionId="home" />
            }
          />

          {/* ================================================== */}
          {/* ABOUT                                             */}
          {/* ================================================== */}

          <Route
            path="/about"
            element={
              <SectionPage sectionId="about" />
            }
          />

          {/* ================================================== */}
          {/* ECOSYSTEM                                         */}
          {/* ================================================== */}

          <Route
            path="/ecosystem"
            element={
              <SectionPage sectionId="ecosystem" />
            }
          />

          {/* ================================================== */}
          {/* BOARD                                             */}
          {/* ================================================== */}

          <Route
            path="/board"
            element={
              <SectionPage sectionId="board" />
            }
          />

          {/* ================================================== */}
          {/* CLUB DROP                                         */}
          {/* ================================================== */}

          <Route
            path="/shirt"
            element={
              <SectionPage sectionId="shirt" />
            }
          />

          {/* ================================================== */}
          {/* EVENTS                                            */}
          {/* ================================================== */}

          <Route
            path="/events"
            element={
              <SectionPage sectionId="events" />
            }
          />

          {/* ================================================== */}
          {/* SPONSORS                                          */}
          {/* ================================================== */}

          <Route
            path="/sponsors"
            element={
              <SectionPage sectionId="sponsors" />
            }
          />

          {/* ================================================== */}
          {/* CONTACT                                           */}
          {/* ================================================== */}

          <Route
            path="/contact"
            element={
              <SectionPage sectionId="contact" />
            }
          />

          {/* ================================================== */}
          {/* INDEPENDENT EVENT PAGES                           */}
          {/* ================================================== */}

          <Route
            path="/tunihack"
            element={<TuniHackPage />}
          />

          {/*
            We will add these individually as we build them:

            <Route
              path="/install-party"
              element={<InstallPartyPage />}
            />

            <Route
              path="/capture-the-cup"
              element={<CaptureTheCupPage />}
            />

            <Route
              path="/fork-and-flag"
              element={<ForkAndFlagPage />}
            />
          */}
        </Routes>
      </div>
    </div>
  );
}

export default App;