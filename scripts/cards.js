// Páginas de gênero e home: monta os cards a partir de dados/poemas.js.
// - Gêneros: preenche cada <ul class="lista-cards" data-sub="..."> e liga a busca.
// - Home: mostra o "poema do dia".
// Módulo ES: importa o que usa de util.js e de dados/poemas.js.
import { criarCard, normalizar, atualizarLidos } from './util.js';
import { POEMAS } from '../dados/poemas.js';

const genero = document.body.dataset.genero;

function montarListas() {
  document.querySelectorAll('.lista-cards[data-sub]').forEach((lista) => {
    POEMAS.filter((p) => p.genero === genero && p.sub === lista.dataset.sub).forEach((p) => {
      lista.append(criarCard(p));
    });
  });
}

function montarBusca() {
  const bloco = document.getElementById('busca');
  const campo = document.getElementById('busca-campo');
  const status = document.getElementById('busca-status');
  if (!bloco || !campo || !status) return;

  bloco.hidden = false;
  const cards = [...document.querySelectorAll('.lista-cards .card')];
  const secoes = [...document.querySelectorAll('.secao-subgenero')];

  campo.addEventListener('input', () => {
    const termo = normalizar(campo.value.trim());
    let total = 0;

    cards.forEach((card) => {
      const visivel = !termo || card.dataset.busca.includes(termo);
      card.hidden = !visivel;
      if (visivel) total += 1;
    });

    // esconde as seções que ficaram sem nenhum card
    secoes.forEach((secao) => {
      secao.hidden = Boolean(termo) && !secao.querySelector('.card:not([hidden])');
    });

    if (!termo) {
      status.textContent = '';
    } else if (total === 0) {
      status.textContent = 'Nenhum poema encontrado.';
    } else {
      status.textContent = total + (total === 1 ? ' poema encontrado.' : ' poemas encontrados.');
    }
  });
}

// O mesmo poema aparece o dia todo e muda à meia-noite (horário do visitante)
function montarPoemaDoDia() {
  const bloco = document.getElementById('poema-do-dia');
  if (!bloco) return;
  const hoje = new Date();
  const dias = Math.floor(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) / 86400000);
  bloco.querySelector('.lista-cards').append(criarCard(POEMAS[dias % POEMAS.length]));
  bloco.hidden = false;
}

if (genero) {
  montarListas();
  montarBusca();
}
montarPoemaDoDia();

// Ao voltar pelo botão "voltar" do navegador, atualiza os selos "Lido"
window.addEventListener('pageshow', (evento) => {
  if (evento.persisted) atualizarLidos(document);
});