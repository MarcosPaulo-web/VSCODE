document.addEventListener('DOMContentLoaded', async () => {
    try {
        await carregarUsuarios();
        await carregarTema();
        console.log("Carregamento concluído");
    } catch (error) {
        console.error("Erro no carregamento inicial:", error);
    }
});

async function carregarUsuarios() {
    try {
        const response = await fetch(`http://localhost:8080/usuario`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }

        const data = await response.json();
        usuarios = data; // Armazena os usuários retornados pela API
        console.log("Usuários carregados:", usuarios);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error.message);
    }
}

let usuarios = []; // Lista de usuários carregados da API

function carregarTema() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const img = document.getElementById('imgTheme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        img.src = '../Img/ligthMode.png';
    } else {
        body.classList.add('light');
        img.src = '../Img/darckMode.png';
    }
}

async function carregarUsuarios() {
    try {
        const response = await fetch(`http://localhost:8080/usuario`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }

        const data = await response.json();
        usuarios = data; // Armazena os usuários retornados pela API
        console.log("Usuários carregados:", usuarios);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error.message);
    }
}

function verificar(event) {
    event.preventDefault(); 
    const email = document.getElementById("InputEmail").value;
    const senha = document.getElementById("InputPassword").value;

    // Busca o usuário correspondente
    const usuarioEncontrado = usuarios.find(usuario => email === usuario.email && senha === usuario.senha);

    if (usuarioEncontrado) {
        console.log("Usuário encontrado:", usuarioEncontrado);
        window.location.href = "../HTML/TelaPrincipal.html"; // Redireciona para a próxima página
    } else {
        alert("Seu email ou senha estão incorretos");
    }
}

function mudarTema() {
    const body = document.body;
    const img = document.getElementById('imgTheme');
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        img.src = "../Img/ligthMode.png";
        localStorage.setItem('theme', 'dark'); // Salva o tema no localStorage
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = '../Img/darckMode.png';
        localStorage.setItem('theme', 'light');
    }
}
