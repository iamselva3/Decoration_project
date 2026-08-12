import { useState, useEffect, useRef, useCallback, type RefObject } from "react";

/**
 * Intersection Observer hook for fade-in animations.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

/**
 * Scroll lock for mobile menu
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);
}

/**
 * Detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

/**
 * Detect mobile device (for disabling mouse-based effects)
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/**
 * 3D tilt effect based on mouse position over an element.
 * Returns a ref and the current transform style.
 * Disabled on mobile and when prefers-reduced-motion is set.
 */
export function use3DTilt<T extends HTMLElement = HTMLDivElement>(
  maxTilt = 6,
  perspective = 800
): {
  ref: RefObject<T | null>;
  style: React.CSSProperties;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
} {
  const ref = useRef<T | null>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || prefersReduced) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setTransform({
        rotateX: -y * maxTilt,
        rotateY: x * maxTilt,
      });
    },
    [isMobile, prefersReduced, maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  const style: React.CSSProperties = {
    perspective: `${perspective}px`,
    transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
    transition: "transform 0.3s ease-out",
    transformStyle: "preserve-3d" as const,
  };

  return { ref, style, onMouseMove, onMouseLeave };
}

/**
 * Mouse parallax for hero section — moves content based on mouse position.
 * Returns the x/y offset values to apply as transforms.
 */
export function useMouseParallax(strength = 15): { x: number; y: number } {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (isMobile || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, prefersReduced, strength]);

  return offset;
}
