

function cadastrar(event) {
    event.preventDefault();

    const nome_freelancerInpt = document.getElementById("nome");
    const telefoneInpt = document.getElementById("telefone");
    const cpfInpt = document.getElementById("cpf");
    const emailInpt = document.getElementById("email");
    const valorInpt = document.getElementById("valor");
    const descInpt = document.getElementById("descricao");
    const tempoInpt = document.getElementById("tempo");
    const senhaInpt = document.getElementById("senha");

    // Validação de campos obrigatórios
    if (!nome_freelancerInpt.value || !telefoneInpt.value || !cpfInpt.value || 
        !emailInpt.value || !valorInpt.value || !descInpt.value || 
        !tempoInpt.value || !senhaInpt.value) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    const payload = {
        cpf: cpfInpt.value,
        descricao: descInpt.value,
        email: emailInpt.value,
        nome_freelancer: nome_freelancerInpt.value,
        senha: senhaInpt.value,
        telefone: telefoneInpt.value,
        tempo_servico: tempoInpt.value,
        valor_servico: valorInpt.value
    };

    console.log("Payload antes de enviar:", payload); // Verifique os dados aqui

    fetch("http://localhost:8080/freelancer", {
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
        window.location.href = '../HTML/TelaLogFree.html'; // Corrigido o typo
    })
    .catch(error => {
        console.error('Erro:', error.message);
        alert(`Erro ao cadastrar Freelancer: ${error.message}`);
    });
}




function goBack() {
    window.location.href = "TelaPrincipal.html";
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}