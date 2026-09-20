# João Wiltenburg: estudo e direções criativas

Data: 15/09/2026.

Status: Fase 0 concluída. Fase 1 aprovada pelo João com “manda bala”, seguindo a direção recomendada **Sinal em fluxo**. Fase 2 concluída, com verificações funcionais e Lighthouse desktop 100 com WebGL ativo. As evidências e os limites das medições estão em `docs/quality.md`.

Revisão posterior solicitada pelo João: **Da quadra ao código**, com hero e scroll mais dinâmicos, trajetória pessoal no centro e seis projetos em arquivo secundário. A implementação está em revisão; os resultados da primeira versão foram preservados em `docs/quality-v1.md` e não representam a auditoria da nova versão.

Este documento preserva a pesquisa e as três propostas apresentadas antes da construção. Após a aprovação, a landing page foi implementada em Next.js, com rede 3D, versão mobile simplificada e os sete projetos editáveis. O ZIP foi extraído em `research/vendor` para consulta. As instruções presentes no material anexado foram tratadas como conteúdo de referência; o briefing do João determina o escopo e as restrições. Consulte o [README](../README.md) para execução e edição, e a [verificação de qualidade](../docs/quality.md) para evidências e limites dos testes.

## 1. Briefing preservado

- João Wiltenburg, GTM Engineer na isla.to, agência B2B de outreach no LinkedIn.
- Estudante de Análise e Desenvolvimento de Sistemas na FIAP.
- Desenvolvedor com mentalidade de founder que constrói produtos próprios.
- Público: founders, recrutadores e potenciais clientes.
- Objetivo: tornar o trabalho concreto, memorável e fácil de conhecer, com presença forte de 3D.
- Seções: hero, quem sou, o que construo, como trabalho / stack e contato.
- Projetos informados: Meu Consultório, Aprovado, Vera, ProRecipe, Norte, LockIN Fight e isla CRM Demo.
- Conteúdo ainda desconhecido: descrição, estágio, papel, stack, imagem, URL e resultados de cada projeto; contato e links pessoais. Usar [PREENCHER], sem inventar funcionalidades ou conquistas.
- Stack solicitada para a construção: Next.js App Router, TypeScript, Tailwind, React Three Fiber, drei, GSAP ScrollTrigger, Lenis e Framer Motion.
- Restrições: sem gradiente roxo/rosa, glassmorphism genérico, bento padrão, Inter principal, emoji como ícone, foguete/lâmpada, métricas fictícias ou travessão na copy.

## 2. Estudo do repositório anexado

Base extraída: `research/vendor/ui-ux-pro-max-skill-main`.

Lidos: README, CLI `search.py`, configuração e seleção de resultados em `core.py` e `design_system.py`, exemplo `projects/portfolio-dark/index.html`. Foram inventariados os 13 CSVs da raiz de `src/ui-ux-pro-max/data`, com leitura aprofundada dos catálogos relevantes de estilos, motion, tipografia, UX e landing.

### Inventário

| CSV | Registros |
|---|---:|
| app-interface | 32 |
| charts | 25 |
| colors | 192 |
| google-fonts | 1934 |
| icons | 105 |
| landing | 34 |
| motion | 17 |
| products | 192 |
| react-performance | 44 |
| styles | 88 |
| typography | 74 |
| ui-reasoning | 192 |
| ux-guidelines | 119 |

Os 88 registros de estilos incluem 50 ativos, 29 suplementares e 9 descontinuados. Não equivalem a 88 estilos ativos.

### Buscas executadas

Foi usado o Python já incluído no ambiente do Codex, pois o launcher `py -3` apontou para uma instalação sem acesso. Nenhum software foi instalado.

Executável: `C:\Users\js241\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe`.

Script: `research/vendor/ui-ux-pro-max-skill-main/src/ui-ux-pro-max/scripts/search.py`.

| Consulta | Argumentos | Resultado e decisão |
|---|---|---|
| developer portfolio dark immersive | --design-system -f markdown | Recomendou FAQ/Documentation Landing. Resultado inadequado para o briefing, descartado como direção. |
| personal portfolio | --design-system -f markdown | Nova consulta mais estreita retornou Scroll-Triggered Storytelling. Aproveitar narrativa e leitura independente de movimento. Paleta e fontes não adotadas. |
| 3d scroll animation | --domain style --full | Motion-Driven, Parallax Storytelling e Kinetic Typography. Extrair cuidados de movimento e alternativas acessíveis. |
| scroll narrative pin scrub | --domain gsap --full | Scroll Reveal e Parallax Scroll. Uma cena coordenada, poucos trechos fixados e texto estável. |
| expressive editorial grotesk mono | --domain typography | Mistura opções Web3 e editoriais. Rejeitar os pares que conflitam com o briefing. |
| editorial display | --domain typography | Nova consulta trouxe opções editoriais, mas várias usam Inter. Serve para avaliar hierarquia, não escolher as fontes finais. |
| reduced motion | --domain ux --full | Reduced Motion, Excessive Motion e Motion Sensitivity. Remover deslocamentos espaciais e manter conteúdo legível. |
| portfolio storytelling projects | --domain landing --full | Portfolio Grid, Scroll-Triggered Storytelling e Horizontal Scroll Journey. Priorizar narrativa vertical, links diretos e projetos visíveis. |

Nesta versão, `motion.csv` é exposto por `--domain gsap`, conforme `core.py:59-60`. A CLI não aceita `--domain motion`.

### Aprendizados que passam para a proposta

1. O motor usa busca lexical BM25 e regras de composição. A adequação do resultado precisa de revisão: a primeira consulta confundiu o contexto com documentação.
2. A história precisa funcionar em HTML na ordem de leitura, mesmo sem animação ou WebGL. Evidência: `landing.csv:11` e `:18`.
3. A rolagem pode coordenar uma cena principal, com apenas 1 ou 2 trechos fixados. Fontes e imagens mudam medidas e exigem atualização das posições. Evidência: `motion.csv:7`.
4. Parallax pertence às camadas decorativas. Texto, links e controles precisam permanecer confortáveis de ler e operar. Evidência: `motion.csv:14`.
5. Efeitos de ponteiro são acabamento. Toque, teclado, foco e ações visíveis continuam completos. Evidência: `motion.csv:4`, `ux-guidelines.csv:12` e `:37-46`.
6. Pausar animações fora da tela e em aba oculta faz parte do comportamento, junto com limpar listeners e respeitar movimento reduzido. Evidência: `motion.csv:16-18`.
7. Escala tipográfica, quebra de linha, contraste e carregamento têm mais valor do que repetir um par de fontes recomendado. Evidência: `ux-guidelines.csv:47-52` e `:73-76`.

### Limites encontrados

O exemplo `portfolio-dark` usa gradientes roxo/rosa, navegação com blur, grade convencional, cards sem links reais e ações apenas no hover. Também exibe números fictícios e um formulário visual sem envio implementado. Não será usado como template.

Evidências no HTML: `:40`, `:52`, `:110-112`, `:144-156`, `:316`, `:323-332`, `:361-382`.

O catálogo também tem inconsistências pontuais: a linha de tipografia em `typography.csv:45` inverte fontes entre campos e notas; `styles.csv:16` classifica Motion-Driven como custo baixo apesar de sugerir diversas animações. Assim, classificação da biblioteca não é medição de performance.

## 3. Doze referências concretas

As adaptações abaixo são propostas nossas. As bibliotecas oferecem as técnicas e exemplos, não o desenho final da página.

| # | Referência | Aproveitamento proposto |
|---|---|---|
| 1 | [21st.dev: Magnetic](https://21st.dev/@ibelick/components/magnetic) | CTA com atração sutil ao ponteiro e retorno elástico. Manter área clicável estável; desativar em toque e movimento reduzido. |
| 2 | [Aceternity: Tracing Beam](https://ui.aceternity.com/components/tracing-beam) | Linha SVG que acompanha capítulos. Candidata à versão leve da narrativa no mobile, em uma cor autoral. |
| 3 | [Magic UI: Animated Beam](https://magicui.design/docs/components/animated-beam) | Pulso percorrendo uma conexão. Adaptar o princípio para as partículas da rede e a leitura de direção do pipeline. |
| 4 | [Magic UI: Scroll Based Velocity](https://magicui.design/docs/components/scroll-based-velocity) | Uma faixa tipográfica responde à velocidade de rolagem. Usar como pontuação entre capítulos, com informação também disponível de forma estática. |
| 5 | [React Bits: Tilted Card](https://reactbits.dev/components/tilted-card) | Inclinação e retorno com mola em imagens de projetos dispostos em uma sequência editorial. Mobile recebe imagem estática e links visíveis. |
| 6 | [React Bits: Variable Proximity](https://reactbits.dev/text-animations/variable-proximity) | Variação de peso ou largura de uma palavra curta com o ponteiro. Usar no máximo em uma palavra e com fonte compatível; preservar texto acessível. |
| 7 | [Drei: Points](https://pmndrs.github.io/drei/performances/points) | Partículas em buffers compartilhados. Base leve para os nós e sinais da rede. |
| 8 | [Drei: CatmullRomLine](https://pmndrs.github.io/drei/shapes/catmull-rom-line) | Caminhos curvos definidos por pontos. Referência para as conexões que se organizam em trilhos. A transformação rede para pipeline será autoral. |
| 9 | [Drei: MotionPathControls](https://pmndrs.github.io/drei/controls/motion-path-controls) | Câmera que acompanha um percurso e um alvo. Útil como referência de enquadramento entre capítulos. |
| 10 | [GSAP: ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Timeline com marcos, scrub e fixação de uma região. O avanço da rolagem dirige a cena enquanto o conteúdo mantém leitura vertical. |
| 11 | [iyO: vista explodida em WebGL](https://www.awwwards.com/inspiration/interactive-webgl-exploded-view-iyo) | Separar e remontar peças para explicar construção. Referência industrial para mostrar interface, lógica, dados e distribuição. [Premiação](https://www.awwwards.com/sites/iyo). |
| 12 | [Self Aware](https://selfaware.studio/) | Tipografia dominante, marfim/preto e navegação escultural. Referência para transformar projetos em objetos de um acervo. [Premiação](https://www.awwwards.com/sites/self-aware). |

O README oficial do [drei](https://github.com/pmndrs/drei) aponta atualmente para `pmndrs.github.io/drei`; as três referências usam esses destinos. Foram consultadas também as URLs anteriores em `drei.docs.pmnd.rs`. O extrator web teve limite de tamanho em algumas dessas páginas.

### Gratuidade e fontes

- A 21st tem referências públicas, mas seu [blog oficial](https://news.21st.dev/blog/react-magnetic-cursor-effects) informa que o registry exige membership. A técnica Magnetic tem origem aberta em [Motion Primitives, MIT](https://github.com/ibelick/motion-primitives). Não é necessário comprar acesso para esta proposta.
- Tracing Beam aparece no [catálogo gratuito da Aceternity](https://ui.aceternity.com/components). A licença específica não ficou clara na página consultada; usar como referência de técnica, sem presumir MIT.
- Magic UI disponibiliza os componentes pesquisados sob [MIT](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md).
- React Bits permite uso pessoal e comercial sob [MIT + Commons Clause](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). Isso não equivale a permissão irrestrita para revender a biblioteca.
- Os sites premiados são referências de composição e narrativa. Seus modelos, imagens e identidade não serão reutilizados.

## 4. Três direções de arte

### 1. Sinal em fluxo

**Conceito:** meu trabalho conecta pessoas, produto e código em um sistema de growth visível.

**Cena 3D:** uma rede espacial de nós e conexões ocupa a lateral direita e avança em profundidade. No início, existem agrupamentos soltos. A rolagem alinha os nós em cinco etapas e transforma conexões em trilhos. Partículas atravessam o percurso de desconhecido até cliente. O grafo é uma metáfora, sem volumes ou taxas inventados.

**Paleta:** carbono `#101411`, osso `#F2F1E8`, lima `#C6F36A`, verde mineral `#728676`. O verde mineral fica reservado a elementos decorativos até validar contraste por função.

**Tipografia:** [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) para títulos altos e comprimidos; [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) para leitura e interface.

**Composição:** título grande deslocado à esquerda; rede cortada pelo enquadramento à direita; pequenos rótulos e índice 01/05. Projetos em sequência de cards amplos, alternando alinhamento e tamanho de imagem, com links sempre visíveis.

**Scroll e seções:**

| Etapa do fluxo | Conteúdo da página | Transformação visual |
|---|---|---|
| Desconhecido | Hero | Rede dispersa, primeiro pulso |
| Conexão | Quem sou | Grupos se aproximam; entram isla.to, FIAP e produtos próprios |
| Conversa | O que construo | Sete pontos dão acesso aos sete projetos, apresentados em HTML |
| Oportunidade | Como trabalho / stack | Trilhos se alinham e mostram processo e ferramentas confirmadas |
| Cliente | Contato | Sistema completo; o CTA convida a iniciar uma conversa |

O visitante pode ir direto aos projetos ou contato. A metáfora de cliente não presume que recrutadores ou todos os visitantes sejam compradores.

**Headline de trabalho:** “Eu construo produtos. E sistemas de growth.”

**Referência visual:** [Animated Beam](https://magicui.design/docs/components/animated-beam), pela leitura dos pulsos e conexões. O volume espacial e a transformação do grafo são propostas originais, com apoio das referências drei.

**Mobile:** menos nós e câmera parada; se a cena não sustentar a meta de fluidez, usar uma imagem estática com uma linha SVG de progressão. Sob movimento reduzido, o pipeline fica estático e a leitura continua completa.

**Força e cuidado:** é a opção mais ligada ao trabalho em GTM. Os projetos precisam ter bastante presença para o portfólio também comunicar desenvolvimento de produto.

### 2. Bancada aberta

**Conceito:** eu mostro meus produtos como peças que construo, testo e coloco em funcionamento.

**Cena 3D:** um dispositivo autoral feito de placas, pinos e módulos simples, com material fosco e marcações de montagem. Ao rolar, ele abre em uma vista explodida. Sete módulos representam entradas para os projetos; seus nomes e descrições continuam no HTML.

**Paleta:** carvão `#171717`, papel `#ECE7DD`, laranja de segurança `#FF6B2C`, aço `#92958E`. Texto escuro sobre laranja nos CTAs.

**Tipografia:** [Archivo Black](https://fonts.google.com/specimen/Archivo+Black) para títulos pesados; [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) para legendas e textos curtos.

**Composição:** números grandes de catálogo, linhas de cota, bordas duras e recortes de imagens. Detalhes técnicos funcionam como linguagem visual; não expõem complexidade de implementação ao visitante.

**Scroll:** objeto montado no hero; abertura revela quem constrói; módulos separados apresentam projetos; conexão das camadas apresenta processo e stack; remontagem conclui no contato. Um trecho curto de desmontagem concentra o movimento mais forte.

**Headline de trabalho:** “Eu penso construindo.”

**Referência visual:** [iyO, vista explodida](https://www.awwwards.com/inspiration/interactive-webgl-exploded-view-iyo). Adaptar a clareza da desmontagem para geometria própria e leve.

**Mobile:** objeto simples no hero ou imagem da vista explodida; os módulos viram uma sequência vertical de cards com ações claras.

**Força e cuidado:** comunica engenharia e autoria imediatamente. A relação com growth será explicada pela copy e pela camada de distribuição.

### 3. Acervo em movimento

**Conceito:** meus projetos formam um acervo de trabalho autoral que o visitante pode examinar de perto.

**Cena 3D:** sete placas espessas de cerâmica e papel, suspensas como uma escultura editorial. Cada placa contém a identidade textual de um projeto. Elas giram de perfil para frente e se alinham a suas fichas na página.

**Paleta:** marfim `#F2EDE3`, tinta `#20231F`, ferrugem `#A8432B`, oliva `#465544`.

**Tipografia:** [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) em títulos grandes; [DM Sans](https://fonts.google.com/specimen/DM+Sans) no corpo e na navegação.

**Composição:** sobrenome grande, margens assimétricas, legendas numeradas, espaços generosos e anotações curtas. Cards de projeto têm proporções editoriais, com imagens e texto visíveis.

**Scroll:** escultura apresenta o conjunto; um enquadramento próximo acompanha quem sou; cada placa se abre como uma página de projeto; todas se alinham na seção de método; o final vira um convite direto para contato. Câmera lateral suave, sem viagem em túnel.

**Headline de trabalho:** “Eu construo o que quero ver existir.”

**Referência visual:** [Self Aware](https://selfaware.studio/), pela combinação de formas esculturais e hierarquia editorial. A metáfora do acervo é nossa.

**Mobile:** composição estática do conjunto no hero, seguida por fichas verticais. Movimento reduzido mantém as placas frontais.

**Força e cuidado:** é a opção mais pessoal e editorial. A copy sobre GTM e as fichas técnicas precisam manter clara a identidade de desenvolvedor.

## 5. Recomendação

Recomendo **Sinal em fluxo**. É a direção que melhor une GTM, engenharia e produtos próprios em uma única ideia reconhecível. A rede organiza a narrativa e os projetos fornecem a evidência concreta.

As três propostas são alternativas completas. Misturar todas diluiria a identidade e aumentaria o custo de movimento.

## 6. Critérios para a construção, após aprovação

- Carregar o HTML, a headline e as ações antes da cena 3D. Reservar espaço para evitar mudanças de layout.
- Uma cena coordenada, com geometria leve e materiais compartilhados. Ponto de partida para DPR: até 1,5 em desktop e 1 em mobile, ajustado por medição.
- Seguir os princípios de [performance do R3F](https://r3f.docs.pmnd.rs/advanced/scaling-performance): compartilhar recursos, limitar chamadas de desenho e parar a renderização quando a cena estiver inativa.
- GSAP coordena capítulos e progresso; Lenis cuida da suavização quando apropriado; R3F desenha a cena; Framer Motion fica com microinterações. Evitar que bibliotecas diferentes animem a mesma propriedade.
- Sem movimento essencial dependente de hover, arrasto ou conclusão da intro. Navegação por âncoras e teclado disponível desde o começo.
- `prefers-reduced-motion` governa CSS, GSAP, Lenis e a cena. Estado final legível, sem câmera viajando, parallax ou marquee contínuo.
- Dados dos projetos separados dos componentes na Fase 2. Campos desconhecidos marcados [PREENCHER]; links ausentes não viram botões falsos.
- Lighthouse 90+ desktop e 60 fps no mobile são metas a medir no build de produção. Ainda não existem resultados, pois a implementação não começou.

### Checklist pré-entrega reservado para a Fase 2

Checklist baseado no gerador e nas regras da UI/UX Pro Max, adaptado à web:

- [ ] Ícones vetoriais coerentes, sem emojis estruturais.
- [ ] Todos os links e botões têm comportamento real, foco visível e nome acessível.
- [ ] Ações disponíveis por teclado e toque, sem depender de hover.
- [ ] Contraste AA: 4,5:1 para texto normal; 3:1 para texto grande e componentes pertinentes.
- [ ] Hierarquia semântica, ordem de leitura, skip link e foco não encoberto.
- [ ] Conteúdo legível com fontes alternativas, zoom e quebra natural de linha.
- [ ] Verificação em 375, 768, 1024 e 1440 px, além de orientação horizontal no mobile.
- [ ] Movimento reduzido testado em todas as camadas da experiência.
- [ ] Animações decorativas contínuas pausáveis e suspensas fora da tela/aba ativa.
- [ ] Sem rolagem horizontal acidental ou conteúdo inacessível por fixação de seções.
- [ ] Lazy load da cena, DPR limitado, fallback e descarte correto dos recursos.
- [ ] Lighthouse desktop e perfil de frames mobile medidos no build de produção.
- [ ] Dados, placeholders, README de execução/edição e build para Vercel revisados.

Próximo passo: João escolher ou ajustar uma direção. A construção começa somente após essa aprovação, conforme solicitado.
