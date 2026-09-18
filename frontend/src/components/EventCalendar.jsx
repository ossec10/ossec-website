import { useState } from "react";

import captureTheCupLogo from "../assets/logos/CTC.png";
import forkAndFlagLogo from "../assets/logos/F&F.png";
import installPartyLogo from "../assets/logos/InstallParty.png";
import tuniHackLogo from "../assets/logos/TuniHack-nobackground.png";
import events from "../data/calender.json";

const eventLogos = {
  "install-party": installPartyLogo,
  "capture-the-cup": captureTheCupLogo,
  tunihack: tuniHackLogo,
  "fork-and-flag": forkAndFlagLogo,
};

const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatMonth = (date) =>
  new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(date);

const formatDate = (date) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
  }).format(new Date(`${date}T00:00:00`));

const EventCalendar = () => {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(null);

  const eventsForDate = (date) => events.filter((event) => event.date === date);
  const monthPrefix = `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}`;
  const monthEvents = events.filter((event) => event.date.startsWith(monthPrefix));
  const selectedEvents = selectedDate
    ? eventsForDate(selectedDate)
    : monthEvents;
  const firstDay = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  );
  const calendarStart = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1 - firstDay.getDay(),
  );

  const changeMonth = (amount) => {
    setVisibleMonth(
      new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1),
    );
    setSelectedDate(null);
  };

  return (
    <main className="min-h-screen bg-[#F8FBFC] px-5 py-14 text-[#122150] dark:bg-[#080D1A] dark:text-white sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2A7999]">
            OSSEC / field schedule
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Events calendar
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#122150]/60 dark:text-white/55 sm:text-base">
            Workshops, assemblies, and challenge nights from the cybersecurity club.
          </p>
        </header>

        <div className="grid border border-[#122150]/15 bg-[#122150]/15 dark:border-white/15 dark:bg-white/15 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="bg-[#F8FBFC] p-4 dark:bg-[#080D1A] sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-[-0.03em]">
                {formatMonth(visibleMonth)}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => changeMonth(-1)}
                  className="border border-[#2A7999] bg-[#2A7999] px-3 py-2 font-mono text-sm text-white transition-colors hover:border-[#122150] hover:bg-[#122150] dark:border-[#2A7999]"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => changeMonth(1)}
                  className="border border-[#2A7999] bg-[#2A7999] px-3 py-2 font-mono text-sm text-white transition-colors hover:border-[#122150] hover:bg-[#122150] dark:border-[#2A7999]"
                >
                  &rarr;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-[#122150]/50 dark:text-white/50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <span key={day} className="pb-3">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 border-l border-t border-[#122150]/15 dark:border-white/15">
              {Array.from({ length: 42 }, (_, index) => {
                const day = new Date(
                  calendarStart.getFullYear(),
                  calendarStart.getMonth(),
                  calendarStart.getDate() + index,
                );
                const key = dateKey(day);
                const dayEvents = eventsForDate(key);
                const outsideMonth = day.getMonth() !== visibleMonth.getMonth();
                const isSelected = selectedDate === key;
                const isToday = dateKey(today) === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(isSelected ? null : key)}
                    aria-label={`${formatDate(key)}${dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length === 1 ? "" : "s"}` : ""}`}
                    className={`relative min-h-20 border-b border-r border-[#122150]/15 p-2 text-left font-mono text-xs transition-colors dark:border-white/15 sm:min-h-28 sm:p-3 ${outsideMonth ? "text-[#122150]/25 dark:text-white/25" : "text-[#122150] dark:text-white"} ${isToday ? "bg-[#144d6b] text-white" : ""} ${isSelected ? "bg-[#122150] text-white dark:bg-[#2A7999]" : "hover:bg-[#2A7999]/10"}`}
                  >
                    <span>{day.getDate()}</span>
                    {dayEvents.length > 0 && (
                      <span className="absolute bottom-2 left-2 flex size-7 items-center justify-center border border-[#2A7999]/50 bg-white/80 p-1 dark:bg-[#080D1A]/80 sm:size-9">
                        {eventLogos[dayEvents[0].id] ? (
                          <img
                            src={eventLogos[dayEvents[0].id]}
                            alt=""
                            className="size-full object-contain"
                          />
                        ) : (
                          <span className="size-1.5 rounded-full bg-[#2A7999]" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="border-t border-[#122150]/15 bg-[#F8FBFC] p-4 dark:border-white/15 dark:bg-[#080D1A] sm:p-8 lg:border-l lg:border-t-0">
            <h2 className="mb-6 text-xl font-semibold tracking-[-0.03em]">
              {selectedDate ? formatDate(selectedDate) : "This month"}
            </h2>
            <div className="space-y-6">
              {selectedEvents.length > 0 ? selectedEvents.map((event) => (
                <article key={event.id} className="border-t border-[#122150]/15 pt-4 dark:border-white/15">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#2A7999]">
                    {event.time} / {event.location}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#122150]/60 dark:text-white/55">
                    {event.description}
                  </p>
                  {event.link && (
                    <a href={event.link} className="mt-4 inline-block border border-[#2A7999] bg-[#2A7999] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white transition-colors hover:border-[#122150] hover:bg-[#122150]">
                      Event details &rarr;
                    </a>
                  )}
                </article>
              )) : (
                <p className="text-sm leading-6 text-[#122150]/60 dark:text-white/55">
                  {selectedDate ? "No events scheduled for this day." : "No events scheduled this month."}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventCalendar;
