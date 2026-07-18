# Sincronizador de referencias FigJam

Componente de visualizacao de maturidade. Ele le o catalogo publico de
referencias do Ciclo Fundamental e aplica a cor da referencia ao elemento
correspondente no FigJam.

## Regra

- Referencia `verificada`: guarda a cor original da nota e aplica a cor do
  catalogo.
- Referencia em revisao: restaura a cor original guardada.
- Nota removida: registra a ausencia na execucao, sem tentar recriar a nota.

## Uso inicial

1. No Figma, abra `Plugins > Development > Import plugin from manifest...`.
2. No clone deste repositorio, escolha `figma-plugin/manifest.json`.
3. No FigJam, execute `Big Brain - Sincronizar referencias` quando quiser
   aplicar o estado publicado do catalogo.

O Figma nao mantem plugins de desenvolvimento rodando continuamente em
segundo plano. Portanto, esta primeira versao aplica a reconciliacao por
comando explicito e preserva a cor anterior de cada nota.

## O que a execucao faz

O plugin busca o catalogo publicado em
`https://lucasottoni215.github.io/big-brain-ciclo-fundamental/state/figjam-referencias.json`.

- Uma referencia com `status` e `integridade` iguais a `verificada` recebe a
  cor publicada no catalogo.
- Uma referencia em revisao restaura a cor anterior, quando ela foi guardada
  por uma execucao anterior do plugin.
- Uma nota ausente e somente contabilizada no resumo final; o plugin nao cria
  nem recria notas no FigJam.

No estado publicado em 18/07/2026, a unica referencia (`posto`, nota `7:373`)
esta marcada como `nota_ausente`. Portanto, a execucao esperada e
`0 iluminadas, 0 restauradas, 1 ausentes`.

## Limite de automacao

As rotinas do GitHub atualizam e revisam o catalogo publico. Elas nao executam
o plugin dentro do Figma. A aplicacao visual no FigJam depende de uma pessoa
executar o comando do plugin; essa e uma limitacao do ambiente de plugins de
desenvolvimento do Figma, nao uma confirmacao de que a nota exista.
