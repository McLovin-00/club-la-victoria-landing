import { useState, useEffect, useCallback } from "react";

// Throttle helper function
function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = useCallback(() => {
    const sections = sectionIds
      .map((id) => ({
        id,
        element: document.querySelector(id),
      }))
      .filter(({ element }) => element !== null);

    let currentSection = "";

    sections.forEach(({ id, element }) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        // Consider a section active if it's in the viewport or near the top
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = id;
        }
      }
    });

    setActiveSection(currentSection);
  }, [sectionIds]);

  useEffect(() => {
    // Throttle scroll handler to improve performance
    const throttledHandleScroll = throttle(handleScroll, 100);

    // Initial call
    handleScroll();

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

  return activeSection;
};
