document.addEventListener('DOMContentLoaded', async () => {
    try {
        await carregarFreelancers(); // Nome da função corrigido
        displayFreelancers();       // Exibe os freelancers carregados
    } catch (error) {
        console.error("Erro no carregamento inicial de Freelancers:", error.message);
    }
});

let freelancers = []; // Nome da variável padronizado

async function carregarFreelancers() {
    try {
        const response = await fetch(`http://localhost:8080/freelancer`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar freelancers: ${response.status}`);
        }

        freelancers = await response.json(); // Armazena os freelancers retornados pela API
        console.log("Freelancers carregados:", freelancers);
    } catch (error) {
        console.error('Erro ao carregar freelancers:', error.message);
    }
}

function displayFreelancers() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = freelancers.map(freelancer => `
      <div class="freelancer-card">
        <h5>${freelancer.nome_freelancer}</h5>
        <p><strong>Preço :</strong> R$ ${freelancer.valor_servico} p/hora</p>
        <p><strong>Descrição :</strong> ${freelancer.descricao}</p>
        <button onclick="openModal('${freelancer.nome_freelancer}', '${freelancer.descricao}', '${freelancer.valor_servico} p/hora', '${freelancer.tempo_servico}', '${freelancer.telefone}')">Ver</button>
<button onclick="location.href='Requisitos.html?id=' + ${freelancer.id}">Contratar</button>
      </div>
    `).join('');
}

function openModal(name, sector, price, time, phone) {
    document.getElementById("modalName").textContent = name;
    document.getElementById("modalSector").textContent = sector;
    document.getElementById("modalPrice").textContent = price;
    document.getElementById("modalTime").textContent = time;
    document.getElementById("modalPhone").textContent = phone;
    document.getElementById("freelancerModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("freelancerModal").style.display = "none";
}

function toggleDropdown() {
    const menu = document.getElementById('meuPerfilMenu');
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
}


function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}