export function criarRegistroLocal() {
  return {
    etiqueta: "registro_local",
    executar(envelope) {
      return {
        status: "registrado",
        registro: {
          id: envelope.id,
          funcao: envelope.funcao,
          momento: envelope.momento
        }
      };
    }
  };
}
