const dados = document.getElementById('dados');
const tagTitle = document.getElementById('TAG');
const searchResults = document.getElementById('searchResults');

// Ouvinte de evento para garantir que o código só execute após o carregamento completo da página
document.addEventListener('DOMContentLoaded', async () => {
    getTag();  // Chama a função para pegar a tag da URL
});

let acoes = [];

// Função para pegar a tag da URL
function getTag() {
    const urlParams = new URLSearchParams(window.location.search);  // Cria um objeto para ler os parâmetros da URL
    const tag = urlParams.get('tag');  // Pega o valor da tag na URL, se houver
    if (tag) {
        // Se a URL contém a tag, usa essa tag
        document.title = tag;  // Atualiza o título da página com o valor da tag
        tagTitle.textContent = tag;  // Atualiza o conteúdo da div com a classe 'TAG'
        getAcoes(tag);  // Chama a função para pegar os dados com a tag passada
    } else {
        alert('Erro ao carregar a tag');  // Se não houver tag na URL, exibe um alerta de erro
    }
}

// Função assíncrona que faz a requisição dos dados usando a tag
async function getAcoes(tag) {
    try {
        const response = await fetch(`https://mocki.io/v1/dd116615-1af1-47bf-b7c1-02e51b99d7d8`); // Faz uma requisição para pegar os dados
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`); // Lança um erro se a requisição falhar
        }

        const data = await response.json(); // Converte a resposta para JSON
        acoes = data;  // Supondo que a resposta seja uma lista de objetos com as ações
        console.log('Carregar produtos:', acoes);  // Exibe os dados no console (para depuração)
        displayDados(acoes, tag);  // Passa os dados e a tag para a função de exibição

    } catch (error) {
        console.error('Erro:', error.message);  // Exibe qualquer erro ocorrido
        dados.innerHTML = `<p>Erro ao carregar produtos: ${error.message}</p>`;  // Exibe uma mensagem de erro na tela
    }
}

// Função para exibir os dados de acordo com a tag
function displayDados(acaoGeral, tag) {
    // Procuramos a ação que corresponde à tag
    const acao = [...acaoGeral].find(acaoSeparada => acaoSeparada.tag === tag);  // Busca a ação que tem a mesma tag

    // Caso a tag não tenha correspondido a nenhuma ação, exibe uma mensagem de erro
    if (!acao) {
        dados.innerHTML = `<p>Ação não encontrada para a tag: ${tag}</p>`;
        return;  // Interrompe a execução da função, pois não há dados para exibir
    }

    // Atualiza o título e o conteúdo da tag na página
    document.title = tag;  // Atualiza o título da página com a tag
    tagTitle.textContent = tag;  // Atualiza o conteúdo da div com a classe 'TAG'

    // Preenche os dados na tela com as informações da ação encontrada
    dados.innerHTML = `
        <div class="cards-container">
            <div class="card">
                <h2><b>Preço de Abertura</b></h2>
                <div class="info-row">
                    <span class="label">R$ ${acao.abertura}</span>  <!-- Exibe o preço de abertura -->
                </div>
            </div>

            <div class="card">
                <h2><b>Preço de Fechamento</b></h2>
                <div class="info-row">
                    <span class="label">R$ ${acao.fechamento}</span>  <!-- Exibe o preço de fechamento -->
                </div>
            </div>

            <div class="card">
                <h2><b>Alta do Dia</b></h2>
                <div class="info-row">
                    <span class="label">R$ ${acao.altaDia}</span>  <!-- Exibe a alta do dia -->
                </div>
            </div>

            <div class="card">
                <h2><b>Baixa do Dia</b></h2>
                <div class="info-row">
                    <span class="label">R$ ${acao.baixaDia}</span>  <!-- Exibe a baixa do dia -->
                </div>
            </div>

            <div class="card">
                <h2><b>Variação</b></h2>
                <div class="info-row">
                    <span class="label">
                        <!-- Adiciona lógica para variação positiva ou negativa -->
                        <span class="${parseFloat(acao.variacao) < 0 ? 'highlight-negative' : 'highlight'}">
                            ${acao.variacao}%  <!-- Exibe a variação do valor -->
                        </span>
                    </span>
                </div>
            </div>

            <div class="card">
                <h2><b>DY</b></h2>
                <div class="info-row">
                    <span class="label">${acao.dy}</span>  <!-- Exibe o DY -->
                </div>
            </div>

            <div class="card">
                <h2><b>PVP</b></h2>
                <div class="info-row">
                    <span class="label">${acao.pvp}</span>  <!-- Exibe o PVP -->
                </div>
            </div>

            <div class="card">
                <h2><b>Detalhes do Mercado</b></h2>
                <div class="info-row">
                    <span class="label">Volume: ${acao.volume}</span>  <!-- Exibe o volume do mercado -->
                </div>
                <div class="info-row">
                    <span class="label">Mercado: R$ ${acao.valorMercado}</span>  <!-- Exibe o valor de mercado -->
                </div>
            </div>
        </div>
    `;
}
// barra de pesquisa
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
    if (filteredAcoes.length === 0) {
        searchResults.innerHTML = '<p>Nenhuma ação encontrada.</p>';
        searchResults.style.display = "absolute"
        searchResults.style.textAlign = "center"

    } else {
        searchResults.style.display = "absolute"
        searchResults.style.textAlign = "left"

        searchResults.innerHTML = filteredAcoes.map(acao => `
            <div class="list-group">
                <a href="../TelaAcao/Acao.html?tag=${acao.tag}" class="list-group-item list-group-item-action">
                    ${acao.nome} - ${acao.tag} - ${acao.preco} R$
                </a>
            </div>
        `).join('');
    }
}

// fim barra de pesquisa

function mudarTema(){
    const body = document.body;
    const img = document.getElementById('imgTheme')
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        img.src = '../Img/darckMode.png'
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = "../Img/ligthMode.png"
    }
}
