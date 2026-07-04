import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Drives the scroll-reveal motion system. Elements marked with `data-reveal`
 * (block reveal) or `data-reveal-group` (staggered children) get an `.in-view`
 * class when they scroll into view.
 *
 * Progressive enhancement + safety: the hidden state in CSS is gated behind
 * `html.js`. If IntersectionObserver is missing, the user prefers reduced
 * motion, or setup throws for any reason, everything is revealed immediately.
 * A short timer also stamps `html.anim-safe`, which force-reveals any
 * animation-gated content (e.g. the masthead) so nothing can stay hidden.
 *
 * Other components can dispatch `window` event `reveal:rescan` after adding
 * new `data-reveal` nodes (e.g. blog post paragraphs) to have them observed.
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
    const noIO = !("IntersectionObserver" in window);

    let observer: IntersectionObserver | null = null;
    if (!prefersReduced && !noIO) {
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
      } catch {
        observer = null;
      }
    }

    // Observe pending nodes, or just reveal everything when there's no observer.
    const scan = () => {
      if (!observer) {
        revealAll();
        return;
      }
      document
        .querySelectorAll(
          "[data-reveal]:not(.in-view), [data-reveal-group]:not(.in-view)"
        )
        .forEach((el) => observer!.observe(el));
    };
    scan();

    // Failsafe: guarantee animation-gated content becomes visible shortly.
    const safeTimer = window.setTimeout(
      () => document.documentElement.classList.add("anim-safe"),
      1600
    );

    const onRescan = () => scan();
    const onRouteChange = () => window.setTimeout(scan, 60);
    window.addEventListener("reveal:rescan", onRescan);
    router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      observer?.disconnect();
      window.clearTimeout(safeTimer);
      window.removeEventListener("reveal:rescan", onRescan);
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);

  return null;
}
