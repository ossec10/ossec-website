import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import captureTheCupLogo from "../assets/logos/CTC.png";
import forkAndFlagLogo from "../assets/logos/F&F.png";
import installPartyLogo from "../assets/logos/InstallParty.png";
import tuniHackLogo from "../assets/logos/TuniHack-nobackground.png";
import mascot from "../assets/excited_mascot.png";
import events from "../data/calender.json";

const eventLogos = {
  "install-party": installPartyLogo,
  "capture-the-cup": captureTheCupLogo,
  tunihack: tuniHackLogo,
  "fork-and-flag": forkAndFlagLogo,
};

const getEventDate = (event) => {
  const date = new Date(`${event.date}T${event.time}:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getUpcomingEvent = () => {
  const now = Date.now();

  return events
    .map((event) => ({ event, date: getEventDate(event) }))
    .filter(({ date }) => date && date.getTime() > now)
    .sort((first, second) => first.date - second.date)[0]?.event || null;
};

const formatDate = (event) => {
  const date = getEventDate(event);

  return date
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
        timeStyle: "short",
      }).format(date)
    : `${event.date} ${event.time}`;
};

const getTimeLeft = (event) => {
  const difference = Math.max(0, getEventDate(event).getTime() - Date.now());
  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

const pad = (value) => String(value).padStart(2, "0");

const EventTitle = ({ title }) => {
  const words = title.split(" ");
  const firstWord = words.shift();

  return (
    <h3 className="max-w-xl text-[3.6rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#122150] dark:text-white sm:text-7xl lg:text-[6.8rem]">
      <span className="block">{firstWord}</span>
      {words.length > 0 && (
        <span className="block text-[#2A7999]">{words.join(" ")}</span>
      )}
    </h3>
  );
};

const EventCountdown = () => {
  const [event, setEvent] = useState(getUpcomingEvent);
  const [timeLeft, setTimeLeft] = useState(() =>
    event ? getTimeLeft(event) : null,
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextEvent = getUpcomingEvent();
      setEvent(nextEvent);
      setTimeLeft(nextEvent ? getTimeLeft(nextEvent) : null);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="
        grid
        items-center
        gap-8
        border-y
        border-[#122150]/15
        bg-white/35
        px-4
        py-8
        dark:border-white/15
        dark:bg-white/[0.025]
        sm:grid-cols-[minmax(0,1fr)_170px]
        sm:px-10
        sm:py-10
        lg:grid-cols-[minmax(0,1fr)_210px]
      "
    >
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2A7999]">
            OSSEC / next signal
          </p>
          <Link
            to="/calendar"
            className="border border-[#2A7999] bg-[#2A7999] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#122150] hover:bg-[#122150]"
          >
            View calendar <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {event && timeLeft ? (
          <>
            <EventTitle title={event.title} />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#122150]/55 dark:text-white/55 sm:text-xs">
              {formatDate(event)} / {event.location}
            </p>
            <div className="mt-6 grid grid-cols-4 border-y border-[#122150]/15 dark:border-white/15">
              {Object.entries(timeLeft).map(([label, value], index) => (
                <div
                  key={label}
                  className={`py-6 text-center ${index ? "border-l border-[#122150]/10 dark:border-white/10" : ""}`}
                >
                  <span className="block font-mono text-4xl font-bold tabular-nums text-[#122150] dark:text-white sm:text-6xl">
                    {pad(value)}
                  </span>
                  <span className="mt-2 block font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#122150]/65 dark:text-white/65 sm:text-sm">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#122150] dark:text-white sm:text-4xl">
              No events scheduled
            </h3>
            <p className="mt-2 text-sm text-[#122150]/55 dark:text-white/55">
              Check back soon for the club&apos;s next activity.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center self-end sm:self-center">
        <img
          src={event ? eventLogos[event.id] || mascot : mascot}
          alt={event && eventLogos[event.id] ? `${event.title} logo` : "OSSEC mascot"}
          className="max-h-36 w-auto max-w-full object-contain sm:max-h-44 lg:max-h-52"
        />
      </div>
    </div>
  );
};

export default EventCountdown;
