# Histórico de qualidade: versão Sinal em fluxo

Data: 15/09/2026. Direção: **Sinal em fluxo**. Construção e checklist de entrega concluídos, com meta de performance atingida na auditoria local com WebGL ativo.

## Critério e escopo

Foi revisado o checklist do repositório fornecido pelo João:

- [`quick-reference.md`](../research/vendor/ui-ux-pro-max-skill-main/.claude/skills/ui-ux-pro-max/references/quick-reference.md), com atenção às seções 1, 2 e 3: acessibilidade, interação e performance.
- [`pro-rules.md`](../research/vendor/ui-ux-pro-max-skill-main/.claude/skills/ui-ux-pro-max/references/pro-rules.md), que contém o checklist canônico e declara seu escopo de aplicativos nativos. Para web, o próprio arquivo remete ao `quick-reference.md`.

As unidades e exigências exclusivas de iOS/Android não foram tratadas como requisitos desta landing page. As regras estéticas do briefing e a direção aprovada prevalecem sobre sugestões da biblioteca.

## Checklist aplicado à página

| Checagem | Resultado | Evidência e limite |
| --- | --- | --- |
| Buscas focadas nos riscos reais | Aprovado | Executadas `keyboard focus visible` e `reduced motion scroll`, ambas no domínio `ux`. |
| Revisão das prioridades 1 a 3 | Concluída | Código, resultados automatizados e screenshots confrontados com acessibilidade, interação e performance. |
| 375px e orientação paisagem | Aprovado | 375×812 e 812×375 no Playwright, sem overflow horizontal. |
| Tablet e desktop | Aprovado | 768×1024 e 1440×900, sem overflow horizontal. |
| Movimento reduzido | Aprovado | Sem canvas; alternativa SVG presente; CSS desativa animações e transições. |
| Pausa do movimento | Aprovado | Botão opera com nome acessível e `aria-pressed`; a cena passa a renderização sob demanda. |
| Etapas no fim e início do scroll | Aprovado | Teste de regressão com movimento pausado e scroll gradual de 45px por quadro chega a “Cliente”; voltar ao topo restaura “Desconhecido”. |
| Teclado e links internos | Aprovado na amostra | Primeiro Tab alcança o atalho; âncora é ativada por Enter; detalhe do primeiro projeto abre e fecha por teclado. Todas as âncoras têm destino existente. |
| Sem dependência de hover | Aprovado | As fichas usam `details`/`summary`; hover acrescenta resposta visual, sem esconder a ação principal. |
| Semântica e nomes acessíveis | Aprovado na automação | Um `h1`, seções nomeadas, controles nativos, nome e estado do botão de pausa. Os sete projetos foram encontrados. |
| Indicadores de foco | Aprovado na amostra | Contorno definido em CSS; foco visível nos controles exercitados. Percurso integral com leitor de tela ainda não executado. |
| Alvos de interação web | Revisado | CTAs, pausa e disclosures têm áreas amplas; botão de pausa mede 44×48 CSS px no CSS. Links dentro de texto seguem a exceção para links em linha. Não se aplicam as unidades nativas pt/dp. |
| Contraste AA | Aprovado nos pares medidos; automação parcial | Fundos carbono sólidos protegem as áreas de leitura sobre a cena. Zero violações detectadas; pares sólidos medidos abaixo. SVGs, glifos e algumas composições ainda geram itens inconclusivos no axe. |
| Ícones e identidade | Aprovado na revisão | Setas e símbolos geométricos coerentes; nenhuma ocorrência de emoji de foguete/lâmpada, Inter ou travessão na copy dos arquivos da página. |
| Hierarquia e responsividade | Aprovado na revisão | Títulos editoriais, cards alternados, fichas compactas, margens adaptáveis e leitura vertical. |
| Fontes e reserva de espaço | Aprovado | Fontes WOFF2 locais com `display: swap`; dimensões da cena e proporções das artes definidas em CSS. Lighthouse mediu CLS 0. |
| Carregamento e peso do 3D | Aprovado | Importação separada, DPR limitado a 1,5, duas draw calls e 136 instâncias. Cores de vértice e `compileAsync` evitam a preparação síncrona de materiais complexos no primeiro desenho. O fallback fica disponível durante a preparação. |
| Execução sem erros | Aprovado | Zero erros de console e JavaScript nos quatro cenários de produção. |
| Conteúdo fiel | Aprovado | Sete nomes fornecidos pelo João; descrições, papéis, estágios e contatos desconhecidos marcados `[PREENCHER]`; URLs ausentes não viram links fictícios. |
| Dynamic Type e gestos nativos | Não se aplica | São verificações de aplicativos nativos. Zoom/refluxo de texto ampliado no navegador não foi medido nesta rodada. |
| Formulários, login, modais e arraste | Não se aplica | A página não contém esses fluxos. |
| Tema claro alternativo | Não se aplica | A direção tem tema escuro fixo e seção de contato clara; ambos os fundos usados foram incluídos na verificação. |

## Contraste

Relações calculadas com luminância relativa sRGB para os pares sólidos definidos no CSS:

| Texto / fundo | Relação |
| --- | ---: |
| `#F2F1E8` / `#101411` | 16,39:1 |
| `#A7AFA6` / `#101411` | 8,25:1 |
| `#C6F36A` / `#101411` | 14,54:1 |
| `#2B3924` / `#DFDFCA` | 9,07:1 |
| `#C6F36A` / `#273828` | 9,76:1 |

As áreas de leitura de apresentação, introdução e fichas dos projetos, método e stack receberam fundos sólidos `#101411`. Assim, a opacidade de 0,25 da rede nos projetos e de 0,4 no método não altera o fundo desses textos. A captura `artifacts/process-final.png` registra o pipeline ao lado da área de leitura protegida.

Os quatro relatórios axe têm **0 violações** e **27 regras aprovadas**. A regra `color-contrast` também contém itens inconclusivos, sobretudo artes SVG, glifos e composições que o motor não consegue resolver. Esses itens não foram descartados nem contabilizados como aprovados. A nota automatizada de acessibilidade não certifica conformidade integral com WCAG.

## Lighthouse desktop

Auditoria de produção em `http://127.0.0.1:3001`, Lighthouse **13.4.1**, perfil desktop 1350×940, registrada em **15/09/2026 às 19:01:40 UTC**. A preferência foi explicitamente ajustada para `prefers-reduced-motion: no-preference`. O registro `artifacts/version-1/lighthouse-scene-state.json` confirma um canvas, cena pronta, movimento habilitado e pausa desativada:

| Categoria ou métrica | Resultado |
| --- | ---: |
| Performance com WebGL | **100** |
| Acessibilidade | **100** |
| Boas práticas | **100** |
| SEO | **100** |
| First Contentful Paint | 0,3s |
| Largest Contentful Paint | 0,7s |
| Total Blocking Time | 10ms |
| Cumulative Layout Shift | 0 |

A meta de performance 90+ foi atingida nessa execução com WebGL ativo. A auditoria inclui a inicialização lazy: espera 3 segundos após FCP e carregamento, com janela de rede ociosa de 2 segundos. O script rejeita resultados sem canvas pronto e ativo.

Relatórios: `artifacts/version-1/lighthouse-desktop.report.html` e `artifacts/version-1/lighthouse-desktop.report.json`. A execução terminou com código 0; o JSON não contém `runtimeError` nem `runWarnings`. Para reproduzir, use `npm run lighthouse`, com o servidor de produção ativo. O resultado depende do ambiente e deve ser conferido também na URL publicada.

## Amostra de scroll no mobile

Ambiente: Chrome 153 headless, Windows, Intel Core i3-1115G4, quatro processadores lógicos e 11,8GiB de RAM. Emulação 375×812, DPR 1, sem canvas.

Durante 3 segundos de scroll programado por 2.200px:

- 179 intervalos de `requestAnimationFrame`.
- Média de **59,67 callbacks por segundo**.
- Intervalo mediano de **16,7ms**, p95 de **17ms**.
- Nenhum intervalo acima de 33,34ms.

Essa amostra verifica a cadência de callbacks durante scroll emulado. Não mede quadros realmente exibidos pelo compositor nem comprova 60 fps em um aparelho físico. Relatório: `artifacts/version-1/mobile-frame-sample.json`.

## Evidências e itens ainda abertos

- `artifacts/version-1/verification.json`: cenários de produção concluídos em 15/09/2026 às 19:02:43 UTC, com a cena final. Desktop, mobile, tablet e movimento reduzido passaram, incluindo paisagem e regressão do fim do fluxo.
- `artifacts/*-axe.json`: resultados completos, incluindo checagens inconclusivas.
- `artifacts/*-hero.png` e `artifacts/*-full.png`: capturas de cada viewport e preferência de movimento. Capturas completas representam um único estado da cena sticky; a imagem do hero mostra seu estado inicial.
- **Correções verificadas:** chegar a “Cliente” com scroll gradual, voltar a “Desconhecido” no topo e preservar leitura com fundos sólidos sobre a cena.
- **Verificações de código:** TypeScript e build de produção aprovados; ESLint global aprovado após a verificação final.
- **Ainda não medidos:** telefone físico, zoom/refluxo com texto ampliado e percurso integral com leitor de tela.
- **Conteúdo a revisar pelo João:** todos os campos `[PREENCHER]`, contatos e links dos projetos.

Para reproduzir a verificação automatizada, use os comandos do [`README`](../README.md). Se o código mudar após uma medição, os relatórios anteriores documentam aquela execução e não substituem a conferência da nova versão.

