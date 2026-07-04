import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Drives the scroll-reveal motion system. Elements marked with `data-reveal`
 * (block reveal) or `data-reveal-group` (staggered children) get an `.in-view`
 * class when they scroll into view.
 *
 * Progressive enhancement + safety: the hidden state in CSS is gated behind
 * `html.js`. If IntersectionObserver is missing, the user prefers reduced
 * motion, or setup throws for any reason, we reveal everything immediately —
 * content is never left permanently invisible.
 */
export default function ScrollReveal() {
  const router = useRouter();

  useEffect(() => {
    const revealAll = () =>
      document
        .querySelectorAll("[data-reveal], [data-reveal-group]")
        .forEach((el) => el.classList.add("in-view"));

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    let observer: IntersectionObserver | null = null;

    const observe = () => {
      const els = document.querySelectorAll(
        "[data-reveal]:not(.in-view), [data-reveal-group]:not(.in-view)"
      );
      els.forEach((el) => observer!.observe(el));
    };

    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer!.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      observe();
    } catch {
      revealAll();
      return;
    }

    // Re-scan after client-side navigation so new page content animates in.
    const onRouteChange = () => window.setTimeout(observe, 60);
    router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      observer?.disconnect();
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);

  return null;
}
