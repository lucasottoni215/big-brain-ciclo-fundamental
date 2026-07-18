const CATALOGOS = {
  integridade:
    "https://lucasottoni215.github.io/big-brain-ciclo-fundamental/state/figjam-referencias.json",
  maturidade:
    "https://lucasottoni215.github.io/big-brain-ciclo-fundamental/state/figjam-notion-referencias.json"
};

const CHAVE_ESTILO_ORIGINAL = "bb-reference-original-style-v2";
const CHAVE_REFERENCIA_ATIVA = "bb-reference-active-ref-v2";

const PALETA = {
  "#FFFFFF": { stroke: "#B3B3B3", text: "#1E1E1E" },
  "#874FFF": { stroke: "#5427B4", text: "#FFFFFF" },
  "#3DADFF": { stroke: "#007AD2", text: "#FFFFFF" },
  "#FFC943": { stroke: "#E8A302", text: "#1E1E1E" },
  "#5AD8CC": { stroke: "#369E94", text: "#FFFFFF" },
  "#66D575": { stroke: "#3E9B4B", text: "#FFFFFF" }
};

function normalizarHex(hex) {
  return String(hex || "").trim().toUpperCase();
}

function corHexParaFigma(hex) {
  const valor = normalizarHex(hex).replace("#", "");
  return {
    r: parseInt(valor.slice(0, 2), 16) / 255,
    g: parseInt(valor.slice(2, 4), 16) / 255,
    b: parseInt(valor.slice(4, 6), 16) / 255
  };
}

function pintura(hex) {
  return [{ type: "SOLID", color: corHexParaFigma(hex) }];
}

function salvarEstiloOriginal(no) {
  if (no.getPluginData(CHAVE_ESTILO_ORIGINAL)) return;

  const estilo = { fills: no.fills };
  if ("strokes" in no) estilo.strokes = no.strokes;
  if ("text" in no && no.text) estilo.textFills = no.text.fills;
  no.setPluginData(CHAVE_ESTILO_ORIGINAL, JSON.stringify(estilo));
}

async function carregarFonteDoTexto(no) {
  if (!("text" in no) || !no.text) return;
  const fonte = no.text.fontName;
  if (fonte && fonte !== figma.mixed) await figma.loadFontAsync(fonte);
}

async function aplicarCor(no, hex) {
  const cor = normalizarHex(hex);
  const coordenadas = PALETA[cor] || { stroke: cor, text: "#1E1E1E" };

  salvarEstiloOriginal(no);
  await carregarFonteDoTexto(no);
  no.fills = pintura(cor);
  if ("strokes" in no) no.strokes = pintura(coordenadas.stroke);
  if ("text" in no && no.text) no.text.fills = pintura(coordenadas.text);
}

async function restaurarEstiloOriginal(no) {
  const original = no.getPluginData(CHAVE_ESTILO_ORIGINAL);
  if (!original) return false;

  const estilo = JSON.parse(original);
  await carregarFonteDoTexto(no);
  no.fills = estilo.fills;
  if ("strokes" in no && estilo.strokes) no.strokes = estilo.strokes;
  if ("text" in no && no.text && estilo.textFills) no.text.fills = estilo.textFills;
  no.setPluginData(CHAVE_ESTILO_ORIGINAL, "");
  no.setPluginData(CHAVE_REFERENCIA_ATIVA, "");
  return true;
}

async function carregarJson(url) {
  const resposta = await fetch(`${url}?at=${Date.now()}`);
  if (!resposta.ok) throw new Error(`Catalogo indisponivel: ${resposta.status}`);
  return resposta.json();
}

async function carregarReferenciasAtivas() {
  const [integridade, maturidade] = await Promise.all([
    carregarJson(CATALOGOS.integridade),
    carregarJson(CATALOGOS.maturidade)
  ]);
  const ativas = new Map();

  for (const [refId, referencia] of Object.entries(integridade.referencias || {})) {
    const nota = referencia.figjam?.nota;
    const verificada =
      referencia.status === "verificada" &&
      referencia.integridade === "verificada" &&
      Boolean(referencia.cor);
    if (nota && verificada) ativas.set(nota, { refId, cor: referencia.cor });
  }

  for (const [refId, referencia] of Object.entries(maturidade.referencias || {})) {
    const nota = referencia.figjam?.nota;
    const referenciada = referencia.status === "referenciada";
    const cor = referencia.maturidade?.cor;
    if (nota && referenciada && cor) ativas.set(nota, { refId, cor });
  }

  return ativas;
}

async function sincronizar() {
  const ativas = await carregarReferenciasAtivas();
  const resultado = { iluminadas: 0, restauradas: 0, ausentes: 0 };
  const gerenciadas = figma.currentPage.findAll((no) =>
    Boolean(no.getPluginData(CHAVE_REFERENCIA_ATIVA))
  );

  for (const no of gerenciadas) {
    if (!ativas.has(no.id) && (await restaurarEstiloOriginal(no))) {
      resultado.restauradas += 1;
    }
  }

  for (const [nota, referencia] of ativas.entries()) {
    const no = await figma.getNodeByIdAsync(nota);
    if (!no) {
      resultado.ausentes += 1;
      continue;
    }
    if (!("fills" in no)) continue;

    await aplicarCor(no, referencia.cor);
    no.setPluginData(CHAVE_REFERENCIA_ATIVA, referencia.refId);
    resultado.iluminadas += 1;
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
