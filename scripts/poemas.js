// Dados dos poemas. Para adicionar um poema, copie um bloco { ... } e edite os campos:
//   id        -> nome curto sem acentos nem espaços (usado no link: poema.html?id=...)
//   genero    -> "lirico", "satirico" ou "cordel"
//   sub       -> id da seção na página do gênero (ex.: "ode", "epigrama")
//   versos    -> lista de estrofes; use \n para quebrar linha dentro da estrofe
//   externo   -> (opcional) link de leitura para obras que NÃO estão em domínio público
//   figurado  -> (opcional) true para poemas em formato visual, centralizados
const POEMAS = [
  {
    "titulo": "Canção do Exílio",
    "autor": "Antônio Gonçalves Dias (1823–1864)",
    "genero": "lirico",
    "sub": "ode",
    "subnome": "Ode",
    "fonte": "Gonçalves Dias, Primeiros Cantos (1846). Texto em domínio público.",
    "versos": [
      "Minha terra tem palmeiras,\nOnde canta o Sabiá;\nAs aves, que aqui gorjeiam,\nNão gorjeiam como lá.",
      "Nosso céu tem mais estrelas,\nNossas várzeas têm mais flores,\nNossos bosques têm mais vida,\nNossa vida mais amores.",
      "Em cismar, sozinho, à noite,\nMais prazer encontro eu lá;\nMinha terra tem palmeiras,\nOnde canta o Sabiá.",
      "Minha terra tem primores,\nQue tais não encontro eu cá;\nEm cismar — sozinho, à noite —\nMais prazer encontro eu lá;\nMinha terra tem palmeiras,\nOnde canta o Sabiá.",
      "Não permita Deus que eu morra,\nSem que volte para lá;\nSem que desfrute os primores\nQue não encontro por cá;\nSem que ainda aviste as palmeiras,\nOnde canta o Sabiá."
    ],
    "id": "cancao-do-exilio"
  },
  {
    "titulo": "Erro de português",
    "autor": "Oswald de Andrade (1890–1954)",
    "genero": "satirico",
    "sub": "epigrama",
    "subnome": "Epigrama",
    "fonte": "Oswald de Andrade, Primeiro Caderno do Aluno de Poesia Oswald de Andrade (1927). Obra em domínio público no Brasil desde 2025.",
    "versos": [
      "Quando o português chegou\nDebaixo de uma bruta chuva\nVestiu o índio\nQue pena!\nFosse uma manhã de sol\nO índio tinha despido\nO português"
    ],
    "id": "erro-de-portugues"
  },
  {
    "titulo": "Amor",
    "autor": "Oswald de Andrade (1890–1954)",
    "genero": "satirico",
    "sub": "epigrama",
    "subnome": "Epigrama",
    "fonte": "Oswald de Andrade, Primeiro Caderno do Aluno de Poesia Oswald de Andrade (1927). Obra em domínio público no Brasil desde 2025.",
    "versos": [
      "amor\nhumor"
    ],
    "id": "amor"
  },
  {
    "titulo": "Madrigal do Truco",
    "autor": "Mário Raul de Morais Andrade (1893–1945)",
    "genero": "lirico",
    "sub": "madrigal",
    "subnome": "Madrigal",
    "fonte": "Mário de Andrade, Poesias completas (Itatiaia, 1987), conforme reproduzido no site Toda Matéria. Obra em domínio público no Brasil. Confira com a edição impressa antes de publicar.",
    "versos": [
      "Um jogador solista (em parlato):\n— Truco!\n\n(cantando):\nArreda porteira! Aí vai\nOs peitos do Zé Migué\nLaranja não tem caroço\nJacaré não tem pescoço\nTruco de baralho velho!",
      "O grupo madrigalista:\n\nSeis papudo! Sai tapera\nSeis seu cara de tatu\nSeu portão de cemitério\nArapuca de bambu\nToma seis que três é pouco!",
      "Sai do caminho porqueira\nToma nove, seis é pouco\nE diga porque não quer\nQuem não pode não me espera\nSeu cara de jacaré!",
      "Truco mesmo! Sai perneta\nReboco de igreja velha\nEsteira de bexiguento\nSapicuá de lazarento\nSumítico arrisque o tento!",
      "Trucou, aguenta a parada\nCarrapato é bicho feio\nTem cabelo até no joeio\nMosquito não leva freio\nPernilongo não se capa!"
    ],
    "id": "madrigal-do-truco"
  },
  {
    "titulo": "Madrigal de um Louco",
    "autor": "Antônio Francisco da Costa e Silva (1885–1950)",
    "genero": "lirico",
    "sub": "madrigal",
    "subnome": "Madrigal",
    "figurado": true,
    "fonte": "Da Costa e Silva (1885–1950). Obra em domínio público no Brasil. Texto transcrito de fonte secundária (blog Sacrário das Plangências); confira com Poesias completas (Nova Fronteira, 1985) antes de publicar.",
    "versos": [
      "Lua!\nCamélia\nQue flutua\nNo azul. Ofélia\nSerene e dolente,\nFria, vagando pelas\nAlturas, serenamente,\nPor entre os lírios das estrelas,\nSantelmo aceso para a Saudade,\nUnge meu ser na apoteose\nDa tua luz, e eu frua,\nCismando, a pureza\nDa luz e goze\nToda a tua\nTristeza,\nLua!"
    ],
    "id": "madrigal-de-um-louco"
  },
  {
    "titulo": "Elegia",
    "autor": "Cecília Meireles (1901–1964)",
    "genero": "lirico",
    "sub": "elegia",
    "subnome": "Elegia",
    "externo": "https://periodicos.usp.br/teresa/article/download/146124/149234/324762",
    "rotulo": "Ler o poema, com análise (artigo da revista Teresa, USP)",
    "id": "elegia"
  },
  {
    "id": "juizo-anatomico-dos-achaques-que-padecia-o-corpo-da-republica",
    "titulo": "Juízo anatômico dos achaques que padecia o corpo da República",
    "autor": "Gregório de Matos (1636–1696)",
    "genero": "satirico",
    "sub": "satira-de-costumes",
    "subnome": "Sátira de Costumes",
    "resumo": "Em estrofes de perguntas e respostas, o poeta examina a cidade da Bahia como um corpo doente e aponta, uma a uma, as faltas morais e as corrupções da vida colonial: a justiça, o comércio, o clero e o povo.",
    "externo": "https://www.gutenberg.org/ebooks/71724",
    "rotulo": "Ler nas Obras poéticas de Gregório de Matos (1882, Projeto Gutenberg)",
    "dominioPublico": true
  },
  {
    "id": "a-cidade-da-bahia-triste-bahia",
    "titulo": "À Cidade da Bahia (Triste Bahia)",
    "autor": "Gregório de Matos (1636–1696)",
    "genero": "satirico",
    "sub": "satira-de-costumes",
    "subnome": "Sátira de Costumes",
    "resumo": "O poeta lamenta o empobrecimento da Bahia, comparando o que a cidade foi ao que se tornou, num dos textos mais conhecidos de sua obra satírica.",
    "externo": "https://projetos.uel.br/bibliotecacomum/bc-texto/obras/ua00124a.pdf",
    "rotulo": "Ler o soneto (Biblioteca Comum UEL, PDF)",
    "dominioPublico": true
  },
  {
    "id": "aos-principais-da-bahia-chamados-os-caramurus",
    "titulo": "Aos principais da Bahia chamados os Caramurus",
    "autor": "Gregório de Matos (1636–1696)",
    "genero": "satirico",
    "sub": "satira-de-costumes",
    "subnome": "Sátira de Costumes",
    "resumo": "Dirigido aos \"Caramurus\", como eram chamados os mestiços do Recôncavo, o poema zomba das pretensões de nobreza de quem se dizia principal da terra, numa linguagem que mistura português, tupi e línguas africanas.",
    "externo": "https://www.gutenberg.org/ebooks/71724",
    "rotulo": "Ler nas Obras poéticas de Gregório de Matos (1882, Projeto Gutenberg)",
    "dominioPublico": true
  },
  {
    "id": "retrato-do-governador-antonio-luis-da-camara-coutinho",
    "titulo": "Retrato do Governador Antônio Luís da Câmara Coutinho",
    "autor": "Gregório de Matos (1636–1696)",
    "genero": "satirico",
    "sub": "epigrama",
    "subnome": "Epigrama",
    "resumo": "Em versos curtos e ágeis, o poeta ridiculariza fisicamente o governador da Bahia, de quem era desafeto, num retrato caricatural que rebaixa o poder pelo riso.",
    "externo": "https://www.gutenberg.org/ebooks/71724",
    "rotulo": "Ler nas Obras poéticas de Gregório de Matos (1882, Projeto Gutenberg)",
    "dominioPublico": true
  },
  {
    "id": "o-navio-negreiro",
    "titulo": "O Navio Negreiro",
    "autor": "Castro Alves (1847–1871)",
    "genero": "lirico",
    "sub": "ode",
    "subnome": "Ode",
    "resumo": "Este poema monumental funciona estruturalmente como uma grande ode de clamor social. Castro Alves abandona a homenagem suave e adota o tom grandioso, solene e eloquente para cantar o horror da escravidão e invocar os deuses e a justiça humana.",
    "externo": "https://codap.ufs.br/uploads/page_attach/path/8283/Navio_negreiro_-_Castro_Alves.pdf",
    "rotulo": "Ler o poema (PDF da edição da Câmara dos Deputados)",
    "dominioPublico": true
  },
  {
    "id": "pronominais",
    "titulo": "Pronominais",
    "autor": "Oswald de Andrade (1890–1954)",
    "genero": "satirico",
    "sub": "epigrama",
    "subnome": "Epigrama",
    "fonte": "Oswald de Andrade, Pau-Brasil (1925). Obra em domínio público no Brasil desde 2025. Confira com uma edição impressa antes de publicar.",
    "versos": [
      "Dê-me um cigarro\nDiz a gramática\nDo professor e do aluno\nE do mulato sabido\nMas o bom negro e o bom branco\nDa Nação Brasileira\nDizem todos os dias\nDeixa disso camarada\nMe dá um cigarro"
    ]
  },
  {
    "id": "ode-ao-dois-de-julho",
    "titulo": "Ode ao Dois de Julho",
    "autor": "Castro Alves (1847–1871)",
    "genero": "lirico",
    "sub": "ode",
    "subnome": "Ode",
    "resumo": "Ode do poeta baiano em homenagem ao 2 de Julho, data em que a Bahia celebra sua independência. A exaltação da liberdade e da pátria é uma das marcas do Romantismo social de Castro Alves.",
    "externo": "https://biblioteca.torres.rs.gov.br/wp-content/uploads/2021/10/alves-castro-espumas-flutuantes.pdf",
    "rotulo": "Ler em Espumas Flutuantes (edição da Biblioteca Nacional, PDF)",
    "dominioPublico": true
  },
  {
    "id": "mocidade-e-morte",
    "titulo": "Mocidade e Morte",
    "autor": "Castro Alves (1847–1871)",
    "genero": "lirico",
    "sub": "elegia",
    "subnome": "Elegia",
    "resumo": "Poema composto em 1864 e incluído em Espumas Flutuantes (1870), em que o jovem poeta medita sobre a morte precoce, tema recorrente do Romantismo.",
    "externo": "https://biblioteca.torres.rs.gov.br/wp-content/uploads/2021/10/alves-castro-espumas-flutuantes.pdf",
    "rotulo": "Ler em Espumas Flutuantes (edição da Biblioteca Nacional, PDF)",
    "dominioPublico": true
  },
  {
    "id": "encarecimento-dos-rigores-de-anarda",
    "titulo": "Encarecimento dos rigores de Anarda",
    "autor": "Manuel Botelho de Oliveira (1636–1711)",
    "genero": "lirico",
    "sub": "madrigal",
    "subnome": "Madrigal",
    "resumo": "O autor baiano foi o primeiro brasileiro a publicar um livro de poesia em vida (Música do Parnaso, 1705). Ele é considerado o grande pioneiro do madrigal no país, fortemente influenciado pelo modelo barroco espanhol.",
    "externo": "https://www.todamateria.com.br/madrigal-o-que-e-e-caracteristicas-do-genero-literario-com-exemplos/",
    "rotulo": "Ler o madrigal (site Toda Matéria)",
    "dominioPublico": true
  },
  {
    "id": "juvenal-e-o-dragao",
    "titulo": "Juvenal e o Dragão",
    "autor": "Leandro Gomes de Barros (1865–1918)",
    "genero": "cordel",
    "sub": "romance",
    "subnome": "Romance",
    "resumo": "Um dos grandes clássicos do cordel de maravilhas: o herói Juvenal enfrenta um dragão numa narrativa de aventura e fantasia, no estilo dos contos tradicionais.",
    "externo": "http://dspace.bc.uepb.edu.br/jspui/handle/123456789/27380",
    "rotulo": "Ler o folheto no Repositório Digital da UEPB",
    "dominioPublico": true
  },
  {
    "id": "peleja-de-manoel-riachao-com-o-diabo",
    "titulo": "Peleja de Manoel Riachão com o Diabo",
    "autor": "Leandro Gomes de Barros (1865–1918)",
    "genero": "cordel",
    "sub": "peleja",
    "subnome": "Peleja",
    "resumo": "Em 58 estrofes de seis versos, o poeta recria por escrito um desafio de cantoria: o repentista Manoel Riachão enfrenta o Diabo e vence com astúcia, viola e conhecimento das Escrituras.",
    "externo": "http://dspace.bc.uepb.edu.br/jspui/handle/123456789/27764",
    "rotulo": "Ler o folheto no Repositório Digital da UEPB",
    "dominioPublico": true
  },
  {
    "id": "historia-da-princesa-rosa",
    "titulo": "História da Princesa Rosa",
    "autor": "Silvino Pirauá de Lima (1848–1913)",
    "genero": "cordel",
    "sub": "romance",
    "subnome": "Romance",
    "resumo": "Folheto de um dos pioneiros do cordel, a quem se atribui a criação do romance em versos, no gosto das histórias de princesas e aventuras populares.",
    "externo": "http://cordel.casaruibarbosa.gov.br/",
    "rotulo": "Procurar o folheto no acervo digital da Casa de Rui Barbosa",
    "dominioPublico": true
  },
  {
    "id": "historia-da-donzela-teodora",
    "titulo": "História da Donzela Teodora",
    "autor": "Leandro Gomes de Barros (1865–1918)",
    "genero": "cordel",
    "sub": "romance",
    "subnome": "Romance",
    "resumo": "Clássico do cordel que leva ao sertão uma história de tradição europeia, centrada em uma jovem de grande sabedoria.",
    "externo": "http://cordel.casaruibarbosa.gov.br/",
    "rotulo": "Procurar o folheto no acervo digital da Casa de Rui Barbosa",
    "dominioPublico": true
  },
  {
    "id": "o-cachorro-dos-mortos",
    "titulo": "O Cachorro dos Mortos",
    "autor": "Leandro Gomes de Barros (1865–1918)",
    "genero": "cordel",
    "sub": "romance",
    "subnome": "Romance",
    "resumo": "Um dos maiores sucessos de Leandro, a narrativa em versos tem como protagonista o cachorro Calar e figura entre os clássicos do cordel narrativo.",
    "externo": "http://cordel.casaruibarbosa.gov.br/",
    "rotulo": "Procurar o folheto no acervo digital da Casa de Rui Barbosa",
    "dominioPublico": true
  },
  {
    "id": "peleja-de-vicente-sabia-com-antonio-coqueiro",
    "titulo": "Peleja de Vicente Sabiá com Antônio Coqueiro",
    "autor": "José Pacheco (1890–1954)",
    "genero": "cordel",
    "sub": "peleja",
    "subnome": "Peleja",
    "resumo": "Folheto de peleja em que dois cantadores se enfrentam em desafio de versos, publicado pela editora Luzeiro do Norte, do Recife.",
    "externo": "http://cordel.casaruibarbosa.gov.br/",
    "rotulo": "Procurar o folheto no acervo digital da Casa de Rui Barbosa",
    "dominioPublico": true
  },
  {
    "id": "a-chegada-de-lampiao-no-inferno",
    "titulo": "A Chegada de Lampião no Inferno",
    "autor": "José Pacheco (1890–1954)",
    "genero": "cordel",
    "sub": "cangaco-conflito",
    "subnome": "Cangaço e Conflito",
    "resumo": "O cangaceiro Lampião chega ao inferno e deixa os demônios assombrados, num folheto que transforma o terror do sertão em humor e fantasia.",
    "externo": "http://cordel.casaruibarbosa.gov.br/",
    "rotulo": "Procurar o folheto no acervo digital da Casa de Rui Barbosa",
    "dominioPublico": true
  },
  {
    "id": "a-vida-de-antonio-silvino",
    "titulo": "A Vida de Antônio Silvino",
    "autor": "Francisco das Chagas Batista (1882–1930)",
    "genero": "cordel",
    "sub": "cangaco-conflito",
    "subnome": "Cangaço e Conflito",
    "resumo": "Publicado em 1905, é um dos primeiros folhetos sobre o cangaço e acompanha a trajetória do cangaceiro Antônio Silvino, figura que dividiu o sertão entre admiradores e vítimas.",
    "externo": "http://cordel.casaruibarbosa.gov.br/",
    "rotulo": "Procurar o folheto no acervo digital da Casa de Rui Barbosa",
    "dominioPublico": true
  },
  {
    "id": "o-nascimento-de-antonio-silvino",
    "titulo": "O Nascimento de Antônio Silvino",
    "autor": "Leandro Gomes de Barros (1865–1918)",
    "genero": "cordel",
    "sub": "cangaco-conflito",
    "subnome": "Cangaço e Conflito",
    "resumo": "Leandro Gomes de Barros narra as origens do cangaceiro Antônio Silvino, personagem que o poeta retratou em vários folhetos.",
    "externo": "http://cordel.casaruibarbosa.gov.br/",
    "rotulo": "Procurar o folheto no acervo digital da Casa de Rui Barbosa",
    "dominioPublico": true
  },
  {
    "id": "inocencia",
    "titulo": "Inocência",
    "autor": "Visconde de Taunay (1843–1899)",
    "genero": "lirico",
    "sub": "idilio",
    "subnome": "Idílio",
    "resumo": "É considerado pela crítica o mais perfeito idílio sertanejo da literatura nacional. A trama acompanha o amor proibido, puro e trágico entre a jovem Inocência e o médico itinerante Cirino no cenário bucólico do sertão de Mato Grosso.",
    "externo": "https://www.gutenberg.org/ebooks/68635",
    "rotulo": "Ler a obra completa (Projeto Gutenberg)",
    "dominioPublico": true
  },
  {
    "id": "cinco-minutos",
    "titulo": "Cinco Minutos",
    "autor": "José de Alencar (1829–1877)",
    "genero": "lirico",
    "sub": "idilio",
    "subnome": "Idílio",
    "resumo": "É frequentemente classificado pela crítica como um idílio urbano e idealizado. A narrativa, que se inicia com o atraso de cinco minutos para pegar um ônibus, transforma-se em um terno e poético jogo de perseguição amorosa e devoção romântica pura entre o narrador e a misteriosa Carlota.",
    "externo": "https://www.gutenberg.org/ebooks/44540",
    "rotulo": "Ler a obra completa (Projeto Gutenberg)",
    "dominioPublico": true
  },
  {
    "id": "marilia-de-dirceu",
    "titulo": "Marília de Dirceu",
    "autor": "Tomás Antônio Gonzaga (1744–1810)",
    "genero": "lirico",
    "sub": "idilio",
    "subnome": "Idílio",
    "resumo": "Representa a expressão máxima do idílio pastoral e amoroso do Brasil Colonial. O pastor Dirceu canta seu amor idealizado por Marília em um cenário de natureza perfeita (locus amoenus), típico do Arcadismo brasileiro.",
    "externo": "https://www.gutenberg.org/ebooks/18082",
    "rotulo": "Ler a obra completa (Projeto Gutenberg)",
    "dominioPublico": true
  },
  {
    "id": "canto-do-piaga",
    "titulo": "Canto do Piaga",
    "autor": "Gonçalves Dias (1823–1864)",
    "genero": "lirico",
    "sub": "elegia",
    "subnome": "Elegia",
    "resumo": "Embora muito conhecido por sua poesia indianista e patriótica, o autor romântico compôs este poema com o mais puro tom de elegia heroica e lamento. Nele, o piaga (pajé) profetiza e lamenta antecipadamente a destruição de sua cultura e a perda da soberania de seu povo com a chegada dos colonizadores.",
    "externo": "https://projetos.uel.br/bibliotecacomum/bc-texto/obras/ua00119a.pdf",
    "rotulo": "Ler em Primeiros Cantos (Biblioteca Comum UEL, PDF)",
    "dominioPublico": true
  },
  {
    "id": "cantico-do-calvario",
    "titulo": "Cântico do Calvário",
    "autor": "Fagundes Varela (1841–1875)",
    "genero": "lirico",
    "sub": "elegia",
    "subnome": "Elegia",
    "resumo": "Uma das elegias mais conhecidas do Romantismo brasileiro, escrita após a morte do filho pequeno do poeta. O lamento pessoal, em tom grave e comovido, tornou-se referência da poesia elegíaca nacional.",
    "externo": "https://digital.bbm.usp.br/handle/bbm/4927",
    "rotulo": "Ler em Cantos e Fantasias (1865, Biblioteca Brasiliana Mindlin)",
    "dominioPublico": true
  },
  {
    "id": "ode-ao-burgues",
    "titulo": "Ode ao Burguês",
    "autor": "Mário Raul de Morais Andrade (1893–1945)",
    "genero": "lirico",
    "sub": "ode",
    "subnome": "Ode",
    "resumo": "Ode ao Burguês é um violento ataque verbal contra um homem rico, gordo e hipócrita, que coloca o dinheiro acima de tudo. O texto descreve os hábitos vazios e o egoísmo dessa elite materialista para expor sua total falta de sensibilidade humana, transformando-se em um manifesto poético de repúdio à mediocridade social.",
    "externo": "https://digital.bbm.usp.br/handle/bbm/6863",
    "rotulo": "Ler em Pauliceia Desvairada (1922, Biblioteca Brasiliana Mindlin)",
    "dominioPublico": true
  },
  {
    "id": "quem-sou-eu-bodarrada",
    "titulo": "Quem sou eu? (Bodarrada)",
    "autor": "Luís Gama (1830–1882)",
    "genero": "satirico",
    "sub": "satira-de-costumes",
    "subnome": "Sátira de Costumes",
    "resumo": "Publicado em Primeiras Trovas Burlescas de Getulino (1859), o poema responde com humor ácido aos que ofendiam o poeta por sua origem, devolvendo a ofensa a uma sociedade mestiça e cheia de hierarquias de cor e de privilégio.",
    "externo": "https://digital.bbm.usp.br/bitstream/bbm/4270/1/008936_COMPLETO.pdf",
    "rotulo": "Ler em Primeiras Trovas Burlescas (3ª ed., Biblioteca Brasiliana Mindlin, PDF)",
    "dominioPublico": true
  },
  {
    "id": "iracema",
    "titulo": "Iracema",
    "autor": "José de Alencar (1829–1877)",
    "genero": "lirico",
    "sub": "idilio",
    "subnome": "Idílio",
    "resumo": "Romance de 1865 que conta o amor entre a índia Iracema e o colonizador português Martim, em uma prosa de ritmo poético e com a natureza como cenário. A linguagem lírica e a atmosfera de amor puro e natural aproximam o texto do idílio.",
    "externo": "https://www.gutenberg.org/ebooks/67740",
    "rotulo": "Ler a obra completa (Projeto Gutenberg)",
    "dominioPublico": true
  },
  {
    "id": "musica-do-parnasso",
    "titulo": "Música do Parnasso",
    "autor": "Manuel Botelho de Oliveira (1636–1711)",
    "genero": "lirico",
    "sub": "madrigal",
    "subnome": "Madrigal",
    "resumo": "Primeiro livro de poesia de um brasileiro publicado em vida (1705). Reúne rimas em português, castelhano, italiano e latim, entre elas madrigais em louvor à amada Anarda.",
    "externo": "https://es.wikisource.org/wiki/M%C3%BAsica_de_el_Parnaso",
    "rotulo": "Ler a obra (Wikisource)",
    "dominioPublico": true
  }
];