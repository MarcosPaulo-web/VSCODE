const table = document.getElementById("tabelaMotoristas").getElementsByTagName('tbody')[0];

document.addEventListener('DOMContentLoaded', async () => {
    const motoristas = [
        { id: 1, nome: "João Silva", cnh: "1234567890" },
        { id: 2, nome: "Maria Oliveira", cnh: "9876543210" },
        { id: 3, nome: "Carlos Pereira", cnh: "4561237890" },
        { id: 4, nome: "Fernanda Souza", cnh: "7894561230" }
    ];

    displayMotorista(motoristas);
    await carregarProdutos();
});

function displayMotorista(motoristas) {
    table.innerHTML = motoristas.map(motorista => `
        <tr>
            <td>${motorista.id}</td>
            <td>${motorista.nome}</td>
            <td>${motorista.cnh}</td>
            <td>
                <button type="button" class="btn btn-primary">Editar</button>
                <a href="../Encomendas/encomendas.html">
                    <button type="button" class="btn btn-primary">Visualizar</button>
                </a>
                <button type="button" class="btn btn-danger">Excluir</button>
            </td>
        </tr>
    `).join('');
}
