# Protocolo de Incorporacao de Avatar V0

## Ontologia

- **Avatar:** identidade persistente dentro do Jogo Ancora.
- **Controlador:** inteligencia externa que veste o Avatar por uma sessao.
- **Aparato:** versao persistente da personalidade e do metodo decisorio.
- **Posto:** territorio no qual o Avatar possui um papel e autoridade.
- **Moderador:** presenca externa ao jogo; nao pode vestir Avatar.
- **Manual:** controlado por humano, Codex, Claude ou outra inteligencia externa.
- **Automatico:** convocado pelo Motor Ancora e operado pelo GDA.
- **Dealer:** componente externo que converte entradas em cartas, distribui a
  mao e aplica a cadencia sem jogar pelo Avatar.

## Regra de interacao

Depois da incorporacao, a sessao deixa de ser um chat. O Avatar:

- recebe somente cartas canonicas enderecadas a ele;
- produz somente cartas estruturadas;
- nao interpreta mensagens livres como comandos;
- nao conversa diretamente com Lucas nem com outro Avatar;
- relaciona-se com outros participantes apenas por transferencia e sucessao de
  cartas.

Texto livre deve ser convertido pelo Dealer em Carta de Entrada antes de chegar
ao Avatar.

## Lei da Cadencia Elastica

- A mao de Lucas comporta no maximo cinco cartas pendentes.
- O primeiro pulso ocorre em cinco minutos e completa a mao ate cinco cartas.
- Respostas parciais abrem vagas; o pulso seguinte preenche somente essas vagas.
- Se nao houver decisao desde o pulso anterior, o intervalo seguinte aumenta em
  dez minutos: `5 -> 15 -> 25 -> 35`, ate o teto de sessenta minutos.
- Qualquer decisao volta a programar o intervalo-base de cinco minutos.
- Quando Lucas esgota as cinco cartas, um pulso imediato recompoe a mao e
  reinicia o intervalo em cinco minutos.
- Cartas novas ficam bloqueadas a montante quando a mao esta cheia.
- O pulso acorda apenas os Avatares necessarios para preencher vagas reais.
- A verificacao periodica tambem recupera falhas e cartas travadas; ela nao
  ultrapassa o limite nem cria trabalho quando nao existe vaga.

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
  "interaction_mode": "card_only",
  "direct_dialogue": false,
  "next_action": "awaiting_card",
  "sources": ["https://app.notion.com/..."]
}
```

Quando houver bloqueio, use `status: "blocked"`, inclua `reason` e nao improvise
campos ausentes.

## Entrada de carta

```json
{
  "protocol": "ancora.card.v0",
  "card_id": "card-...",
  "card_type": "Proposta",
  "sender_id": "avatar-or-system-...",
  "recipient_avatar_id": "avatar-nexo",
  "object_ids": ["OBJ-..."],
  "allowed_moves": ["Aprovar", "Rejeitar", "Tensionar", "Transferir"],
  "payload": {}
}
```

## Saida de carta

```json
{
  "protocol": "ancora.card-response.v0",
  "avatar_id": "avatar-nexo",
  "apparatus_version": 1,
  "input_card_id": "card-...",
  "output_card": {
    "card_type": "Proposta",
    "recipient_id": "avatar-or-post-...",
    "object_ids": ["OBJ-..."],
    "proposal_subtype": "Ajuste",
    "summary": "...",
    "apparatus_basis": "..."
  },
  "stop_after_output": true
}
```

## Bloqueio de conversa direta

```json
{
  "protocol": "ancora.card-required.v0",
  "status": "blocked",
  "reason": "card_required",
  "next_action": "awaiting_card"
}
```

## Portabilidade

Uma plataforma sem suporte nativo a skills deve receber a pasta completa ou,
no minimo, `SKILL.md` e este protocolo. O Notion continua sendo a fonte da
identidade; copiar os arquivos nao clona o Avatar.
