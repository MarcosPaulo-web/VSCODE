document.addEventListener('DOMContentLoaded', async () => {
    await carregarNavbar()
});

function buttonPerfil() {
    // Seleciona o elemento da div que contém o perfil
    let perfilDiv = document.querySelector(".perfilClose");
    let main = document.querySelector(".main");

    // Verifica se a classe 'perfilOpen' já está presente
    if (perfilDiv.classList.contains("perfilOpen")) {
        // Se já estiver aberto, remove a classe para fechar O Container
        perfilDiv.classList.remove("perfilOpen");
        main.classList.remove("main_Ofuscado")
    } else {
        // Se estiver fechado, adiciona a classe para abrir o container 
        perfilDiv.classList.add("perfilOpen");
        main.classList.add("main_Ofuscado");

    }
}


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