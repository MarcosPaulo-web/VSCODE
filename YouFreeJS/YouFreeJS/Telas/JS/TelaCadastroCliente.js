
function cadastrar(event) {
    event.preventDefault();
    const nome_cliente = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const payload = {
        nome_cliente: nome_cliente,
        telefone: telefone,
        cpf: cpf,
        email: email,
        senha: senha
    }
    fetch("http://localhost:8080/cliente",
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
            alert('Usuário cadastrado com sucesso!');
            console.log('Resposta do servidor:', data);
            localStorage.setItem('usuario',data.id)
            window.location.href = 'TelaLogCliente.html';
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert(`Erro ao cadastrar usuário: ${error.message}`);
        });
};


function goBack() {
    window.location.href = "TelaPrincipal.html";
}