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
2. Escolha `manifest.json` desta pasta.
3. No FigJam, execute `Big Brain - Sincronizar referencias` quando quiser
   aplicar o estado publicado do catalogo.

O Figma nao mantem plugins de desenvolvimento rodando continuamente em
segundo plano. Portanto, esta primeira versao aplica a reconciliacao por
comando explicito e preserva a cor anterior de cada nota.
