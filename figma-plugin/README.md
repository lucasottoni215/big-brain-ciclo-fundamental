# Sincronizador de referencias FigJam

Componente de visualizacao de maturidade. Ele le os dois catalogos publicos do
Ciclo Fundamental e aplica ao FigJam o estado publicado de cada referencia.

## Regra

- Referencia de integridade `verificada` ou referencia de maturidade
  `referenciada`: guarda o estilo original e aplica fill, contorno e texto da
  fase publicada.
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

O plugin busca os catalogos publicados em:

- `state/figjam-referencias.json`, para integridade do prototipo;
- `state/figjam-notion-referencias.json`, para maturidade entre FigJam, Notion
  e Supabase.

- Uma referencia valida recebe a cor publicada no catalogo. A referencia de
  maturidade prevalece quando o mesmo no aparece nos dois catalogos.
- Uma referencia em revisao restaura a cor anterior, quando ela foi guardada
  por uma execucao anterior do plugin.
- Uma nota ausente e somente contabilizada no resumo final; o plugin nao cria
  nem recria notas no FigJam.

## Limite de automacao

As rotinas do GitHub atualizam e revisam o catalogo publico. Elas nao executam
o plugin dentro do Figma. A aplicacao visual no FigJam depende de uma pessoa
executar o comando do plugin; essa e uma limitacao do ambiente de plugins de
desenvolvimento do Figma, nao uma confirmacao de que a nota exista.
