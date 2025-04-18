document.addEventListener('DOMContentLoaded', async () => {

    await getAcoes();

});
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
        displayTable(acoes.slice(0,10))
    } catch (error) {
        console.error('Erro:', error.message);
        tableAlta.innerHTML = `<p>Erro ao carregar Açoes: ${error.message}</p>`;
    }

}

function displayTable(acoes) {
    const tabela = document.getElementById("tabelaTbody");
    tabela.innerHTML = acoes.map(acao => `
            <tr>
                <td><a href="../HTML/Acao.html?tag=${acao.tag}">${acao.tag}</a></td>
                <td>${acao.nome}</td>
                <td>${acao.variacao}%</td>
                <td>${acao.preco} R$</td>
                <td>${acao.dy}</td>
                <td>${acao.fechamento} R$</td>
                <td>${acao.abertura} R$</td>
                <td>${acao.altaDia} R$</td>
                <td>${acao.baixaDia} R$</td>
                <td>${acao.pvp}</td>
                <td>${acao.valorMercado} R$</td>
                <td>${acao.volume}</td>
           </tr>
        `).join('');
}