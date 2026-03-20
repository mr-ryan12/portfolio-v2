import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  vx: number;
  vy: number;
  /** Phase offset for the twinkle cycle. */
  twinkleOffset: number;
  /** How fast this star's brightness oscillates. */
  twinkleSpeed: number;
}

/** Density: stars per 100 000 px² of viewport area. */
const DENSITY = 8;
const MIN_STARS = 30;
const MAX_STARS = 120;

function createStars(width: number, height: number): Star[] {
  const area = width * height;
  const count = Math.min(
    MAX_STARS,
    Math.max(MIN_STARS, Math.round((area / 100_000) * DENSITY)),
  );

  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 0.8 + 0.6, // 0.6 – 1.4 px
    baseOpacity: Math.random() * 0.3 + 0.08, // 0.08 – 0.38
    opacity: 0,
    vx: (Math.random() - 0.5) * 0.15, // very slow horizontal drift
    vy: (Math.random() - 0.5) * 0.1, // even slower vertical drift
    twinkleOffset: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.0008 + 0.0003,
  }));
}

export default function StarField(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced motion — render a static snapshot instead of animating.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    function resize(): void {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    let stars = createStars(width, height);

    let frameId = 0;

    function draw(now: number): void {
      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.x += star.vx;
          star.y += star.vy;

          // Wrap around edges with a small buffer so stars don't pop.
          if (star.x < -2) star.x = width + 2;
          if (star.x > width + 2) star.x = -2;
          if (star.y < -2) star.y = height + 2;
          if (star.y > height + 2) star.y = -2;
        }

        // Gentle twinkle: oscillate opacity around the base value.
        const twinkle = Math.sin(now * star.twinkleSpeed + star.twinkleOffset);
        star.opacity = star.baseOpacity + twinkle * star.baseOpacity * 0.4;

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx!.fill();
      }

      if (prefersReducedMotion) return; // single static frame
      frameId = requestAnimationFrame(draw);
    }

    frameId = requestAnimationFrame(draw);

    function handleResize(): void {
      resize();
      stars = createStars(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
