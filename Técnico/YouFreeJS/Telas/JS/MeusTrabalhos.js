document.addEventListener('DOMContentLoaded', async () => {
    try {
        await carregarFreelancer();
        await carregarServicos();
        displayServicos();
    } catch (error) {
        console.error("Erro no carregamento inicial de serviços:", error.message);
    }
});

let servicos = [];
let freelancers = [];

async function carregarServicos() {
    try {
        const response = await fetch(`http://localhost:8080/servico`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar servicos: ${response.status}`);
        }

        const data = await response.json();
        servicos = data;
        console.log("Servicos carregados:", servicos);
    } catch (error) {
        console.error('Erro ao carregar servicos:', error.message);
    }
}

async function carregarFreelancer() {
    try {
        const response = await fetch(`http://localhost:8080/freelancer`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar freelancers: ${response.status}`);
        }

        const data = await response.json();
        freelancers = data; // Corrigido o erro de digitação
        console.log("Freelancers carregados:", freelancers);
    } catch (error) {
        console.error('Erro ao carregar freelancers:', error.message);
    }
}

function displayServicos() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = servicos.map(servico => `
        <div class="card">
            <h2>${getNome(servico.id_freelancer)}</h2>
            <p>${servico.desc_servico.slice(0, 25)}</p>
            <button onclick="openModal('${getNome(servico.id_freelancer)}', '${servico.desc_servico}', '${servico.local_servico}', '${servico.metodo_pagamento}', '${servico.data_servico}')">Ver</button>
            </div>
    `).join('');
}

function getNome(idServico) {
    const freelancer = freelancers.find(f => f.id == idServico);
    return freelancer ? freelancer.nome_freelancer : 'Freelancer não encontrado';
}

function openModal(title, description, local, pagamento, data) {
    // Preenche os dados no modal
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalLocal").textContent = local;
    document.getElementById("modalPagamento").textContent = pagamento;
    document.getElementById("modalData").textContent = data;

    // Exibe o modal
    document.getElementById("modal").style.display = "block";
}
function toggleTheme() {
    document.body.classList.toggle('dark-theme'); // Corrigido para usar 'dark-theme'
    const sidebar = document.querySelector('.sidebar');
}

function closeModal() {
    // Fecha o modal
    document.getElementById("modal").style.display = "none";
}