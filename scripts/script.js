// Menu de navegação para telas pequenas (botão "hambúrguer").
// Sem JavaScript, o menu continua visível e funcional (melhoria progressiva).
(function () {
  const menu = document.getElementById('menu-principal');
  if (!menu) return;

  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'menu-toggle';
  botao.setAttribute('aria-label', 'Menu');
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-controls', 'menu-principal');
  botao.innerHTML = '<span class="menu-toggle-icone" aria-hidden="true"></span>';

  menu.before(botao);

  const estaAberto = () => botao.getAttribute('aria-expanded') === 'true';

  const definirEstado = (aberto) => {
    botao.setAttribute('aria-expanded', String(aberto));
  };

  botao.addEventListener('click', () => {
    definirEstado(!estaAberto());
  });

  // Escape fecha o menu e devolve o foco ao botão
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAberto()) {
      definirEstado(false);
      botao.focus();
    }
  });

  // Clicar em um link fecha o menu (o botão de tema não fecha, para o leitor ver a troca)
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      definirEstado(false);
    }
  });
})();