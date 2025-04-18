function toggleTheme() {
    document.body.classList.toggle('dark');
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        await carregarAcessos();
        await carregarFeedback();
        updateRelatorio();
    } catch (error) {
        console.error("Erro no carregamento inicial de usuarios:", error.message);
    }

//////////////
document.querySelectorAll('input[name="relatorio"]').forEach(radio => {
    radio.addEventListener('change', updateRelatorio);
});

// Função para atualizar o relatório em tempo real
function updateRelatorio() {
    const selecionado = document.querySelector('input[name="relatorio"]:checked').id;

    // Chama as funções de exibição com base na seleção
    if (selecionado === 'anual') {
        displayAcessos();
        displayFeedback();
        displayFaturamento();
    } else if (selecionado === 'mensal') {
        displayAcessos();
        displayFeedback();
        displayFaturamento();
    }
}
////////////
});
let selecionado;
let acessos = []
let feedbacks = []
const faturamento = {
    faturamentoPorMes: [
        { mes: "Janeiro", ano: 2023, faturamento: 5000, lucro: 1000 },
        { mes: "Fevereiro", ano: 2023, faturamento: 6000, lucro: 1200 },
        { mes: "Março", ano: 2023, faturamento: 7000, lucro: 1500 }
    ],
    faturamentoPorAno: [
        { ano: 2023, faturamentoTotal: 18000, lucroTotal: 3700 }
    ]
};

async function carregarAcessos() {
    try {
        const response = await fetch('http://localhost:8080/acesso');
        if (!response.ok) {
            throw new Error(`Erro ao buscar acessos: ${response.status}`);
        }
        const data = await response.json();
        acessos = data;
        console.log("acessos carregados:", acessos);
    } catch (error) {
        console.error('Erro ao carregar acessos:', error.message);
    }
}


async function carregarFeedback() {
    try {
        const response = await fetch('http://localhost:8080/feedback');
        if (!response.ok) {
            throw new Error(`Erro ao buscar feedback: ${response.status}`);
        }
        const data = await response.json();
        feedbacks = data;
        console.log("feedback carregados:", feedbacks);
    } catch (error) {
        console.error('Erro ao carregar feedback:', error.message);
    }
}

function displayAcessos() {
    const container = document.getElementById('content');
    const selecionado = document.querySelector('input[name="relatorio"]:checked').id;

    let acessosFiltrados = [];

    if (selecionado === 'anual') {
        const acessosPorAno = {};
        acessos.forEach(acesso => {
            const ano = new Date(acesso.data_acesso).getFullYear();
            if (!acessosPorAno[ano]) {
                acessosPorAno[ano] = [];
            }
            acessosPorAno[ano].push(acesso);
        });

        // Transforma o objeto em um array para exibição
        acessosFiltrados = Object.entries(acessosPorAno).map(([ano, acessosAno]) => ({
            ano,
            quantidade: acessosAno.length,
        }));

        container.innerHTML = `
            <div class="acessos-anual">
                <h1>Acessos Anuais</h1>
                ${acessosFiltrados.map(acesso => `
                    <div class="card">
                        <p>Ano: ${acesso.ano}</p>
                        <p>Total de Acessos: ${acesso.quantidade}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (selecionado === 'mensal') {
        // Filtro para acessos mensais
        const acessosPorMes = {};
        acessos.forEach(acesso => {
            const data = new Date(acesso.data_acesso);
            const chave = `${data.getFullYear()}-${data.getMonth() + 1}`;
            if (!acessosPorMes[chave]) {
                acessosPorMes[chave] = [];
            }
            acessosPorMes[chave].push(acesso);
        });

        // Transforma o objeto em um array para exibição
        acessosFiltrados = Object.entries(acessosPorMes).map(([chave, acessosMes]) => {
            const [ano, mes] = chave.split('-');
            return {
                ano,
                mes: parseInt(mes),
                quantidade: acessosMes.length,
            };
        });

        container.innerHTML = `
            <div class="acessos-mensal">
                <h1>Acessos Mensais</h1>
                ${acessosFiltrados.map(acesso => `
                    <div class="card">
                        <p>Ano: ${acesso.ano}</p>
                        <p>Mês: ${acesso.mes}</p>
                        <p>Total de Acessos: ${acesso.quantidade}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        container.innerHTML = `<p>Nenhum relatório selecionado.</p>`;
    }
}

function displayFeedback() {
    const container = document.getElementById('content');

    // Verifica o valor selecionado no botão de rádio
    const selecionado = document.querySelector('input[name="relatorio"]:checked').id;

    if (selecionado === 'anual') {
        // Exibe as porcentagens anuais
        const anos = [...new Set(feedbacks.map(feedback => new Date(feedback.data_feedback).getFullYear()))]; // Extrai os anos únicos

        container.innerHTML = `
            <div class="feedback-anual" id="feedback">
                <h1>Porcentagem de Notas por Ano</h1>
                ${anos.map(ano => {
                    const feedbackAno = feedbacks.filter(feedback => new Date(feedback.data_feedback).getFullYear() === ano);
                    const notasAno = feedbackAno.map(feedback => feedback.nota);
                    const porcentagensAno = calcularPorcentagens(notasAno);
                    return `
                        <div class="card">
                            <h2>Ano: ${ano}</h2>
                            ${Object.entries(porcentagensAno).map(([nota, percentual]) => `
                                <h3>Nota ${nota}: ${percentual}%</h3>
                            `).join('')}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } else if (selecionado === 'mensal') {
        // Exibe as porcentagens mensais
        const meses = [...new Set(feedbacks.map(feedback => new Date(feedback.data_feedback).getMonth()))]; // Extrai os meses únicos

        container.innerHTML = `
            <div class="feedback-mensal" id="feedback">
                <h1>Porcentagem de Notas por Mês</h1>
                ${meses.map(mes => {
                    const feedbackMes = feedbacks.filter(feedback => new Date(feedback.data_feedback).getMonth() === mes);
                    const notasMes = feedbackMes.map(feedback => feedback.nota);
                    const porcentagensMes = calcularPorcentagens(notasMes);
                    return `
                        <div class="card">
                            <h2>Mês: ${new Date(2023, mes).toLocaleString('default', { month: 'long' })}</h2>
                            ${Object.entries(porcentagensMes).map(([nota, percentual]) => `
                                <h3>Nota ${nota}: ${percentual}%</h3>
                            `).join('')}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } else {
        container.innerHTML = `<p>Nenhum relatório selecionado.</p>`;
    }
}




function carregarNomeCliente(idCliente) {
    try {
        const response = fetch(`http://localhost:8080/cliente/${idCliente}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }
        const data = response.json();
        const usuario = data;
        return usuario.nome_cliente;
    } catch (error) {
        console.error('Erro ao carregar usuário:', error.message);
    }
}
function carregarNomeFreelancer(idFreelancer) {
    try {
        const response = fetch(`http://localhost:8080/cliente/${idFreelancer}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }
        const data = response.json();
        const freelancer = data;
        return freelancer.nome_freelancer;
    } catch (error) {
        console.error('Erro ao carregar usuário:', error.message);
    }
}
///////////////////////////////////////////////////////////////////////////////

function calcularPorcentagens(notas) {
    // Contagem total de notas
    const total = notas.length;

    // Inicializa um objeto para armazenar as contagens
    const contagens = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };

    // Conta as ocorrências de cada nota
    notas.forEach(nota => {
        if (contagens[nota] !== undefined) {
            contagens[nota]++;
        }
    });

    // Calcula as porcentagens
    const porcentagens = {};
    for (let nota in contagens) {
        porcentagens[nota] = ((contagens[nota] / total) * 100).toFixed(2);
    }

    return porcentagens;
}

// Exemplo de uso
const porcentagens = calcularPorcentagens(notas);

function displayFaturamento() {
    const container = document.getElementById('content');

    if (!container) {
        console.error('Elemento com ID "content" não encontrado.');
        return;
    }

    // Verifica o valor selecionado no botão de rádio
    const selecionado = document.querySelector('input[name="relatorio"]:checked').id;

    if (selecionado === 'anual') {
        // Renderiza o faturamento anual
        container.innerHTML = `
            <div class="faturamento-anual">
                <h1>Faturamento Anual</h1>
                ${faturamento.faturamentoPorAno.map(anoData => `
                    <div class="card">
                        <p>Ano: ${anoData.ano}</p>
                        <p>Faturamento Total: R$ ${anoData.faturamentoTotal.toLocaleString('pt-BR')}</p>
                        <p>Lucro Total: R$ ${anoData.lucroTotal.toLocaleString('pt-BR')}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (selecionado === 'mensal') {
        // Renderiza o faturamento mensal
        container.innerHTML = `
            <div class="faturamento-mensal">
                <h1>Faturamento Mensal</h1>
                ${faturamento.faturamentoPorMes.map(mesData => `
                    <div class="card">
                        <p>Ano: ${mesData.ano}</p>
                        <p>Mês: ${mesData.mes}</p>
                        <p>Faturamento: R$ ${mesData.faturamento.toLocaleString('pt-BR')}</p>
                        <p>Lucro: R$ ${mesData.lucro.toLocaleString('pt-BR')}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        container.innerHTML = `<p>Nenhum relatório selecionado.</p>`;
    }
}
