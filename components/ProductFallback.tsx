import { productFields } from "@/data/story";
import "./product-story.css";

export default function ProductFallback({ stage }: { stage: number }) {
  return <div className="product-fallback" data-stage={stage}>
    <div className="fallback-orbit" />
    <div className="paper-receipt">
      <span className="receipt-small">MINHAS PRIMEIRAS VENDAS</span>
      <strong>Palha<br />italiana.</strong>
      <span className="receipt-rule" />
      {['Custo por doce', 'Preço de venda', 'Estoque', 'Quem me deve?'].map(label => <div className="receipt-row" key={label}><span>{label}</span><i /></div>)}
      <span className="receipt-rule" />
      <span className="receipt-note">Precisava de um jeito<br />melhor de organizar.</span>
      <span className="receipt-barcode" />
    </div>
    <div className="fallback-app"><div><strong>pro receita<span> / meu primeiro SaaS</span></strong><span>•••</span></div><p>Do meu dia a dia para o produto.</p><span className="app-footnote">MVP / REPRESENTAÇÃO</span></div>
    {productFields.map((field, i) => <div className={`product-module module-${i}`} key={field}><span className="module-index">0{i + 1} / ORGANIZAR</span><strong>{field}</strong><div className="module-lines"><i /><i /><i /></div><span className="module-caption">{['Entender cada custo', 'Saber o que tenho', 'Acompanhar cada venda'][i]}</span></div>)}
  </div>;
}
