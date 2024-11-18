document.addEventListener('DOMContentLoaded', async () => {
    await carregarUsuarios();
    await getAcoes();
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const img = document.getElementById('imgTheme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        img.src = '../Img/darckMode.png';
    } else {
        body.classList.add('light');
        img.src = '../Img/ligthMode.png';
    }
});

let usuarios = [];
let acao =[];

/* cadastrar */

function cadastrar(){
    const emailInput = document.getElementById('InputEmail').value;
    const senhaInput = document.getElementById('InputPassword').value;
    const telInput = document.getElementById('InputTelefone').value;
    let tele = false;

    if (telInput.length < 9) {  
        alert("Número de telefone incompleto ou inválido! Certifique-se de ter 9 dígitos.");
        return;  // Impede o envio do formulário caso o telefone seja inválido
    } else {
        tele = true;  // Telefone válido
    }
    
    if ( emailInput && senhaInput && tele == true) {
        const payload = {
            email: emailInput,
            senha: senhaInput,
            telefone: telInput, // Envia apenas os números do telefone
        };
    
        console.log('Payload enviado:', payload); // Log para verificação
    
        // Envia os dados para a API
        fetch('http://localhost:8080/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                // Lança um erro se a resposta não for OK (status 2xx)
                return response.text().then(text => {
                    throw new Error(`Erro ao enviar dados: ${response.status} - ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Dados enviados com sucesso!');
            console.log('Resposta da API:', data);
            // Redirecionamento após sucesso (opcional)
            window.location.href = "../TelaPrincipal/TelaPrincipal.html"; 
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(`Erro: ${error.message}`);
        });
    }}
    


function mascaraTel() {

    const telInput = document.getElementById("InputTelefone");
    const telValue = telInput.value;  // Obtém o valor inserido no campo

    if (telValue.length > 9) {
        // Se o comprimento for maior que 9, corta o valor para 9 caracteres
        telInput.value = telValue.substring(0, 9);  // Limita o valor a 9 caracteres
    }
}

function mascaraEmail() {
    const emailInput = document.getElementById("InputEmail");
    emailInput.value = emailInput.value.replace(/[^a-zA-Z0-9@._-]/g, ''); // Remove caracteres inválidos
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
/* fim cadastrar */
/* navbar */
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



/* navbar fim */

/* mudar tema */

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

/* fim mudar tema */