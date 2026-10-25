// Utilidades compartilhadas por todas as páginas.
// Tudo fica dentro do objeto global Museu (o tema.js já pode tê-lo criado).
// Deve ser carregado antes de cards.js e poema-pagina.js.
(function () {
  const Museu = (window.Museu = window.Museu || {});

  // Cria um elemento com classe e texto opcionais
  Museu.criar = function (tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  };

  // Armazenamento com proteção: se o navegador bloquear, o site segue funcionando
  Museu.ler = function (chave) {
    try {
      return localStorage.getItem(chave);
    } catch (erro) {
      return null;
    }
  };

  Museu.gravar = function (chave, valor) {
    try {
      localStorage.setItem(chave, valor);
      return true;
    } catch (erro) {
      return false;
    }
  };

  // Remove acentos e maiúsculas, para a busca ignorar essas diferenças
  Museu.normalizar = function (texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  Museu.urlPoema = function (id) {
    return 'poema.html?id=' + encodeURIComponent(id);
  };

  // ---------- Poemas lidos (ficam só neste navegador) ----------
  const CHAVE_LIDOS = 'museu-lidos';

  Museu.lidos = function () {
    try {
      const lista = JSON.parse(Museu.ler(CHAVE_LIDOS) || '[]');
      return Array.isArray(lista) ? lista : [];
    } catch (erro) {
      return [];
    }
  };

  Museu.marcarLido = function (id, lido) {
    const lista = Museu.lidos().filter((item) => item !== id);
    if (lido) lista.push(id);
    return Museu.gravar(CHAVE_LIDOS, JSON.stringify(lista));
  };

  // Mostra ou esconde o selo "Lido" dos cards que estão dentro de "raiz"
  Museu.atualizarLidos = function (raiz) {
    const lidos = Museu.lidos();
    raiz.querySelectorAll('.card[data-id]').forEach((card) => {
      const selo = card.querySelector('.selo-lido');
      if (selo) selo.hidden = !lidos.includes(card.dataset.id);
    });
  };

  // ---------- Card de poema ----------
  // Monta o mesmo card em qualquer página, a partir de um item de POEMAS
  Museu.criarCard = function (poema) {
    const card = Museu.criar('li', 'card');
    card.dataset.id = poema.id;
    card.dataset.genero = poema.genero;
    card.dataset.busca = Museu.normalizar([poema.titulo, poema.autor, poema.resumo].join(' '));

    const titulo = Museu.criar('h3');
    const link = Museu.criar('a', '', poema.titulo);
    link.href = Museu.urlPoema(poema.id);
    titulo.append(link);

    card.append(titulo, Museu.criar('p', 'autor', poema.autor), Museu.criar('p', '', poema.resumo));

    if (poema.dominioPublico === false) {
      card.append(Museu.criar('span', 'status', 'Obra protegida · leitura externa'));
    } else if (poema.formato === 'prosa') {
      card.append(Museu.criar('span', 'status', 'Prosa de ritmo poético'));
    }

    const rodape = Museu.criar('div', 'card-rodape');
    const acao = Museu.criar('span', 'card-acao', poema.externo ? 'Ler na fonte →' : 'Ler poema →');
    acao.setAttribute('aria-hidden', 'true');
    const selo = Museu.criar('span', 'selo-lido', '✓ Lido');
    selo.hidden = !Museu.lidos().includes(poema.id);
    rodape.append(acao, selo);
    card.append(rodape);

    return card;
  };
})();