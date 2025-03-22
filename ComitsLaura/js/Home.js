document.addEventListener("DOMContentLoaded", async () => {
  await carregarNavbar();
  let livroSuspense = {
    nome: "O Silêncio dos Inocentes",
    autor: "Thomas Harris",
    preco: 39.9,
    imagem: "https://br.web.img3.acsta.net/pictures/14/10/07/22/16/591185.jpg", // Coloque o link da imagem
    lancamento: "1988-08-01", // Data de lançamento no formato AAAA-MM-DD
  };
  const livros = Array(10).fill(livroSuspense);
  displayLivros(livros);
});

document.addEventListener("DOMContentLoaded", () => {
  const perfil = document.querySelector(".perfilClose");
  const overlay = document.querySelector(".blurOff");
  const btnPerfil = document.getElementById("btnPerfil");

  btnPerfil.addEventListener("click", () => {
    perfil.classList.toggle("perfilOpen"); // Abre/fecha o perfil
    overlay.classList.toggle("blurOn"); // Ativa/desativa o blur no fundo
  });
});

// toogle = se o nome estiver presente remove, se não o adiciona

async function carregarNavbar() {
  try {
    const navbarResponse = await fetch("NavbarHome.html");
    if (navbarResponse.ok) {
      const navbarHtml = await navbarResponse.text();
      document.getElementById("navbar-container").innerHTML = navbarHtml;
    } else {
      console.error("Erro ao carregar a navbar: Arquivo não encontrado.");
    }
  } catch (err) {
    console.error("Erro ao tentar carregar a navbar:", err);
  }
}

function displayLivros(livros) {
  const containers = document.getElementsByClassName("allBooks");
  Array.from(containers).forEach((container) => {
    container.innerHTML = livros
      .map(
        (livro) => `
        <div class="card">
            <div class="card-header"> 
          <img src="${livro.imagem}" alt="${livro.nome}" class="card-img-top">
          <div class = "card-head">
          <h2 class="card-title">${livro.nome}</h2>
          <p id = "price-books">R$ ${livro.preco.toFixed(2)}</p>
          </div>
          </div>
          <div class="card-footer">
          <div class="card-footer-information">
          <p>Autor : ${livro.autor}</p>
          <p>Lançamento : ${livro.lancamento}</p>
          </div>
          <div class = "card-button-container">
                  <button type="button" class="btn btn-success" id="btn-book">Saiba mais</button>
          </div>
          </div>
        </div>
      `
      )
      .join("");
  });
}
