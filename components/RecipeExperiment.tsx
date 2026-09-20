"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { recipeStory } from "@/data/story";
import ProductFallback from "./ProductFallback";

export default function RecipeExperiment() {
  const root = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const desktop = matchMedia("(min-width: 901px)");
    let trigger: ScrollTrigger | undefined;
    const sync = () => {
      trigger?.kill();
      if (desktop.matches && document.documentElement.dataset.motion === "full") {
        trigger = ScrollTrigger.create({ trigger: root.current, start: "top 75%", end: "bottom 40%", onUpdate: self => setStage(self.progress < .3 ? 0 : self.progress < .7 ? 1 : 2) });
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    desktop.addEventListener("change", sync);
    sync();
    return () => { observer.disconnect(); desktop.removeEventListener("change", sync); trigger?.kill(); };
  }, []);
  return <figure className="recipe-experiment" ref={root}>
    <div className="recipe-caption mono"><span>DA VENDA AO SOFTWARE</span><span>Representação</span></div>
    <div className="recipe-visual" aria-hidden="true"><ProductFallback stage={stage} /></div>
    <figcaption id="recipe-description">{recipeStory.descriptions[stage]}</figcaption>
    <div className="recipe-controls" role="group" aria-label="História do Pro Receita">{recipeStory.stages.map((label, i) => <button type="button" key={label} aria-pressed={stage === i} aria-controls="recipe-description" onClick={() => setStage(i)}>{label}<span aria-hidden="true">0{i + 1}</span></button>)}</div>
  </figure>;
}
