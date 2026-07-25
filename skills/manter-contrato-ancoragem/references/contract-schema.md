# Esquema do Contrato de Ancoragem V0

## Documento contratual

```yaml
protocol: ancora.contract.v0
contract_id: contract-...
version: 1
status: draft | awaiting_confirmation | submitted | registered | contested | superseded

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
  authenticated_account: value-if-available
  contract_location: uri-or-reference
  content_hash: value-if-available
  storage_kind: document | repository | database | external-system | other
  updated_at: ISO-8601
  change_type: initial_draft
  change_reason: text
  previous_version_ref: null
```

## Pacote de submissão

```json
{
  "protocol": "ancora.contract-submission.v0",
  "submission_id": "submission-...",
  "contract_id": "contract-...",
  "contract_version": 1,
  "foundation_ref": "foundation-...",
  "contract_location": "uri-or-reference",
  "content_hash": "value-or-null",
  "storage_kind": "document",
  "maintainer_agent_ref": "agent-...",
  "authenticated_account": "available-or-null",
  "confirmation_status": "confirmed",
  "evidence_refs": [],
  "requested_action": "validate_and_register",
  "canonical_write_requested": true
}
```

## Resposta da Âncora

```json
{
  "protocol": "ancora.contract-review.v0",
  "submission_id": "submission-...",
  "status": "registered | pending | tensioned | rejected",
  "canonical_ref": "notion-page-or-null",
  "missing_fields": [],
  "conflicts": [],
  "next_action": "none-or-text"
}
```

## Limites da camada oculta

A camada oculta pertence à Fundação e descreve seu próprio pré-cognitivo. Ela
não contém Assinaturas Cognitivas, objetos pessoais, conversas privadas ou
inferências psicológicas sobre funcionários.

## Versionamento

- Nunca substituir a versão anterior sem referência.
- Uma correção factual cria nova versão.
- Contestação não invalida retroativamente atos já registrados.
- Alteração estrutural exige confirmação competente.
- O estado `registered` somente pode ser atribuído após resposta da Âncora.
