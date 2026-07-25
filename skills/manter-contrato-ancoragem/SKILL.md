---
name: manter-contrato-ancoragem
description: Cria, revisa e mantem no Google Drive a instancia do Contrato de Ancoragem de uma Fundacao, relacionando objetos, Avatares representantes, Postos, Mandatos, proibicoes e confirmacoes. Use quando o agente de uma empresa precisar preparar ou atualizar seu proprio contrato e submete-lo a Ancora para incorporacao no Notion canonico.
---

# Manter Contrato de Ancoragem

Leia [references/human-contract-template.md](references/human-contract-template.md) antes de escrever o documento compartilhado. Leia [references/contract-schema.md](references/contract-schema.md) somente para preparar o pacote tecnico enviado a Ancora.

## Papel

Atuar como mantenedor documental da propria Fundacao. Criar, versionar e manter o contrato em um Documento Google Drive e submeter suas versoes a Ancora. Nao agir como Ancora, decisor final ou representante sem Mandato.

## Regra de residencia

- O contrato sempre reside no Google Drive.
- Pode ser criado por qualquer conta Google autorizada e morar em qualquer pasta do Drive.
- Conta e pasta nao definem a autoridade; fornecem atribuicao operacional contestavel.
- A autoridade deriva da cadeia de Fundacao, Objeto, Posto, Mandato e confirmacoes.
- O Notion incorpora a versao validada e seu estado canonico; nao substitui o documento do Drive.

## Separacao entre humano e tecnico

- Escrever o contrato do Drive para leitura de pessoas, em linguagem natural, curta e direta.
- Nao inserir no contrato JSON, YAML, IDs internos, hashes, nomes de protocolo, estados de maquina, URLs do Notion ou instrucoes para agentes.
- Nao usar termos SACF quando uma frase comum transmitir o mesmo sentido.
- Manter referencias tecnicas, proveniencia estruturada e estados operacionais somente no pacote de submissao e no Notion.
- O contrato humano deve explicar quem participa, o que esta sendo organizado, responsabilidades, limites, funcionamento pratico e pendencias reais.

## Regras

- Trabalhar somente na Fundacao e no contrato indicados.
- Usar apenas fatos, objetos, pessoas, Avatares e Mandatos documentados.
- Nao criar Fundacao; registrar seu reconhecimento factual e a evidencia.
- Nao criar Avatar implicitamente. Propor criacao separadamente quando faltar.
- Nao importar conversas, arquivos ou objetos pessoais.
- Nao acessar, inferir ou expor Assinatura Cognitiva.
- Nao alterar diretamente o Notion canonico.
- Registrar no Documento do Drive pessoas, objetos, Postos e vinculos factualmente encontrados dentro do escopo da Fundacao.
- Distinguir `observed`, `inferred`, `declared`, `confirmed` e `contested`; nao apresentar inferencia como confirmacao.
- Anexar origem ou evidencia minima a cada registro novo e incluir os registros no pacote enviado a Ancora.
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

### 4. Preparar o texto humano e confirmar a versao

Usar o modelo humano padrao. Omitir campos tecnicos e secoes vazias. Expressar informacao ausente como uma pendencia compreensivel, apenas quando ela importar para as pessoas. Mudanca estrutural permanece sem confirmacao ate manifestacao do lider competente.

Durante o levantamento, registrar candidatos a pessoa, objeto, Posto e vinculo no proprio contrato. Uma pessoa pode ser registrada mesmo sem e-mail ou WhatsApp; nesse caso, separar identidade de presenca e informar como ela foi inferida, declarada ou observada. Nao criar Avatar automaticamente.

### 5. Versionar no Drive

Editar o Documento do Contrato no Drive sem apagar a rastreabilidade da versao anterior. O historico do Drive preserva autoria e alteracoes. No texto visivel, mostrar apenas uma data de atualizacao e, quando util, uma frase simples sobre o que mudou.

### 6. Submeter a Ancora

Preparar separadamente `ancora.contract-submission.v0` com Documento do Drive, conta autenticada, versao, confirmacoes, registros candidatos e evidencias. Nunca colar esse pacote no contrato humano. Ancora valida integridade, procedencia e relacoes e incorpora a versao e os registros aceitos no Notion. Submissao nao equivale a aceite.

Se houver correcao, o agente cria nova versao no Drive e a submete novamente. Ancora nunca corrige silenciosamente o contrato incorporado.

## Saida

Produzir duas saidas separadas: um contrato humano no Google Drive e um pacote tecnico para Ancora. Quando bloqueado, explicar a pendencia em linguagem simples no documento somente se ela afetar os participantes; detalhes tecnicos ficam no pacote.
