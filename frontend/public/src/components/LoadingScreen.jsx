import logo from "../assets/logo.png";

const primaryNodes = [
  { id: "open-source", label: "OPEN SOURCE", x: 50, y: 16, delay: 180 },
  { id: "security", label: "SECURITY", x: 79, y: 31, delay: 300 },
  { id: "community", label: "COMMUNITY", x: 73, y: 69, delay: 420 },
  { id: "share", label: "SHARE", x: 28, y: 71, delay: 540 },
  { id: "linux", label: "LINUX", x: 21, y: 30, delay: 660 },
  { id: "projects", label: "PROJECTS", x: 62, y: 18, delay: 240 },
  { id: "events", label: "EVENTS", x: 85, y: 50, delay: 360 },
  { id: "builders", label: "BUILDERS", x: 60, y: 82, delay: 480 },
  { id: "research", label: "RESEARCH", x: 40, y: 82, delay: 600 },
  { id: "tools", label: "TOOLS", x: 14, y: 49, delay: 720 },
  { id: "club", label: "CLUB", x: 37, y: 18, delay: 840 },
];

const satelliteNodes = [
  { id: "s1", x: 45, y: 8, parent: "open-source", delay: 940 },
  { id: "s2", x: 56, y: 8, parent: "open-source", delay: 1000 },
  { id: "s3", x: 69, y: 24, parent: "projects", delay: 1060 },
  { id: "s4", x: 90, y: 36, parent: "security", delay: 1120 },
  { id: "s5", x: 91, y: 61, parent: "events", delay: 1180 },
  { id: "s6", x: 81, y: 80, parent: "community", delay: 1240 },
  { id: "s7", x: 64, y: 89, parent: "builders", delay: 1300 },
  { id: "s8", x: 49, y: 91, parent: "research", delay: 1360 },
  { id: "s9", x: 31, y: 89, parent: "research", delay: 1420 },
  { id: "s10", x: 16, y: 79, parent: "share", delay: 1480 },
  { id: "s11", x: 8, y: 60, parent: "tools", delay: 1540 },
  { id: "s12", x: 8, y: 40, parent: "tools", delay: 1600 },
  { id: "s13", x: 16, y: 20, parent: "linux", delay: 1660 },
  { id: "s14", x: 30, y: 10, parent: "club", delay: 1720 },
  { id: "s15", x: 74, y: 12, parent: "projects", delay: 1780 },
  { id: "s16", x: 87, y: 20, parent: "security", delay: 1840 },
  { id: "s17", x: 87, y: 76, parent: "community", delay: 1900 },
  { id: "s18", x: 22, y: 90, parent: "share", delay: 1960 },
];

const crossLinks = [
  { from: "club", to: "open-source", delay: 640 },
  { from: "open-source", to: "projects", delay: 720 },
  { from: "projects", to: "security", delay: 800 },
  { from: "security", to: "events", delay: 880 },
  { from: "community", to: "builders", delay: 960 },
  { from: "research", to: "share", delay: 1040 },
  { from: "linux", to: "tools", delay: 1120 },
];

const primaryNodeMap = Object.fromEntries(
  primaryNodes.map((node) => [node.id, node]),
);

const LoadingScreen = ({ isLeaving }) => {
  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex min-h-screen items-center justify-center
        overflow-hidden bg-[#080D1A] px-4
        transition-all duration-700 ease-out
        ${
          isLeaving
            ? "pointer-events-none scale-[1.03] opacity-0"
            : "scale-100 opacity-100"
        }
      `}
      role="status"
      aria-label="Loading OSSEC website"
    >
      <style>
        {`
          @keyframes ossecGridPulse {
            0%, 100% { opacity: 0.055; }
            50% { opacity: 0.075; }
          }

          @keyframes ossecAmbientDrift {
            0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
            50% { transform: translate3d(20px, -18px, 0) scale(1.05); }
          }

          @keyframes ossecNodeIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.25);
            }
            70% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.08);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes ossecTinyNodeIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.3);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes ossecLineIn {
            from {
              stroke-dashoffset: 1;
              opacity: 0;
            }
            to {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }

          @keyframes ossecLabelIn {
            from {
              opacity: 0;
              transform: translateY(5px);
            }
            to {
              opacity: 0.72;
              transform: translateY(0);
            }
          }

          @keyframes ossecHubIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.45);
            }
            70% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.06);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes ossecHubPulse {
            0%, 100% {
              box-shadow:
                0 0 0 0 rgba(42,121,153,0.15),
                0 0 55px rgba(42,121,153,0.14);
            }
            50% {
              box-shadow:
                0 0 0 18px rgba(42,121,153,0),
                0 0 75px rgba(42,121,153,0.22);
            }
          }

          @keyframes ossecNetworkFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }

          @keyframes ossecSubIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes ossecStatusPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }

          .ossec-grid {
            animation: ossecGridPulse 6s ease-in-out infinite;
          }

          .ossec-ambient {
            animation: ossecAmbientDrift 9s ease-in-out infinite;
          }

          .ossec-network-shell {
            animation: ossecNetworkFloat 8s ease-in-out infinite;
          }

          .ossec-line {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            opacity: 0;
            animation: ossecLineIn 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .ossec-node {
            opacity: 0;
            animation: ossecNodeIn 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .ossec-tiny-node {
            opacity: 0;
            animation: ossecTinyNodeIn 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .ossec-label {
            opacity: 0;
            animation: ossecLabelIn 380ms ease-out forwards;
          }

          .ossec-hub {
            opacity: 0;
            animation: ossecHubIn 520ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards;
          }

          .ossec-hub-core {
            animation: ossecHubPulse 1.8s ease-out 1.4s infinite;
          }

          .ossec-sub {
            opacity: 0;
            animation: ossecSubIn 500ms ease-out 1.45s forwards;
          }

          .ossec-status-dot {
            animation: ossecStatusPulse 1.4s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .ossec-grid,
            .ossec-ambient,
            .ossec-network-shell,
            .ossec-line,
            .ossec-node,
            .ossec-tiny-node,
            .ossec-label,
            .ossec-hub,
            .ossec-hub-core,
            .ossec-sub,
            .ossec-status-dot {
              animation: none !important;
              opacity: 1 !important;
            }
          }
        `}
      </style>

      {/* background grid */}
      <div
        className="
          ossec-grid pointer-events-none absolute inset-0
          [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          [background-size:42px_42px]
          sm:[background-size:52px_52px]
          opacity-[0.055]
        "
      />

      {/* ambient lights */}
      <div
        className="
          ossec-ambient pointer-events-none absolute
          left-[7%] top-[12%]
          h-[380px] w-[380px]
          rounded-full bg-[#2A7999]/14 blur-[120px]
          sm:h-[520px] sm:w-[520px]
        "
      />

      <div
        className="
          ossec-ambient pointer-events-none absolute
          right-[10%] top-[24%]
          h-[320px] w-[320px]
          rounded-full bg-[#122150]/55 blur-[120px]
          sm:h-[430px] sm:w-[430px]
        "
      />

      <div
        className="
          relative z-10
          flex w-full max-w-6xl
          flex-col items-center justify-center
        "
      >
        <div
          className="
            ossec-network-shell relative
            h-[420px] w-full max-w-[390px]
            sm:h-[540px] sm:max-w-[620px]
            md:h-[620px] md:max-w-[760px]
          "
        >
          {/* subtle graph rings */}
          <div
            className="
              pointer-events-none absolute
              left-1/2 top-1/2
              h-[180px] w-[180px]
              -translate-x-1/2 -translate-y-1/2
              rounded-full border border-[#2A7999]/10
              sm:h-[230px] sm:w-[230px]
              md:h-[280px] md:w-[280px]
            "
          />

          <div
            className="
              pointer-events-none absolute
              left-1/2 top-1/2
              h-[280px] w-[280px]
              -translate-x-1/2 -translate-y-1/2
              rounded-full border border-[#2A7999]/[0.06]
              sm:h-[360px] sm:w-[360px]
              md:h-[430px] md:w-[430px]
            "
          />

          {/* svg connections */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {primaryNodes.map((node) => (
              <line
                key={`center-${node.id}`}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                pathLength="1"
                className="ossec-line stroke-[#2A7999]/45 [stroke-width:0.23]"
                style={{ animationDelay: `${node.delay}ms` }}
              />
            ))}

            {crossLinks.map((link) => {
              const fromNode = primaryNodeMap[link.from];
              const toNode = primaryNodeMap[link.to];

              return (
                <line
                  key={`${link.from}-${link.to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  pathLength="1"
                  className="ossec-line stroke-[#2A7999]/20 [stroke-width:0.16]"
                  style={{ animationDelay: `${link.delay}ms` }}
                />
              );
            })}

            {satelliteNodes.map((node) => {
              const parent = primaryNodeMap[node.parent];

              return (
                <line
                  key={`sat-line-${node.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  pathLength="1"
                  className="ossec-line stroke-[#2A7999]/20 [stroke-width:0.12]"
                  style={{ animationDelay: `${node.delay}ms` }}
                />
              );
            })}
          </svg>

          {/* primary nodes */}
          {primaryNodes.map((node) => (
            <div
              key={node.id}
              className="ossec-node absolute z-10"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                animationDelay: `${node.delay}ms`,
              }}
            >
              <div
                className="
                  relative
                  flex h-8 w-8
                  -translate-x-1/2 -translate-y-1/2
                  items-center justify-center
                  rounded-full border border-[#2A7999]/40
                  bg-[#091221]
                  shadow-[0_0_24px_rgba(42,121,153,0.12)]
                  sm:h-9 sm:w-9
                  md:h-10 md:w-10
                "
              >
                <span
                  className="
                    h-2 w-2 rounded-full bg-[#41A7D1]
                    shadow-[0_0_12px_rgba(65,167,209,0.85)]
                    sm:h-2.5 sm:w-2.5
                  "
                />
                <span
                  className="
                    absolute inset-1 rounded-full
                    border border-[#2A7999]/12
                  "
                />
              </div>

              {/* visible on mobile too */}
              <span
                className="
                  ossec-label pointer-events-none absolute
                  left-1/2 top-[calc(100%+6px)]
                  -translate-x-1/2 whitespace-nowrap
                  text-[6px] font-semibold uppercase
                  tracking-[0.16em] text-white/55
                  sm:top-[calc(100%+8px)] sm:text-[7px]
                  md:text-[8px]
                "
                style={{
                  animationDelay: `${node.delay + 260}ms`,
                }}
              >
                {node.label}
              </span>
            </div>
          ))}

          {/* satellite nodes */}
          {satelliteNodes.map((node) => (
            <div
              key={node.id}
              className="ossec-tiny-node absolute z-[8]"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                animationDelay: `${node.delay}ms`,
              }}
            >
              <div
                className="
                  relative
                  h-3.5 w-3.5
                  -translate-x-1/2 -translate-y-1/2
                  rounded-full border border-[#2A7999]/20
                  bg-[#0A1422]
                  shadow-[0_0_10px_rgba(42,121,153,0.08)]
                  sm:h-4 sm:w-4
                "
              >
                <span
                  className="
                    absolute left-1/2 top-1/2
                    h-1.5 w-1.5
                    -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-[#2A7999]/85
                  "
                />
              </div>
            </div>
          ))}

          {/* central hub with logo */}
          <div
            className="ossec-hub absolute left-1/2 top-1/2 z-20"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div
              className="
                ossec-hub-core relative
                flex h-[90px] w-[90px]
                items-center justify-center rounded-full
                border border-[#2A7999]/55
                bg-[#081120]
                shadow-[0_0_40px_rgba(42,121,153,0.18)]
                sm:h-[110px] sm:w-[110px]
                md:h-[122px] md:w-[122px]
              "
            >
              {/* aura layers */}
              <div className="absolute inset-0 rounded-full bg-[#2A7999]/8 blur-xl" />
              <div className="absolute inset-[8px] rounded-full border border-[#2A7999]/14" />
              <div className="absolute inset-[18px] rounded-full border border-[#2A7999]/10" />

              <div
                className="
                  relative z-10 flex h-[52px] w-[52px]
                  items-center justify-center rounded-full
                  bg-[#091624]/90
                  shadow-[0_0_30px_rgba(42,121,153,0.16)]
                  sm:h-[62px] sm:w-[62px]
                  md:h-[70px] md:w-[70px]
                "
              >
                <img
                  src={logo}
                  alt="OSSEC"
                  className="
                    h-[34px] w-[34px] object-contain
                    opacity-95 brightness-110
                    drop-shadow-[0_0_10px_rgba(90,190,230,0.35)]
                    sm:h-[40px] sm:w-[40px]
                    md:h-[46px] md:w-[46px]
                  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* only subtitle block below - no big OSSEC text */}
        <div className="-mt-1 flex flex-col items-center text-center sm:-mt-4">
          <div className="ossec-sub flex items-center gap-3">
            <span className="h-px w-10 bg-[#2A7999]/45 sm:w-14" />
            <p
              className="
                text-[9px] font-semibold uppercase
                tracking-[0.35em] text-[#2A7999]
                sm:text-[10px]
              "
            >
              Dare To Share
            </p>
            <span className="h-px w-10 bg-[#2A7999]/45 sm:w-14" />
          </div>

          <div className="ossec-sub mt-4 flex items-center gap-2">
            <span
              className="
                ossec-status-dot
                h-1.5 w-1.5 rounded-full
                bg-[#2A7999]
                shadow-[0_0_10px_rgba(42,121,153,0.9)]
              "
            />
            <p
              className="
                text-[8px] font-semibold uppercase
                tracking-[0.24em] text-white/28
                sm:text-[9px]
              "
            >
              Establishing network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;