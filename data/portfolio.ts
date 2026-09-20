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
    description: "Nasceu enquanto eu vendia palha italiana na escola. Eu precisava entender custos, formar preços, acompanhar estoque e organizar cobranças. Transformei esse problema no meu primeiro SaaS.",
    role: "Produto, experiência e desenvolvimento",
    stage: "Produto próprio em evolução",
    stack: [],
    facts: [
      "Partiu de uma operação que eu vivia todos os dias.",
      "Comecei a construir por volta dos 16 anos.",
      "Feedbacks de usuários ajudaram a orientar novas funções.",
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
    stage: "Sites desenvolvidos para empresas",
    stack: ["WordPress"],
    facts: [
      "Um ano de estudos na Alura abriu esse caminho.",
      "O aprendizado virou trabalho para empresas reais.",
      "A Wiltenburg Labs organizou meus primeiros projetos pagos.",
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
    description: "Aplicativo que desenvolvi como freelance para o professor do meu time. Organiza mensalidades, pendências e dados de atletas para inscrições em campeonatos. O professor continua usando o sistema.",
    role: "Desenvolvimento do aplicativo",
    stage: "Em uso pelo professor",
    stack: [],
    facts: [
      "Centraliza cadastro e documentação dos atletas.",
      "Acompanha mensalidades, vencimentos e pendências.",
      "Continua fazendo parte da rotina do time.",
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
    stage: "Finalista no NEXT da FIAP",
    stack: ["Next.js", "Node.js", "Express", "Firestore", "Phaser.js", "Arduino", "Web Serial", "Python"],
    facts: [
      "Cada jogador responde um formulário sobre os próprios hábitos.",
      "O BPM é medido antes da partida e compõe o Force Score.",
      "Com o Force Score definido, a luta conecta jogo, sensores e bonecos físicos.",
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
