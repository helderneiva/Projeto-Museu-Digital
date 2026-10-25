// Tema claro/escuro.
// - Lembra a escolha da pessoa (localStorage); sem escolha, segue o tema do sistema.
// - Fica no <head> para aplicar o tema antes da página aparecer (evita "piscar").
// - Cria o botão de tema ao lado do título do cabeçalho.
const CHAVE_TEMA = 'tema-museu';
const COR_NAVEGADOR_CLARO = '#4A2E16'; // mesma cor do <meta name="theme-color"> das páginas
const raiz = document.documentElement;
const consultaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

function lerEscolha() {
  try {
    return localStorage.getItem(CHAVE_TEMA);
  } catch (erro) {
    return null;
  }
}

function estaEscuro() {
  return raiz.getAttribute('data-tema') === 'escuro';
}

// No escuro, a barra do navegador no celular usa o fundo da paleta da página
function sincronizarCorDoNavegador() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta || !document.body) return;
  const fundo = getComputedStyle(document.body).getPropertyValue('--fundo-principal').trim();
  meta.setAttribute('content', estaEscuro() && fundo ? fundo : COR_NAVEGADOR_CLARO);
}

function aplicarTema(escuro) {
  raiz.setAttribute('data-tema', escuro ? 'escuro' : 'claro');
  sincronizarCorDoNavegador();
}

const escolha = lerEscolha();
aplicarTema(escolha ? escolha === 'escuro' : consultaEscuro.matches);

document.addEventListener('DOMContentLoaded', () => {
  const titulo = document.querySelector('header h1');
  if (!titulo) return;

  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'tema-toggle';
  botao.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
    '<span class="tema-toggle-texto">Tema escuro</span>';

  const atualizarBotao = () => {
    botao.setAttribute('aria-pressed', String(estaEscuro()));
    sincronizarCorDoNavegador();
  };

  botao.addEventListener('click', () => {
    const escuro = !estaEscuro();
    aplicarTema(escuro);
    atualizarBotao();
    try {
      localStorage.setItem(CHAVE_TEMA, escuro ? 'escuro' : 'claro');
    } catch (erro) {
      // sem armazenamento: a escolha vale só nesta visita
    }
  });

  // Sem escolha salva, acompanha mudanças do tema do sistema
  consultaEscuro.addEventListener('change', (evento) => {
    if (!lerEscolha()) {
      aplicarTema(evento.matches);
      atualizarBotao();
    }
  });

  titulo.after(botao);
  atualizarBotao();
});