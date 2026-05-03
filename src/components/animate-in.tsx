"use client";
import { useEffect, useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  sectionClass?: string;
  className?: string;
};

export default function AnimateIn({
  children,
  id,
  sectionClass = "",
  className = "",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.07 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`fade-in ${sectionClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
