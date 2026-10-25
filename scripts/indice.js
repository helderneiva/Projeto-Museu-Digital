// Destaca, na barra de subgêneros, a seção que está na tela (IntersectionObserver).
// Módulo ES (não precisa importar nada).
const links = [...document.querySelectorAll('.indice-subgeneros a[href^="#"]')];

// No celular a barra rola na horizontal: mantém o chip ativo visível, sem rolar a página
function mostrarNaBarra(link) {
  const lista = link.closest('ul');
  if (!lista || lista.scrollWidth <= lista.clientWidth) return;
  const a = link.getBoundingClientRect();
  const l = lista.getBoundingClientRect();
  lista.scrollLeft += a.left - l.left - (l.width - a.width) / 2;
}

if (links.length > 0 && 'IntersectionObserver' in window) {
  const porId = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((link) => link.removeAttribute('aria-current'));
        const ativo = porId.get(entrada.target.id);
        if (ativo) {
          ativo.setAttribute('aria-current', 'location');
          mostrarNaBarra(ativo);
        }
      });
    },
    // considera "atual" a seção que cruza a faixa superior da tela
    { rootMargin: '-20% 0px -70% 0px' }
  );

  porId.forEach((link, id) => {
    const secao = document.getElementById(id);
    if (secao) observador.observe(secao);
  });
}