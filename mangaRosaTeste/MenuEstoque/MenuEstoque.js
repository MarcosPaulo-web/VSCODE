// Função para carregar o estoque
async function carregarEstoque() {
    try {
        const resposta = await fetch('http://localhost:8080/produtos');
        if (resposta.ok) {
            const produtos = await resposta.json();
            const tabelaEstoque = document.getElementById('tabelaEstoque');
            tabelaEstoque.innerHTML = '';

            produtos.forEach(produto => {
                const linha = document.createElement('tr');

                // Coluna do nome do produto
                const colunaNome = document.createElement('td');
                colunaNome.textContent = produto.nome;
                linha.appendChild(colunaNome);

                // Coluna do valor do produto
                const colunaValor = document.createElement('td');
                colunaValor.textContent = `R$ ${produto.valor.toFixed(2)}`;
                linha.appendChild(colunaValor);

                // Coluna de ações
                const colunaAcoes = document.createElement('td');
                const btnExcluir = document.createElement('button');
                btnExcluir.className = 'btn btn-danger btn-sm';
                btnExcluir.textContent = 'Excluir';
                btnExcluir.onclick = () => excluirProduto(produto.id);
                colunaAcoes.appendChild(btnExcluir);
                linha.appendChild(colunaAcoes);

                tabelaEstoque.appendChild(linha);
            });
        } else {
            console.error('Erro ao carregar produtos:', resposta.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Função para excluir produto
async function excluirProduto(id) {
    try {
        const resposta = await fetch(`http://localhost:8080/produtos/${id}`, {
            method: 'DELETE'
        });
        if (resposta.ok) {
            alert('Produto excluído com sucesso!');
            carregarEstoque(); // Recarrega a lista de produtos após exclusão
        } else {
            console.error('Erro ao excluir produto:', resposta.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Carrega o estoque ao carregar a página
window.onload = carregarEstoque;
