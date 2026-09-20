// Ordem narrativa e posições do mesmo percurso, usado no SVG e na cena 3D.
// Datas e tecnologias não confirmadas permanecem nos detalhes dos projetos.
export const threadChapters = [
  { id: "origem", period: "Na escola", label: "O começo", title: ["Duas pessoas.", "Dois começos."], body: "Marcos me apresentou à programação. Reinaldo me apresentou ao basquete. A curiosidade e a disciplina que nasceram ali seguem comigo até hoje.", foot: "Curiosidade para construir. Disciplina para continuar.", project: null },
  { id: "proreceita", period: "Por volta dos 16", label: "ProRecipe", title: ["Uma dor virou", "meu primeiro SaaS."], body: "Eu vendia palha italiana. Para organizar preços, estoque e cobranças, criei o ProRecipe.", foot: "Um produto nascido da minha própria rotina.", project: "prorecipe" },
  { id: "labs", period: "Em paralelo, no ensino médio", label: "Wiltenburg Labs", title: ["Aprender.", "Vender. Entregar."], body: "Um ano de Alura, presente do meu tio. Aprendi WordPress e comecei a fazer sites para empresas. Dei a esse trabalho o meu nome: Wiltenburg Labs.", foot: "Estudo e primeiros clientes, ao mesmo tempo.", project: "wiltenburg-labs" },
  { id: "atletas", period: "Primeiros freelas", label: "Flamengo 3x3", title: ["Meu primeiro", "trabalho pago."], body: "Meu professor precisava organizar mensalidades e dados dos atletas. Desenvolvi o Flamengo 3x3. Ele usa o aplicativo até hoje.", foot: "Um projeto que entrou na rotina de outra pessoa.", project: "gestao-atletas" },
  { id: "fiap", period: "Depois da escola", label: "FIAP + LockIN Fight", title: ["Uma decisão.", "O próximo capítulo."], body: "Passei em duas universidades federais pelo Enem. A distância tornou esses caminhos inviáveis. Escolhi ADS na FIAP e, com o LockIN Fight, fui finalista no NEXT.", foot: "LockIN Fight · Finalista no NEXT da FIAP", project: "lockin-fight" },
  { id: "isla", period: "Hoje", label: "isla.to", title: ["Código encontra", "growth."], body: "Na isla, desenvolvo produto e sistemas. No início, construí um CRM para meu outbound e conquistei três clientes com contratos de US$ 500 por mês cada.", foot: "Growth Engineer na isla.to", project: null },
] as const;

export const threadPoints: [number, number, number][] = [
  [0, 2, 0], [1, -9, 0], [-2.5, -20, 1], [4, -24, -1],
  [0, -35, 0], [-1.5, -46, 1], [2, -57, 0], [0, -65, 0],
];

// Hero + seis capítulos + visão geral. O último trecho afasta a câmera.
export function threadView(progress: number) {
  const step = Math.max(0, Math.min(7, progress * 7));
  const index = Math.min(6, Math.floor(step));
  const t = step - index;
  const blend = t * t * (3 - 2 * t);
  const a = threadPoints[index], b = threadPoints[index + 1];
  const overview = index === 6 ? blend : 0;
  return {
    x: a[0] + (b[0] - a[0]) * blend,
    y: (a[1] + (b[1] - a[1]) * blend) * (1 - overview) - 29 * overview,
    span: 13 + overview * 64,
    overview,
  };
}

export const threadSvgPath = "M400 -150 C650 -210 660 140 425 200 S230 20 350 0 S650 140 450 600 S40 880 275 1150 C180 1450 250 1630 400 1900 S640 2240 325 2450 S280 2850 500 3000 S600 3240 400 3400";
export const threadSvgBranch = "M450 600 C730 730 870 1050 600 1350 C750 1540 570 1700 400 1900";
