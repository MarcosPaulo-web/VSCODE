document.addEventListener('DOMContentLoaded', async () => {
    await carregarUsuarios();
    await getAcoes();
});

let usuarios = [];
let acao =[];

async function carregarUsuarios() {
    try {
        const response = await fetch(`http://localhost:8080/usuario`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuarios: ${response.status}`);
        }

        const data = await response.json(); // Aguarda a conversão para JSON
        usuarios = data
        console.log(usuarios)

    } catch (error) {
        console.error('Erro:', error.message);
    }
}



function verificarUsuarioExistente() {
    const emailInput = document.getElementById("InputEmail").value; // Captura o valor do email

    // Verifica se algum usuário já possui esse email
    const usuarioEncontrado = usuarios.find(usuario => emailInput === usuario.email);

    if (usuarioEncontrado) {
        console.log("Usuário encontrado");
        alert("Email já cadastrado");

    } else {
        cadastrar()
    }
}



function cadastrar() {


    const emailInput = document.getElementById("InputEmail").value
    const senhaInput = document.getElementById("InputPassword").value
    const telInput = document.getElementById("InputTelefone").value

    if (emailInput && senhaInput && telInput) {
        const payload = {
            email: emailInput,
            senha: senhaInput,
            telefone: parseInt(telInput, 10),

        };
        console.log('Payload enviado:', payload); // Log do payload


        fetch('http://localhost:8080/usuario', {
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
                window.location.href = "../TelaPrincipal/TelaPrincipal.html";  // Substitua pela URL para onde deseja redirecionar

            })
            .catch(error => {
                console.error('Erro:', error);  // Adicionando um log mais detalhado de erro
                alert(`Erro: ${error.message}`);
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function mascaraTel() {

    const telInput = document.getElementById("InputTelefone");
    const telValue = telInput.value;  // Obtém o valor inserido no campo

    // Verifica se o número de caracteres excedeu 9
    if (telValue.length > 9) {
        // Se o comprimento for maior que 9, corta o valor para 9 caracteres
        telInput.value = telValue.substring(0, 9);  // Limita o valor a 9 caracteres
    }
}

async function getAcoes() {

    try {
        const response = await fetch(`https://mocki.io/v1/dd116615-1af1-47bf-b7c1-02e51b99d7d8`); // Aguarda a resposta da requisição
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        const data = await response.json(); // Aguarda a conversão para JSON
        acao = data; // Supondo que a resposta já seja uma lista de produtos
        console.log('carregar produtos :', acao)
    } catch (error) {
        console.error('Erro:', error.message);
        tableAlta.innerHTML = `<p>Erro ao carregar produtos: ${error.message}</p>`;
    }

}

function buscarAcoes(){

    const searchTerm = document.getElementById("search").value.toLowerCase();

    if(searchTerm.length === 0){
        //se o campo de pesquisa estiver vazio
        searchTerm.innerHTML='';
        return;
    }

    //filtra as ações com base no nome
    const filteredAcoes = [...acao].filter(acao => acao.nome.toLowerCase().includes(searchTerm));

    //Exibe as açoes filtradas
    displaySearchResults(filteredAcoes);

}

function displaySearchResults(filteredAcoes) {
    if (filteredAcoes.length === 0) {
        searchResults.innerHTML = '<p>Nenhuma ação encontrada.</p>';
        searchResults.style.display = "absolute";
        searchResults.style.textAlign = "center";
    } else {
        searchResults.style.display = "absolute";
        searchResults.style.textAlign = "left";

        searchResults.innerHTML = filteredAcoes.map(acao => `
            <div class="list-group">
                <a href="../TelaAcao/Acao.html?tag=${acao.tag}" class="list-group-item list-group-item-action">
                    ${acao.nome} - ${acao.tag} - ${acao.preco} R$
                </a>
            </div>
        `).join('');
    }
}



