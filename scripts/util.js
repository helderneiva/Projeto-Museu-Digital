// Utilidades compartilhadas por cards.js e poema-pagina.js.
// Módulo ES: cada função é exportada e importada pelo nome, sem variáveis globais.
//   import { criar, criarCard } from './util.js';

// Cria um elemento com classe e texto opcionais
export function criar(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}

// Armazenamento com proteção: se o navegador bloquear, o site segue funcionando
export function ler(chave) {
  try {
    return localStorage.getItem(chave);
  } catch (erro) {
    return null;
  }
}

export function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, valor);
    return true;
  } catch (erro) {
    return false;
  }
}

// Remove acentos e maiúsculas, para a busca ignorar essas diferenças
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function urlPoema(id) {
  return 'poema.html?id=' + encodeURIComponent(id);
}

// ---------- Poemas lidos (ficam só neste navegador) ----------
const CHAVE_LIDOS = 'museu-lidos';

export function lidos() {
  try {
    const lista = JSON.parse(ler(CHAVE_LIDOS) || '[]');
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    return [];
  }
}

export function marcarLido(id, lido) {
  const lista = lidos().filter((item) => item !== id);
  if (lido) lista.push(id);
  return gravar(CHAVE_LIDOS, JSON.stringify(lista));
}

// Mostra ou esconde o selo "Lido" dos cards que estão dentro de "raiz"
export function atualizarLidos(raiz) {
  const jaLidos = lidos();
  raiz.querySelectorAll('.card[data-id]').forEach((card) => {
    const selo = card.querySelector('.selo-lido');
    if (selo) selo.hidden = !jaLidos.includes(card.dataset.id);
  });
}

// ---------- Card de poema ----------
// Monta o mesmo card em qualquer página, a partir de um item de POEMAS
export function criarCard(poema) {
  const card = criar('li', 'card');
  card.dataset.id = poema.id;
  card.dataset.genero = poema.genero;
  card.dataset.busca = normalizar([poema.titulo, poema.autor, poema.resumo].join(' '));

  const titulo = criar('h3');
  const link = criar('a', '', poema.titulo);
  link.href = urlPoema(poema.id);
  titulo.append(link);

  card.append(titulo, criar('p', 'autor', poema.autor), criar('p', '', poema.resumo));

  if (poema.dominioPublico === false) {
    card.append(criar('span', 'status', 'Obra protegida · leitura externa'));
  } else if (poema.formato === 'prosa') {
    card.append(criar('span', 'status', 'Prosa de ritmo poético'));
  }

  const rodape = criar('div', 'card-rodape');
  const acao = criar('span', 'card-acao', poema.externo ? 'Ler na fonte →' : 'Ler poema →');
  acao.setAttribute('aria-hidden', 'true');
  const selo = criar('span', 'selo-lido', '✓ Lido');
  selo.hidden = !lidos().includes(poema.id);
  rodape.append(acao, selo);
  card.append(rodape);

  return card;
}