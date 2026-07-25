---
name: manter-contrato-ancoragem
description: Cria, revisa e mantem no Google Drive a instancia do Contrato de Ancoragem de uma Fundacao, relacionando objetos, Avatares representantes, Postos, Mandatos, proibicoes e confirmacoes. Use quando o agente de uma empresa precisar preparar ou atualizar seu proprio contrato e submete-lo a Ancora para incorporacao no Notion canonico.
---

# Manter Contrato de Ancoragem

Leia [references/contract-schema.md](references/contract-schema.md) antes de criar a primeira versao ou alterar origem, representacao, Posto ou Mandato.

## Papel

Atuar como mantenedor documental da propria Fundacao. Criar, versionar e manter o contrato em um Documento Google Drive e submeter suas versoes a Ancora. Nao agir como Ancora, decisor final ou representante sem Mandato.

## Regra de residencia

- O contrato sempre reside no Google Drive.
- Pode ser criado por qualquer conta Google autorizada e morar em qualquer pasta do Drive.
- Conta e pasta nao definem a autoridade; fornecem atribuicao operacional contestavel.
- A autoridade deriva da cadeia de Fundacao, Objeto, Posto, Mandato e confirmacoes.
- O Notion incorpora a versao validada e seu estado canonico; nao substitui o documento do Drive.

## Regras

- Trabalhar somente na Fundacao e no contrato indicados.
- Usar apenas fatos, objetos, pessoas, Avatares e Mandatos documentados.
- Nao criar Fundacao; registrar seu reconhecimento factual e a evidencia.
- Nao criar Avatar implicitamente. Propor criacao separadamente quando faltar.
- Nao importar conversas, arquivos ou objetos pessoais.
- Nao acessar, inferir ou expor Assinatura Cognitiva.
- Nao alterar diretamente o Notion canonico.
- Autenticar no Google Drive antes de criar, atualizar ou submeter uma versao.
- Nao converter ausencia de informacao em autorizacao.
- Preservar versoes e justificativas no historico do Drive.
- Exigir confirmacao humana quando a alteracao mudar representante, autoridade, objeto principal, Posto, Mandato, proibicao ou destino de evidencias.

## Fluxo

### 1. Identificar a conta e o documento

Consultar o perfil autenticado do Google Drive. Localizar o Documento do Contrato ou criar um novo em qualquer pasta autorizada. Registrar ID, URL, conta autenticada e, quando disponivel, revisao do Drive.

Sem acesso autenticado ao Drive ou sem atribuicao da conta, manter `awaiting_attribution` e nao submeter a versao como confirmada.

### 2. Carregar o escopo

Ler somente o reconhecimento factual da Fundacao, a versao vigente no Drive, objetos e Postos relacionados, Avatares representantes, Mandatos, proibicoes, confirmacoes e contestacoes abertas.

### 3. Classificar a mudanca

Usar: `initial_draft`, `factual_enrichment`, `representation_change`, `mandate_change`, `object_change`, `post_change`, `correction` ou `contest`.

### 4. Preparar e confirmar a versao

Preencher o esquema canonico. Marcar campos desconhecidos como `pending`. Mudanca estrutural permanece `awaiting_confirmation` ate manifestacao do lider competente.

### 5. Versionar no Drive

Editar o Documento do Contrato no Drive sem apagar a rastreabilidade da versao anterior. Registrar autor tecnico, conta autenticada, horario, motivo e diferencas. Hash e identificador de revisao sao evidencias adicionais quando disponiveis.

### 6. Submeter a Ancora

Emitir `ancora.contract-submission.v0` com Documento do Drive, conta autenticada, versao, confirmacoes e evidencias. Ancora valida integridade, procedencia e relacoes e incorpora a versao no Notion. Submissao nao equivale a aceite.

Se houver correcao, o agente cria nova versao no Drive e a submete novamente. Ancora nunca corrige silenciosamente o contrato incorporado.

## Saida

Produzir uma versao contratual no Google Drive e um pacote de submissao conforme o esquema. Quando bloqueado, retornar motivo e campos faltantes, preservando o contrato vigente.
