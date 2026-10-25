// Monta a página do poema a partir do link poema.html?id=...
// Os dados ficam em dados/poemas.js (lista POEMAS).
const NOMES = { lirico: 'Lírico', satirico: 'Satírico', cordel: 'Cordel' };
const TITULOS = {
  lirico: 'O Lirismo Brasileiro',
  satirico: 'A Arte da Sátira',
  cordel: 'O Brasil em Cordel'
};

const area = document.getElementById('poema');

function criar(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}

function mostrarNaoEncontrado() {
  document.title = 'Poema não encontrado | Museu da Poesia Digital';
  const aviso = criar('p', '', 'Não encontramos esse poema. ');
  const voltar = criar('a', '', 'Voltar para o início');
  voltar.href = 'index.html';
  aviso.append(voltar);
  area.replaceChildren(criar('h2', 'poema-titulo', 'Poema não encontrado'), aviso);
}

function montarLeitura(poema) {
  if (poema.externo) {
    const link = criar('a', 'botao-leitura', poema.rotulo || 'Ler a obra');
    link.href = poema.externo;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(criar('span', 'visually-hidden', ' (abre em nova aba)'));
    const paragrafo = criar('p');
    paragrafo.append(link);
    const aviso = poema.dominioPublico
      ? 'O texto desta obra está em domínio público. Leia na fonte indicada:'
      : 'Esta obra não está em domínio público. Leia o poema na fonte indicada:';
    const partes = [criar('p', 'poema-nota', aviso), paragrafo];
    if (poema.resumo) partes.unshift(criar('p', 'poema-resumo', poema.resumo));
    return partes;
  }

  const versos = criar('div', poema.figurado ? 'versos versos-figura' : 'versos');
  poema.versos.forEach((estrofe) => versos.append(criar('p', '', estrofe)));
  return [versos, criar('p', 'poema-fonte', 'Fonte: ' + poema.fonte)];
}

function montarMaisPoemas(poema) {
  const outros = POEMAS.filter(
    (p) => p.genero === poema.genero && p.sub === poema.sub && p.id !== poema.id
  );
  if (outros.length === 0) return;

  const bloco = document.getElementById('mais-poemas');
  document.getElementById('mais-poemas-titulo').textContent = 'Continue lendo: ' + poema.subnome;
  const lista = bloco.querySelector('ul');
  outros.forEach((outro) => {
    const item = criar('li');
    const link = criar('a', '', outro.titulo);
    link.href = 'poema.html?id=' + encodeURIComponent(outro.id);
    item.append(link);
    lista.append(item);
  });
  bloco.hidden = false;
}

const id = new URLSearchParams(window.location.search).get('id');
const poema = typeof POEMAS === 'undefined' ? null : POEMAS.find((p) => p.id === id);

if (!area) {
  // página sem o <article id="poema">: nada a fazer
} else if (!poema) {
  mostrarNaoEncontrado();
} else {
  document.title = poema.titulo + ' | Museu da Poesia Digital';
  const descricao = document.querySelector('meta[name="description"]');
  if (descricao) {
    descricao.setAttribute('content', poema.titulo + ', de ' + poema.autor.split(' (')[0] + '. Leia no Museu da Poesia Digital.');
  }

  document.querySelector('header h1').textContent = TITULOS[poema.genero];

  // Marca o gênero no menu: o CSS usa isso para escolher a paleta da página
  const itemMenu = document.querySelector('.menu a[href="' + poema.genero + '.html"]');
  if (itemMenu) itemMenu.setAttribute('aria-current', 'page');

  const voltar = document.getElementById('voltar');
  voltar.href = poema.genero + '.html#' + poema.sub;
  voltar.textContent = '\u2190 Voltar para ' + poema.subnome;

  area.replaceChildren(
    criar('h2', 'poema-titulo', poema.titulo),
    criar('p', 'poema-autor', poema.autor),
    criar('p', 'poema-tag', NOMES[poema.genero] + ' \u00b7 ' + poema.subnome),
    ...montarLeitura(poema)
  );

  montarMaisPoemas(poema);
}