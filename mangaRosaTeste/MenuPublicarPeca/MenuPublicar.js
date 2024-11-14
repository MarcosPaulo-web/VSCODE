document.getElementById('btnEnviar').addEventListener('click', publicarPeca);
const inputTipo = document.getElementById('tipoRoupa')
const btnTipo = document.querySelectorAll('.dropdown-item')

document.addEventListener('DOMContentLoaded', async () => {
tipoRoupaFunction();
})

function publicarPeca() {
    const nmProduto = document.getElementById('nomeProduto').value;
    const vlProduto = document.getElementById('valorProduto').value;
    
    console.log('nome produto', nmProduto, 'valor produto : ', vlProduto);

    if (nmProduto && vlProduto) {
        const payload = {
            nmProduto: nmProduto,
            vlProduto: parseInt(vlProduto, 10),
        };
        console.log('Payload enviado:', payload); // Log do payload

        fetch('http://localhost:8080/produto', {
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
                // Remover o event listener após o envio
                document.getElementById('btnEnviar').removeEventListener('click', publicarPeca);
            })
            .catch(error => {
                alert(`Erro: ${error.message}`);
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function tipoRoupaFunction(){
    
    btnTipo.forEach( item => {
        item.addEventListener('click', function(){
         inputTipo.value = this.id
        })
    })

}

