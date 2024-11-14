document.addEventListener("DOMContentLoaded", function () {

    carregarProdutos()

    async function carregarProdutos() {
        try {
            const response = await fetch(`https://mocki.io/v1/aa103b37-7e82-40f3-8c53-c22f50524e67`); // Aguarda a resposta da requisição
            if (!response.ok) {
                throw new Error(`Erro ao buscar produtos: ${response.status}`);
            }

            const data = await response.json(); // Aguarda a conversão para JSON
            dados = data; // Supondo que a resposta já seja uma lista de produtos
            console.log(dados)
            displayHistorico(dados);
        } catch (error) {
            console.error('Erro:', error.message);
            displayHistorico.innerHTML = `<p>Erro ao carregar produtos: ${error.message}</p>`;
        }
    }

    function displayHistorico(dados) {
        const historico = document.getElementById('historico');
        historico.innerHTML = dados.map(dado => `
        <div class="card" style="width: 18rem;">
  <div class="card-header">
    Tubarão
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Data do Evento : ${dado.Data_Registro}</li>
    <li class="list-group-item">Descrição : ${dado.descricao_tipologia}</li>
    <li class="list-group-item">Danos Humanos : ${dado.DH_total_danos_humanos}</li>
    <li class="list-group-item">Danos Materiais : ${dado.DM_total_danos_materiais}</li>
    <li class="list-group-item">Mortos : ${dado.DH_MORTOS}</li>
  </ul>
</div>
  
        `
        )
    }

    function atualizarCorNavbar() {
        const agora = new Date();
        const horas = agora.getHours();
        const min = agora.getMinutes();
        if (horas < 6) {
            // Gradiente para antes das 6h
            navbar.style.background = 'linear-gradient(90deg, #00008B, #0000CD)'; // Azul Escuro
        } else if (horas >= 6 && horas < 8) {
            // Gradiente para das 6h às 8h
            navbar.style.background = 'linear-gradient(90deg, #ADD8E6, #87CEFA)'; // Azul Claro
        } else if (horas >= 8 && horas < 15) {
            // Gradiente para das 8h às 15h
            navbar.style.background = 'linear-gradient(90deg, #FFD700, #FFEA00)'; // Amarelo
        } else if (horas >= 15 && horas < 18) {
            // Gradiente para das 15h às 18h
            navbar.style.background = 'linear-gradient(90deg, #FF4500, #FF6347)'; // Laranja Escuro
        } else {
            // Gradiente para das 18h às 6h
            navbar.style.background = 'linear-gradient(90deg, #00008B, #0000CD)'; // Azul Escuro
        }
    }

    atualizarCorNavbar();
    setInterval(atualizarCorNavbar, 60000); // Atualiza a cada hora

    // Defina seus dados de preços e datas
    var series = {
        monthDataSeries1: {
            prices: [100, 200, 150, 300, 250], // Exemplo de dados de preços
            dates: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01", "2023-05-01"] // Exemplo de datas
        }
    };

    // Opções do gráfico de área
    var areaOptions = {
        series: [{
            name: " Nível do rio",
            data: series.monthDataSeries1.prices
        }],
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth' // Pode mudar para 'straight' se preferir
        },
        title: {
            text: 'Nível do rio',
            align: 'left'
        },
        labels: series.monthDataSeries1.dates,
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            title: {
                text: 'Nível (metros)' // Adicionando um título ao eixo Y
            },
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        }
    };

    // Criação do gráfico de área
    var chartArea = new ApexCharts(document.querySelector("#chart"), areaOptions);
    chartArea.render();

    // Função para atualizar o relógio
    function atualizarRelogio() {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');

        document.getElementById('relogio').textContent = `${horas}:${minutos} ${horas >= 12 ? 'PM' : 'AM'}`;
    }

    // Atualiza o relógio a cada 1 segundo (1000ms)
    setInterval(atualizarRelogio, 1000);

    // Exibe a hora imediatamente ao carregar a página
    atualizarRelogio();

    // Interação com links
    const links = document.querySelectorAll('.dropdown-menu .dropdown-item');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Previne o comportamento padrão do link
            const bairroId = link.id; // Pega o ID do link
            document.getElementById('bairro-selecionado').innerHTML = `<h2><b>Bairro: ${bairroId}</b></h2>`; // Atualiza o HTML
        });
    });

    // Inicializa o valor radial
    var valorRadial = 30;

    // Opções do gráfico radial
    var radialOptions = {
        series: [valorRadial], // Ajuste o valor inicial
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff', // fundo da legenda
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: '#fff', // fundo da linha
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888', // legenda
                        fontSize: '17px'
                    },
                    value: {
                        formatter: function (val) {
                            return parseInt(val);
                        },
                        color: '#111', // letra
                        fontSize: '36px',
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ff0000'], // começo da barra
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        // Aqui, definimos as labels com base no valor
        labels: [`${valorRadial >= 70 ? "perigo de enchente" : "normal"}`], // Exibe a label baseada no valor
    };

    // Criação do gráfico radial
    var chartRadial = new ApexCharts(document.querySelector("#chartRadial"), radialOptions);
    chartRadial.render();

});
