// Tema claro/escuro.
// - Lembra a escolha da pessoa (localStorage); sem escolha, segue o tema do sistema.
// - Fica no <head> como script comum (NÃO é módulo), para aplicar o tema antes da
//   página aparecer (evita "piscar"). Módulos só rodam depois que a página carrega.
// - Cria o botão de tema como último item do menu de navegação (sol e "Tema claro" no
//   tema claro; lua e "Tema escuro" no tema escuro).
// - Expõe window.Museu.sincronizarCor(), usada pelo poema-pagina.js depois de
//   mudar o gênero da página (poema.html).
(function () {
  const CHAVE_TEMA = 'tema-museu';
  const COR_NAVEGADOR_CLARO = '#4A2E16'; // mesma cor do <meta name="theme-color"> das páginas
  const raiz = document.documentElement;
  const consultaEscuro = window.matchMedia('(prefers-color-scheme: dark)');
  const Museu = (window.Museu = window.Museu || {});
  const ICONE_LUA = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  const ICONE_SOL =
    '<circle cx="12" cy="12" r="4.5"/>' +
    '<path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

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

  // Outros scripts chamam isto depois de mudar o gênero da página (poema.html)
  Museu.sincronizarCor = sincronizarCorDoNavegador;

  function aplicarTema(escuro) {
    raiz.setAttribute('data-tema', escuro ? 'escuro' : 'claro');
    sincronizarCorDoNavegador();
  }

  const escolha = lerEscolha();
  aplicarTema(escolha ? escolha === 'escuro' : consultaEscuro.matches);

  document.addEventListener('DOMContentLoaded', () => {
    const lista = document.querySelector('.menu ul');
    if (!lista) return;

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'tema-toggle';
    botao.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"></svg>' +
      '<span class="tema-toggle-texto">Tema escuro</span>';
    const icone = botao.querySelector('svg');
    const texto = botao.querySelector('.tema-toggle-texto');

    // O botão mostra o tema atual: sol e "Tema claro", ou lua e "Tema escuro".
    // O rótulo para leitores de tela (que contém o texto visível) diz também o que o clique faz.
    const atualizarBotao = () => {
      const escuro = estaEscuro();
      icone.innerHTML = escuro ? ICONE_LUA : ICONE_SOL;
      texto.textContent = escuro ? 'Tema escuro' : 'Tema claro';
      botao.setAttribute(
        'aria-label',
        escuro ? 'Tema escuro ativo. Mudar para o tema claro.' : 'Tema claro ativo. Mudar para o tema escuro.'
      );
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

    const item = document.createElement('li');
    item.append(botao);
    lista.append(item);
    atualizarBotao();
  });
})();