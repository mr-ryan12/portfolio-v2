import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const evaluate = () => {
      // When scrolled to the bottom, force the last section active —
      // short sections (like Contact) may never cross the threshold otherwise
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (atBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Otherwise, the active section is the last one whose top is above
      // 35% of the viewport height
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = id;
        }
      }
      setActiveId(current);
    };

    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    return () => window.removeEventListener("scroll", evaluate);
  }, [sectionIds]);

  return activeId;
}
