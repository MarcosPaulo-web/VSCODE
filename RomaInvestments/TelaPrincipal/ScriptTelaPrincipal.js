const tableAlta = document.getElementById("tabelaAltas").getElementsByTagName('tbody')[0];
const tabelaBaixa = document.getElementById("tabelaBaixas").getElementsByTagName('tbody')[0]
const empresas = document.getElementById('empresas')
const searchResults = document.getElementById('searchResults');

document.addEventListener('DOMContentLoaded', async () => {

    await getAcoes();

})
let acoes = [];

/* barra de pesquisa */
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
    if (filteredAcoes.length === 0) {
        searchResults.innerHTML = '<p>Nenhuma ação encontrada.</p>';
        searchResults.style.display = "absolute"
        searchResults.style.textAlign = "center"

    } else {
        searchResults.style.display = "absolute"
        searchResults.style.textAlign = "left"

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
        variacaoCrescente(acoes);
        variacaoDecrescente(acoes);
        numerosEmpresas(acoes);
    } catch (error) {
        console.error('Erro:', error.message);
        tableAlta.innerHTML = `<p>Erro ao carregar produtos: ${error.message}</p>`;
    }

}

function displayTableAltas(acoes) {

    tableAlta.innerHTML = acoes.map(acao => `
            <tr>
                <td><a href="../TelaAcao/Acao.html?tag=${acao.tag}">${acao.tag}</a></td>
                <td>${acao.nome}</td>
                <td>${acao.variacao}%</td>
                <td>${acao.preco} R$</td>
           </tr>
        `).join('');
}

function displayTableBaixas(acoes) {

    tabelaBaixa.innerHTML = acoes.map(acao => `
            <tr>
                <td><a href="../TelaAcao/Acao.html?tag=${acao.tag}">${acao.tag}</a></td>
                <td>${acao.nome}</td>
                <td>${acao.variacao}%</td>
                <td>${acao.preco} R$</td>
           </tr>
        `).join('');
}

function variacaoDecrescente(acoes) {

    const acaoBaixas = [...acoes].sort((a, b) => {
        const variacaoA = typeof a.variacao === 'string' ? parseFloat(a.variacao.replace(',', '.')) : a.variacao;
        const variacaoB = typeof b.variacao === 'string' ? parseFloat(b.variacao.replace(',', '.')) : b.variacao;
        return variacaoB - variacaoA;
    });
    displayTableAltas(acaoBaixas.slice(0, 5));


}

function variacaoCrescente(acoes) {
    const acaoAltas = [...acoes].sort((a, b) => {
        const variacaoA = typeof a.variacao === 'string' ? parseFloat(a.variacao.replace(',', '.')) : a.variacao;
        const variacaoB = typeof b.variacao === 'string' ? parseFloat(b.variacao.replace(',', '.')) : b.variacao;
        return variacaoA - variacaoB;
    });    displayTableBaixas(acaoAltas.slice(0, 5));

}

function numerosEmpresas(acoes){
    empresas.innerHTML = `Açoes : ${[...acoes].length} `;    
}

function mudarTema(){
    const body = document.body;
    const img = document.getElementById('imgTheme')
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        img.src = '../Img/darckMode.png'
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = "../Img/ligthMode.png"
    }
}
