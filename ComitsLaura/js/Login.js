document.addEventListener("DOMContentLoaded", function () {
    let inputEmail = document.getElementById('Email')
})
function alertSenha() {
    alert('irineu vc não sabe e nem eu');
}


function evitarEspaco(event) {/* 
    Dentro da função, a primeira coisa que acontece é uma verificação se a tecla pressionada é um espaço. 
    O objeto event tem uma propriedade chamada key que retorna o valor da tecla pressionada (neste caso, ' ' para o espaço). 
    Se a tecla pressionada for o espaço, ou se o código da tecla for 32 (que é o código da tecla de espaço), 
    a condição se torna verdadeira.
    */
    // Verifica se a tecla pressionada é um espaço (código 32)
    if (event.key === ' ' || event.keyCode === 32) {
        event.preventDefault(); // Esse método impede que a ação padrão do evento ocorra. No caso de um evento de teclado, 
                               // ele impede a inserção do caractere no campo de entrada.
    }
}