export default function SchoolDossier() {
  return <details className="thread-project project-dossier school-dossier">
    <summary>
      <span className="dossier-summary-copy"><small className="mono">FORMAÇÃO / QUADRA</small>O que o basquete me ensinou</span>
      <i aria-hidden="true">+</i>
    </summary>
    <div className="dossier-content">
      <div className="dossier-lead">
        <span className="mono dossier-stage">DO 6º ANO AO FIM DO ENSINO MÉDIO</span>
        <h3>O basquete também me formou.</h3>
        <p>Reinaldo me apresentou ao esporte e esteve comigo durante toda essa trajetória. Com a equipe da escola, fomos campeões regionais em todos os anos e também campeões estaduais.</p>
      </div>
      <div className="school-stats" aria-label="Destaques da trajetória no basquete">
        <div><strong>15</strong><span className="mono">PONTOS POR JOGO</span></div>
        <div><strong>1º</strong><span className="mono">RANKING INDIVIDUAL</span></div>
        <div><strong>3º</strong><span className="mono">CAMPEONATO ESCOLAR</span></div>
      </div>
      <p className="school-context">Em uma competição entre escolas particulares, nossa escola pública chegou ao terceiro lugar mesmo sem a mesma estrutura.</p>
      <blockquote>As pessoas julgavam antes do jogo. A gente respondia dentro da quadra.</blockquote>
      <p className="school-thanks"><span className="mono">REINALDO</span>Obrigado por ter me apresentado ao basquete e acompanhado essa história até o último ano da escola.</p>
    </div>
  </details>;
}
