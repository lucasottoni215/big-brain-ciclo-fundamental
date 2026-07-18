const estadoInicial = Object.freeze({ mandato: null, ultimaProjecao: null, marcos: [] });

export function criarProjetor() {
  let estado = structuredClone(estadoInicial);

  return {
    aplicar(projecao, variaveis) {
      if (projecao.tipo === "MANDATO_DEFINIDO") {
        estado = {
          mandato: structuredClone(variaveis),
          ultimaProjecao: projecao.nome,
          marcos: [projecao.nome]
        };
      } else {
        estado = {
          ...estado,
          ultimaProjecao: projecao.nome,
          marcos: [...estado.marcos, projecao.nome]
        };
      }
      return structuredClone(estado);
    },
    estado() { return structuredClone(estado); }
  };
}
