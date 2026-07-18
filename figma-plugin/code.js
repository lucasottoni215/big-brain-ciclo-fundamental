const CATALOGO_URL =
  "https://lucasottoni215.github.io/big-brain-ciclo-fundamental/state/figjam-referencias.json";
const CHAVE_COR_ORIGINAL = "figjam-reference-original-fill";

function corHexParaFigma(hex) {
  const valor = hex.replace("#", "");

  return {
    r: parseInt(valor.slice(0, 2), 16) / 255,
    g: parseInt(valor.slice(2, 4), 16) / 255,
    b: parseInt(valor.slice(4, 6), 16) / 255
  };
}

function salvarCorOriginal(no) {
  if (no.getPluginData(CHAVE_COR_ORIGINAL)) return;
  no.setPluginData(CHAVE_COR_ORIGINAL, JSON.stringify(no.fills));
}

function restaurarCorOriginal(no) {
  const corOriginal = no.getPluginData(CHAVE_COR_ORIGINAL);
  if (!corOriginal) return false;

  no.fills = JSON.parse(corOriginal);
  no.setPluginData(CHAVE_COR_ORIGINAL, "");
  return true;
}

async function carregarCatalogo() {
  const resposta = await fetch(`${CATALOGO_URL}?at=${Date.now()}`);
  if (!resposta.ok) throw new Error(`Catalogo indisponivel: ${resposta.status}`);
  return resposta.json();
}

async function sincronizar() {
  const catalogo = await carregarCatalogo();
  const resultado = { iluminadas: 0, restauradas: 0, ausentes: 0 };

  for (const referencia of Object.values(catalogo.referencias || {})) {
    const nota = referencia.figjam?.nota;
    if (!nota) continue;

    const no = await figma.getNodeByIdAsync(nota);
    if (!no) {
      resultado.ausentes += 1;
      continue;
    }
    if (!("fills" in no)) continue;

    const estaVerificada =
      referencia.status === "verificada" &&
      referencia.integridade === "verificada" &&
      Boolean(referencia.cor);

    if (estaVerificada) {
      salvarCorOriginal(no);
      no.fills = [{ type: "SOLID", color: corHexParaFigma(referencia.cor) }];
      resultado.iluminadas += 1;
      continue;
    }

    if (restaurarCorOriginal(no)) resultado.restauradas += 1;
  }

  return resultado;
}

sincronizar()
  .then((resultado) => {
    figma.closePlugin(
      `Referencias: ${resultado.iluminadas} iluminadas, ${resultado.restauradas} restauradas, ${resultado.ausentes} ausentes.`
    );
  })
  .catch((erro) => {
    figma.closePlugin(`Nao foi possivel sincronizar: ${erro.message}`);
  });
