"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { hero } from "@/data/story";
import Arrow from "./Arrow";
import "./studio.css";

type Props = { animated: boolean; toggleMotion: () => void; stage: number; selectStage: (stage: number) => void; children: ReactNode };
export default function StudioHero({ animated, toggleMotion, stage, selectStage, children }: Props) {
  return <section id="inicio" className="story-hero page-shell" aria-labelledby="hero-heading" data-animated={animated}>
    <div className="product-track"><div className="product-sticky">
      <div className="hero-composition">
        <div className="hero-copy"><h1 id="hero-heading">{hero.headline.first}<br />{hero.headline.second}{" "}<span>{hero.headline.accent}</span></h1><p>{hero.intro}</p><motion.a href="#trajetoria" whileHover={animated ? { x: 4 } : {}}>Minha trajetória <Arrow diagonal /></motion.a></div>
        <div className="hero-experiment"><div className="product-visual">{children}</div><span className="scene-caption mono">Representação</span><p className="sr-only" id="scene-description">{hero.steps[stage].text}</p></div>
      </div>
      <div className="hero-bottom"><div className="story-controls" role="group" aria-label="Frentes do meu trabalho">{hero.steps.map((step, i) => <button key={step.label} type="button" aria-pressed={stage === i} aria-controls="scene-description" onClick={() => selectStage(i)}>{step.label}<i aria-hidden="true" /></button>)}</div><button className="motion-toggle" type="button" aria-pressed={animated} onClick={toggleMotion}>{animated ? "Pausar movimento" : "Ativar movimento"}<span aria-hidden="true">{animated ? "Ⅱ" : "▷"}</span></button></div>
    </div></div>
  </section>;
}
