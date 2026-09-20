# João Wiltenburg · Um fio que atravessa tudo

Portfólio narrativo. O scroll acompanha um percurso contínuo em 3D, atravessa cinco capítulos em ordem cronológica e termina numa visão geral com contato. Cada capítulo mostra o ano e termina numa passagem que explica o capítulo seguinte: Alura e Wiltenburg Labs em 2023, ProRecipe em 2024, Flamengo 3x3 em 2025, FIAP com LockIN Fight no início de 2026 e a isla.to em maio de 2026. O basquete entra no capítulo de 2025, onde explica o primeiro cliente pago.

## Rodar

Requer Node.js 22 ou superior.

```sh
npm install
npm run dev -- --port 3001
```

Abra http://127.0.0.1:3001.

Para a versão de produção:

```sh
npm run build
npm run start -- --port 3001
```

## Editar conteúdo

| Arquivo | Conteúdo |
| --- | --- |
| `data/thread.ts` | Ordem, títulos, períodos, texto curto e posições dos capítulos. |
| `data/portfolio.ts` | Detalhes de projetos, tecnologias e contatos. |
| `app/age.ts` | Idade automática a partir da data de nascimento, calculada no servidor. |
| `components/ThreadJourney.tsx` | Abertura, percurso, índice, preferências e contato. |
| `components/ThreadArtifact.tsx` | Composições dos capítulos e mapa final. |
| `components/ProjectDossier.tsx` | Dossiê expansível, fatos, fluxo, stack e link público de cada projeto. |
| `components/SchoolDossier.tsx` | História do basquete, dados esportivos e agradecimento ao professor Reinaldo. |
| `components/scene/ThreadCanvas.tsx` | Fio, bifurcação, câmera, pontos e materiais 3D. |
| `components/thread.css` | Layout, composição e comportamento responsivo. |
| `public/projects` | Marcas e imagens reais usadas nas composições. |

Dados ainda não confirmados são omitidos da rota atual. As tecnologias dos projetos privados não foram inferidas. O Flamengo 3x3 e os sistemas internos da isla não recebem links públicos. Os três clientes da isla são uma conquista histórica, não uma afirmação de MRR atual.

Os componentes da experiência anterior permanecem fora da rota atual para consulta. `app/page.tsx` renderiza apenas `ThreadJourney`.

## Movimento e acessibilidade

- GSAP acompanha o scroll continuamente, sem depender de cliques ou mudanças discretas de capítulo.
- Lenis suaviza a roda do mouse; o toque mantém rolagem nativa.
- Acima de 900px, R3F/drei carrega sob demanda; DPR limitado a 1,5, geometrias locais e nenhum modelo externo.
- Mobile usa um percurso SVG leve. Falha no WebGL preserva o SVG.
- Movimento reduzido mantém a câmera estática e preserva conteúdo e navegação.
- A escolha explícita de movimento fica em localStorage, sincroniza entre abas e é restaurada ao reabrir.
- Índice com teclado e Escape, links diretos, texto semântico, detalhes opcionais, mapa final navegável e contato acessível durante o percurso.

## Verificar

```sh
npm run lint
npm run typecheck
npm run verify
npm run lighthouse
```

`verify` espera o servidor em 3001. Pode usar `PREVIEW_URL` e `BROWSER_PATH`. A variável `SCENARIO` restringe a verificação a desktop, mobile, tablet, reduced-motion ou compact-preview.

O Lighthouse também aceita `PREVIEW_URL`; confirme a porta do servidor. Os relatórios e screenshots ficam em `artifacts/`. A auditoria exige WebGL ativo para não medir somente o fallback.

## Vercel

Importe a pasta como projeto Next.js, use `npm run build` e a saída padrão do framework. Não são necessárias variáveis de ambiente nem serviços externos. Links de contato usam e-mail, LinkedIn e GitHub.

Direção aprovada e decisões de implementação: `docs/continuous-thread.md`.
