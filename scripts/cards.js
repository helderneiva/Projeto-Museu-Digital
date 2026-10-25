// Páginas de gênero e home: monta os cards a partir de dados/poemas.js.
// - Gêneros: preenche cada <ul class="lista-cards" data-sub="...">, liga a busca
//   (Enter leva aos resultados), mostra o progresso de leitura e o botão "Surpreenda-me".
// - Home: poema do dia, números do museu e botão de poema aleatório.
// - Todas: ao navegar com Tab, o card em foco sobe para o alto da tela.
// Módulo ES: importa o que usa de util.js e de dados/poemas.js.
import { criar, criarCard, normalizar, atualizarLidos, lidos, urlPoema } from './util.js';
import { POEMAS } from '../dados/poemas.js';

const genero = document.body.dataset.genero;

function sortear(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function montarListas() {
  document.querySelectorAll('.lista-cards[data-sub]').forEach((lista) => {
    POEMAS.filter((p) => p.genero === genero && p.sub === lista.dataset.sub).forEach((p) => {
      lista.append(criarCard(p));
    });
  });
}

// Número de poemas ao lado do nome de cada subgênero, nos chips do índice
function montarContagens() {
  document.querySelectorAll('.indice-subgeneros a[href^="#"]').forEach((chip) => {
    const sub = chip.getAttribute('href').slice(1);
    const total = POEMAS.filter((p) => p.genero === genero && p.sub === sub).length;
    if (total === 0) return;
    const contagem = criar('span', 'contagem', String(total));
    contagem.setAttribute('aria-hidden', 'true');
    chip.append(contagem);
  });
}

// Enquanto vale, o foco de um card não o leva para o alto da tela (usado pela busca)
let ignorarFoco = false;

function montarBusca() {
  const bloco = document.getElementById('busca');
  const campo = document.getElementById('busca-campo');
  const status = document.getElementById('busca-status');
  if (!bloco || !campo || !status) return;

  bloco.hidden = false;
  const cards = [...document.querySelectorAll('.lista-cards .card')];
  const secoes = [...document.querySelectorAll('.secao-subgenero')];
  const chips = [...document.querySelectorAll('.indice-subgeneros a[href^="#"]')];

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

    // esconde os chips das seções vazias e os textos explicativos enquanto busca
    chips.forEach((chip) => {
      const secao = document.getElementById(chip.getAttribute('href').slice(1));
      chip.parentElement.hidden = Boolean(secao && secao.hidden);
    });
    document.documentElement.classList.toggle('buscando', Boolean(termo));

    if (!termo) {
      status.textContent = '';
    } else if (total === 0) {
      status.textContent = 'Nenhum poema encontrado.';
    } else {
      status.textContent =
        total + (total === 1 ? ' poema encontrado' : ' poemas encontrados') +
        '. Aperte Enter para ver.';
    }
  });

  // Enter leva à primeira seção com resultados (o título dela fica visível)
  // e coloca o foco no primeiro card encontrado
  campo.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Enter') return;
    evento.preventDefault();
    if (!campo.value.trim()) return;
    const primeiro = cards.find((card) => !card.hidden);
    if (!primeiro) return;
    primeiro.closest('.secao-subgenero').scrollIntoView({ block: 'start' });
    ignorarFoco = true;
    primeiro.querySelector('a').focus({ preventScroll: true });
    ignorarFoco = false;
  });
}

// Faixa abaixo da introdução: progresso de leitura do gênero e poema surpresa
let atualizarProgresso = () => {};

function montarAcoesGenero() {
  const intro = document.querySelector('.introducao');
  const primeira = document.querySelector('.secao-subgenero');
  const doGenero = POEMAS.filter((p) => p.genero === genero);
  if (!intro || !primeira || doGenero.length === 0) return;

  const texto = criar('p', 'progresso-texto');
  texto.id = 'progresso-texto';
  const barra = criar('progress');
  barra.max = doGenero.length;
  barra.setAttribute('aria-labelledby', 'progresso-texto');
  const progresso = criar('div', 'progresso');
  progresso.append(texto, barra);

  const ver = criar('a', 'botao', 'Ver os poemas');
  ver.href = '#' + primeira.id;
  const surpresa = criar('button', 'botao botao-secundario', 'Surpreenda-me');
  surpresa.type = 'button';
  surpresa.addEventListener('click', () => {
    window.location.href = urlPoema(sortear(doGenero).id);
  });
  const botoes = criar('div', 'acoes-botoes');
  botoes.append(ver, surpresa);

  const faixa = criar('div', 'acoes-genero');
  faixa.append(progresso, botoes);
  intro.after(faixa);

  atualizarProgresso = () => {
    const jaLidos = lidos();
    const lidosDoGenero = doGenero.filter((p) => jaLidos.includes(p.id)).length;
    barra.value = lidosDoGenero;
    texto.textContent =
      lidosDoGenero === 0
        ? 'Você ainda não leu nenhum poema deste gênero.'
        : 'Você leu ' + lidosDoGenero + ' de ' + doGenero.length + ' poemas deste gênero.';
  };
  atualizarProgresso();
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

// Home: números do museu, calculados a partir dos dados
function montarEstatisticas() {
  const lista = document.getElementById('estatisticas');
  if (!lista) return;
  const autores = new Set(POEMAS.map((p) => p.autor.split(' (')[0]));
  const subgeneros = new Set(POEMAS.map((p) => p.genero + '/' + p.sub));
  const generos = new Set(POEMAS.map((p) => p.genero));
  [
    [POEMAS.length, 'poemas'],
    [autores.size, 'autores'],
    [generos.size, 'gêneros'],
    [subgeneros.size, 'subgêneros'],
  ].forEach(([numero, rotulo]) => {
    const item = criar('li');
    item.append(criar('strong', '', String(numero)), document.createTextNode(rotulo));
    lista.append(item);
  });
  lista.hidden = false;
}

// Home: botão de poema aleatório
function montarAleatorio() {
  const botao = document.getElementById('poema-aleatorio');
  if (!botao) return;
  botao.hidden = false;
  botao.addEventListener('click', () => {
    window.location.href = urlPoema(sortear(POEMAS).id);
  });
}

// Com Tab, o card em foco sobe para o alto da tela, com folga no topo (scroll-margin).
// O requestAnimationFrame espera a rolagem automática do navegador terminar.
function levarCardParaOTopo() {
  document.addEventListener('focusin', (evento) => {
    if (ignorarFoco) return;
    const alvo = evento.target;
    const card = alvo.closest && alvo.closest('.card');
    if (!card || !alvo.matches(':focus-visible')) return;
    requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
  });
}

if (genero) {
  montarListas();
  montarContagens();
  montarBusca();
  montarAcoesGenero();
}
montarPoemaDoDia();
montarEstatisticas();
montarAleatorio();
levarCardParaOTopo();

// Ao voltar pelo botão "voltar" do navegador, atualiza os selos "Lido" e o progresso
window.addEventListener('pageshow', (evento) => {
  if (evento.persisted) {
    atualizarLidos(document);
    atualizarProgresso();
  }
});