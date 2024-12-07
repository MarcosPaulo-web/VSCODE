document.addEventListener('DOMContentLoaded', async () => {
    try {
        await carregarUsuarios();
        await carregarFreelancer();
        
    } catch (error) {
        console.error("Erro no carregamento inicial de usuarios:", error.message);
    }
});

let usuarios =[]
let frellancers =[]

async function carregarUsuarios() {
    try {
        const response = await fetch(`http://localhost:8080/cliente`);
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

async function carregarFreelancer() {
    try {
        const response = await fetch(`http://localhost:8080/freelancer`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar freelancers: ${response.status}`);
        }

        const data = await response.json();
        frellancers = data; // Armazena os usuários retornados pela API
        console.log("freelancers carregados:", frellancers);
    } catch (error) {
        console.error('Erro ao carregar freelancers:', error.message);
    }
}

function verificar(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginPassword").value;
    // Busca o usuário correspondente
    const usuarioEncontrado = usuarios.find(usuario => email == usuario.email && senha == usuario.senha);
    const frellancersEncontrado = frellancers.find(frellancer => email == frellancer.email && senha == frellancer.senha);

    if (usuarioEncontrado || frellancersEncontrado) {
        
        if (usuarioEncontrado) {
            alert("Logado com sucessoS")
            localStorage.setItem('usuario',usuarioEncontrado.id);
            console.log(usuarioEncontrado)
            window.location.href = "../HTML/TelaLogCliente.html"
        } else if (frellancersEncontrado) {
            alert("Logado com sucessoS")
            window.location.href = "../HTML/TelaLogFree.html";
        }// Redireciona para a próxima página
    } else {
        alert("Seu email ou senha estão incorretos");
    }
}
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Função para alternar entre tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeButton = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeButton.textContent = '☀️ Tema';
    } else {
        themeButton.textContent = '🌙 Tema';
    }
}
