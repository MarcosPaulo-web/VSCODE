document.addEventListener('DOMContentLoaded', async () => {
    carregarUsuario(localStorage.getItem('usuario'));
    console.log(localStorage.getItem('usuario'))
});

let usuarios = [];

async function carregarUsuario(id_cliente) {
    try {
        const response = await fetch(`http://localhost:8080/cliente/${id_cliente}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }

        const data = await response.json();
        usuario = data;
        pegarUsuario(usuario)
        // Armazena os usuários retornados pela API
        console.log("Usuários carregado:", usuario);
    } catch (error) {
        console.error('Erro ao carregar usuário:', error.message);
    }
}



function pegarUsuario(usuario) {

        setDataUsuario(usuario);

}

function setDataUsuario(usuarioEncontrado) {
    const inputNome = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputSenha = document.getElementById("password")
    const inputTelefone = document.getElementById("phone")
    const inputCpf = document.getElementById("cpf")
    inputNome.value = usuarioEncontrado.nome_cliente || " sem nome "
    inputEmail.value = usuarioEncontrado.email || "sem email";
    inputSenha.value = usuarioEncontrado.senha || "sem senha";
    inputTelefone.value = usuarioEncontrado.telefone || "000000000"
    inputCpf.value = usuarioEncontrado.cpf || "000000000"
}


function showEditar(event) {
    event.preventDefault(event);  // Evita o comportamento padrão (recarregar a página)
    const inputNome = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputSenha = document.getElementById("password")
    const inputTelefone = document.getElementById("phone")
    const inputCpf = document.getElementById("cpf")
    inputNome.readOnly = false;
    inputEmail.readOnly = false;
    inputSenha.readOnly = false;
    inputTelefone.readOnly = false;
    inputCpf.readOnly = false;
}


function putUsuario(event) {
    event.preventDefault();
    const inputNome = document.getElementById("name").value;
    const inputEmail = document.getElementById("email").value;
    const inputSenha = document.getElementById("password").value
    const inputTelefone = document.getElementById("phone").value
    const inputCpf = document.getElementById("cpf").value

    if (inputNome && inputEmail && inputSenha && inputTelefone && inputCpf) {
        const payload = {
            nome_cliente: inputNome,
            telefone: inputTelefone,
            email: inputEmail,
            senha: inputSenha,
            cpf: inputCpf
        };
        console.log('Payload enviado:', payload); // Log do payload

        fetch(`http://localhost:8080/cliente/${localStorage.getItem('usuario')}`, {
            method: 'PUT',
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
                alert('Dados alterados com sucesso!');
                console.log('Resposta da API:', data);
                posEditar();
            })
            .catch(error => {
                alert(`Erro: ${error.message}`);
                console.log(error.message)
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};

function posEditar() {

    const inputNome = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputSenha = document.getElementById("password")
    const inputTelefone = document.getElementById("phone")
    const inputCpf = document.getElementById("cpf")
    inputNome.readOnly = true;
    inputEmail.readOnly = true;
    inputSenha.readOnly = true;
    inputTelefone.readOnly = true;
    inputCpf.readOnly = true;
}

function logout() {
    localStorage.setItem('usuario', '')
    window.location.href = "../HTML/TelaPrincipal.html"
    alert("Usuario deslogado com sucesso")
}


function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}