const tableAlta = document.getElementById("tabelaAltas").getElementsByTagName('tbody')[0];
const tabelaBaixa = document.getElementById("tabelaBaixas").getElementsByTagName('tbody')[0]
const empresas = document.getElementById('empresas')
const searchResults = document.getElementById('searchResults');

document.addEventListener('DOMContentLoaded', async () => {
       await getAcoes();
})

let acoes = [];

async function getAcoes() {

    try {
        const response = await fetch(`https://mocki.io/v1/dd116615-1af1-47bf-b7c1-02e51b99d7d8`); // Aguarda a resposta da requisição
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        const data = await response.json(); // Aguarda a conversão para JSON
        acoes = data; // Supondo que a resposta já seja uma lista de produtos
        console.log('carregar Ações :', acoes)
        variacaoCrescente(acoes);
        variacaoDecrescente(acoes);
        numerosEmpresas(acoes);
    } catch (error) {
        console.error('Erro:', error.message);
        tableAlta.innerHTML = `<p>Erro ao carregar Açoes: ${error.message}</p>`;
    }

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
    });  
     displayTableBaixas(acaoAltas.slice(0, 5));

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



function numerosEmpresas(acoes){
    empresas.innerHTML = `Açoes : ${[...acoes].length} `;    
;}

