# Da quadra ao código

Direção revisada a pedido do João em 15/09/2026. A página passa a contar uma trajetória pessoal. Os projetos entram como parte do percurso.

## Narrativa fornecida pelo João

1. Conheceu Marcos jogando basquete na escola. Marcos o apresentou à programação e ao mercado de tecnologia.
2. Durante o ensino médio, vendeu palhas italianas na escola para se manter.
3. Entrou para um time de basquete e foi campeão em competições regionais e estaduais.
4. Depois da escola, entrou na FIAP para estudar Análise e Desenvolvimento de Sistemas.
5. Entrou na isla como engenheiro de software, empresa em que Marcos é CEO.

O relato é um primeiro rascunho autorizado pelo João. Datas, campeonatos específicos e imagens pessoais ficam marcados como `[PREENCHER]` no arquivo de conteúdo. Não foram criadas fotografias, números ou conquistas adicionais.

## Experiência

- Abertura em tela cheia, com tipografia grande e uma bola de basquete 3D que responde ao ponteiro.
- Seletor entre quadra, código e conexões. Cada escolha altera a composição da cena.
- O primeiro trecho de scroll separa a tipografia, muda o enquadramento e revela a passagem para a história.
- Cinco capítulos percorrem a tela no desktop. A bola recua e suas conexões formam um caminho espacial.
- Mobile apresenta a mesma história em sequência vertical, com ilustrações leves.
- Movimento reduzido é respeitado por padrão. O visitante pode escolher ativar animações no desktop.
- Seis projetos ficam em um arquivo compacto. Meu Consultório foi removido.

## Referências verificadas

| Referência | Técnica adaptada |
| --- | --- |
| [deco](https://www.decocms.com/) | Hero como cenário que muda de estado; interação altera a mensagem e o ambiente. |
| [isla](https://isla.to/) | Demonstrações em grande escala, diagramas e uma sequência clara de etapas. |
| [A1: scroll animation](https://www.a1.gallery/websites/scroll-animation-landing) | Pesquisa de composições e transições entre seções. |
| [Clay Cup](https://claycup.com/) | Objeto central integrado a palavras gigantes; vida e contexto pessoal entram na narrativa. |
| [Daybridge](https://daybridge.com/pt) | Trabalho e experiências pessoais aparecem juntos, como partes da mesma pessoa. |
| [Etched](https://www.etched.com/) | Enquadramento persistente muda conforme a leitura avança. |

## Conteúdo e verificação

`data/journey.ts` concentra os capítulos. `data/portfolio.ts` concentra projetos e contatos. Os textos podem ser revisados sem alterar a animação.

Os resultados de performance da primeira versão não são automaticamente atribuídos a esta revisão. A nova página deve passar por build, teclado, movimento reduzido, responsividade, contraste e Lighthouse com WebGL ativo antes da entrega.
