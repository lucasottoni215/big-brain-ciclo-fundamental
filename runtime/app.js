import { chamadas } from "../catalogos/chamadas.js";
import { funcoesOperacionais } from "../catalogos/funcoes-operacionais.js";
import { variaveisOperacionais } from "../catalogos/variaveis-operacionais.js";
import { criarRegistroLocal } from "../componentes/registro_local/index.js";
import { criarCopilador } from "./copilador.js";
import { contextoDaChamada } from "./contexto.js";
import { criarProjetor } from "./projetor.js";

const chamada = chamadas[0];
const projetor = criarProjetor();
const registros = [];
const copilador = criarCopilador({
  variaveis: variaveisOperacionais,
  funcoes: funcoesOperacionais,
  componentes: { registro_local: criarRegistroLocal() },
  registrar: (evento) => registros.push(evento)
});

const elementos = {
  ativar: document.querySelector("#activate-call"),
  contato: document.querySelector("#contact-state"),
  ciclo: document.querySelector("#cycle-id"),
  faixa: document.querySelector("#mandate-banner"),
  estado: document.querySelector("#projection-state"),
  vazio: document.querySelector("#empty-world"),
  mudanca: document.querySelector("#world-change"),
  chamada: document.querySelector("#step-call"),
  embalamento: document.querySelector("#step-envelope"),
  funcoes: document.querySelector("#step-function"),
  copilador: document.querySelector("#step-compiler"),
  componente: document.querySelector("#step-component"),
  registro: document.querySelector("#step-record"),
  fila: document.querySelector("#function-queue"),
  registros: document.querySelector("#external-records"),
  detalhe: document.querySelector("#trace-detail"),
  relatorio: document.querySelector("#report")
};

document.querySelector("#context-posto").textContent = contextoDaChamada.posto;
document.querySelector("#context-ambiente").textContent = contextoDaChamada.ambiente;
document.querySelector("#context-avatar").textContent = contextoDaChamada.avatar;
document.querySelector("#context-baralho").textContent = contextoDaChamada.baralho;
document.querySelector("#context-dicionario").textContent = contextoDaChamada.dicionario;

function esperar(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function marcar(elemento, texto) {
  elemento.dataset.state = "active";
  elemento.querySelector(".step-state").textContent = texto;
}

function renderizarFila(fila, atual, concluidas) {
  elementos.fila.innerHTML = fila.map((etiqueta) => {
    const estado = concluidas.includes(etiqueta) ? "concluida" : etiqueta === atual ? "em execucao" : "aguardando";
    return `<li data-state="${estado}">${etiqueta}<span>${estado}</span></li>`;
  }).join("");
}

function renderizarRegistros() {
  elementos.registros.innerHTML = registros.map(({ envelope, resultado }) =>
    `<li>${envelope.funcao}<span>${resultado.status}</span></li>`
  ).join("");
}

function apresentarProjecao(estado) {
  const mandato = estado.mandato;
  if (mandato) {
    elementos.faixa.classList.add("active");
    elementos.faixa.innerHTML = `<strong>${mandato.titular}</strong><span>${mandato.cargo} - ${mandato.organizacao}</span>`;
  }
  elementos.vazio.hidden = true;
  elementos.estado.textContent = estado.marcos.length
    ? `Estado descrito: ${estado.marcos.join(" -> ")}`
    : "Estado descrito: nenhum";
  elementos.mudanca.textContent = `Projecao aplicada: ${estado.ultimaProjecao}.`;
}

async function executarFuncao(etiqueta, fila, concluidas) {
  const funcao = funcoesOperacionais[etiqueta];
  marcar(elementos.funcoes, etiqueta);
  renderizarFila(fila, etiqueta, concluidas);
  elementos.detalhe.textContent = `Funcao em execucao: ${etiqueta}.`;

  const estado = projetor.aplicar(funcao.projecoes[0], chamada.variaveis);
  apresentarProjecao(estado);
  await esperar(400);

  marcar(elementos.copilador, "executando");
  const execucao = copilador.executar({
    chamadaId: chamada.id,
    etiquetaFuncao: etiqueta,
    valores: chamada.variaveis
  });
  if (!execucao.aprovado) {
    elementos.copilador.dataset.state = "error";
    elementos.copilador.querySelector(".step-state").textContent = "recusado";
    elementos.detalhe.textContent = execucao.motivo;
    return false;
  }

  await esperar(400);
  marcar(elementos.componente, execucao.evento.envelope.componente);
  elementos.detalhe.textContent = `Componente executado: ${execucao.evento.envelope.componente}.`;

  await esperar(400);
  marcar(elementos.registro, "registrado");
  renderizarRegistros();
  concluidas.push(etiqueta);

  if (execucao.continuaCom.length) {
    fila.push(...execucao.continuaCom);
    elementos.detalhe.textContent = `A funcao ${etiqueta} adicionou: ${execucao.continuaCom.join(", ")}.`;
  } else {
    elementos.detalhe.textContent = `Funcao ${etiqueta} concluida sem nova funcao.`;
  }
  renderizarFila(fila, null, concluidas);
  return true;
}

async function ativarChamada() {
  const fila = [...chamada.funcoes];
  const concluidas = [];

  elementos.ativar.disabled = true;
  elementos.contato.textContent = "chamada ativada";
  marcar(elementos.chamada, "ativada");
  marcar(elementos.embalamento, "embalado");
  elementos.detalhe.textContent = `Variaveis embaladas: ${Object.keys(chamada.variaveis).join(", ")}.`;
  renderizarFila(fila, null, concluidas);

  for (let indice = 0; indice < fila.length; indice += 1) {
    const concluida = await executarFuncao(fila[indice], fila, concluidas);
    if (!concluida) return;
  }

  renderizarFila(fila, null, concluidas);
  elementos.ciclo.textContent = "fila vazia; ciclo concluido";
  elementos.detalhe.textContent = "Nenhuma funcao restante. O registro externo preserva as execucoes.";
  elementos.relatorio.textContent = [
    `Chamada: ${chamada.titulo.toUpperCase()}`,
    `Funcoes iniciais: ${chamada.funcoes.join(", ")}`,
    `Funcoes executadas: ${concluidas.join(", ")}`,
    `Projecao final: ${projetor.estado().ultimaProjecao}`,
    `Registros externos: ${registros.length}`,
    "Fila final: vazia"
  ].join("\n");
}

elementos.ativar.addEventListener("click", ativarChamada);
