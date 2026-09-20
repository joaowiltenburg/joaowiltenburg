import { studioCode } from "@/data/story";

export default function StudioFallback({ stage }: { stage: number }) {
  return <div className="studio-fallback" data-stage={stage}>
    <svg className="studio-links" viewBox="0 0 600 420" fill="none"><path d="M60 245C110 40 375 50 345 210S540 350 535 175" /><path d="M100 300C340 400 320 30 520 100" /></svg>
    <div className="studio-plane code-plane"><div className="plane-bar mono"><span>joao.ts</span><span>01 / CÓDIGO</span></div><div className="code-body">{studioCode.map((line, i) => <div key={line}><span>{i + 1}</span><code>{line}</code></div>)}</div><div className="plane-foot mono"><i />EM CONSTRUÇÃO</div></div>
    <div className="studio-plane interface-plane"><div className="plane-bar mono"><span>interface</span><span>02 / PRODUTO</span></div><div className="interface-body"><span className="interface-caption mono">FORMA + FUNÇÃO</span><strong>Uma interface.<br />Várias decisões.</strong><div className="interface-preview"><span>Aa</span><div><i /><i /><i /></div></div><span className="interface-action">Explorar <span>↗</span></span></div></div>
    <div className="studio-plane growth-plane"><div className="plane-bar mono"><span>outbound</span><span>03 / GROWTH</span></div><div className="growth-body"><strong>Conectar.</strong><div className="contact-flow">{["Contato", "Conversa", "Cliente"].map((label, i) => <div key={label}><span className="flow-node">{i + 1}</span><span>{label}</span>{i < 2 && <i />}</div>)}</div><span className="growth-note mono">CÓDIGO TAMBÉM É DISTRIBUIÇÃO</span></div></div>
  </div>;
}
