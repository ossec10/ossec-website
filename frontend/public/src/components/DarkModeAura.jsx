import kaliLogo from "../assets/Kali-logo.png";

const DarkModeAura = () => {
  return (
    <div
      className="
        pointer-events-none
        fixed inset-0
        z-[20]
        hidden
        overflow-hidden
        dark:block
      "
      aria-hidden="true"
    >
      {/* Large central aura */}
      <div
        className="
          absolute left-1/2 top-1/2
          h-[650px] w-[650px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#2A7999]/10
          blur-[150px]
        "
      />

      {/* Cyan aura */}
      <div
        className="
          absolute left-[18%] top-[20%]
          h-[350px] w-[350px]
          rounded-full
          bg-cyan-400/[0.07]
          blur-[120px]
          animate-pulse
        "
      />

      {/* Blue aura */}
      <div
        className="
          absolute bottom-[10%] right-[12%]
          h-[420px] w-[420px]
          rounded-full
          bg-[#2A7999]/[0.08]
          blur-[140px]
          animate-pulse
        "
      />

      {/* Kali dragon */}
      <img
        src={kaliLogo}
        alt=""
        className="
          absolute
          left-1/2 top-1/2

          w-[460px]
          max-w-[70vw]

          -translate-x-1/2
          -translate-y-1/2

          opacity-[0.09]

          mix-blend-screen

          drop-shadow-[0_0_35px_rgba(42,121,153,0.65)]
          sm:w-[560px]
          lg:w-[700px]
        "
      />

      {/* Soft glow around dragon */}
      <div
        className="
          absolute
          left-1/2 top-1/2

          h-[420px] w-[420px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border border-[#2A7999]/10

          shadow-[0_0_100px_rgba(42,121,153,0.12)]
        "
      />
    </div>
  );
};

export default DarkModeAura;