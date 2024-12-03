document.addEventListener('DOMContentLoaded', async () => {
    await carregarNavbar()
    carregarTema()    
});

function mudarTema() {
    const body = document.body;
    const img = document.getElementById('imgTheme')
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        img.src = '../Img/darckMode.png'
        localStorage.setItem('theme', 'dark'); // Salva o tema no localStorage

    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        img.src = "../Img/ligthMode.png"
        localStorage.setItem('theme', 'light')
    }
}


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


async function carregarNavbar() {
    try {
        const navbarResponse = await fetch('NavbarAdm.html');
        if (navbarResponse.ok) {
            const navbarHtml = await navbarResponse.text();
            document.getElementById('navbar-container').innerHTML = navbarHtml;
        } else {
            console.error('Erro ao carregar a navbar: Arquivo não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao tentar carregar a navbar:', err);
    }
}