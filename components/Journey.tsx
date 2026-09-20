"use client";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/journey";
import RecipeExperiment from "./RecipeExperiment";
import "./journey.css";

const routes = [
  { to: 1, path: "M40 28 V126" },
  { to: 2, path: "M40 60 Q40 76 56 76 H204 Q220 76 220 92 V126" },
  { to: 3, path: "M220 126 V214" },
  { to: 4, path: "M40 126 V302 M220 214 V246 Q220 262 204 262 H56 Q40 262 40 278" },
  { to: 5, path: "M40 302 V378" },
  { to: 6, path: "M40 378 V454" },
];

export default function Journey() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const visible = new Set<number>();
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const index = Number((entry.target as HTMLElement).dataset.chapter);
          if (entry.isIntersecting) visible.add(index);
          else visible.delete(index);
        });
        if (visible.size) setActive(Math.min(...visible));
      }, { rootMargin: `-${Math.round(innerHeight * .16)}px 0px -${Math.round(innerHeight * .65)}px 0px` });
      section.current?.querySelectorAll("[data-chapter]").forEach(element => observer.observe(element));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => { observer.disconnect(); window.removeEventListener("resize", observe); };
  }, []);
  return <section ref={section} id="trajetoria" className="journey-section page-shell" aria-labelledby="journey-heading">
    <div className="section-label"><span>01 / Trajetória</span><span>De onde eu venho</span></div>
    <div className="journey-layout">
      <div className="journey-sticky">
        <h2 id="journey-heading">Como cheguei<br />até aqui.</h2>
        <p className="journey-lead">Role ou escolha uma etapa.</p>
        <nav className="journey-nav" aria-label="Mapa da minha trajetória">
          <svg viewBox="0 0 400 490" preserveAspectRatio="none" aria-hidden="true">{routes.map(route => <path key={route.to} d={route.path} className={active >= route.to ? "route-traveled" : undefined} />)}</svg>
          {journey.map((chapter, index) => <a href={`#capitulo-${chapter.id}`} key={chapter.id} style={{ left: `${chapter.x}%`, top: chapter.y }} aria-current={active === index ? "step" : undefined}>
            <span className="journey-nav-dot" aria-hidden="true">{active === index ? "•" : ""}</span><span><small className="mono">{chapter.period}</small><strong>{chapter.label}</strong></span>
          </a>)}
        </nav>
        <p className="map-note mono">Dois caminhos no ensino médio.<br />Estudo, produto e trabalho se encontrando.</p>
      </div>
      <div className="journey-chapters">
        {journey.map((chapter, index) => <article id={`capitulo-${chapter.id}`} key={chapter.id} data-chapter={index} data-journey-panel className={active === index ? "journey-chapter active" : "journey-chapter"}>
          <p className="chapter-label mono"><span>0{index + 1}</span>{chapter.period}</p><h3>{chapter.title}</h3><p className="chapter-body">{chapter.body}</p>
          <div className="chapter-result"><span className="mono">{chapter.resultLabel}</span><strong>{chapter.result}</strong>{chapter.note && <p>{chapter.note}</p>}</div>
          {chapter.id === "proreceita" && <details className="chapter-experiment"><summary>Ver o Pro Receita em movimento</summary><RecipeExperiment /></details>}
        </article>)}
      </div>
    </div>
  </section>;
}
