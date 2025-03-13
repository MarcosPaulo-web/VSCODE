

function buttonPerfil() {
    // Seleciona o elemento da div que contém o perfil
    let perfilDiv = document.querySelector(".perfilClose");

    // Verifica se a classe 'perfilOpen' já está presente
    if (perfilDiv.classList.contains("perfilOpen")) {
        // Se já estiver aberto, remove a classe para fechar
        perfilDiv.classList.remove("perfilOpen");
    } else {
        // Se estiver fechado, adiciona a classe para abrir
        perfilDiv.classList.add("perfilOpen");
    }
}