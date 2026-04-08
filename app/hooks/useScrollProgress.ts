"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks vertical scroll progress of a section relative to the viewport.
 *
 * Returns a value between 0 (section top is at viewport top) and 1 (section
 * bottom is at viewport bottom). Used by ServiceClient, WorksClient, and
 * BlurredBackground to drive scroll-linked animations.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;

      const value = -top / scrollable;
      setProgress(Math.min(Math.max(value, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}
