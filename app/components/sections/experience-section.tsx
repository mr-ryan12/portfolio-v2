import { useCallback, useEffect, useState } from "react";
import { Code, Layout, Users } from "lucide-react";
import type { Experience } from "~/data/experience";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ICON_MAP = {
  code: Code,
  layout: Layout,
  users: Users,
} as const;

/** Delay in ms before each successive entry starts its fade-in. */
const STAGGER_MS = 400;

/** Duration in ms for each connecting line to fill. */
const LINE_FILL_MS = 600;

/**
 * Manages a sequential cascade:
 * 1. Items fade in with stagger delays
 * 2. After an item appears, its connecting line begins filling
 * 3. The next line only starts after the previous line completes
 */
function useTimelineCascade(count: number, sectionVisible: boolean) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array.from({ length: count }, () => false),
  );
  const [filledLines, setFilledLines] = useState<boolean[]>(
    Array.from({ length: count - 1 }, () => false),
  );

  const markLineFilled = useCallback((index: number) => {
    setFilledLines((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Show first item immediately
    timers.push(
      setTimeout(() => {
        setVisibleItems((prev) => {
          const next = [...prev];
          next[0] = true;
          return next;
        });
      }, 0),
    );

    // For each subsequent item: wait for the previous line to fill,
    // then show the item. We schedule these as a chain.
    // Item 0 appears at t=0
    // Line 0 starts filling at t=STAGGER_MS, completes at t=STAGGER_MS+LINE_FILL_MS
    // Item 1 appears at t=STAGGER_MS (when line starts)
    // Line 1 starts filling after line 0 completes: t=STAGGER_MS+LINE_FILL_MS
    // Item 2 appears at t=STAGGER_MS+LINE_FILL_MS
    for (let i = 1; i < count; i++) {
      const itemDelay = STAGGER_MS + (i - 1) * LINE_FILL_MS;
      timers.push(
        setTimeout(() => {
          setVisibleItems((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, itemDelay),
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [sectionVisible, count]);

  // Determine which lines should be actively filling.
  // Line N starts filling when item N is visible AND (N === 0 OR line N-1 is filled).
  const activeLines = filledLines.map((_, index) => {
    if (!visibleItems[index]) return false;
    if (index === 0) return true;
    return filledLines[index - 1];
  });

  return { visibleItems, activeLines, filledLines, markLineFilled };
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  const { visibleItems, activeLines, markLineFilled } = useTimelineCascade(
    experiences.length,
    isVisible,
  );

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="experience-heading"
      className={cn(
        "py-20 md:py-28 transition-[opacity,translate] duration-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <h2
          id="experience-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Experience
        </h2>
        <div className="mt-12 relative">
          <div className="flex flex-col">
            {experiences.map((experience, index) => {
              const Icon = ICON_MAP[experience.icon];
              const isLast = index === experiences.length - 1;
              const itemVisible = visibleItems[index];
              const lineActive = activeLines[index];

              return (
                <div key={experience.id} className="relative pl-12 md:pl-14">
                  {/* Connecting line between entries */}
                  {!isLast && (
                    <div className="absolute left-3.75 top-10 bottom-0 w-0.5 bg-border md:left-4.25">
                      <div
                        className="w-full origin-top rounded-full"
                        style={{
                          background:
                            "var(--gradient-timeline)",
                          height: lineActive ? "100%" : "0%",
                          transition: lineActive
                            ? `height ${LINE_FILL_MS}ms ease-out`
                            : "none",
                        }}
                        onTransitionEnd={(e) => {
                          if (e.propertyName === "height") {
                            markLineFilled(index);
                          }
                        }}
                      />
                    </div>
                  )}

                  {/* Icon circle */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 flex size-[32px] items-center justify-center rounded-full border-2 bg-canvas transition-all duration-500 ease-out md:size-[36px]",
                      itemVisible
                        ? "scale-100 opacity-100"
                        : "border-border scale-75 opacity-0",
                    )}
                    style={{
                      borderColor: itemVisible
                        ? "#8b5cf6"
                        : undefined,
                    }}
                  >
                    <Icon
                      className={cn(
                        "size-4 transition-colors duration-500 md:size-[18px]",
                        itemVisible
                          ? "text-[#8b5cf6]"
                          : "text-muted-foreground",
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "pb-10 transition-[opacity,translate] duration-500 ease-out",
                      isLast && "pb-0",
                      itemVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3",
                    )}
                  >
                    <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
                      {experience.startDate} — {experience.endDate}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">
                      {experience.role}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.company}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {experience.impact}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
