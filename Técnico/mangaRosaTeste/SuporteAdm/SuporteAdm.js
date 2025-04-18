const cardAberto = document.getElementById('card-aberto');
const cardFechado = document.getElementById('card-fechado');
const numeroAberto = document.getElementById('numeroAbertas');
const numeroFechado = document.getElementById('numeroFechadas');
const url = 'https://api.mercadolibre.com/sites/MLB/search?q=roupas';
let chamadas = []; // Adicione esta linha para armazenar os dados das chamadas

document.addEventListener('DOMContentLoaded', async () => {
   await carregarChamadas();
});

async function carregarChamadas() {
   try {
      const resposta = await fetch(url);

      if (!resposta.ok) {
         throw new Error("Erro ao Carregar as chamadas");
      }
      const dados = await resposta.json();
      chamadas = dados.results; // Armazene as chamadas
      console.log(chamadas);
      cardAbertoDislpay(chamadas);
      cardFechadoDislpay(chamadas);
      numeroChamdas(chamadas);
      adicionarListeners(); // Adicione esta chamada
   } catch (error) {
      console.log(`Erro: ${error.message}`);
   }
}

function cardAbertoDislpay(chamadas) {
   const agora = new Date();
   const horas = String(agora.getHours()).padStart(2, 0);
   const min = String(agora.getMinutes()).padStart(2, 0);

   /* DATA-ID = salvar informação */
   cardAberto.innerHTML = chamadas.map(chamada => `
        <button class='mostrarChamada' data-id="${chamada.id}">
            <div class="card" style="width: 18rem;">
                <div class="card-header">Roupa</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${chamada.title}</li>
                    <li class="list-group-item">${chamada.official_store_name}</li>
                    <li class="list-group-item">${`Hora :${horas} : ${min}`}</li>
                </ul>
            </div>
        </button>
    `).join('');
}

function cardFechadoDislpay(chamadas) {
   const agora = new Date();
   const horas = String(agora.getHours()).padStart(2, 0);
   const min = String(agora.getMinutes()).padStart(2, 0);

   cardFechado.innerHTML = chamadas.map(chamada => `
        <button class='mostrarChamada'">
            <div class="card" style="width: 18rem;">
                <div class="card-header">Roupa</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${chamada.title}</li>
                    <li class="list-group-item">${chamada.official_store_name}</li>
                    <li class="list-group-item">${`Hora :${horas} : ${min}`}</li>
                </ul>
            </div>
        </button>
    `).join('');
}

function numeroChamdas(chamadas) {
   numeroAberto.textContent = `Total de Abertas : ${chamadas.length}`; // Total de abertas
   numeroFechado.textContent = `Total de Fechadas : ${chamadas.length}`; // Defina a lógica correta para fechadas
}

function adicionarListeners() {
   const botoes = document.querySelectorAll('.mostrarChamada');
   botoes.forEach(botao => {
      const id = botao.dataset.id; // Pega o id  no data-id
      botao.addEventListener('click', () => abrirChamada(id)); // Passa o id para a função
   });
}

function abrirChamada(id) {
   console.log(`Chamando abrirChamada com id: ${id}`);

   const chamadaAberta = chamadas.find(chamada => chamada.id == id);

   if (chamadaAberta) {
      const display = document.getElementById('responderChamada');
      display.style.display = 'flex';
      const titulo = document.getElementById('tituloChamada');
      titulo.innerHTML = `<h2>${chamadaAberta.title}</h2>`;
   } else {
      console.error('Chamada não encontrada');
   }
}

function fecharDisplay() {
   const display = document.getElementById('responderChamada');
   display.style.display = 'none';
   const text = document.getElementById('resposta')
   text.value = ''
}

// Adiciona o evento de enviar resposta
document.getElementById('enviarResposta').addEventListener('click', () => {
   const resposta = document.getElementById('respostaInput').value;
   console.log(`Resposta enviada: ${resposta}`); // Aqui você pode processar a resposta como necessário
   document.getElementById('respostaInput').value = ''; // Limpa o input após enviar
});
