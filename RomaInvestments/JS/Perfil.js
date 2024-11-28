document.addEventListener('DOMContentLoaded', async () => {

        await carregarTema();
        await  pegarUsuario();
 
});

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

function pegarUsuario(){
    let usuario = [];
    usuario = localStorage.getItem('usuario')
    console.log(usuario)
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
