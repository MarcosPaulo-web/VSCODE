 // Alterna a exibição do menu suspenso
 function toggleDropdown() {
    const menu = document.getElementById('meuPerfilMenu');
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
}

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    const menu = document.getElementById('meuPerfilMenu');
    const btn = document.getElementById('meuPerfilBtn');
    if (!btn.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// Alterna entre tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeButton = document.querySelector('.theme-toggle');
    themeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️ Tema' : '🌙 Tema';
}