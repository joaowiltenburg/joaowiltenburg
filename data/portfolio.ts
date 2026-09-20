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
    description: "Nasceu enquanto eu, o André e o Levy vendíamos palha italiana na escola. Eu precisava entender custos, formar preços, acompanhar estoque e organizar cobranças. Transformei esse problema no meu primeiro SaaS.",
    role: "Produto, experiência e desenvolvimento",
    stage: "MVP testado por usuários",
    stack: [],
    facts: [
      "Comecei a construir no início de 2024, no 2º ano do ensino médio.",
      "O produto atendia a operação de doces que eu vivia todos os dias.",
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
    description: "Criei uma pequena agência no ensino médio para organizar e vender meus projetos de sites. Depois de estudar WordPress na Alura, desenvolvi sites para empresas de conhecidos que me contrataram.",
    role: "Criação da agência e desenvolvimento dos sites",
    stage: "2023 · Onde tudo começou",
    stack: ["WordPress"],
    facts: [
      "O ano de Alura foi presente do meu tio Wildney, em 2023.",
      "Comecei a programar com 16 anos, no 1º ano do ensino médio.",
      "O que eu estudava à noite virava site de empresa na semana seguinte.",
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
    description: "Aplicativo que desenvolvi em 2025 como freelance para o Juneba, professor do Flamengo Guarulhos 3x3. Organiza mensalidades, pendências e dados de atletas para inscrições em campeonatos. Ele continua usando o sistema.",
    role: "Desenvolvimento do aplicativo",
    stage: "2025 · Em uso pelo time",
    stack: [],
    facts: [
      "Foi o primeiro trabalho pelo qual eu recebi.",
      "Centraliza cadastro, documentação, mensalidades e pendências.",
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
    description: "Uma experiência competitiva que transforma hábitos e frequência cardíaca em uma luta. Antes da partida, cada pessoa responde um formulário, mede o BPM e recebe um Force Score para entrar no jogo.",
    role: "Desenvolvimento do projeto com o time",
    stage: "2026 · Em desenvolvimento na FIAP",
    stack: ["Next.js", "Node.js", "Express", "Firestore", "Phaser.js", "Arduino", "Web Serial", "Python"],
    facts: [
      "Cada jogador responde um formulário sobre os próprios hábitos.",
      "O BPM é medido antes da partida e compõe o Force Score.",
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
