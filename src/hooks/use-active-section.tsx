import { useState, useEffect } from "react";

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionIds.map(id => ({
        id,
        element: document.querySelector(id),
      })).filter(({ element }) => element !== null);

      let currentSection = "";
      
      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Considerar una sección activa si está en el viewport o cerca del top
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeSection;
};
