---
name: conectar-borda-pessoal
description: Conecta um GPT, Claude, Codex ou outro agente externo aos canais pessoais controlados por um funcionario, especialmente Google Drive/Docs e WhatsApp, para transportar solicitacoes operacionais formais ao Contrato de Ancoragem. Use quando o usuario pedir para configurar, operar ou validar a borda pessoal Big Brain sem importar historico privado, expor Assinatura Cognitiva, acessar o Notion canonico ou decidir em nome da pessoa.
---

# Conectar Borda Pessoal

Leia [references/protocol.md](references/protocol.md) antes da primeira conexao.

## Finalidade

Usar ferramentas ja controladas pela pessoa como interfaces de entrada, resposta
e evidencia. A skill transporta atos operacionais formais; nao incorpora a vida
cognitiva da pessoa ao Big Brain.

## Fronteiras obrigatorias

- Tratar ChatGPT, WhatsApp, Drive e arquivos pessoais como dominio externo.
- Nunca importar historico completo, conversas antigas, contatos ou arquivos.
- Nunca ler mensagens que nao tenham sido selecionadas pelo usuario ou marcadas
  pelo comando contratual vigente, inicialmente `/bb`.
- Nunca criar, inferir, exibir ou atualizar Assinatura Cognitiva.
- Nunca acessar diretamente Notion, Core, agentes internos ou infraestrutura da
  empresa, salvo autorizacao tecnica separada e explicita.
- Nunca transformar conversa em decisao, Mandato ou objeto institucional sem
  confirmacao formal do usuario.
- Nunca prometer execucao. Emitir recibo, pedir dados faltantes e acompanhar o
  estado recebido da contraparte.
- Manter segredos e credenciais no provedor escolhido pelo usuario; nao inclui-los
  em documentos, cartas, logs ou respostas.

## Fluxo

### 1. Identificar o contrato

Obter somente:

- pessoa e modo de presenca;
- Fundacao e Posto destinatarios;
- finalidade autorizada;
- canais escolhidos;
- tipos de ato permitidos;
- regra de confirmacao e revogacao;
- destino contratual para a mensagem formal.

Bloquear se nao houver Contrato de Ancoragem ou instrucao equivalente verificavel.

### 2. Conectar o canal

Preferir autenticacao executada pela propria pessoa. Para WhatsApp, usar apenas a
sessao que ela conectou e as mensagens `/bb` previstas no contrato. Para GPT ou
Drive, operar somente arquivos e documentos explicitamente escolhidos.

Nao copiar o historico anterior durante a conexao.

### 3. Produzir uma manifestacao formal

Converter apenas o conteudo selecionado em `bigbrain.edge-intake.v0`. Separar:

- texto original selecionado;
- resumo operacional;
- pedido ou evidencia;
- origem e horario;
- grau de confirmacao;
- anexos explicitamente escolhidos;
- destino contratual.

Mostrar a manifestacao ao usuario e obter confirmacao antes do envio quando o
contrato nao autorizar envio automatico daquele tipo.

### 4. Enviar e dar recibo

Enviar ao documento ou endpoint de borda definido no contrato. Retornar recibo
com ID, destino e estado. Uma resposta rapida pode confirmar recebimento, mas nao
aprovar Proposta, abrir Tensao ou assumir prazo de entrega.

### 5. Receber retorno

Apresentar somente o retorno destinado a pessoa. Nao revelar objetos, Postos,
assinaturas, dados ou discussoes fora de sua permissao. Evidencias devem manter
link ou arquivo verificavel sem ampliar o acesso original.

### 6. Encerrar ou revogar

Ao desconectar:

- revogar tokens e sessoes conforme o provedor;
- parar automacoes;
- preservar somente recibos e atos formais previstos;
- nao conservar cache de conversas ou arquivos pessoais.

## Saida

Em configuracao, emitir o contrato `bigbrain.edge-connection.v0`. Para cada ato,
emitir `bigbrain.edge-intake.v0`. Use os esquemas e bloqueios do protocolo.

Nao apresentar a conexao como incorporacao de Avatar, acesso ao pre-cognitivo ou
delegacao de autoridade.
