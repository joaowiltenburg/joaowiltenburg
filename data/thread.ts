// Ordem narrativa e posições do mesmo percurso, usado no SVG e na cena 3D.
// Cada capítulo tem ano visível e termina numa passagem que explica o próximo.
// Datas e tecnologias não confirmadas permanecem nos detalhes dos projetos.
export const threadChapters = [
  { id: "labs", period: "2023 · 1º ano do ensino médio", label: "Wiltenburg Labs", title: ["Estudei. Vendi.", "Entreguei."], body: "Meu tio Wildney me deu um ano de Alura de presente. Foi o pontapé: aprendi WordPress e comecei a fazer sites para empresas de conhecidos. Dei o meu nome a esse trabalho: Wiltenburg Labs. Valeu, tio.", foot: "Faltava construir uma coisa minha.", project: "wiltenburg-labs" },
  { id: "proreceita", period: "2024 · 2º ano do ensino médio", label: "ProRecipe", title: ["A dor era minha.", "O SaaS também."], body: "Eu, o André e o Levy começamos a vender palha italiana na escola. Preço, custo, estoque e cobrança pararam de caber numa planilha. Criei o ProRecipe para organizar a operação que eu mesmo vivia todo dia.", foot: "Foi a primeira vez que resolvi um problema meu com software. Virou o meu jeito de trabalhar.", project: "prorecipe" },
  { id: "atletas", period: "2025 · 3º ano do ensino médio", label: "Flamengo 3x3", title: ["Primeiro cliente.", "Veio do basquete."], body: "Jogo basquete desde o 6º ano. O Juneba, professor do Flamengo Guarulhos 3x3, precisava organizar atletas, mensalidades e inscrições em campeonatos. Desenvolvi o sistema do time e ele usa até hoje.", foot: "Um sistema meu entrou na rotina de outra pessoa.", project: "gestao-atletas" },
  { id: "fiap", period: "Início de 2026 · Depois da escola", label: "FIAP + LockIN Fight", title: ["Duas federais.", "Escolhi a FIAP."], body: "Passei em duas universidades federais pelo Enem, mas a distância inviabilizou as duas. Escolhi ADS na FIAP e continuei construindo. Agora estou na reta final do LockIN Fight, que transforma hábitos e batimentos em uma luta com sensores e bonecos físicos.", foot: "Faltava ver tudo isso acontecer dentro de uma empresa.", project: "lockin-fight" },
  { id: "isla", period: "Maio de 2026 · Hoje", label: "isla.to", title: ["Hoje: código", "e growth na isla."], body: "Entrei na isla.to como Growth Engineer. Construí um CRM para o meu próprio outbound e conquistei três clientes com contratos de US$ 500 por mês cada. Hoje desenvolvo produto e sistemas de growth.", foot: "Growth Engineer na isla.to", project: null },
] as const;

export const threadPoints: [number, number, number][] = [
  [0, 2, 0], [1, -9, 0], [-2.5, -20, 1],
  [2, -31, 0], [-1.5, -42, 1], [2, -53, 0], [0, -61, 0],
];

// Hero + cinco capítulos + visão geral. O último trecho afasta a câmera.
export function threadView(progress: number) {
  const segments = threadPoints.length - 1;
  const step = Math.max(0, Math.min(segments, progress * segments));
  const index = Math.min(segments - 1, Math.floor(step));
  const t = step - index;
  const blend = t * t * (3 - 2 * t);
  const a = threadPoints[index], b = threadPoints[index + 1];
  const overview = index === segments - 1 ? blend : 0;
  return {
    x: a[0] + (b[0] - a[0]) * blend,
    y: (a[1] + (b[1] - a[1]) * blend) * (1 - overview) - 27 * overview,
    span: 13 + overview * 60,
    overview,
  };
}

// Mesmo percurso do 3D em coordenadas de tela: x = 400 + ponto.x * 50, y = 150 - ponto.y * 50.
export const threadSvgPath = "M400 -150 C650 -210 660 140 425 200 S230 20 350 0 S650 140 450 600 S40 880 275 1150 C180 1450 300 1560 500 1700 S640 2010 325 2250 S250 2620 500 2800 S600 3080 400 3200";
