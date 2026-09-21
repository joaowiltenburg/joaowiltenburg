# João Wiltenburg

Portfólio pessoal. Um fio contínuo acompanha o scroll e atravessa cinco capítulos em ordem cronológica, de 2023 a 2026, até o contato. No desktop o fio é uma cena em WebGL; nas demais larguras, um SVG leve.

Feito com Next.js 16, React 19, TypeScript, GSAP com ScrollTrigger, Lenis e React Three Fiber.

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

## Onde fica cada coisa

| Arquivo | Conteúdo |
| --- | --- |
| `data/thread.ts` | Ordem, títulos, períodos, texto e posições dos capítulos. |
| `data/portfolio.ts` | Projetos, tecnologias e contatos. |
| `app/age.ts` | Idade calculada no servidor a partir da data de nascimento. |
| `components/ThreadJourney.tsx` | Abertura, percurso, índice, preferência de movimento e contato. |
| `components/ThreadArtifact.tsx` | Composições dos capítulos e mapa final. |
| `components/ProjectDossier.tsx` | Dossiê expansível de cada projeto. |
| `components/SchoolDossier.tsx` | Dossiê do basquete. |
| `components/scene/ThreadCanvas.tsx` | Fio, câmera, pontos e materiais em 3D. |
| `components/thread.css` | Layout, composição e comportamento responsivo. |
| `public/projects` | Marcas e imagens usadas nas composições. |

Projetos privados não recebem link público e não têm stack inferida.

## Movimento e acessibilidade

- GSAP acompanha o scroll continuamente; Lenis suaviza a roda do mouse e o toque mantém a rolagem nativa.
- Acima de 900px a cena 3D carrega sob demanda, com DPR limitado a 1,5, geometrias locais e nenhum modelo externo.
- Larguras menores usam um percurso em SVG. Se o WebGL falhar, o SVG permanece.
- Movimento reduzido mantém a câmera estática e preserva conteúdo e navegação. A escolha explícita fica em localStorage e sincroniza entre abas.
- Índice com teclado e Escape, links diretos, texto semântico, detalhes opcionais e mapa final navegável.

## Verificar

```sh
npm run lint
npm run typecheck
npm run verify
npm run lighthouse
```

`verify` percorre a página em cinco cenários com Playwright e Axe: desktop, celular, tablet, movimento reduzido e prévia compacta. Espera o servidor em 3001 e aceita `PREVIEW_URL`, `BROWSER_PATH` e `SCENARIO`.

`lighthouse` audita a build de produção e também aceita `PREVIEW_URL`. Relatórios e capturas ficam em `artifacts/`.

## Deploy

Projeto Next.js padrão, sem variáveis de ambiente nem serviços externos. Build com `npm run build` e saída padrão do framework.
