import EventCountdown from "./EventCountdown";

const CalendarSection = () => {
  return (
    <section
      id="calendar"
      className="relative isolate overflow-x-clip bg-transparent py-14 text-[#122150] dark:text-white sm:py-20 lg:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-7 flex justify-center sm:mb-10">
          <span className="inline-flex rounded-full border border-[#2A7999]/20 bg-[#2A7999]/10 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2A7999] sm:text-xs">
            Calendar
          </span>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <EventCountdown />
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
