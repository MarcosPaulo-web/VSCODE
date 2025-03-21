document.addEventListener('DOMContentLoaded', async () => {
    await carregarNavbar()
});

document.addEventListener("DOMContentLoaded", () => {
    const perfil = document.querySelector('.perfilClose');
    const overlay = document.querySelector('.blurOff');
    const btnPerfil = document.getElementById('btnPerfil');

    btnPerfil.addEventListener('click', () => {
        perfil.classList.toggle('perfilOpen'); // Abre/fecha o perfil
        overlay.classList.toggle('blurOn'); // Ativa/desativa o blur no fundo
    });
});

// toogle = se o nome estiver presente remove, se não o adiciona

async function carregarNavbar() {
    try {
        const navbarResponse = await fetch('NavbarHome.html');
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