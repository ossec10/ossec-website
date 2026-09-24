import { useEffect } from "react";
import { Link } from "react-router-dom";

/* ======================================================== */
/* RESOURCE DATA                                            */
/* ======================================================== */

const resourceCategories = [
  {
    title: "Courses",
    icon: "📚",
    description:
      "Structured learning paths to build your cybersecurity foundations.",
    resources: [
      {
        name: "HackTheBox Academy",
        url: "https://academy.hackthebox.com/app/dashboard",
        description:
          "Comprehensive cybersecurity courses with hands-on labs covering penetration testing, defensive security, and more.",
      },
      {
        name: "CryptoHack",
        url: "https://cryptohack.org/",
        description:
          "A free platform for learning modern cryptography through fun and interactive challenges.",
      },
      {
        name: "pwn.college",
        url: "https://pwn.college/dojos",
        description:
          "An education platform for learning binary exploitation and systems security from Arizona State University.",
      },
      {
        name: "PortSwigger Academy",
        url: "https://portswigger.net/web-security",
        description:
          "Free online web security training from the creators of Burp Suite, covering all major web vulnerabilities.",
      },
      {
        name: "HackTricks",
        url: "https://hacktricks.wiki/en/index.html",
        description:
          "A massive wiki-style reference for penetration testing tricks, techniques, and methodology.",
      },
      {
        name: "ir0nstone's Notes",
        url: "https://ir0nstone.gitbook.io/notes",
        description:
          "Well-organized notes on binary exploitation, from stack overflows to advanced heap techniques.",
      },
    ],
  },

  {
    title: "Hands-on Practice",
    icon: "🎯",
    description:
      "Vulnerable environments and CTF platforms to sharpen your skills.",
    resources: [
      {
        name: "HackTheBox Labs",
        url: "https://app.hackthebox.com/home",
        description:
          "A leading platform with vulnerable machines and challenges to practice real-world penetration testing.",
      },
      {
        name: "PortSwigger Labs",
        url: "https://portswigger.net/web-security/all-labs",
        description:
          "Free interactive labs covering every class of web vulnerability, from SQLi to SSRF.",
      },
      {
        name: "OWASP Juice Shop",
        url: "https://owasp.org/www-project-juice-shop/",
        description:
          "An intentionally insecure web application for security training, covering the OWASP Top 10 and beyond.",
      },
      {
        name: "OverTheWire",
        url: "https://overthewire.org/wargames/",
        description:
          "Wargames that teach Linux commands, networking, and security concepts through progressive challenges.",
      },
      {
        name: "UnderTheWire",
        url: "https://underthewire.tech/",
        description:
          "PowerShell-based wargames designed to teach Windows system administration and security fundamentals.",
      },
      {
        name: "Crackmes",
        url: "https://crackmes.one/",
        description:
          "A community-driven collection of reverse engineering challenges to practice cracking and analyzing binaries.",
      },
      {
        name: "VulnHub",
        url: "https://www.vulnhub.com/",
        description:
          "Downloadable vulnerable virtual machines for offline penetration testing practice.",
      },
      {
        name: "Root Me",
        url: "https://www.root-me.org/en/breve/Publishing-solutions-on-Internet?lang=en",
        description:
          "A platform with hundreds of hacking challenges across web, network, forensics, and cryptography.",
      },
      {
        name: "Metasploitable 2",
        url: "https://docs.rapid7.com/metasploit/metasploitable-2-exploitability-guide/",
        description:
          "A deliberately vulnerable Linux VM designed for practicing Metasploit and common exploit techniques.",
      },
      {
        name: "Metasploitable 3",
        url: "https://github.com/rapid7/metasploitable3",
        description:
          "A template for building a vulnerable Windows VM configured with a wide range of vulnerabilities.",
      },
      {
        name: "DVWA",
        url: "https://github.com/digininja/DVWA",
        description:
          "Damn Vulnerable Web Application — a PHP/MySQL app for practicing common web attack techniques at various difficulty levels.",
      },
    ],
  },

  {
    title: "YouTube",
    icon: "🎬",
    description:
      "Channels and playlists for visual learners and walkthrough enthusiasts.",
    resources: [
      {
        name: "IppSec",
        url: "https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA",
        description:
          "Extremely in-depth walkthroughs of every retired HTB box packed with insight and practical techniques.",
      },
      {
        name: "VbScrub",
        url: "https://www.youtube.com/channel/UCpoyhjwNIWZmsiKNKpsMAQQ",
        description:
          "HTB walkthroughs and technique deep-dives with a primary focus on Active Directory exploitation.",
      },
      {
        name: "STÖK",
        url: "https://www.youtube.com/channel/UCQN2DsjnYH60SFBIA6IkNwg",
        description:
          "Infosec content focused on bug bounties, web application penetration testing, and the hacker lifestyle.",
      },
      {
        name: "LiveOverflow",
        url: "https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w",
        description:
          "Wide variety of technical infosec topics explained clearly, from browser exploits to hardware hacking.",
      },
      {
        name: "CryptoCat",
        url: "https://www.youtube.com/@_CryptoCat",
        description:
          "CTF walkthroughs, binary exploitation tutorials, and malware analysis for aspiring red teamers.",
      },
      {
        name: "hexdump",
        url: "https://www.youtube.com/@hexdump1337",
        description:
          "Concise, no-nonsense cybersecurity tutorials and exploit development content.",
      },
      {
        name: "yousuckatprogramming",
        url: "https://www.youtube.com/@yousuckatprogramming",
        description:
          "Entertaining and educational programming and hacking content for beginners and intermediates.",
      },
      {
        name: "Vagabond Linux",
        url: "https://www.youtube.com/@musashi0814",
        description:
          "Linux-focused content covering system administration, security tools, and open-source workflows.",
      },
      {
        name: "Core Dumped",
        url: "https://www.youtube.com/@CoreDumpped",
        description:
          "Low-level systems programming and computer science concepts explained through engaging visuals.",
      },
      {
        name: "OST2",
        url: "https://p.ost2.fyi/courses",
        description:
          "Free OpenSecurityTraining2 courses covering architecture, reverse engineering, and vulnerability research.",
      },
      {
        name: "Computerphile",
        url: "https://www.youtube.com/@Computerphile",
        description:
          "University-level computer science and security topics explained in an accessible, interview-style format.",
      },
      {
        name: "PowerCert",
        url: "https://www.youtube.com/@PowerCertAnimatedVideos",
        description:
          "Animated videos explaining networking, IT, and cybersecurity fundamentals in a beginner-friendly way.",
      },
      {
        name: "CCNA Prep",
        url: "https://www.youtube.com/watch?v=H8W9oMNSuwo&list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
        description:
          "Complete CCNA certification preparation playlist covering networking fundamentals and Cisco concepts.",
      },
      {
        name: "Rana Khalil",
        url: "https://www.youtube.com/@RanaKhalil101/videos",
        description:
          "Detailed PortSwigger lab walkthroughs and web security tutorials for aspiring pentesters.",
      },
    ],
  },

  {
    title: "Repos",
    icon: "💾",
    description:
      "GitHub repositories packed with curated tools, resources, and challenges.",
    resources: [
      {
        name: "MBE (Modern Binary Exploitation)",
        url: "https://github.com/RPISEC/MBE",
        description:
          "RPISEC's course materials for modern binary exploitation, from shellcoding to ROP chains.",
      },
      {
        name: "Awesome Hacking",
        url: "https://github.com/Hack-with-Github/Awesome-Hacking",
        description:
          "A massive curated list of hacking tools, resources, and references organized by category.",
      },
      {
        name: "CTF Resources",
        url: "https://github.com/ctfs/resources",
        description:
          "A community-curated collection of frameworks, tools, and guides for CTF competitions.",
      },
    ],
  },

  {
    title: "Misc",
    icon: "🧰",
    description:
      "Handy tools and references that don't fit neatly into other categories.",
    resources: [
      {
        name: "ExplainShell",
        url: "https://explainshell.com/explain?cmd=script+%2Fdev%2Fnull+-qc+%2Fbin%2Fbash",
        description:
          "Paste any shell command and get a visual breakdown of what each argument and flag does.",
      },
    ],
  },
];

/* ======================================================== */
/* RESOURCE CARD                                            */
/* ======================================================== */

const ResourceCard = ({ resource }) => {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group

        flex
        flex-col

        gap-2

        rounded-2xl

        border
        border-[#122150]/8

        bg-white/50

        p-4

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#2A7999]/25
        hover:bg-white/80
        hover:shadow-[0_8px_30px_rgba(42,121,153,0.08)]

        dark:border-white/8
        dark:bg-white/[0.025]

        dark:hover:border-[#2A7999]/30
        dark:hover:bg-white/[0.05]

        sm:p-5
      "
    >
      {/* NAME + ARROW */}

      <div
        className="
          flex
          items-center
          justify-between

          gap-3
        "
      >
        <h3
          className="
            text-sm
            font-semibold

            tracking-[-0.01em]

            text-[#122150]

            dark:text-white

            sm:text-[15px]
          "
        >
          {resource.name}
        </h3>

        <span
          className="
            shrink-0

            text-sm

            text-[#2A7999]/40

            transition-all
            duration-300

            group-hover:translate-x-0.5
            group-hover:text-[#2A7999]
          "
        >
          ↗
        </span>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          text-[12.5px]
          leading-relaxed

          text-[#122150]/60

          dark:text-white/50

          sm:text-[13px]
        "
      >
        {resource.description}
      </p>
    </a>
  );
};

/* ======================================================== */
/* CATEGORY SECTION                                         */
/* ======================================================== */

const CategorySection = ({ category, index }) => {
  return (
    <section
      className="
        relative

        rounded-[1.5rem]

        border
        border-[#122150]/8

        bg-white/35

        p-5

        shadow-[0_15px_50px_rgba(18,33,80,0.05)]

        backdrop-blur-xl

        dark:border-white/8
        dark:bg-white/[0.02]

        sm:rounded-[2rem]
        sm:p-7

        lg:p-8
      "
    >
      {/* CATEGORY HEADER */}

      <div
        className="
          mb-5

          flex
          items-center

          gap-3

          sm:mb-7
          sm:gap-4
        "
      >
        <span
          className="
            flex

            size-10
            shrink-0

            items-center
            justify-center

            rounded-full

            border
            border-[#2A7999]/15

            bg-[#2A7999]/8

            text-lg

            sm:size-12
            sm:text-xl
          "
        >
          {category.icon}
        </span>

        <div>
          <h2
            className="
              text-base
              font-semibold

              tracking-[-0.02em]

              text-[#122150]

              dark:text-white

              sm:text-lg
            "
          >
            {category.title}
          </h2>

          <p
            className="
              mt-0.5

              text-[11px]

              text-[#122150]/50

              dark:text-white/40

              sm:text-xs
            "
          >
            {category.description}
          </p>
        </div>
      </div>

      {/* RESOURCE GRID */}

      <div
        className="
          grid

          gap-3

          sm:grid-cols-2
          sm:gap-4

          lg:grid-cols-3
        "
      >
        {category.resources.map(
          (resource) => (
            <ResourceCard
              key={resource.name}
              resource={resource}
            />
          ),
        )}
      </div>
    </section>
  );
};

/* ======================================================== */
/* RESOURCES PAGE                                           */
/* ======================================================== */

const ResourcesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main
      className="
        relative
        z-10

        mx-auto

        max-w-6xl

        px-4
        pb-20
        pt-28

        sm:px-6
        sm:pb-28
        sm:pt-32

        lg:px-8
        lg:pt-36
      "
    >
      {/* ================================================== */}
      {/* PAGE HEADER                                        */}
      {/* ================================================== */}

      <div
        className="
          mb-10

          text-center

          sm:mb-14
        "
      >
        <p
          className="
            mb-3

            text-[10px]
            font-semibold

            uppercase

            tracking-[0.2em]

            text-[#2A7999]

            sm:text-xs
          "
        >
          Curated Collection
        </p>

        <h1
          className="
            text-2xl
            font-bold

            tracking-[-0.03em]

            text-[#122150]

            dark:text-white

            sm:text-3xl

            lg:text-4xl
          "
        >
          Cybersecurity Resources
        </h1>

        <p
          className="
            mx-auto

            mt-3

            max-w-xl

            text-sm
            leading-relaxed

            text-[#122150]/55

            dark:text-white/45

            sm:mt-4
            sm:text-[15px]
          "
        >
          A personally curated list of the best courses,
          practice labs, channels, and tools to level up
          your cybersecurity skills.
        </p>
      </div>

      {/* ================================================== */}
      {/* CATEGORY SECTIONS                                  */}
      {/* ================================================== */}

      <div
        className="
          flex
          flex-col

          gap-6

          sm:gap-8
        "
      >
        {resourceCategories.map(
          (category, index) => (
            <CategorySection
              key={category.title}
              category={category}
              index={index}
            />
          ),
        )}
      </div>

      {/* ================================================== */}
      {/* BACK TO HOME                                       */}
      {/* ================================================== */}

      <div
        className="
          mt-12

          flex
          justify-center

          sm:mt-16
        "
      >
        <Link
          to="/"
          className="
            group

            inline-flex

            items-center

            gap-2

            rounded-full

            border
            border-[#122150]/10

            bg-white/50

            px-5
            py-2.5

            text-[13px]
            font-medium

            text-[#122150]/70

            transition-all
            duration-300

            hover:border-[#2A7999]/25
            hover:text-[#2A7999]

            dark:border-white/10
            dark:bg-white/[0.03]
            dark:text-white/60

            dark:hover:border-[#2A7999]/25
            dark:hover:text-[#2A7999]
          "
        >
          <span
            className="
              transition-transform
              duration-300

              group-hover:-translate-x-0.5
            "
          >
            ←
          </span>

          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default ResourcesPage;
