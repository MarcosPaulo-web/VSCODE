document.addEventListener('DOMContentLoaded', async () => {

  
    await carregarNavbar()
    await getAcoes();
    await carregarTema()

});

async function carregarNavbar() {
    try {
        const navbarResponse = await fetch('NavBarCliente.html');  
        if (navbarResponse.ok) {
            const navbarHtml = await navbarResponse.text();
            document.getElementById('navbar-container').innerHTML = navbarHtml;
        } else {
            console.error('Erro ao carregar a navbar: Arquivo não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao tentar carregar a navbar:', err);
    }
}

function buscarAcoes() {
    const searchTerm = document.getElementById("search").value.toLowerCase(); // Captura o valor da pesquisa
    
    if (searchTerm.length === 0) {
        // Se o campo de pesquisa estiver vazio, limpar os resultados
        searchResults.innerHTML = '';
        return;
    }

    // Filtra as ações com base no nome
    const filteredAcoes = [...acoes].filter(acao => acao.nome.toLowerCase().includes(searchTerm));

    // Exibe as ações filtradas na área de resultados
    displaySearchResults(filteredAcoes);
}

// Função para exibir os resultados da pesquisa
function displaySearchResults(filteredAcoes) {
    const searchResults = document.getElementById("searchResults"); // Definindo o elemento

    if (filteredAcoes.length === 0) {
        searchResults.innerHTML = '<p>Nenhuma ação encontrada.</p>';
        searchResults.style.display = "block"; // Mostrar resultados
        searchResults.style.textAlign = "center";
    } else {
        searchResults.style.display = "block"; // Mostrar resultados
        searchResults.style.textAlign = "left";

        searchResults.innerHTML = filteredAcoes.map(acao => `
            <div class="list-group">
                <a href="../TelaAcao/Acao.html?tag=${acao.tag}" class="list-group-item list-group-item-action">
                    ${acao.nome} - ${acao.tag} - ${acao.preco} R$
                </a>
            </div>
        `).join('');
    }
}

/* fim da barra de pesquisa */ 
async function getAcoes() {

    try {
        const response = await fetch(`https://mocki.io/v1/dd116615-1af1-47bf-b7c1-02e51b99d7d8`); // Aguarda a resposta da requisição
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        const data = await response.json(); // Aguarda a conversão para JSON
        acoes = data; // Supondo que a resposta já seja uma lista de produtos
        console.log('carregar produtos :', acoes)

    } catch (error) {
        console.error('Erro:', error.message);
    }

}

/* mudar tema */

function mudarTema(){
    const body = document.body;
    const img = document.getElementById('imgTheme')
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        img.src = '../Img/darckMode.png'
        localStorage.setItem('theme', 'dark'); // Salva o tema no localStorage

    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = "../Img/ligthMode.png"
        localStorage.setItem('theme','light')
    }
}

function carregarTema(){
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const img = document.getElementById('imgTheme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        img.src = '../Img/ligthMode.png';

    } else {
        body.classList.add('light');
        img.src = '../Img/darckMode.png';

    }
}

/* fim mudar tema */