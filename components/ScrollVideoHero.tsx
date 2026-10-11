"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed hero video. Assets live in /public/video/; the source scene
 * and renderer are in /scripts/hero-video/.
 *
 * The section is `scrollLength` viewports tall; the video stays sticky
 * and its currentTime follows scroll progress (smoothed with a lerp).
 */
type Props = {
  scrollLength?: number; // in viewport heights (default 3 → 300vh)
  children?: React.ReactNode; // your hero text / CTA
};

export default function ScrollVideoHero({ scrollLength = 3, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!section || !stage || !video) return;

    // The stage sticks just below the sticky site header; track its height
    // (it wraps onto two rows on mobile) so the hero never slides under it.
    const header = document.querySelector<HTMLElement>(".header");
    const setHeaderHeight = () =>
      section.style.setProperty("--header-h", `${header?.offsetHeight ?? 0}px`);
    setHeaderHeight();
    const headerObserver = new ResizeObserver(setHeaderHeight);
    if (header) headerObserver.observe(header);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0;
    let current = 0;
    let raf = 0;
    let duration = 0;

    const onMeta = () => {
      duration = video.duration || 0;
      video.pause();
      if (reduceMotion) video.currentTime = Math.max(0, duration - 0.05); // show final frame
    };

    const measure = () => {
      // While pinned, the stage's offset inside the section equals the distance scrolled.
      const scrolled = stage.getBoundingClientRect().top - section.getBoundingClientRect().top;
      const total = section.offsetHeight - stage.offsetHeight;
      target = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
    };

    const tick = () => {
      current += (target - current) * 0.12; // smoothing
      if (duration && Math.abs(target - current) > 0.0005) {
        const time = current * (duration - 0.04);
        // skip if a seek is still pending → avoids seek queue jank
        if (!video.seeking) video.currentTime = time;
      }
      raf = requestAnimationFrame(tick);
    };

    // iOS Safari needs a play/pause "unlock" before seeking renders frames
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };

    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);
    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    if (!reduceMotion) {
      window.addEventListener("scroll", measure, { passive: true });
      window.addEventListener("resize", measure);
      measure();
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      headerObserver.disconnect();
      video.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="video-hero"
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div ref={stageRef} className="video-hero__stage">
        <video
          ref={videoRef}
          className="video-hero__video"
          muted
          playsInline
          preload="auto"
          poster="/video/poster.jpg"
          aria-hidden="true"
        >
          <source src="/video/hero-bull-scroll.webm" type="video/webm" />
          <source src="/video/hero-bull-scroll.mp4" type="video/mp4" />
        </video>

        {/* readability gradient on the text side */}
        <div className="video-hero__shade" aria-hidden />

        <div className="container video-hero__content">{children}</div>
      </div>
    </section>
  );
}
