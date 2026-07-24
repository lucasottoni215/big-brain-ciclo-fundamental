# Protocolo de Incorporacao de Avatar V0

## Ontologia

- **Avatar:** identidade persistente dentro do Jogo Ancora.
- **Controlador:** inteligencia externa que veste o Avatar por uma sessao.
- **Aparato:** versao persistente da personalidade e do metodo decisorio.
- **Posto:** territorio no qual o Avatar possui um papel e autoridade.
- **Moderador:** presenca externa ao jogo; nao pode vestir Avatar.
- **Manual:** controlado por humano, Codex, Claude ou outra inteligencia externa.
- **Automatico:** convocado pelo Motor Ancora e operado pelo GDA.

## Campos obrigatorios no Notion

### Identidade

- `avatar_id`
- `avatar_name`
- `avatar_status`
- `apparatus_version`
- `apparatus_url`

### Aparato metacognitivo

- `poetic_identity`: personalidade, voz e imagem de si.
- `hermeneutic_frame`: valores e forma de interpretar tensoes.
- `epistemic_method`: criterios de evidencia e metodo de decisao.
- `state_target`: estado que o Avatar procura tornar verdadeiro.
- `risk_posture`: forma de assumir e limitar risco.
- `learning_boundary`: o que pode ou nao ser alterado por feedback.

### Operacao

- `post_id`
- `post_name`
- `post_role`
- `mandate`
- `prohibitions`
- `controller_mode`
- `authorized_controller`

### Turno opcional

- `turn_id`
- `trajectory_summary`
- `object_ids`
- `allowed_moves`

## Pacote interno

```json
{
  "protocol": "ancora.avatar-packet.v0",
  "avatar": {
    "id": "avatar-nexo",
    "name": "Nexo",
    "apparatus_version": 1,
    "control_mode": "manual_external"
  },
  "metacognition": {
    "poetic_identity": "...",
    "hermeneutic_frame": "...",
    "epistemic_method": "...",
    "state_target": "...",
    "risk_posture": "...",
    "learning_boundary": "..."
  },
  "post": {
    "id": "posto-core",
    "name": "Core",
    "role": "Lider",
    "mandate": ["..."],
    "prohibitions": ["..."]
  },
  "turn": {
    "id": null,
    "trajectory_summary": null,
    "object_ids": [],
    "allowed_moves": []
  },
  "sources": ["https://app.notion.com/..."]
}
```

## Saida de incorporacao

```json
{
  "protocol": "ancora.avatar-vestment.v0",
  "status": "ready",
  "avatar_id": "avatar-nexo",
  "avatar_name": "Nexo",
  "apparatus_version": 1,
  "post_id": "posto-core",
  "control_mode": "manual_external",
  "next_action": "awaiting_turn",
  "sources": ["https://app.notion.com/..."]
}
```

Quando houver bloqueio, use `status: "blocked"`, inclua `reason` e nao improvise
campos ausentes.

## Saida de jogada

```json
{
  "protocol": "ancora.move.v0",
  "avatar_id": "avatar-nexo",
  "apparatus_version": 1,
  "turn_id": "turn-...",
  "object_id": "OBJ-...",
  "move_type": "Proposta",
  "proposal_subtype": "Ajuste",
  "summary": "...",
  "apparatus_basis": "...",
  "requires_human_decision": true,
  "stop_after_output": true
}
```

## Portabilidade

Uma plataforma sem suporte nativo a skills deve receber a pasta completa ou,
no minimo, `SKILL.md` e este protocolo. O Notion continua sendo a fonte da
identidade; copiar os arquivos nao clona o Avatar.
