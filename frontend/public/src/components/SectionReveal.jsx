import { useEffect, useRef, useState } from "react";

const variants = {
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },

  rise: {
    hidden: "opacity-0 translate-y-10",
    visible: "opacity-100 translate-y-0",
  },

  left: {
    hidden: "opacity-0 -translate-x-10",
    visible: "opacity-100 translate-x-0",
  },

  right: {
    hidden: "opacity-0 translate-x-10",
    visible: "opacity-100 translate-x-0",
  },

  scale: {
    hidden: "opacity-0 scale-[0.97]",
    visible: "opacity-100 scale-100",
  },
};

const SectionReveal = ({
  children,
  variant = "rise",
  delay = 0,
  className = "",
  once = true,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  const animation =
    variants[variant] ?? variants.rise;

  return (
    <div
      ref={ref}
      className={`
        transition-[opacity,transform]
        duration-[900ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        motion-reduce:transform-none
        motion-reduce:transition-none

        ${
          isVisible
            ? animation.visible
            : animation.hidden
        }

        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default SectionReveal;