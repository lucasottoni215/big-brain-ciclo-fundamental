export function criarCopilador({ variaveis, funcoes, componentes, registrar }) {
  function validarVariaveis(funcao, valores) {
    for (const etiqueta of funcao.variaveis) {
      const definicao = variaveis[etiqueta];
      if (!definicao) return `Variavel desconhecida: ${etiqueta}.`;
      if (definicao.obrigatoria && !String(valores[etiqueta] ?? "").trim()) {
        return `Variavel obrigatoria ausente: ${etiqueta}.`;
      }
    }
    return null;
  }

  return {
    executar({ chamadaId, etiquetaFuncao, valores }) {
      const funcao = funcoes[etiquetaFuncao];
      if (!funcao) return { aprovado: false, motivo: `Funcao desconhecida: ${etiquetaFuncao}.` };

      const erro = validarVariaveis(funcao, valores);
      if (erro) return { aprovado: false, motivo: erro };

      const componente = componentes[funcao.componente];
      if (!componente) return { aprovado: false, motivo: `Componente indisponivel: ${funcao.componente}.` };

      const envelope = Object.freeze({
        id: crypto.randomUUID(),
        chamada: chamadaId,
        funcao: funcao.etiqueta,
        variaveis: structuredClone(valores),
        componente: funcao.componente,
        momento: new Date().toISOString()
      });
      const resultado = componente.executar(envelope);
      const evento = Object.freeze({ envelope, resultado });
      registrar(evento);
      return {
        aprovado: true,
        evento,
        continuaCom: structuredClone(funcao.continuaCom ?? [])
      };
    }
  };
}
