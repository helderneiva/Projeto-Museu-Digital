// Destaca, na barra de subgêneros, a seção que está na tela (IntersectionObserver).
(function () {
  const links = [...document.querySelectorAll('.indice-subgeneros a[href^="#"]')];
  if (links.length === 0 || !('IntersectionObserver' in window)) return;

  const porId = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((link) => link.removeAttribute('aria-current'));
        const ativo = porId.get(entrada.target.id);
        if (ativo) ativo.setAttribute('aria-current', 'location');
      });
    },
    // considera "atual" a seção que cruza a faixa superior da tela
    { rootMargin: '-20% 0px -70% 0px' }
  );

  porId.forEach((link, id) => {
    const secao = document.getElementById(id);
    if (secao) observador.observe(secao);
  });
})();