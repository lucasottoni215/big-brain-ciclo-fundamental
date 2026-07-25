# Protocolo de Borda Pessoal V0

## Ontologia minima

- **Pessoa:** permanece fora do sistema e controla seus canais e objetos pessoais.
- **Borda pessoal:** interface que transporta somente manifestacoes selecionadas.
- **Contrato de Ancoragem:** define finalidade, destino, confirmacao e limites.
- **Ato formal:** registro operacional confirmado; nao e memoria nem pensamento.
- **Assinatura Cognitiva:** plano protegido inacessivel a esta skill.
- **Avatar:** identidade do BB Verse; conectar um canal nao veste um Avatar.

## Estados da conexao

`unconfigured -> awaiting_user_auth -> ready -> paused -> revoked`

Falhar de forma fechada quando contrato, destino, titular, finalidade ou
autorizacao forem ambiguos.

## Contrato de conexao

```json
{
  "protocol": "bigbrain.edge-connection.v0",
  "status": "ready",
  "person_ref": "person-...",
  "presence_mode": "direct",
  "foundation_ref": "foundation-...",
  "post_ref": "post-...",
  "contract_ref": "contract-...",
  "channels": ["google-drive", "whatsapp-self-chat"],
  "accepted_markers": ["/bb"],
  "automatic_send_types": [],
  "canonical_access": false,
  "cognitive_signature_access": false,
  "next_action": "awaiting_selected_input"
}
```

## Manifestacao de entrada

```json
{
  "protocol": "bigbrain.edge-intake.v0",
  "intake_id": "edge-...",
  "contract_ref": "contract-...",
  "person_ref": "person-...",
  "source": {
    "channel": "whatsapp-self-chat",
    "selected_by_user": true,
    "marker": "/bb",
    "occurred_at": "ISO-8601"
  },
  "destination": {
    "foundation_ref": "foundation-...",
    "post_ref": "post-..."
  },
  "original_selected_text": "...",
  "operational_summary": "...",
  "act_type": "request",
  "confirmation": "explicit",
  "attachments": [],
  "requested_effect": "register_and_route"
}
```

## Recibo

```json
{
  "protocol": "bigbrain.edge-receipt.v0",
  "intake_id": "edge-...",
  "status": "received",
  "destination_ref": "post-...",
  "decision_created": false,
  "execution_promised": false,
  "next_action": "awaiting_operational_return"
}
```

## Bloqueios

Use `status: "blocked"` e um destes motivos:

- `contract_required`
- `user_auth_required`
- `explicit_selection_required`
- `confirmation_required`
- `destination_unknown`
- `scope_exceeded`
- `private_history_request_denied`
- `cognitive_signature_access_denied`
- `canonical_access_denied`

## WhatsApp

- Processar somente mensagens selecionadas pelo titular e, na V0, enviadas por
  ele ao proprio chat com `/bb`.
- Nao monitorar grupos, contatos ou conversas privadas.
- Nao responder como se fosse o titular.
- Nao enviar mensagem a terceiro sem confirmacao e permissao contratual.

## GPT, Claude ou Codex pessoal

- O agente pode ajudar a pessoa a formular a manifestacao.
- O historico da conversa continua no provedor pessoal.
- Somente o pacote confirmado atravessa a borda.
- A skill nao concede acesso ao Notion, Core ou Assinatura Cognitiva.

## Drive e Docs

- Usar somente pasta ou documento expressamente indicado no contrato.
- Registrar atos formais, entregas e evidencias compartilhadas.
- Nao espelhar automaticamente rascunhos, historicos ou pastas pessoais.
- Tratar o Notion como canone interno, atualizado pelo Posto competente.
