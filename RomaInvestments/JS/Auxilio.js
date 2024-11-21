
document.addEventListener('DOMContentLoaded', async () => {

    await carregarTema()
    await getAcoes();

});


let acao =[];

function carregarTema(){
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const img = document.getElementById('imgTheme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        img.src = '../Img/ligthMode.png';

    } else {
        body.classList.add('light');
        img.src = '../Img/darckMode.png';

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

function mudarTema(){
    const body = document.body;
    const img = document.getElementById('imgTheme')
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        img.src = '../Img/darckMode.png'
        localStorage.setItem('theme', 'dark'); // Salva o tema no localStorage

    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = "../Img/ligthMode.png"
        localStorage.setItem('theme','light')
    }
}
