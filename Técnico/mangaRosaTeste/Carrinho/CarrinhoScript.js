
let carrinho = [];
const compras = document.getElementById('compras')
const preco = document.getElementById('preco')
const total = document.getElementById('total')

document.addEventListener('DOMContentLoaded', async () => {

    await carregarProdutos();

});

async function carregarProdutos() {
    try {
        const response = await fetch(`http://localhost:8080/carrinho`); // Aguarda a resposta da requisição
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        const data = await response.json(); // Aguarda a conversão para JSON
        carrinho = data; // Supondo que a resposta já seja uma lista de produtos
        console.log('carregar produtos :', carrinho)
        filtrarProduto(carrinho)
    } catch (error) {
        console.error('Erro:', error.message);
        compras.innerHTML = `<p>Erro ao carregar produtos: ${error.message}</p>`;
    }
}


function displayItemsCompras(carrinho) {
    console.log('display', carrinho)
    compras.innerHTML = carrinho.map(product => `
        <div class="compras-card">
            <img src="#" alt="${product.nmProduto}">
            <h3>${product.nmProduto}</h3>
        </div>
    `).join('');
}

function filtrarProduto() { /* precisa de revisão */
    // Objeto para armazenar a soma das quantidades por ID
    const quantidades = carrinho.reduce((acc, product) => {
        if (acc[product.idProduto]) {
            acc[product.idProduto].quantidade += product.quantidade; // Soma a quantidade
        } else {
            acc[product.idProduto] = {
                nmProduto: product.nmProduto,
                vlProduto: product.vlProduto,
                quantidade: product.quantidade
            };
        }
        return acc;
    }, {});

    // Converte o objeto em um array para facilitar a exibição
    const produtosFiltrados = Object.keys(quantidades).map(key => ({
        idProduto: key,
        nmProduto: quantidades[key].nmProduto,
        vlProduto: quantidades[key].vlProduto,
        quantidade: quantidades[key].quantidade
    }));

    // Atualiza a exibição com os produtos filtrados
    displayItemsCompras(produtosFiltrados);
    displayPreco(produtosFiltrados);
    precoTotal(produtosFiltrados)
}

function displayPreco(carrinho) {
    preco.innerHTML = carrinho.map(product => `
        <div class="preco-card">
        <h3> Produto : ${product.nmProduto}</h3>
        <h3> Preço : ${product.vlProduto.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</h3>
        <h3> quantidade : ${product.quantidade}</h3>
        </div>
        `).join('');
}

/* reduce() pega um array e o transforma em um único valor. Nesse caso, estamos somando os valores de todos os produtos. */
function precoTotal(todosProdutos) {
    const valorTotal = todosProdutos.reduce((total, produto) => {
        const preco = produto.vlProduto || 0; // Use 0 se undefined
        const quantidade = produto.quantidade || 0; // Use 0 se undefined
        return total + (preco * quantidade);
    }, 0);

    // Verifica se valorTotal é um número antes de formatar
    total.innerHTML = `
        <div class="precoTotal-card">
            <h2>Valor Total: ${valorTotal ? valorTotal.toLocaleString('pt-br', { style: "currency", currency: "BRL" }) : 'R$ 0,00'}</h2>
        </div>
    `;
}