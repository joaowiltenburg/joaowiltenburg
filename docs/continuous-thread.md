# Um fio que atravessa tudo

Direção 1 aprovada por João em 18/09/2026.

Uma cena contínua acompanha o scroll. A abertura apresenta João no presente;
o percurso aproxima cinco capítulos em ordem cronológica, de 2023 a 2026.
O final afasta a câmera e mostra o percurso completo, próximo dos contatos.

## Revisão narrativa de 20/09/2026

A ordem antiga colocava o ProRecipe (2024) antes da Alura e da Wiltenburg Labs
(2023) e tratava os dois como caminhos paralelos, com uma bifurcação no fio.
João confirmou que a sequência é cronológica, então a bifurcação saiu e o fio
voltou a ser uma linha só. Cada capítulo passou a exibir o ano e a terminar numa
passagem que causa o próximo. O capítulo de abertura sobre a escola foi removido:
o basquete agora entra em 2025, onde explica o primeiro cliente pago, e a
história com o Reinaldo ficou no dossiê.

Correções de fato: o NEXT da FIAP está em andamento, com resultado previsto para
o fim de outubro de 2026, e a afirmação de finalista saiu de toda a página. A
citação atribuída ao basquete foi removida porque não era real. A média de
pontos virou "15+". O professor do Flamengo Guarulhos 3x3 é o Juneba; o Reinaldo
foi o técnico da escola.

Substitui a hero isolada, o mapa lateral, a seção Agora e a lista duplicada de projetos.
Os detalhes dos projetos ficam dentro dos capítulos. As tecnologias gerais ficam
numa expansão discreta no final, sem atribuí-las a projetos privados sem confirmação.

Implementação: conteúdo semântico em HTML, cena R3F lazy no desktop, SVG leve nos
demais tamanhos. GSAP sincroniza o percurso e a câmera; Lenis suaviza roda do mouse.
Índice, links diretos, teclado e movimento reduzido continuam disponíveis.
A escolha de movimento permanece em localStorage e sincroniza entre abas.

Verificação: navegação, movimento contínuo entre posições de scroll, bifurcação,
detalhes, contatos, preferência persistente, contraste e larguras compactas.
Marcas e imagens reais entram como parte das composições. Os detalhes opcionais
de cada projeto ficam em dossiês editoriais dentro do próprio capítulo.

## Auditoria de 18/09/2026

Lighthouse desktop com WebGL ativo: performance 95, acessibilidade 100, boas práticas 100 e SEO 100. FCP 0,4 s, LCP 0,7 s, TBT 180 ms e CLS 0. Relatórios em artifacts/lighthouse-desktop.report.html e artifacts/lighthouse-desktop.report.json. A medição é local e não garante a mesma pontuação em todos os dispositivos.

Checklist UI/UX: contraste avaliado com axe, teclado e Escape, links diretos, foco visível, 375px e paisagem, preferência reduzida, fallback SVG e conteúdo equivalente em HTML. Arte dos capítulos é decorativa; métricas e reconhecimentos também aparecem no texto acessível.

