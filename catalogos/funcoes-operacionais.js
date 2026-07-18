export const funcoesOperacionais = {
  definir_mandato: {
    etiqueta: "definir_mandato",
    variaveis: ["titular", "cargo", "organizacao"],
    componente: "registro_local",
    projecoes: [
      {
        tipo: "MANDATO_DEFINIDO",
        nome: "APRESENTAR_FAIXA_DE_MANDATO"
      }
    ]
  },
  registrar_declaracao: {
    etiqueta: "registrar_declaracao",
    variaveis: ["titular", "cargo", "organizacao"],
    componente: "registro_local",
    continuaCom: ["concluir_declaracao"],
    projecoes: [
      {
        tipo: "DECLARACAO_REGISTRADA",
        nome: "REGISTRAR_DECLARACAO"
      }
    ]
  },
  concluir_declaracao: {
    etiqueta: "concluir_declaracao",
    variaveis: ["titular", "cargo", "organizacao"],
    componente: "registro_local",
    projecoes: [
      {
        tipo: "CICLO_CONCLUIDO",
        nome: "MARCAR_DECLARACAO_CONCLUIDA"
      }
    ]
  }
};
