const tableAlta = document.getElementById("tabelaAltas").getElementsByTagName('tbody')[0];
const tabelaBaixa = document.getElementById("tabelaBaixas").getElementsByTagName('tbody')[0]
const empresas = document.getElementById('empresas')
const searchResults = document.getElementById('searchResults');

document.addEventListener('DOMContentLoaded', async () => {
    
    await getAcoes();
    await carregarTema()


})

let acoes = [];
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
                <td><a href="../HTML/Acao.html?tag=${acao.tag}">${acao.tag}</a></td>
                <td>${acao.nome}</td>
                <td>${acao.variacao}%</td>
                <td>${acao.preco} R$</td>
           </tr>
        `).join('');
}

function displayTableBaixas(acoes) {

    tabelaBaixa.innerHTML = acoes.map(acao => `
            <tr>
                <td><a href="../HTML/Acao.html?tag=${acao.tag}">${acao.tag}</a></td>
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
        localStorage.setItem('theme', 'dark'); // Salva o tema no localStorage

    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = "../Img/ligthMode.png"
        localStorage.setItem('theme','light')
    }
}

