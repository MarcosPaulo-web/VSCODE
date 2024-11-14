// URL da API
const apiUrl = 'http://localhost:8080/produto';  

document.getElementById('getDataBtn').addEventListener('click', function() {
    const produtoId = document.getElementById('produtoId').value;

    if (produtoId.length != 0) {
        fetch(`${apiUrl}/${produtoId}`)  // Adiciona o ID do produto na URL
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Produto não encontrado, favor inserir um id valido.`);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('result').value = JSON.stringify(data, null, 2);
                // Preenchendo os campos com os dados do produto de forma separada
                document.getElementById('nmProdutoDisplay').value = data.nmProduto;
                document.getElementById('vlProdutoDisplay').value = data.vlProduto;
                document.getElementById('idProdutoDisplay').value = data.id;
            })
            .catch(error => {
                document.getElementById('result').value = `Erro: ${error.message}`;
            });    
    }
    else if (produtoId.length == 0){
        fetch(`${apiUrl}`)  // Adiciona o ID do produto na URL
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Não existe nenhum produto disponivel no momento ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('result').value = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                document.getElementById('result').value = `Erro: ${error.message}`;
            });
    } 
});

// Função para enviar dados (POST)
document.getElementById('sendDataBtn').addEventListener('click', function() {
    const nmProduto = document.getElementById('nmProduto').value;
    const vlProduto = document.getElementById('vlProduto').value;

    if (nmProduto && vlProduto) {
        const payload = {
            nmProduto: nmProduto,
            vlProduto: parseInt(vlProduto, 10)
        };

        fetch(apiUrl, {
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
});
