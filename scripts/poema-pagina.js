// Monta a página do poema a partir do link poema.html?id=...
// Os dados ficam em dados/poemas.js (lista POEMAS).
// Módulo ES: importa o que usa de util.js e de dados/poemas.js.
import { criar, ler, gravar, lidos, marcarLido, urlPoema } from './util.js';
import { POEMAS } from '../dados/poemas.js';

const NOMES = { lirico: 'Lírico', satirico: 'Satírico', cordel: 'Cordel' };
const TAMANHOS = [1, 1.15, 1.3, 1.5, 1.7]; // tamanhos da letra dos versos (em)
const TAMANHO_PADRAO = 1; // posição do 1.15 na lista acima
const CHAVE_TAMANHO = 'museu-tamanho';

const area = document.getElementById('poema');

// Cria uma seta decorativa: leitores de tela não devem ler "seta para a esquerda"
function criarSeta(simbolo) {
  const seta = criar('span', '', simbolo);
  seta.setAttribute('aria-hidden', 'true');
  return seta;
}

function mostrarNaoEncontrado() {
  document.title = 'Poema não encontrado | Museu da Poesia Digital';
  const aviso = criar('p', '', 'Não encontramos esse poema. ');
  const voltar = criar('a', '', 'Voltar para o início');
  voltar.href = 'index.html';
  aviso.append(voltar);
  area.replaceChildren(criar('h1', 'poema-titulo', 'Poema não encontrado'), aviso);
}

function definirMeta(seletor, valor) {
  const meta = document.querySelector(seletor);
  if (meta) meta.setAttribute('content', valor);
}

// ---------- Leitura: versos no site ou botão para a fonte externa ----------
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
    if (poema.formato === 'prosa') {
      partes.unshift(criar('p', 'poema-nota', 'Esta é uma obra em prosa, de ritmo e linguagem poéticos.'));
    }
    if (poema.resumo) partes.unshift(criar('p', 'poema-resumo', poema.resumo));
    return partes;
  }

  const versos = criar('div', poema.figurado ? 'versos versos-figura' : 'versos');
  if (poema.versos.length > 1) versos.classList.add('numerado');
  poema.versos.forEach((estrofe) => versos.append(criar('p', '', estrofe)));
  return [versos, criar('p', 'poema-fonte', 'Fonte: ' + poema.fonte)];
}

// ---------- Ferramentas: tamanho da letra, compartilhar, marcar como lido ----------
function montarFerramentas(poema) {
  const barra = criar('div', 'ferramentas');
  barra.setAttribute('role', 'group');
  barra.setAttribute('aria-label', 'Ferramentas de leitura');
  const status = criar('p', 'ferramentas-status');
  status.setAttribute('role', 'status');

  // Tamanho da letra: só faz sentido quando o poema é exibido no site
  if (poema.versos) {
    const tamanhoSalvo = parseInt(ler(CHAVE_TAMANHO), 10);
    let posicao =
      tamanhoSalvo >= 0 && tamanhoSalvo < TAMANHOS.length ? tamanhoSalvo : TAMANHO_PADRAO;

    const menos = criar('button', '', 'A−');
    const mais = criar('button', '', 'A+');
    menos.type = 'button';
    mais.type = 'button';
    menos.setAttribute('aria-label', 'Diminuir a letra');
    mais.setAttribute('aria-label', 'Aumentar a letra');

    // "salvar" só é verdadeiro quando a pessoa clica: assim o tamanho padrão
    // não é gravado como se fosse uma escolha dela
    const aplicar = (salvar) => {
      document.documentElement.style.setProperty('--tamanho-versos', TAMANHOS[posicao] + 'em');
      menos.disabled = posicao === 0;
      mais.disabled = posicao === TAMANHOS.length - 1;
      if (salvar) gravar(CHAVE_TAMANHO, String(posicao));
    };

    menos.addEventListener('click', () => {
      posicao = Math.max(0, posicao - 1);
      aplicar(true);
    });
    mais.addEventListener('click', () => {
      posicao = Math.min(TAMANHOS.length - 1, posicao + 1);
      aplicar(true);
    });

    aplicar(false);
    barra.append(menos, mais);
  }

  const compartilhar = criar('button', '', 'Compartilhar');
  compartilhar.type = 'button';
  compartilhar.addEventListener('click', async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: poema.titulo, url: url });
      } else {
        await navigator.clipboard.writeText(url);
        status.textContent = 'Link copiado.';
      }
    } catch (erro) {
      if (erro && erro.name !== 'AbortError') status.textContent = 'Não foi possível copiar o link.';
    }
  });

  const botaoLido = criar('button', '', 'Marcar como lido');
  botaoLido.type = 'button';
  botaoLido.setAttribute('aria-pressed', String(lidos().includes(poema.id)));
  botaoLido.addEventListener('click', () => {
    const marcado = botaoLido.getAttribute('aria-pressed') !== 'true';
    botaoLido.setAttribute('aria-pressed', String(marcado));
    marcarLido(poema.id, marcado);
    status.textContent = marcado ? 'Poema marcado como lido.' : 'Marca de leitura removida.';
  });

  barra.append(compartilhar, botaoLido);
  return [barra, status];
}

// ---------- Anterior / próximo dentro do mesmo subgênero ----------
function montarAnteriorProximo(poema) {
  const nav = document.getElementById('anterior-proximo');
  if (!nav) return;
  const irmaos = POEMAS.filter((p) => p.genero === poema.genero && p.sub === poema.sub);
  const posicao = irmaos.findIndex((p) => p.id === poema.id);
  const anterior = irmaos[posicao - 1];
  const proximo = irmaos[posicao + 1];
  if (!anterior && !proximo) return;

  // "partes" é a lista de nós do rótulo pequeno (texto e seta decorativa)
  const montar = (alvo, rel, partes) => {
    const link = criar('a');
    link.href = urlPoema(alvo.id);
    link.rel = rel;
    const rotulo = criar('small');
    rotulo.append(...partes);
    link.append(rotulo, document.createTextNode(alvo.titulo));
    nav.append(link);
  };

  if (anterior) montar(anterior, 'prev', [criarSeta('←'), document.createTextNode(' Anterior')]);
  if (proximo) montar(proximo, 'next', [document.createTextNode('Próximo '), criarSeta('→')]);
  nav.hidden = false;
}

// ---------- Continue lendo ----------
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
    link.href = urlPoema(outro.id);
    item.append(link);
    lista.append(item);
  });
  bloco.hidden = false;
}

// ---------- Início ----------
if (area) {
  const id = new URLSearchParams(window.location.search).get('id');
  const poema = POEMAS.find((p) => p.id === id);

  if (!poema) {
    mostrarNaoEncontrado();
  } else {
    const autorCurto = poema.autor.split(' (')[0];
    document.title = poema.titulo + ' | Museu da Poesia Digital';
    const descricao = poema.titulo + ', de ' + autorCurto + '. Leia no Museu da Poesia Digital.';
    definirMeta('meta[name="description"]', descricao);
    definirMeta('meta[property="og:title"]', document.title);
    definirMeta('meta[property="og:description"]', descricao);

    // A paleta da página vem do gênero do poema (o tema.css lê este atributo)
    document.body.dataset.genero = poema.genero;
    // Função criada pelo tema.js (script comum no <head>)
    if (window.Museu && window.Museu.sincronizarCor) window.Museu.sincronizarCor();

    const voltar = document.getElementById('voltar');
    voltar.href = poema.genero + '.html#' + poema.sub;
    voltar.replaceChildren(criarSeta('←'), document.createTextNode(' Voltar para ' + poema.subnome));

    area.replaceChildren(
      criar('h1', 'poema-titulo', poema.titulo),
      criar('p', 'poema-autor', poema.autor),
      criar('p', 'poema-tag', NOMES[poema.genero] + ' · ' + poema.subnome),
      ...montarFerramentas(poema),
      ...montarLeitura(poema)
    );

    montarAnteriorProximo(poema);
    montarMaisPoemas(poema);
  }
}