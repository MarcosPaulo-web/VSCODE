document.addEventListener('DOMContentLoaded', async () => {
    await carregarUsuarios();

});

let usuarios = [];
let acao = [];
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
function cadastrar(event) {
    event.preventDefault();
    const emailIn = document.getElementById('InputEmail').value;
    const senhaIn = document.getElementById('InputPassword').value;
    const telIn = document.getElementById('InputTelefone').value;

    if (emailIn && senhaIn && telIn && verificarUsuarioExistente()) {

        const payload = {
            email: emailIn,
            senha: senhaIn,
            telefone: telIn
        };
        console.log('Payload enviado:', payload); // Log do payload


        fetch(`http://localhost:8080/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao enviar dados: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('Dados enviados com sucesso!');
                console.log('Resposta da API:', data);
                window.location.href = "../HTML/TelaPrincipal.html";
            })
            .catch(error => {
                alert(`Erro: ${error.message}`);
                console.log(error.message)
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};




function mascaraTel() {

    const telInput = document.getElementById("InputTelefone");
    const telValue = telInput.value;// Obtém o valor inserido no campo
    telInput.value = telInput.value.replace(/[^0-9]/, '');
    if (telValue.length > 9) {
        // Se o comprimento for maior que 9, corta o valor para 9 caracteres
        telInput.value = telValue.substring(0, 9);
        // Limita o valor a 9 caracteres
    }
}

function mascaraEmail() {
    const emailInput = document.getElementById("InputEmail");
    emailInput.value = emailInput.value.replace(/[^a-zA-Z0-9@._-]/g, ''); // Remove caracteres inválidos
}

function verificarUsuarioExistente() {
    const emailInput = document.getElementById("InputEmail").value; // Captura o valor do email
    let usuarioEncontrado = usuarios.find(usuario => emailInput == usuario.email);

    if (usuarioEncontrado) {
        console.log("Usuário encontrado");
        alert("Email já cadastrado");
        return false
    } else {
        return true
    }
}


function voltarLogin() {
    window.location.href = "../HTML/TelaLogin.html"
}
