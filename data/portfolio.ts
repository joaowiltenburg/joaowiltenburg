/**
 * Conteúdo do portfolio. Edite este arquivo para publicar suas informações.
 * Use URLs completas (https://...) e troque null pelo endereço correto.
 * As representações visuais da página não são capturas dos produtos.
 */
export const profile = {
  name: "João Wiltenburg",
  role: "Growth Engineer",
  company: {
    name: "isla.to",
    url: "https://isla.to",
    description: "Agência B2B de outreach no LinkedIn",
  },
  education: {
    course: "Análise e Desenvolvimento de Sistemas",
    institution: "FIAP",
  },
  bio: "Sou dev, estudo na FIAP e trabalho com growth na isla.to. Construo produtos próprios com mentalidade de founder.",
  contact: {
    email: "wiltenburg.joao@gmail.com",
    linkedin: "https://www.linkedin.com/in/joaowiltenburg/",
    github: "https://github.com/jotaPwt",
  },
};

export type Project = {
  id: string;
  name: string;
  description: string;
  role: string;
  stage: string;
  stack: string[];
  facts: string[];
  flow: string[];
  url: string | null;
  repositoryUrl: string | null;
  linkLabel: string | null;
  highlight: boolean;
};

// A ordem abaixo também é a ordem de apresentação na página.
// Os detalhes são abertos individualmente na lista de construções.
export const projects: Project[] = [
  {
    id: "prorecipe",
    name: "ProRecipe",
    description: "Primeiro produto que desenhei e construí do zero: cálculo de custo, formação de preço, controle de estoque e cobranças no mesmo lugar.",
    role: "Produto, experiência e desenvolvimento",
    stage: "2024 · MVP testado por usuários",
    stack: [],
    facts: [
      "Comecei a construir no início de 2024, no 2º ano do ensino médio.",
      "Teve usuários testando e dando feedback, sem lançamento completo.",
    ],
    flow: ["Custo", "Preço", "Margem", "Venda"],
    url: "https://prorecipe.com.br",
    repositoryUrl: null,
    linkLabel: "Conhecer o ProRecipe",
    highlight: false,
  },
  {
    id: "wiltenburg-labs",
    name: "Wiltenburg Labs",
    description: "Wiltenburg Labs foi o nome que dei para organizar e vender os meus projetos de site. Foi com ela que eu deixei de só estudar e passei a entregar trabalho para empresa.",
    role: "Criação da agência e desenvolvimento dos sites",
    stage: "2023 · Onde tudo começou",
    stack: ["WordPress"],
    facts: [
      "Comecei a programar com 16 anos, no 1º ano do ensino médio.",
      "Estudar e atender empresa aconteceram no mesmo ano.",
    ],
    flow: ["Aprender", "Oferecer", "Construir", "Entregar"],
    url: "https://wiltenburglabs.infinityfree.me/?i=1",
    repositoryUrl: null,
    linkLabel: "Visitar Wiltenburg Labs",
    highlight: false,
  },
  {
    id: "gestao-atletas",
    name: "Flamengo 3x3",
    description: "Sistema de gestão do time: cadastro e documentação dos atletas, controle de mensalidades e pendências, e os dados prontos na hora de inscrever o time em campeonato.",
    role: "Desenvolvimento do aplicativo",
    stage: "2025 · Em uso pelo time",
    stack: [],
    facts: [
      "Freelance fechado com o professor do time, em 2025.",
      "Continua na rotina do time depois que eu entreguei.",
    ],
    flow: ["Atletas", "Mensalidades", "Inscrições"],
    url: null,
    repositoryUrl: null,
    linkLabel: null,
    highlight: false,
  },
  {
    id: "lockin-fight",
    name: "LockIN Fight",
    description: "Experiência competitiva que estou desenvolvendo em equipe na FIAP. Antes da partida, cada pessoa responde um formulário sobre hábitos e mede o BPM; os dois viram um Force Score que entra no jogo.",
    role: "Desenvolvimento do projeto com o time",
    stage: "2026 · Em desenvolvimento na FIAP",
    stack: ["Next.js", "Node.js", "Express", "Firestore", "Phaser.js", "Arduino", "Web Serial", "Python"],
    facts: [
      "Com o Force Score definido, a luta conecta jogo, sensores e bonecos físicos.",
      "Estamos na reta final. Em outubro saberemos se apresentamos no NEXT.",
    ],
    flow: ["Formulário", "BPM", "Force Score", "Luta"],
    url: null,
    repositoryUrl: "https://github.com/TheFirstGomes/lockin-fight",
    linkLabel: "Ver repositório",
    highlight: true,
  },
];

// Fontes e limites da seleção em research/stacks-e-contatos.md.
// Experiência acumulada em projetos e estudos, sem classificar proficiência.
export const stackGroups = [
  { label: "Interfaces", technologies: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Angular"] },
  { label: "Lógica e dados", technologies: ["Python", "Node.js", "SQL", "Supabase", "MySQL", "Firebase"] },
  { label: "Ferramentas e experimentos", technologies: ["WordPress", "Git", "Vite", "Streamlit", "Framer Motion"] },
];
