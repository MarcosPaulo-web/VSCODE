document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
         freelancerId = urlParams.get('id'); 
        console.log('freelancer'+freelancerId)  // Exibe os freelancers carregados
        console.log('usuario'+localStorage.getItem('usuario'))  // Exibe os freelancers carregados
    } catch (error) {
        console.error("Erro no carregamento inicial de Freelancers:", error.message);
    }
});
let freelancerId;


function toggleDropdown() {
    const menu = document.getElementById('meuPerfilMenu');
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
}

document.addEventListener('click', (event) => {
    const menu = document.getElementById('meuPerfilMenu');
    const btn = document.getElementById('meuPerfilBtn');
    if (!btn.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function cadastrar(event) {
    event.preventDefault();
    const freeId = freelancerId;
    const desc = document.getElementById("description").value;
    const local = document.getElementById("location").value;
    const data = document.getElementById("date").value;
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

    const payload = {
        id_freelancer: freeId,
        desc_servico: desc,
        local_servico: local,
        data_servico: data,
        metodo_pagamento: selectedPayment,
        id_cliente: localStorage.getItem('usuario')
    }
    fetch("http://localhost:8080/servico",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao cadastrar: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('servico cadastrado com sucesso!');
            console.log('Resposta do servidor:', data);
            localStorage.setItem('usuario', data.id)
            window.location.href = 'TelaLogCliente.html';
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert(`Erro ao servico usuário: ${error.message}`);
        });
};