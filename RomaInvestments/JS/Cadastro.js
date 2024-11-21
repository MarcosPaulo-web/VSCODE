document.addEventListener('DOMContentLoaded', async () => {
    await carregarUsuarios();

});

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
            window.location.href = "../HTML/TelaPrincipal.html"; 
        })
        .catch(error => {
            console.error('por que deu erro de novoooooo:', error);
            alert(`Erro: ${error.message}`);
        });
    }}
let usuarios = [];
let acao =[];


/* cadastrar */


    


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
    const usuarioEncontrado = usuarios.find(usuario => emailInput == usuario.email);

    if (usuarioEncontrado) {
        console.log("Usuário encontrado");
        alert("Email já cadastrado");

    } else {
        cadastrar()
    }
}
/* fim cadastrar */
/* navbar */


