export default function SchoolDossier() {
  return <details className="thread-project project-dossier school-dossier">
    <summary>
      <span className="dossier-summary-copy"><small className="mono">FORMAÇÃO / QUADRA</small>De onde vem o basquete</span>
      <i aria-hidden="true">+</i>
    </summary>
    <div className="dossier-content">
      <div className="dossier-lead">
        <span className="mono dossier-stage">DO 6º ANO AO FIM DO ENSINO MÉDIO</span>
        <h3>O basquete também me formou.</h3>
        <p>O Reinaldo me apresentou ao esporte no 6º ano e foi meu técnico na escola até o último ano. Fomos campeões regionais em todos os anos e campeões estaduais. Foi ele que me colocou dentro desse mundo, onde anos depois apareceu o meu primeiro cliente.</p>
      </div>
      <div className="school-stats" aria-label="Destaques da trajetória no basquete">
        <div><strong>15+</strong><span className="mono">PONTOS POR JOGO, EM MÉDIA</span></div>
        <div><strong>MVP</strong><span className="mono">EM JOGOS E CAMPEONATOS</span></div>
        <div><strong>1º</strong><span className="mono">RANKING INDIVIDUAL</span></div>
      </div>
      <p className="school-context">Nossa escola pública ficou em terceiro lugar em um campeonato contra escolas particulares, com muito menos estrutura que elas. Disciplina, leitura de jogo e reação sob pressão vieram daí, e hoje uso isso todo dia fora da quadra.</p>
      <p className="school-thanks"><span className="mono">REINALDO</span>Valeu por ter me apresentado ao basquete e por ter estado junto em todos esses campeonatos, do 6º ano até o último ano da escola.</p>
    </div>
  </details>;
}
