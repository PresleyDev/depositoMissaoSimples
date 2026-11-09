interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  url: string;
}

const produtos: Produto[] = [
  {
    id: 1,
    nome: "Porcelanato 60x60",
    preco: 49.9,
    imagem: "./img/porcelanatoMissao.png",
    url: "#lista-produtos",
  },
  {
    id: 2,
    nome: "Tinta Acrílica 18L",
    preco: 149.9,
    imagem: "./img/tintaMissao.png",
    url: "#lista-produtos",
  },
  {
    id: 3,
    nome: "Cimento 50kg",
    preco: 29.9,
    imagem: "./img/cimentoMissao.png",
    url: "#lista-produtos",
  },
  {
    id: 4,
    nome: "Areia 1m³",
    preco: 99.9,
    imagem: "./img/areiaMissao.png",
    url: "#lista-produtos",
  },
  {
    id: 5,
    nome: "Pedra Agranel Nº1 1m³",
    preco: 119.9,
    imagem: "./img/britaMissao.png",
    url: "#lista-produtos",
  },

  {
    id: 6,
    nome: "Esmerilhadeira Eletrica 4.1/2'' 850W",
    preco: 199.9,
    imagem: "./img/esmerilhadeiraMissao.png",
    url: "#lista-produtos", 
  },

  {
    id: 7,
    nome: "Parafusadeira 3/8'' 12V",  
    preco: 149.9,
    imagem: "./img/parafusadeiraMissao.png",
    url: "#lista-produtos",
  },

  {
    id: 8,
    nome: "Furadeira de Impacto 1/2'' 650W",
    preco: 299.9,
    imagem: "./img/furadeiraMissao.png",
    url: "#lista-produtos",
  },

  {
    id: 9,
    nome: "Jogo de Chave de Fenda e Philips 8 Peças",
    preco: 99.9,
    imagem: "./img/jogoChaveFedaPhillips.png",
    url: "#lista-produtos",
  },

  {
    id: 10,
    nome: "Nivel a Laser 360°",
    preco: 399.9,
    imagem: "./img/nivelLaserMissao.png",
    url: "#lista-produtos",
  },

  {
    id: 11,
    nome: "Martelete Rompedor 1500W",
    preco: 499.9,
    imagem: "./img/marteleteMissao.png",
    url: "#lista-produtos",
  }, 

  {
    id: 12,
    nome: "Milheiro Tijolo Baiano Ceràmica 11,5 x 14 x 24cm",
    preco: 699.99,
    imagem: "./img/tijoloBaianoMissao.png",
    url: "#lista-produtos",
  },

  {
    id: 13,
    nome: "Telha Ondulada Fibrocimento",
    preco: 75.99,
    imagem: "./img/telhaMissao.png",
    url:"#lista-produtos"
  },

    {
    id: 14,
    nome: "Selante PU 40",
    preco: 25.99,
    imagem: "./img/puMissao.png",
    url:"#lista-produtos"
  },

    {
      id: 15,
    nome: "Maleta Ferramenta",
    preco: 35.99,
    imagem: "./img/caixaFerramentaMissao.png",
    url:"#lista-produtos"
  }
];

const listaProdutos = document.querySelector<HTMLDivElement>("#lista-produtos");
const templateProduto =
  document.querySelector<HTMLTemplateElement>("#template-produto");
const statusCarrinho = document.querySelector<HTMLElement>("#status-carrinho");

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function renderizarProdutos(): void {
  if (!listaProdutos || !templateProduto || !statusCarrinho) {
    console.error(
      "Não foi possível carregar os produtos: elementos da página não encontrados.",
    );
    return;
  }

  for (const produto of produtos) {
    const card = document.importNode(templateProduto.content, true);
    const nome = card.querySelector(".produto__nome");
    const preco = card.querySelector(".produto__preco");
    const imagem = card.querySelector(".produto__imagem");
    const link = card.querySelector(".produto__link");
    const botao = card.querySelector(".produto__botao");

    if (
      !(nome instanceof HTMLElement) ||
      !(preco instanceof HTMLElement) ||
      !(imagem instanceof HTMLImageElement) ||
      !(link instanceof HTMLAnchorElement) ||
      !(botao instanceof HTMLButtonElement)
    ) {
      console.error(
        "Não foi possível renderizar os produtos: estrutura do template inválida.",
      );
      return;
    }

    nome.textContent = produto.nome;
    preco.textContent = formatadorMoeda.format(produto.preco);
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    imagem.loading = "lazy";
    link.href = produto.url;
    botao.dataset.produtoId = String(produto.id);

    listaProdutos.append(card);
  }

  let quantidadeNoCarrinho = 0;

  listaProdutos.addEventListener("click", (evento: MouseEvent) => {
    const alvo = evento.target;

    if (!(alvo instanceof Element)) {
      return;
    }

    const botao = alvo.closest<HTMLButtonElement>(".produto__botao");
    const produtoId = Number(botao?.dataset.produtoId);
    const produto = produtos.find((item) => item.id === produtoId);

    if (!botao || !produto) {
      return;
    }

    quantidadeNoCarrinho += 1;
    statusCarrinho.textContent =
      `${produto.nome} adicionado ao carrinho. ` +
      `Total de itens: ${quantidadeNoCarrinho}.`;
  });
}

renderizarProdutos();
