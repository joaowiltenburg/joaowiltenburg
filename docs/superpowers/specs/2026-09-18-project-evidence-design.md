# Evidências reais dentro da trajetória

## Objetivo

Preservar a arquitetura de percurso contínuo aprovada e enriquecer cada capítulo com evidências reais da história de João. Imagens, marcas, interfaces e detalhes técnicos devem parecer parte da cena, sem virar uma galeria de screenshots ou uma sequência de cards.

## Direção aprovada

Cada capítulo terá dois níveis de leitura:

1. **Teaser visual no scroll:** uma composição curta, animada e integrada ao fio da trajetória.
2. **Dossiê editorial expansível:** detalhes do projeto no mesmo fluxo da página, aberto apenas quando o visitante escolher “Por dentro do projeto”.

O hero, o caminho tridimensional, a ordem dos capítulos, o índice e o encerramento permanecem. Não serão criadas páginas separadas ou modais em tela cheia.

## Arquitetura

### Dados

`data/portfolio.ts` continua como fonte editável dos projetos. Cada projeto poderá informar:

- resumo e problema de origem;
- participação de João;
- estágio atual;
- stack confirmada;
- link público opcional;
- repositório opcional;
- fatos curtos usados no dossiê;
- identificação do tratamento visual do capítulo.

Informações não confirmadas serão omitidas. Métricas do ProRecipe só entram depois da confirmação de João.

### Componentes

- `ThreadArtifact` continua responsável pelo teaser visual de cada capítulo.
- Um componente pequeno de dossiê substitui o conteúdo genérico atual de `<details>` e recebe os dados do projeto.
- O controle de abertura continua nativo com `<details>`, preservando teclado, semântica e funcionamento sem JavaScript adicional.
- `next/image` carrega as imagens locais com dimensões conhecidas e lazy loading nativo.

### Movimento

- GSAP reaproveita os gatilhos existentes dos capítulos.
- As novas animações usam transformações e opacidade para evitar custo de layout.
- Abertura do dossiê usa transição CSS curta e mantém o conteúdo legível mesmo sem animação.
- `prefers-reduced-motion` mantém as composições estáticas e completas.

## Tratamento por capítulo

### O começo

A composição de abertura fica somente na descoberta da tecnologia. O capítulo registra Marcos e Reinaldo em texto, mas a leitura visual principal permanece profissional e voltada a produto.

O basquete vive no dossiê “O que o basquete me ensinou”, com títulos regionais e estaduais, média de 15 pontos, topo do ranking individual e o terceiro lugar em um campeonato escolar. Uma foto de João jogando e o print da tabela poderão entrar ali quando forem fornecidos, sem transformar a abertura em currículo de atleta.

### ProRecipe

O nome passa a ser escrito como **ProRecipe**. O recibo atual evolui para uma composição que revela parte de uma interface de produto. O dossiê explica a origem nas vendas de palha italiana, precificação, estoque e cobranças. O link público será `https://prorecipe.com.br`.

Dados promocionais encontrados no site público não serão tratados como resultados pessoais de João. Números pessoais entram somente após confirmação.

### Wiltenburg Labs

A marca WL fornecida por João entra como peça escura integrada à janela de navegador existente. Fragmentos editoriais representam os sites feitos para clientes. O dossiê conecta Alura, WordPress, primeiros trabalhos pagos e criação da Wiltenburg Labs. O link público será `https://wiltenburglabs.infinityfree.me/?i=1`.

### Flamengo Guarulhos 3x3

O fio desenha uma meia quadra de basquete. Três pontos representam atletas e pequenos estados representam cadastro, mensalidades e inscrições. O escudo fornecido entra recortado e com tratamento de cor controlado.

O dossiê explica que o sistema segue em uso. O endereço do aplicativo não será exibido porque leva apenas a uma tela privada de login. Credenciais nunca serão publicadas. Uma tela interna poderá ser incorporada depois, caso João envie um screenshot apropriado.

### LockIN Fight

A cena usa uma linha de batimento, dois lutadores em pixel art que se encaram e um protocolo visual de quatro etapas: `Formulário → BPM → Force Score → Luta`. O dossiê explica esse fluxo antes de resumir:

- Next.js no frontend;
- Node.js e Express no backend;
- Firestore para persistência;
- Phaser.js para a luta;
- Arduino, sensor cardíaco e servomotores;
- Web Serial para comunicação;
- Python, pandas e matplotlib para análise.

O repositório público será `https://github.com/TheFirstGomes/lockin-fight`.

### Escolha pela FIAP

Antes do capítulo FIAP, uma bifurcação curta registra que João foi aprovado em duas universidades federais pelo Enem. A distância tornou esses caminhos inviáveis e a trajetória converge para ADS na FIAP. Essa passagem não cria um capítulo novo.

### isla.to

A rede e o pipeline abstratos permanecem. Não serão usados screenshots dos sistemas internos. A seção fala sobre produto, software e growth com os resultados já confirmados por João, sem expor clientes ou processos privados, e inclui o link público `https://isla.to`.

### Encerramento

Depois do mapa completo, o percurso termina com “Próximo capítulo / Em construção” e a idade calculada na página. A mensagem enquadra os 18 anos como início de trajetória, sem colocá-los como a chamada do hero.

## Conteúdo do dossiê

Cada dossiê terá no máximo:

- um parágrafo curto sobre o problema;
- três fatos ou etapas;
- participação de João;
- stack;
- uma evidência visual;
- um único link principal quando houver destino público útil.

O conteúdo aberto ocupará a largura disponível do capítulo e seguirá a hierarquia editorial atual. No mobile, os blocos passam para uma coluna e as imagens mantêm proporção estável.

## Assets

Os arquivos fornecidos serão copiados para uma pasta própria em `public/projects`. Os originais em Downloads não serão alterados.

- escudo do Flamengo Guarulhos;
- marca Wiltenburg Labs;
- assets visuais selecionados do repositório público do LockIN Fight.

Fotos e telas futuras poderão ser adicionadas ao mesmo modelo sem mudar os componentes.

## Acessibilidade e falhas

- Imagens informativas recebem texto alternativo; marcas repetidas na decoração ficam com `alt=""`.
- O resumo do projeto permanece em HTML mesmo se uma imagem falhar.
- Links externos indicam destino e abrem de forma segura.
- Foco visível e operação por teclado continuam obrigatórios.
- Nenhuma informação essencial depende de hover, WebGL ou movimento.

## Verificação

- build e verificação TypeScript;
- checklist local do projeto;
- teste de abertura e fechamento dos dossiês por teclado;
- conferência de links públicos e ausência de link no Flamengo 3x3;
- inspeção visual em desktop, tablet e mobile;
- teste com movimento reduzido;
- Lighthouse desktop após a integração dos assets.

## Critérios de conclusão

- a trajetória continua sendo uma experiência única e contínua;
- cada projeto fica identificável antes de abrir detalhes;
- os dossiês explicam problema, construção e participação sem excesso de texto;
- os assets reais parecem parte da direção visual existente;
- nenhuma métrica não confirmada ou material privado é publicado.
