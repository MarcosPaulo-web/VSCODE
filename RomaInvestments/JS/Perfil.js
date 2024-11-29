document.addEventListener('DOMContentLoaded', async () => {

    await carregarUsuarios();
});



function pegarUsuario(usuarios) {
    let usuarioLocalStorage = [];
    usuarioLocalStorage = localStorage.getItem('usuario')
    usuarioLocalStorage = JSON.parse(usuarioLocalStorage); // Converte a string JSON de volta para objeto
    const usuarioEncontrado = acharUsuario(usuarios,usuarioLocalStorage)
    setDataUsuario(usuarioEncontrado);
}

function acharUsuario(usuarios,usuarioLocalStorage){
  return usuarioEncontrado = [...usuarios].find(usuario => usuario.idUsuario === usuarioLocalStorage.idUsuario);
}

function setDataUsuario(usuarioEncontrado){
    const inputNome = document.getElementById("InputNome");
    const inputEmail = document.getElementById("InputEmail");
    const inputSenha = document.getElementById("InputPassword")
    const inputTelefone = document.getElementById("InputTelefone")
    inputNome.value = "sem nome"
    inputEmail.value = usuarioEncontrado.email || "sem email";
    inputSenha.value = usuarioEncontrado.senha  || "sem senha";
    inputTelefone.value = usuarioEncontrado.telefone || "000000000"
}


function showEditar(event) {
    event.preventDefault(event);  // Evita o comportamento padrão (recarregar a página)
    const inputNome = document.getElementById("InputNome");
    const inputEmail = document.getElementById("InputEmail");
    const inputSenha = document.getElementById("InputPassword")
    const inputTelefone = document.getElementById("InputTelefone")
    inputNome.readOnly = false;
    inputEmail.readOnly = false;
    inputSenha.readOnly = false;
    inputTelefone.readOnly = false;

    const btnConfirmar = document.getElementById("btnConfirmar");
    btnConfirmar.style.display = "block"
}

function logout(){
    localStorage.setItem('usuario','')
    window.location.href ="../HTML/TelaLogin.html"
    alert("Usuario deslogado com sucesso")
}

async function carregarUsuarios() {
    try {
        const response = await fetch(`http://localhost:8080/usuario`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }

        const data = await response.json();
       let usuarios = data; // Armazena os usuários retornados pela API
       pegarUsuario(usuarios)
        console.log("Usuários carregados:", usuarios);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error.message);
    }
}

function putUsuario(){
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

    async function putUsuario() {
        const emailInput = document.getElementById('InputEmail').value;
        const senhaInput = document.getElementById('InputPassword').value;
        const telInput = document.getElementById('InputTelefone').value;
        console.log(emailInput,senhaInput,telInput)
        // Verifica se o telefone possui 9 ou mais caracteres
        if (telInput.length < 9) {  
            alert("Número de telefone incompleto ou inválido! Certifique-se de ter 9 dígitos.");
            return;  // Impede o envio do formulário caso o telefone seja inválido
        }
    
        // Verifica se todos os campos estão preenchidos corretamente
        if (emailInput && senhaInput && telInput.length >= 9) {
            // Obtém o usuário do localStorage
            const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
            
            if (!usuarioLogado || !usuarioLogado.idUsuario) {
                alert("Usuário não encontrado.");
                return; // Interrompe se o usuário não for encontrado
            }
    
            const payload = {
                email: emailInput,
                senha: senhaInput,
                telefone: telInput
            };
    
            console.log('Payload enviado:', payload); // Log para verificação
    
            // Envia os dados para a API usando PUT (para atualizar)
            fetch(`http://localhost:8080/usuario/${usuarioLogado.idUsuario}`, { // Adiciona o ID do usuário na URL
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro ao enviar dados: ${response.status} - ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                alert('Dados atualizados com sucesso!');
                console.log('Resposta da API:', data);
            })
            .catch(error => {
                console.error('Erro ao enviar dados:', error);
                alert(`Erro: ${error.message}`);
                console.log(payload)
            });
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    }