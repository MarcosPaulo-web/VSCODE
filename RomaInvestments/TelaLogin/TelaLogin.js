
document.addEventListener('DOMContentLoaded', async () => {
    await carregarUsuarios();
    await getAcoes();
});

let usuarios = [];
let acoes = [];



async function carregarUsuarios() {
    try {
        const response = await fetch(`http://localhost:8080/usuario`); // Aguarda a resposta da requisição
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

function verificar() {
    event.preventDefault();

    const email = document.getElementById("InputEmail").value
    const senha = document.getElementById("InputPassword").value
    const usuarioEncontrado = usuarios.find(usuario => email == usuario.email && senha == usuario.senha)

    if (usuarioEncontrado) {

        email.value = ""
        senha.value = ""
        window.location.href = "../TelaPrincipal/TelaPrincipal.html";  // Substitua pela URL para onde deseja redirecionar
        console.log("Usuario Encontrado")

    } else {
        alert("seu email ou senhas estão incorretos")
    }

}


/* barra de pesquisa */
function buscarAcoes() {
    const searchTerm = document.getElementById("search").value.toLowerCase(); // Captura o valor da pesquisa
    
    if (searchTerm.length === 0) {
        // Se o campo de pesquisa estiver vazio, limpar os resultados
        searchResults.innerHTML = '';
        return;
    }

    // Filtra as ações com base no nome
    const filteredAcoes = [...acoes].filter(acao => acao.nome.toLowerCase().includes(searchTerm));

    // Exibe as ações filtradas na área de resultados
    displaySearchResults(filteredAcoes);
}

// Função para exibir os resultados da pesquisa
function displaySearchResults(filteredAcoes) {
    const searchResults = document.getElementById("searchResults"); // Definindo o elemento

    if (filteredAcoes.length === 0) {
        searchResults.innerHTML = '<p>Nenhuma ação encontrada.</p>';
        searchResults.style.display = "block"; // Mostrar resultados
        searchResults.style.textAlign = "center";
    } else {
        searchResults.style.display = "block"; // Mostrar resultados
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

/* fim da barra de pesquisa */ 
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
