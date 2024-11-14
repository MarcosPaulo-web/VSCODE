/* 

1-[] ir ate o banco e pegar os dados
2-[] botar os itens na tela 

*/

const productList = document.querySelector('.productList');
let varFiltro = "Roupas";
const popUp = document.getElementById('popUp');
let produtos = [];

document.addEventListener('DOMContentLoaded', async () => {
    await carregarProdutos();

    // Adiciona evento para os filtros de roupa 
    const filtros = document.querySelectorAll('input[name="Roupas"]');
    filtros.forEach(filtro => {
        filtro.addEventListener('change', getSelectedValue);
    });

    // Adiciona evento para os filtros de preço
    const filtrosPreco = document.querySelectorAll('input[name="preco"]');
    filtrosPreco.forEach(filtro => {
        filtro.addEventListener('change', getSelectedValuePreco);
    });
});

async function carregarProdutos() {
    try {
        const response = await fetch(`http://localhost:8080/produto`); // Aguarda a resposta da requisição
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }
        
        const data = await response.json(); // Aguarda a conversão para JSON
        produtos = data; // Supondo que a resposta já seja uma lista de produtos
        console.log(produtos)
        displayItems(produtos);
    } catch (error) {
        console.error('Erro:', error.message);
        productList.innerHTML = `<p>Erro ao carregar produtos: ${error.message}</p>`;
    }
}

 
function displayItems(produtos) {
    productList.innerHTML = produtos.map(product => `
        <div class="product-card">
            <img src="#" alt="${product.nmProduto}">
            <h3>${product.nmProduto}</h3>
            <p>${product.vlProduto}</p>
            <button onclick="abrirPopUp('${product.id}')">Vizualizar</button>
        </div>
    `).join('');
}

const getSelectedValue = () => {
    const inputFiltro = document.querySelector('input[name="Roupas"]:checked');
    if (inputFiltro) {
        varFiltro = inputFiltro.id;
        carregarProdutos();
    }
}

const getSelectedValuePreco = () => {
    const inputFiltro = document.querySelector('input[name="preco"]:checked');

    if (inputFiltro) {
        if (inputFiltro.id === 'crescente') {
            precoCrescente();
        } else if (inputFiltro.id === 'decrescente') {
            precoDecrescente();
        }
    }
}

function precoDecrescente() {
    const produtosOrdenados = [...produtos].sort((a, b) => b.price - a.price);
    displayItems(produtosOrdenados);
}

function precoCrescente() {
    const produtosOrdenados = [...produtos].sort((a, b) => a.price - b.price);
    displayItems(produtosOrdenados);
}

function fecharPopUp() {
    popUp.style.display = 'none';
}

function abrirPopUp(IDProduto) {
    popUp.style.display = 'block';


    const product = produtos.find(p => p.id == IDProduto)
    console.log('Produto encontrado:', product); 

   popUp.innerHTML = `
   
    <div class="product-card-popUp">
        <img src="#" alt="${product.nmProduto}">
        <h3>${product.nmProduto}</h3>
        <p>${product.vlProduto.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</p>
       <label for="quantidade"> Quantidade</label>
        <input type="number" id="quantidade" min="1" max="99" value="1" onInput="validarNumero(this)"> 
        <button id="btnCarrinho" onclick="enviarCarrinho('${product.id} ')">Adicionar ao Carrinho</button>
        <button id="btnFechar" onclick="fecharPopUp()">Fechar</button>

    </div>
`;

}

function enviarCarrinho(idCompra){
    const quantidade = document.getElementById('quantidade').value
    const product = produtos.find(p => p.id == idCompra)
    
    console.log('id enviado ao carrinho :',idCompra,'produto encontrado :',product,'quantidade : ',quantidade)

    
    if ( product.id && product.nmProduto && product.vlProduto) {
        const payload = {
            idProduto: product.id,
            nmProduto: product.nmProduto,
            vlProduto: parseInt(product.vlProduto, 10),
            quantidade:  parseInt(quantidade, 10)
        };
        console.log('Payload enviado:', payload); // Log do payload
        

        fetch('http://localhost:8080/carrinho', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao enviar dados: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Dados enviados com sucesso!');
            console.log('Resposta da API:', data);
        })
        .catch(error => {
            alert(`Erro: ${error.message}`);
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}





