document.addEventListener('DOMContentLoaded', async () => {
    await carregarUsuarios();
});
let usuarioEncontrado = []

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
        console.log("Usuários carregados:", usuarios);

    }
}

function pegarUsuario(usuarios) {
    let usuarioLocalStorage = [];
    usuarioLocalStorage = localStorage.getItem('usuario')
    console.log(usuarioLocalStorage)
    if (usuarioLocalStorage != '') {
        usuarioLocalStorage = JSON.parse(usuarioLocalStorage);
        usuarioEncontrado = acharUsuario(usuarios, usuarioLocalStorage)
        console.log(usuarioEncontrado)
        setDataUsuario(usuarioEncontrado);
    } else {
        let tamanhoArray = usuarios.length - 1;
        usuarioEncontrado = usuarios[tamanhoArray]
        setDataUsuario(usuarioEncontrado);
        console.log(usuarioLocalStorage)
    }
}

function acharUsuario(usuarios, usuarioLocalStorage) {
    return usuarioEncontrado = [...usuarios].find(usuario => usuario.idUsuario === usuarioLocalStorage.idUsuario);
}

function setDataUsuario(usuarioEncontrado) {
    const inputNome = document.getElementById("InputNome");
    const inputEmail = document.getElementById("InputEmail");
    const inputSenha = document.getElementById("InputPassword")
    const inputTelefone = document.getElementById("InputTelefone")
    inputNome.value = "sem nome"
    inputEmail.value = usuarioEncontrado.email || "sem email";
    inputSenha.value = usuarioEncontrado.senha || "sem senha";
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

function logout() {
    localStorage.setItem('usuario', '')
    window.location.href = "../HTML/TelaLogin.html"
    alert("Usuario deslogado com sucesso")
}



function putUsuario(event) {
    event.preventDefault();
    const emailIn = document.getElementById('InputEmail').value;
    const senhaIn = document.getElementById('InputPassword').value;
    const telIn = document.getElementById('InputTelefone').value;
    if (emailIn && senhaIn && telIn) {
        const payload = {
            email: emailIn,
            senha: senhaIn,
            telefone: telIn
        };
        console.log('Payload enviado:', payload); // Log do payload


        fetch(`http://localhost:8080/usuario/${usuarioEncontrado.idUsuario}`, {
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
            })
            .catch(error => {
                alert(`Erro: ${error.message}`);
                console.log(error.message)
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};