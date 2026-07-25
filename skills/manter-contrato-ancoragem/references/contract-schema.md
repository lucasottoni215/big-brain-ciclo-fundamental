# Esquema do Contrato de Ancoragem V0

## Documento contratual no Google Drive

```yaml
protocol: ancora.contract.v0
contract_id: contract-...
version: 1
status: draft | awaiting_attribution | awaiting_confirmation | submitted | registered | contested | superseded

foundation:
  foundation_ref: foundation-...
  factual_recognition_ref: evidence-...
  recognition_status: confirmed | contested | pending

hidden_layer:
  foundation_precognitive_ref: protected-or-pending
  poetic: text-or-pending
  hermeneutic: text-or-pending
  epistemic: text-or-pending

anchoring:
  object_ref: object-...
  representative_avatar_ref: avatar-... | pending
  post_ref: post-... | pending
  mandate_ref: mandate-... | pending
  authority_source_ref: contract-or-decision-...

scope:
  allowed_actions: []
  prohibitions: []
  escalation_rule: text
  exit_rule: text

confirmation:
  required_from: person-or-avatar-ref
  status: pending | confirmed | contested
  evidence_ref: evidence-... | pending

provenance:
  maintained_by_agent: agent-ref
  drive_contract_document_ref: drive-document-id-or-url
  drive_authenticated_account: email-or-profile-id
  drive_revision_ref: value-if-available
  content_hash: value-if-available
  updated_at: ISO-8601
  change_type: initial_draft
  change_reason: text
  previous_version_ref: null

registrations:
  people: []
  objects: []
  posts: []
  relations: []
```

Cada item de `registrations` usa, no minimo:

```yaml
registration_id: registration-...
kind: person | object | post | relation
name: text
factual_status: observed | inferred | declared | confirmed | contested
evidence_ref: evidence-or-drive-location
presence_mode: direct | indirect | assisted | observed | not-applicable
notes: text-or-null
```

Pessoa sem e-mail, WhatsApp ou conta digital pode ser registrada. Identidade e presenca permanecem separadas. O registro nao cria Avatar nem autoridade por si so.

## Pacote de submissao

```json
{
  "protocol": "ancora.contract-submission.v0",
  "submission_id": "submission-...",
  "contract_id": "contract-...",
  "contract_version": 1,
  "foundation_ref": "foundation-...",
  "drive_contract_document_ref": "drive-document-id-or-url",
  "drive_authenticated_account": "required-google-profile",
  "drive_revision_ref": "value-or-null",
  "content_hash": "value-or-null",
  "maintainer_agent_ref": "agent-...",
  "confirmation_status": "confirmed",
  "registrations": {
    "people": [],
    "objects": [],
    "posts": [],
    "relations": []
  },
  "evidence_refs": [],
  "requested_action": "validate_and_incorporate",
  "canonical_write_requested": true
}
```

## Resposta da Ancora

```json
{
  "protocol": "ancora.contract-review.v0",
  "submission_id": "submission-...",
  "status": "incorporated | pending | tensioned | rejected",
  "canonical_ref": "notion-page-or-null",
  "missing_fields": [],
  "conflicts": [],
  "next_action": "none-or-text"
}
```

## Residencia, autoria e atribuicao

O contrato integral sempre reside em um Documento do Google Drive. O criador pode usar qualquer conta Google autorizada e qualquer pasta do Drive. A conta autenticada e o historico de edicoes identificam operacionalmente quem produziu cada versao; essa atribuicao e contestavel e nao substitui o Mandato.

Sem Documento do Drive e conta autenticada, a versao nao pode chegar a `submitted`. O Notion incorpora o estado validado, a referencia do documento, a conta, a versao e as evidencias. Uma correcao nasce como nova versao no Drive e depois e reincorporada.

## Limites da camada oculta

A camada oculta pertence a Fundacao e descreve seu proprio pre-cognitivo. Ela nao contem Assinaturas Cognitivas, objetos pessoais, conversas privadas ou inferencias psicologicas sobre funcionarios.

## Versionamento

- Nunca substituir a versao anterior sem referencia.
- Uma correcao factual cria nova versao no Drive.
- Contestacao nao invalida retroativamente atos ja registrados.
- Alteracao estrutural exige confirmacao competente.
- O estado `registered` ou `incorporated` somente pode ser atribuido apos resposta da Ancora.
