document.addEventListener('DOMContentLoaded', async () => {

    await pegarUsuario();

});



function pegarUsuario() {
    let usuario = [];
    usuario = localStorage.getItem('usuario')
    console.log(usuario)
    usuario = JSON.parse(usuario); // Converte a string JSON de volta para objeto
    setDataUsuario(usuario);
}

function setDataUsuario(usuario){
    const inputNome = document.getElementById("InputNome");
    const inputEmail = document.getElementById("InputEmail");
    const inputSenha = document.getElementById("InputPassword")
    const inputTelefone = document.getElementById("InputTelefone")
    inputNome.value = "sem nome"
    inputEmail.value = usuario.email || "sem email";
    inputSenha.value = usuario.senha  || "sem senha";
    inputTelefone.value = usuario.telefone || "000000000"
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

function logout(){
    localStorage.setItem('usuario','')
    window.location.href ="../HTML/TelaLogin.html"
    alert("Usuario deslogado com sucesso")
}


