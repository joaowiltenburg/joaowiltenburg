"use client";
import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { profile, projects, stackGroups } from "@/data/portfolio";
import { threadChapters, threadPoints, threadSvgPath, threadView } from "@/data/thread";
import ThreadArtifact, { ThreadOverview } from "./ThreadArtifact";
import ProjectDossier from "./ProjectDossier";
import SchoolDossier from "./SchoolDossier";
import "./thread.css";

const ThreadCanvas = lazy(() => import("./scene/ThreadCanvas"));

export default function ThreadJourney({ age }: { age: number }) {
  const root = useRef<HTMLDivElement>(null);
  const fallback = useRef<SVGSVGElement>(null);
  const progress = useRef(0);
  const [systemMotion, setSystemMotion] = useState<boolean | null>(null);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [desktop, setDesktop] = useState(false);
  const [loadScene, setLoadScene] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const animated = choice ?? systemMotion ?? false;
  const canvasEnabled = desktop && animated && loadScene && !failed;

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: no-preference)");
    const size = matchMedia("(min-width: 901px)");
    const sync = () => {
      setSystemMotion(media.matches); setDesktop(size.matches);
      try {
        const saved = localStorage.getItem("portfolio-motion-v2") ?? sessionStorage.getItem("portfolio-motion-v2");
        setChoice(saved === null ? null : saved === "true");
        if (saved !== null) localStorage.setItem("portfolio-motion-v2", saved);
        sessionStorage.removeItem("portfolio-motion-v2");
      } catch { /* Sem storage disponível, vale a preferência do sistema. */ }
    };
    const storage = (event: StorageEvent) => { if (event.key === "portfolio-motion-v2" || event.key === null) sync(); };
    const visibility = () => setVisible(!document.hidden);
    sync();
    media.addEventListener("change", sync); size.addEventListener("change", sync);
    window.addEventListener("storage", storage); document.addEventListener("visibilitychange", visibility);
    const timer = setTimeout(() => setLoadScene(true), 900);
    return () => { clearTimeout(timer); media.removeEventListener("change", sync); size.removeEventListener("change", sync); window.removeEventListener("storage", storage); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    if (systemMotion === null || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.dataset.motion = animated ? "full" : "reduced";
    const steps = [...root.current.querySelectorAll<HTMLElement>("[data-thread-step]")];
    let positions = steps.map(step => step.getBoundingClientRect().top + scrollY);
    const draw = () => {
      const view = threadView(animated ? progress.current : 1);
      const height = view.span * 50;
      const width = height * innerWidth / innerHeight;
      const x = 400 + view.x * 50 - width * (desktop ? .72 : .7);
      const y = 150 - view.y * 50 - height * .5;
      fallback.current?.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
      root.current?.style.setProperty("--thread-progress", String(progress.current));
    };
    const context = gsap.context(() => {
      const follow = gsap.quickTo(progress, "current", { duration: .85, ease: "power3.out", onUpdate: draw });
      const update = () => {
        let index = 0;
        while (index < positions.length - 2 && scrollY >= positions[index + 1]) index++;
        const part = Math.max(0, Math.min(1, (scrollY - positions[index]) / Math.max(1, positions[index + 1] - positions[index])));
        const value = (index + part) / (steps.length - 1);
        if (animated) follow(value);
        else { progress.current = value; draw(); }
        let chapter = 0;
        while (chapter < positions.length - 1 && scrollY + innerHeight * .4 >= positions[chapter + 1]) chapter++;
        setActive(chapter);
      };
      ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: update, onRefresh: () => { positions = steps.map(step => step.getBoundingClientRect().top + scrollY); update(); } });
      if (animated) {
        gsap.fromTo(".thread-intro .thread-copy > *", { y: 26 }, { y: 0, duration: 1.25, stagger: .09, ease: "power3.out" });
        gsap.utils.toArray<HTMLElement>(".thread-artifact").forEach(element => {
          gsap.fromTo(element, { y: 65, rotate: -5, scale: .92 }, { y: -55, rotate: 3, scale: 1.035, ease: "none", scrollTrigger: { trigger: element.closest(".thread-step"), start: "top bottom", end: "bottom top", scrub: .8 } });
        });
        gsap.fromTo(".recipe-panel", { x: 95, y: 35, rotate: 8, opacity: .15 }, { x: -12, y: -20, rotate: -3, opacity: 1, ease: "none", scrollTrigger: { trigger: ".chapter-proreceita", start: "top 90%", end: "bottom 25%", scrub: .8 } });
        gsap.fromTo(".labs-mark", { rotate: -10, scale: .76, opacity: .4 }, { rotate: 3, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: ".chapter-labs", start: "top 90%", end: "bottom 25%", scrub: .8 } });
        gsap.fromTo(".court-draw", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".chapter-atletas", start: "top 90%", end: "center 35%", scrub: .8 } });
        gsap.fromTo(".athlete-crest", { rotate: -8, scale: .72, opacity: .25 }, { rotate: 5, scale: 1, opacity: .86, ease: "none", scrollTrigger: { trigger: ".chapter-atletas", start: "top 75%", end: "bottom 30%", scrub: .8 } });
        gsap.fromTo(".lockin-pulse path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".chapter-fiap", start: "top 85%", end: "center 35%", scrub: .6 } });
        gsap.fromTo(".fighter-one", { x: -52 }, { x: 14, ease: "power2.in", scrollTrigger: { trigger: ".chapter-fiap", start: "top 72%", end: "center 38%", scrub: .65 } });
        gsap.fromTo(".fighter-two", { x: 52 }, { x: -14, ease: "power2.in", scrollTrigger: { trigger: ".chapter-fiap", start: "top 72%", end: "center 38%", scrub: .65 } });
      }
      draw();
    }, root);
    const resize = new ResizeObserver(() => ScrollTrigger.refresh());
    resize.observe(root.current);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);
    const anchor = (event: MouseEvent) => { if (event.target instanceof Element && event.target.closest('a[href^="#"]')) { lenis?.stop(); lenis?.start(); } };
    if (animated) {
      lenis = new Lenis({ duration: .9, smoothWheel: true, anchors: false, respectReducedMotion: false });
      lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(tick); window.addEventListener("click", anchor);
    }
    return () => { resize.disconnect(); context.revert(); gsap.ticker.remove(tick); window.removeEventListener("click", anchor); lenis?.destroy(); };
  }, [animated, desktop, systemMotion]);

  const toggleMotion = () => {
    setChoice(!animated);
    try { localStorage.setItem("portfolio-motion-v2", String(!animated)); } catch { /* Mantém a escolha só em memória. */ }
  };
  const total = threadChapters.length + 1;
  const current = active === 0 ? "O fio da história" : active === total ? "O caminho continua" : threadChapters[active - 1]?.label;

  return <div ref={root} className="thread-experience" data-active-chapter={active}>
    <a href={`#capitulo-${threadChapters[0].id}`} className="skip-link">Pular para minha trajetória</a>
    <header className="thread-header">
      <a href="#inicio" className="wordmark" aria-label="jw. João Wiltenburg, início"><span className="monogram">jw.</span><span>João Wiltenburg</span></a>
      <nav aria-label="Navegação principal"><details className="thread-index" onKeyDown={event => { if (event.key === "Escape") { event.currentTarget.removeAttribute("open"); event.currentTarget.querySelector("summary")?.focus(); } }}><summary>Percurso <span aria-hidden="true">+</span></summary><div>{threadChapters.map((chapter, i) => <a key={chapter.id} href={`#capitulo-${chapter.id}`} aria-current={active === i + 1 ? "step" : undefined} onClick={event => { event.currentTarget.closest("details")?.removeAttribute("open"); }}><span className="mono">0{i + 1}</span>{chapter.label}</a>)}</div></details><a href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a></nav>
    </header>
    <div className={`thread-scene scene-art ${ready && canvasEnabled ? "scene-art-ready" : ""}`} aria-hidden="true" data-paused={!animated || !visible} data-render-mode={canvasEnabled ? "webgl" : "svg"}>
      <svg ref={fallback} className="thread-svg" viewBox="-550 -225 1400 700" fill="none"><path className="thread-rail" d={threadSvgPath} /><path className="thread-line" d={threadSvgPath} />{threadPoints.slice(1,-1).map(([x,y],i) => <g key={i}><circle cx={400+x*50} cy={150-y*50} r="15" /><circle cx={400+x*50} cy={150-y*50} r="3" className="thread-core" /></g>)}</svg>
      {canvasEnabled && <ThreadBoundary onError={() => setFailed(true)}><Suspense fallback={null}><ThreadCanvas progress={progress} paused={!visible} onReady={setReady} onError={() => setFailed(true)} /></Suspense></ThreadBoundary>}
    </div>
    <main>
      <section id="inicio" className="thread-step thread-intro" data-thread-step aria-labelledby="thread-title">
        <div className="thread-copy"><p className="thread-eyebrow mono"><span className="status-dot" />JOÃO WILTENBURG / GROWTH ENGINEER</p><h1 id="thread-title">Oi, eu sou<br /><span>o João.</span></h1><p className="thread-deck">Tenho {age} anos, desenvolvo produto e growth na isla.to e estudo ADS na FIAP. Construo meus próprios projetos desde os 16. Essa é a minha história até aqui.</p><motion.a href={`#capitulo-${threadChapters[0].id}`} className="thread-start" whileHover={animated ? { x: 5 } : undefined}>Siga o fio <span aria-hidden="true">↓</span></motion.a></div>
        <div className="intro-route-label mono" aria-hidden="true"><span>2023 / 2026</span><i /><span>UMA COISA LEVOU À OUTRA</span></div>
      </section>
      {threadChapters.map((chapter, index) => {
        const project = projects.find(project => project.id === chapter.project);
        return <section key={chapter.id} id={`capitulo-${chapter.id}`} className={`thread-step thread-chapter chapter-${chapter.id}`} data-thread-step aria-labelledby={`heading-${chapter.id}`}>
          {chapter.id === "labs" && <span id="capitulo-alura" className="thread-anchor" />}
          <div className="thread-copy"><p className="thread-eyebrow mono"><span>0{index + 1}</span>{chapter.period}</p><h2 id={`heading-${chapter.id}`}>{chapter.title[0]}<br /><span>{chapter.title[1]}</span></h2><p className="thread-body">{chapter.body}</p><p className="thread-foot">{chapter.foot}</p>
            {chapter.id === "atletas" && <SchoolDossier />}
            {chapter.id === "fiap" && <aside className="education-choice" aria-label="Escolha pela FIAP depois de duas aprovações em universidades federais"><span className="mono">ENEM / UMA ESCOLHA REAL</span><div aria-hidden="true"><b>2 FEDERAIS</b><i /><em>distância</em><i /><strong>FIAP</strong></div><p>Duas aprovações abriram caminhos longe de casa. Escolhi uma formação que eu conseguia sustentar e seguir construindo.</p></aside>}
            {project && <ProjectDossier project={project} />}
            {chapter.id === "isla" && <><p className="thread-personal">Fora do trabalho, sigo construindo meus próprios produtos.</p><a className="isla-public-link" href={profile.company.url} target="_blank" rel="noreferrer">Conhecer a isla.to <span aria-hidden="true">↗</span></a></>}
          </div>
          <ThreadArtifact chapter={chapter.id} />
        </section>;
      })}
      <section id="contato" className="thread-step thread-finale" data-thread-step aria-labelledby="thread-contact-title">
        <div className="thread-copy"><p className="thread-eyebrow mono">0{total} / DAQUI EM DIANTE</p><h2 id="thread-contact-title">O caminho<br /><span>continua.</span></h2><p className="thread-body">Uma ideia, um problema interessante<br />ou uma boa conversa.</p><a className="thread-email" href={`mailto:${profile.contact.email}`}>Vamos conversar <span aria-hidden="true">↗</span></a><div className="thread-social"><a href={profile.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a></div><details className="thread-project thread-stack"><summary>O que já usei pelo caminho <span aria-hidden="true">+</span></summary><div>{stackGroups.map(group => <div key={group.label}><h3>{group.label}</h3><p>{group.technologies.join(" · ")}</p></div>)}</div></details></div>
        <div className="final-map"><span className="mono">CADA PONTO, UMA PARTE DA HISTÓRIA.</span><ThreadOverview /></div>
      </section>
    </main>
    <footer className="thread-footer"><span>João Wiltenburg</span><a href="#inicio">Voltar ao começo ↑</a></footer>
    <div className="thread-hud"><a href="#contato" className="thread-position" aria-label={`0${active} / 0${total} ${current}. Ir ao contato.`}><span className="mono">0{active}<span className="hud-total"> / 0{total}</span></span><span>{current}</span></a><button type="button" className="thread-motion" aria-pressed={animated} onClick={toggleMotion}>{animated ? "Pausar movimento" : "Ativar movimento"}<span aria-hidden="true">{animated ? "Ⅱ" : "▷"}</span></button></div>
  </div>;
}

class ThreadBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}
