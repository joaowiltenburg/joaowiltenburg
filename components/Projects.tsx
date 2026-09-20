import { projects, stackGroups, type Project } from "@/data/portfolio";
import "./projects.css";

function ProjectFields({ project }: { project: Project }) {
  return (
    <div className="project-fields">
      <dl>
        <div><dt>Minha participação</dt><dd>{project.role}</dd></div>
        <div><dt>Estágio</dt><dd>{project.stage}</dd></div>
        <div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
      </dl>
      {(project.url || project.repositoryUrl) && (
        <div className="project-links">
          {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">Visitar projeto <span aria-hidden="true">↗</span><span className="project-sr-only"> (abre em nova aba)</span></a>}
          {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">Ver código <span aria-hidden="true">↗</span><span className="project-sr-only"> (abre em nova aba)</span></a>}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="project-section" aria-labelledby="project-heading">
      <header className="project-section-heading"><p className="project-eyebrow">03 / Construções</p><h2 id="project-heading">O que venho<br />construindo.</h2><p>Produtos próprios, experimentos e trabalho aplicado.</p></header>
      <div className="stack-history" aria-labelledby="stack-heading">
        <h3 id="stack-heading">O que já usei pelo caminho.</h3>
        <p>Entre projetos, trabalho e estudos.</p>
        <dl>{stackGroups.map(group => <div key={group.label}><dt>{group.label}</dt><dd><ul>{group.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></dd></div>)}</dl>
      </div>
      <div className="project-index">
        {projects.map((project, index) => (
          <article className="project-item" key={project.id}>
            <details className="project-row">
              <summary><span className="project-row-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div className="project-row-title"><h3 className="project-row-name">{project.name}</h3>{project.highlight && <span className="project-recognition">{project.stage}</span>}</div><span className="project-row-action"><span className="project-label-closed">Abrir projeto</span><span className="project-label-open">Fechar projeto</span></span><span className="project-toggle" aria-hidden="true" /></summary>
              <div className="project-row-content"><p className="project-description">{project.description}</p><ProjectFields project={project} /></div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
