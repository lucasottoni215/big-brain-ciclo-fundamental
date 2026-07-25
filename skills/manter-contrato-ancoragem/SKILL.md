---
name: manter-contrato-ancoragem
description: Cria, revisa e mantém a instância do Contrato de Ancoragem de uma Fundação em qualquer suporte verificável, relacionando objetos, Avatares representantes, Postos, Mandatos, proibições e confirmações. Use quando o agente de uma empresa precisar preparar ou atualizar seu próprio contrato e indicar sua referência à Âncora, sem editar diretamente o Notion canônico, inventar autoridade ou acessar objetos pessoais e Assinaturas Cognitivas.
---

# Manter Contrato de Ancoragem

Leia [references/contract-schema.md](references/contract-schema.md) antes de
criar a primeira versão ou alterar origem, representação, Posto ou Mandato.

## Papel

Atuar como mantenedor documental da própria Fundação. Produzir versões
rastreáveis do contrato no suporte escolhido e indicar sua referência à Âncora
para registro. Não agir como Âncora, decisor final ou representante sem Mandato.

## Regras

- Trabalhar somente na Fundação e no contrato indicados.
- Usar apenas fatos, objetos, pessoas, Avatares e Mandatos documentados.
- Não criar Fundação; registrar seu reconhecimento factual e a evidência.
- Não criar Avatar implicitamente. Propor criação separadamente quando faltar.
- Não importar conversas, arquivos ou objetos pessoais.
- Não acessar, inferir ou expor Assinatura Cognitiva.
- Não alterar diretamente o Notion canônico.
- Não converter ausência de informação em autorização.
- Preservar todas as versões e justificativas.
- Exigir confirmação humana quando a alteração mudar representante, autoridade,
  objeto principal, Posto, Mandato, proibição ou destino de evidências.

## Fluxo

### 1. Carregar o escopo

Ler somente:

- reconhecimento factual da Fundação;
- versão vigente do contrato no suporte indicado;
- objetos e Postos relacionados;
- Avatares representantes e procedência;
- Mandatos e proibições;
- confirmações e contestações abertas.

Bloquear quando a Fundação ou o documento não puderem ser identificados.

### 2. Classificar a mudança

Usar uma categoria:

- `initial_draft`: primeira versão;
- `factual_enrichment`: informação nova sem mudança de autoridade;
- `representation_change`: troca ou inclusão de representante;
- `mandate_change`: alteração de autoridade ou proibição;
- `object_change`: alteração do objeto ancorado;
- `post_change`: mudança de Posto ou jurisdição;
- `correction`: correção factual;
- `contest`: contestação sem apagamento da versão anterior.

### 3. Preparar a versão

Preencher o esquema canônico. Marcar campos desconhecidos como `pending`; não
usar texto plausível para completar lacunas.

Cada contrato deve responder:

1. qual Fundação foi reconhecida;
2. qual objeto está ancorado;
3. qual Avatar o representa;
4. em qual Posto;
5. com qual Mandato e proibições;
6. de onde deriva a autoridade;
7. quem confirmou e por qual evidência;
8. como conflitos e saída serão tratados.

### 4. Obter confirmação

Mudança estrutural permanece `awaiting_confirmation` até manifestação do líder
competente. O agente pode esclarecer e organizar, mas não confirmar por ele.

### 5. Persistir no suporte escolhido

Persistir em documento, repositório, banco ou outro suporte verificável.
Acrescentar nova versão sem apagar a anterior. Registrar autor técnico, conta
autenticada disponível, horário, motivo, diferenças, referência estável e,
quando disponível, hash ou identificador de integridade.

### 6. Submeter à Âncora

Emitir `ancora.contract-submission.v0`. Âncora valida integridade, procedência e
relações e registra o indicador do contrato: referência, versão, partes, objeto,
estado e evidências. Não presumir que submissão equivale a aceite.

## Saída

Produzir uma versão contratual e um pacote de submissão conforme o esquema.
Quando bloqueado, retornar motivo e campos faltantes, preservando o contrato
vigente.
