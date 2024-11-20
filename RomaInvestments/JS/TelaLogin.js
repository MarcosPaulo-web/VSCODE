
document.addEventListener('DOMContentLoaded', async () => {

  
    await carregarTema();
    await carregarUsuarios();


});

let usuarios = [];
let acoes = [];

function carregarTema(){
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
        const response = await fetch(`http://localhost:8080/usuario`); // Aguarda a resposta da requisição
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

function verificar() {
    event.preventDefault();

    const email = document.getElementById("InputEmail").value
    const senha = document.getElementById("InputPassword").value
    const usuarioEncontrado = usuarios.find(usuario => email == usuario.email && senha == usuario.senha)

    if (usuarioEncontrado) {

        email.value = ""
        senha.value = ""
        window.location.href = "../TelaPrincipal/TelaPrincipal.html";  // Substitua pela URL para onde deseja redirecionar
        console.log("Usuario Encontrado")

    } else {
        alert("seu email ou senhas estão incorretos")
    }

}




function mudarTema(){
    const body = document.body;
    const img = document.getElementById('imgTheme')
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        img.src = "../Img/ligthMode.png"

        localStorage.setItem('theme', 'dark'); // Salva o tema no localStorage

    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = '../Img/darckMode.png'

        localStorage.setItem('theme','light')
    }
}

