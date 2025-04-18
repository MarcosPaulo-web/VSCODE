const table = document.getElementById("tabelaEncomendas").getElementsByTagName('tbody')[0];

document.addEventListener('DOMContentLoaded', async () => {
    const encomendas = [
        { id: 1, descricao: "Encomenda 1 - Produto A" },
        { id: 2, descricao: "Encomenda 2 - Produto B" },
        { id: 3, descricao: "Encomenda 3 - Produto C" },
        { id: 4, descricao: "Encomenda 4 - Produto D" }
    ];

    displayEncomendas(encomendas);
});

function displayEncomendas(encomendas) {
    table.innerHTML = encomendas.map(encomenda => `
        <tr>
            <td>${encomenda.id}</td>
            <td>${encomenda.descricao}</td>
        </tr>
    `).join('');
}