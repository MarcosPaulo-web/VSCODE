document.addEventListener('DOMContentLoaded', async () => {
    try {
        await carregarFreelancer();
        await carregarServicos();
        displayServicos(); // Aqui não precisa de await, pois a função displayServicos não é assíncrona
    } catch (error) {
        console.error("Erro no carregamento inicial de usuarios:", error.message);
    }
});

let servicos = [];
let freelancers = [];

async function carregarServicos() {
    try {
        const response = await fetch('http://localhost:8080/servico');
        if (!response.ok) {
            throw new Error(`Erro ao buscar serviços: ${response.status}`);
        }
        const data = await response.json();
        servicos = data;
        console.log("Serviços carregados:", servicos);
    } catch (error) {
        console.error('Erro ao carregar serviços:', error.message);
    }
}

async function carregarFreelancer() {
    try {
        const response = await fetch('http://localhost:8080/freelancer');
        if (!response.ok) {
            throw new Error(`Erro ao buscar freelancers: ${response.status}`);
        }
        const data = await response.json();
        freelancers = data;
        console.log("Freelancers carregados:", freelancers);
    } catch (error) {
        console.error('Erro ao carregar freelancers:', error.message);
    }
}

function openVerModal(title, description) {
    // Define os valores dinâmicos do modal
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    // Exibe o modal
    document.getElementById("verModal").style.display = "flex";
}

function closeVerModal() {
    // Fecha o modal
    document.getElementById("verModal").style.display = "none";
}

function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById("themeButton");

    // Alternar a classe 'dark-theme' no corpo
    body.classList.toggle("dark-theme");

    // Mover o ícone da lua para o lado
    themeButton.classList.toggle("active");
}


function closeFeedbackModal() {
    document.getElementById("feedbackModal").style.display = "none";
}





function getNome(idServico) {
    const freelancer = freelancers.find(f => f.id == idServico);
    if (!freelancer) {
        console.warn(`Freelancer com ID ${idServico} não encontrado.`);
    }
    return freelancer ? freelancer.nome_freelancer : 'Freelancer não encontrado';
}


// feedback 

function openFeedbackModal() {
    document.getElementById("feedbackModal").style.display = "flex";
}

function closeFeedbackModal() {
    document.getElementById("feedbackModal").style.display = "none";
}

function displayServicos() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = servicos.map(servico => `
        <div class="card">
            <h2>${getNome(servico.id_freelancer)}</h2>
            <p>${servico.desc_servico.slice(0, 25)}</p>
            <button onclick="openVerModal('${getNome(servico.id_freelancer)}', '${servico.desc_servico}')">Ver</button>
            <button onclick="openFeedbackModal('${servico.id_freelancer}','${servico.id_cliente}','${servico.id}')">Encerrar</button>
            </div>
    `).join('');
}

let id_clienteInpt;
let id_freelancerInpt;
let id_servicoDel;
function openFeedbackModal(id_free, id_cli, id_serv) {
    id_clienteInpt = id_cli;
    id_freelancerInpt = id_free;
    id_servicoDel = id_serv;
    console.log(id_cli, id_free, id_servicoDel)
    document.getElementById("feedbackModal").style.display = "flex";
}

function submitFeedback() {

    console.log(id_clienteInpt, id_freelancerInpt)

    const ratingDropdown = document.getElementById("ratingDropdown");
    const comentario = document.getElementById("comentario").value;
    const selectedRating = ratingDropdown.value;
    const data_atual = new Date();
    const dia = data_atual.getDate();
    const mes = data_atual.getMonth() + 1; // Adiciona 1 ao mês (pois getMonth() retorna 0-11)
    const ano = data_atual.getFullYear();

    // Criando a string com a data no formato "dia/mês/ano"
    const dataFormatada = `${dia}/${mes}/${ano}`


    const payload = {
        comentario: comentario,
        data_feedback: dataFormatada,
        id_cliente: id_clienteInpt,
        id_freelancer: id_freelancerInpt,
        nota: selectedRating
    };

    console.log("Payload antes de enviar:", payload); // Verifique os dados aqui

    fetch("http://localhost:8080/feedback", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)  // Não use o encapsulamento { payload }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || `Erro ao cadastrar: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Freelancer cadastrado com sucesso!');
            console.log('Resposta do servidor:', data);
            deletarServico(id_servicoDel);
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert(`Erro ao cadastrar Freelancer: ${error.message}`);
        });
}

function deletarServico(idServico) {

    console.log("id servico :" + idServico)
    
    fetch(`http://localhost:8080/servico/${idServico}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || `Erro ao deletar servico : ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            alert('servico deletado com sucesso!');
            console.log('Resposta do servidor:', data);
            window.location.href = '../HTML/TelaLogCliente.html';
        })
        .catch(error => {
            window.location.href = '../HTML/TelaLogCliente.html';
            console.error('Erro:', error.message);/* Não esta funcionando , porem esta deletando ♥ */ 
        });

}