"use client";
import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import StudioHero from "./StudioHero";
import StudioFallback from "./StudioFallback";

const StudioCanvas = lazy(() => import("./scene/StudioCanvas"));

export default function Experience() {
  const progress = useRef(0);
  const scene = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [systemMotion, setSystemMotion] = useState<boolean | null>(null);
  const [motionChoice, setMotionChoice] = useState<boolean | null>(null);
  const [loadScene, setLoadScene] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [stage, setStage] = useState(0);
  const animated = motionChoice ?? systemMotion ?? false;
  const canvasEnabled = desktop && animated && loadScene && !failed;

  useEffect(() => {
    const size = matchMedia("(min-width: 901px)");
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => {
      setDesktop(size.matches);
      setSystemMotion(motion.matches);
      try {
        const saved = localStorage.getItem("portfolio-motion") ?? sessionStorage.getItem("portfolio-motion");
        setMotionChoice(saved === null ? null : saved === "true");
        if (saved !== null) localStorage.setItem("portfolio-motion", saved);
        sessionStorage.removeItem("portfolio-motion");
      } catch { /* Use the device preference when storage is unavailable. */ }
    };
    update();
    const syncMotion = (event: StorageEvent) => {
      if (event.key === "portfolio-motion" || event.key === null) update();
    };
    window.addEventListener("storage", syncMotion);
    size.addEventListener("change", update);
    motion.addEventListener("change", update);
    let cancelled = false;
    const timer = setTimeout(() => { document.fonts.ready.then(() => { if (!cancelled) setLoadScene(true); }); }, 800);
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (scene.current) observer.observe(scene.current);
    return () => { cancelled = true; window.removeEventListener("storage", syncMotion); size.removeEventListener("change", update); motion.removeEventListener("change", update); clearTimeout(timer); document.removeEventListener("visibilitychange", visibility); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (systemMotion === null) return;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.dataset.motion = animated ? "full" : "reduced";
    const context = gsap.context(() => {
      ScrollTrigger.create({ trigger: ".product-track", start: "top top", end: "bottom bottom", onUpdate: self => { progress.current = self.progress; setStage(self.progress < .28 ? 0 : self.progress < .76 ? 1 : 2); } });
      if (!animated || !desktop) return;
      gsap.utils.toArray<HTMLElement>(".practice-list article").forEach((element, i) => {
        gsap.fromTo(element, { y: 30 }, { y: 0, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 95%", end: "top 65%", scrub: .5 + i * .15 } });
      });
    });
    const hero = document.querySelector<HTMLElement>(".story-hero");
    const sticky = document.querySelector<HTMLElement>(".product-sticky");
    const resize = new ResizeObserver(() => {
      if (hero && sticky) hero.style.setProperty("--hero-height", `${sticky.offsetHeight}px`);
      ScrollTrigger.refresh();
    });
    const main = document.querySelector("main");
    if (main) resize.observe(main);
    if (sticky) resize.observe(sticky);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => { resize.disconnect(); context.revert(); };
  }, [animated, desktop, systemMotion]);

  useEffect(() => {
    if (!desktop || !animated) return;
    const lenis = new Lenis({ duration: .95, smoothWheel: true, anchors: false, respectReducedMotion: false });
    lenis.on("scroll", ScrollTrigger.update);
    // Cancela a inércia da roda antes do salto nativo para a âncora.
    const anchorClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href^="#"]')) { lenis.stop(); lenis.start(); }
    };
    window.addEventListener("click", anchorClick);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => { window.removeEventListener("click", anchorClick); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [animated, desktop]);

  const selectStage = (value: number) => { progress.current = value / 2; setStage(value); };
  const toggleMotion = () => {
    setMotionChoice(!animated);
    try { localStorage.setItem("portfolio-motion", String(!animated)); } catch { /* The in-memory choice still works. */ }
  };
  return <StudioHero animated={animated} toggleMotion={toggleMotion} stage={stage} selectStage={selectStage}>
    <div ref={scene} className={`scene-art ${ready && canvasEnabled ? "scene-art-ready" : ""}`} data-render-mode={canvasEnabled ? "webgl" : "static"} data-paused={!animated || !visible || !inView} aria-hidden="true">
      <StudioFallback stage={stage} />
      {canvasEnabled && <SceneBoundary onError={() => { setFailed(true); setReady(false); }}><Suspense fallback={null}><StudioCanvas progress={progress} paused={!visible || !inView} onReady={setReady} onContextLost={() => { setFailed(true); setReady(false); }} /></Suspense></SceneBoundary>}
    </div>
  </StudioHero>;
}
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}
