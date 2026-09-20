import type { Project } from "@/data/portfolio";

export default function ProjectDossier({ project }: { project: Project }) {
  const destination = project.url ?? project.repositoryUrl;

  return <details className="thread-project project-dossier">
    <summary>
      <span className="dossier-summary-copy"><small className="mono">DOSSIÊ / {project.name}</small>Por dentro do projeto</span>
      <i aria-hidden="true">+</i>
    </summary>
    <div className="dossier-content">
      <div className="dossier-lead">
        <span className="mono dossier-stage">{project.stage}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <ol className="dossier-facts">
        {project.facts.map((fact, index) => <li key={fact}><span className="mono">0{index + 1}</span><p>{fact}</p></li>)}
      </ol>
      <div className="dossier-flow" aria-label={`Fluxo do projeto ${project.name}`}>
        {project.flow.map((step, index) => <span key={step}><b className="mono">{step}</b>{index < project.flow.length - 1 && <i aria-hidden="true">→</i>}</span>)}
      </div>
      <dl className="dossier-meta">
        <div><dt className="mono">MINHA PARTICIPAÇÃO</dt><dd>{project.role}</dd></div>
        {project.stack.length > 0 && <div><dt className="mono">STACK</dt><dd>{project.stack.join(" · ")}</dd></div>}
      </dl>
      {destination && project.linkLabel && <a className="dossier-link" href={destination} target="_blank" rel="noreferrer">{project.linkLabel}<span aria-hidden="true">↗</span></a>}
      {!destination && <p className="dossier-private mono">PROJETO PRIVADO / SISTEMA EM USO</p>}
    </div>
  </details>;
}
