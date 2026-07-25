# Big Brain

Big Brain e uma organizacao experimental que usa linguagem, agentes e software
para observar, decidir e aprimorar o proprio sistema. Nao existem projetos
externos a ela neste repertorio: cada repositorio e um objeto vigente, legado
ou abandonado dentro da mesma historia.

Este repositorio e o nucleo publico vigente do experimento. Ele concentra o
prototipo do ciclo fundamental e funciona como porta de entrada para os
artefatos versionaveis da Big Brain.

## Mapa do sistema

```text
Big Brain (organizacao e origem poetica)
  -> Framework do Colapso (framework metacognitivo)
       -> SACF (nome tecnico do framework)
            -> Ancora (motor, protocolo e jogo operacional)
                 -> Big Brain OS e Mao Ancora (interfaces)
                 -> Avatares, Postos, Objetos e Cartas (operacao)
```

- **Big Brain** e tanto a metafora poetica de origem quanto a organizacao que
  engloba o experimento.
- **Framework do Colapso** e o nome do framework metacognitivo. **SACF** e seu
  nome tecnico.
- **Ancora** e o motor operacional que transforma tensoes em decisoes,
  movimentos e rastros.
- **Big Brain OS** organiza o ambiente operacional e conecta capacidades.
- **Mao Ancora** e a interface humana para receber e deliberar sobre jogadas.

As definicoes completas estao em [docs/terminologia.md](docs/terminologia.md).

## Repertorio

O inventario oficial dos repositorios esta em
[REPERTORIO.md](REPERTORIO.md). A versao estruturada, preparada para leitura por
ferramentas, esta em
[catalogos/repertorio-big-brain.json](catalogos/repertorio-big-brain.json).

As classificacoes nao apagam historia:

- **Vigente:** representa uma frente ativa e pode receber evolucao.
- **Legado:** permanece como evidencia, origem ou componente anterior, mas nao
  governa a arquitetura atual.
- **Abandonado:** nao possui mandato ativo; e preservado ate uma decisao
  explicita de arquivamento.

## Skill de Avatar

A skill [vestir-avatar](skills/vestir-avatar/SKILL.md) permite que Codex,
Claude ou outra inteligencia externa assuma temporariamente um Avatar canonico
do Jogo Ancora. A identidade continua no Notion; a skill apenas define o
protocolo portatil de incorporacao.

No macOS, depois de obter este repositorio:

```bash
mkdir -p ~/.codex/skills
cp -R skills/vestir-avatar ~/.codex/skills/
```

Reinicie o Codex e invoque explicitamente `$vestir-avatar` com o nome do
Avatar. A V0 falha de forma fechada se identidade, Aparato, Posto ou
autorizacao nao estiverem documentados.

## Fontes de verdade

- **Notion:** documentacao semantica, identidades, Aparatos, Postos e objetos.
- **GitHub:** codigo, skills, catalogos e demais artefatos versionaveis.
- **Historico:** divergencias nao sao apagadas; tornam-se legado, tensao,
  ambivalencia ou duvida conforme o caso.

## Estado

O sistema esta em amadurecimento. A fundacao conceitual e o prototipo publico
existem, mas o primeiro ciclo canonico completo entre Avatar, proposta,
decisao humana, feedback e reescrita do Aparato ainda precisa ser validado de
ponta a ponta.
