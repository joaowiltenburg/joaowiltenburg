# Implementação atual: percurso contínuo

A rota principal renderiza `ThreadJourney`. A direção foi aprovada em 18/09/2026 e está descrita em `continuous-thread.md`.

## Estrutura

Uma camada visual acompanha a página inteira. O conteúdo continua sendo HTML semântico, na ordem de leitura: abertura, origem, Pro Receita, Alura/Wiltenburg Labs, Flamengo 3x3, FIAP/LockIN Fight, isla e contato.

A lista separada de projetos, o mapa lateral e a seção Agora saíram da página. Quatro expansões apresentam detalhes dos projetos no momento correspondente. A lista geral de tecnologias fica no contato, em uma expansão própria, sem atribuição a projetos privados.

## Movimento

ScrollTrigger mede o início de cada capítulo e interpola a posição da câmera durante todo o scroll. Um único objeto de progresso é compartilhado com o SVG e a cena R3F. O 3D usa curvas, tubos leves, dois caminhos, marcadores e uma partícula. A câmera afasta no último trecho. Não há download de modelos ou texturas.

Pro Receita e Alura/Labs ficam em ramos distintos que partem do começo e convergem no Flamengo 3x3. O texto de Labs identifica explicitamente o período paralelo.

Lenis suaviza a roda do mouse. O movimento da câmera e os deslocamentos das composições usam GSAP; o link inicial usa Framer Motion. O toque mantém o scroll nativo.

## Resiliência e preferências

WebGL é carregado de forma lazy apenas acima de 900px e com movimento habilitado. DPR máximo de 1,5. A aba oculta suspende a renderização contínua. Uma falha na cena ou perda de contexto preserva o SVG.

A preferência inicial vem de prefers-reduced-motion. A escolha explícita fica em localStorage, sincroniza entre abas e migra a escolha antiga de sessionStorage. Movimento reduzido mostra o percurso estático e mantém conteúdo, índice e detalhes disponíveis.

## Conteúdo e acessibilidade

Composições dos capítulos são representações e ficam fora da árvore de acessibilidade. Os fatos relevantes estão no texto semântico. O mapa final é navegável por teclado; o índice usa details/summary e fecha com Escape. Existem skip link, estados de foco, controles com área de toque e espaços para as barras fixas.

A idade é calculada no servidor. Métricas de doces e clientes têm contexto explícito. Tecnologias não confirmadas permanecem [PREENCHER].

## Verificação

`npm run verify` cobre cinco cenários, movimento contínuo antes da troca de capítulo, ordem e links, detalhes por teclado, preferência persistente entre abas, ausência de overflow e auditoria axe. `npm run lighthouse` audita a cena WebGL ativa. Relatórios atuais em `artifacts/`.
