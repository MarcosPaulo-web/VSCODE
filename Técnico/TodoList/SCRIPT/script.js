
document.addEventListener('DOMContentLoaded', async () => {

    loadTasks();
    painelInformations(tasks)
});

function atualizarPagina(tasksAtualizadas) {
    painelInformations(tasksAtualizadas)
    showTasks(tasksAtualizadas)
}

let tasks = []
async function loadTasks() {
    try {
        const response = await fetch(`http://localhost:8080/todos`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar to dos: ${response.status}`);
        }

        const data = await response.json();
        tasks = data; // Armazena os usuários retornados pela API
        showTasks(tasks)
        painelInformations(tasks)

        console.log("to dos carregados:", tasks);
    } catch (error) {
        console.error('Erro ao carregar to dos:', error.message);
        console.log("to dos carregados:", tasks);

    }
}

function showTasks(tasks) {
    const list = document.getElementById('lista')
    list.innerHTML = [...tasks].map(task => `
        <li>
            <div class="card">
                <h5 class="card-header">${task.nome}</h5>
                <div class="card-body">
                  <h5 class="card-title">${task.descricao}</h5>
                  <p class="card-text">prioridade : ${task.prioridade}</p>
                  <p class="card-text">${task.realizada ? "completed" : "to do"}</p>
                  <a href="#" class="btn btn-danger" onclick='deletarServico(${task.id})'>Delete</a>
                  <a href="#" class="btn btn-primary" onclick='showEditTask(${task.id})'>edit</a>
                </div>
              </div>
        </li>
        `
    ).join('')
}

function postTask() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    let prioridade = document.getElementById('prioridade').value;

    if (title && desc && prioridade) {
        const payload = {
            nome: title,
            descricao: desc,
            realizada: false,
            prioridade: prioridade
        };
        console.log('Payload enviado:', payload); // Log do payload

        fetch('http://localhost:8080/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao enviar dados: ${response.status}`);
                }
                return response.json(); // Adicione esta linha para retornar o JSON da resposta
            })
            .then(data => {
                console.log('Resposta da API:', data);
                mostrarAlertaPost('Task postada com sucesso !! ', 3000)
                atualizarPagina(data)
                hiddenPostTask()
            })
            .catch(error => {
                alert(`Erro: ${error.message}`);
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function deletarServico(idTask) {

    console.log("id servico :" + idTask)

    fetch(`http://localhost:8080/todos/${idTask}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || `Erro ao deletar TASK : ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            atualizarPagina(data)
            hiddenPostTask()
            mostrarAlertaDelete('A tarefa foi deletada com sucesso!', 3000); // 3000 milissegundos = 3 segundos
        })
        .catch(error => {
            console.error('Erro:', error.message);
        });

}

function mostrarAlertaDelete(mensagem, tempo) {
    let alerta = document.createElement('div');
    alerta.textContent = mensagem;
    alerta.style.position = 'fixed';// normalmente usado em alerts
    alerta.style.width = 'auto';
    alerta.style.bottom = '10px';
    alerta.style.right = '10px';
    alerta.style.backgroundColor = 'red';
    alerta.style.color = 'white';
    alerta.style.padding = '10px';
    alerta.style.border = '1px solidrgb(252, 0, 25)';
    alerta.style.borderRadius = '5px';
    alerta.style.transition = 'ease 1.5s';

    document.body.appendChild(alerta);
    setTimeout(() => { alerta.remove(); }, tempo);
}
function mostrarAlertaPost(mensagem, tempo) {
    let alerta = document.createElement('div');
    alerta.textContent = mensagem;
    alerta.style.position = 'fixed';
    alerta.style.width = 'auto';
    alerta.style.bottom = '10px';
    alerta.style.right = '10px';
    alerta.style.backgroundColor = 'blue';
    alerta.style.color = 'white';
    alerta.style.padding = '10px';
    alerta.style.border = '1px solidrgb(252, 0, 25)';
    alerta.style.borderRadius = '5px';
    alerta.style.transition = 'ease 1.5s';
    document.body.appendChild(alerta);
    setTimeout(() => { alerta.remove(); }, tempo);
}

function painelInformations(tasks) {
    let numCompleted = 0; // Use 'let' para permitir a alteração de valor
    let numTotal = 0;
    [...tasks].forEach(task => {
        if (task.realizada == true) {
            numCompleted += 1; // Incrementa a contagem de tarefas realizadas
            numTotal += 1; // Incrementa a contagem de tarefas realizadas
        } else {
            numTotal += 1;
        }
    });
    console.log(`Número de tarefas concluídas: ${numCompleted}`);
    let numbers = document.getElementById('numbers')
    numbers.innerHTML = `${numCompleted}/${numTotal}`
    calcularValorPorcentagem(numCompleted, numTotal)
}

function calcularValorPorcentagem(concluidas, total) {
    let porcentagem = (concluidas / total) * 100;  // Calcula a porcentagem de tarefas concluídas
    let loadBar = document.getElementById('loaded');
    loadBar.style.width = `${porcentagem}%`;  // A largura da barra será baseada na porcentagem calculada
}

function showPostTask() {
    let cardPost = document.getElementById('post-task')
    let editCard = document.getElementById('edit-task')
    let listaTasks = document.getElementById('lista')
    editCard.style.display = 'none'
    cardPost.style.display = 'flex'
    listaTasks.style.display = 'none';
}

function hiddenPostTask() {
    let editCard = document.getElementById('edit-task')
    let cardPost = document.getElementById('post-task')
    let listaTasks = document.getElementById('lista')
    cardPost.style.display = 'none'
    listaTasks.style.display = 'flex';
    editCard.style.display = 'none'

}

let taskIdEdit = 0 ;

function showEditTask(idTask) {
    let editCard = document.getElementById('edit-task')
    let listaTasks = document.getElementById('lista')
    editCard.style.display = 'flex'
    listaTasks.style.display = 'none';
    taskIdEdit = idTask;
    showInformationsEditCard(idTask)
}

function hiddenEditTask() {
    let editCard = document.getElementById('edit-task')
    let listaTasks = document.getElementById('lista')
    editCard.style.display = 'none'
    listaTasks.style.display = 'flex';


    let title_edit = document.getElementById('title-edit')
    let desc_edit = document.getElementById('desc-edit');
    let prioridade_edit = document.getElementById('prioridade-edit');
    let realizado = document.getElementById('realizado')
    title_edit.value = ''
    desc_edit.value = ''
    prioridade_edit.value = ''
    realizado.value = ''
}

function showInformationsEditCard(idTask) {

    let TaskEncontrada = [...tasks].find(task => task.id == idTask)

    let title_edit = document.getElementById('title-edit')
    let desc_edit = document.getElementById('desc-edit');
    let prioridade_edit = document.getElementById('prioridade-edit');
    let radioToDo = document.getElementById('todo');
    let radioConclued = document.getElementById('Conclued');

    title_edit.value = TaskEncontrada.nome
    desc_edit.value = TaskEncontrada.descricao
    prioridade_edit.value = TaskEncontrada.prioridade
    TaskEncontrada.realizada ? radioConclued.checked = true : radioToDo.checked = true;
}

function putTask(event) {
    event.preventDefault();
    let idTask = taskIdEdit;
    let title_edit = document.getElementById('title-edit')
    let desc_edit = document.getElementById('desc-edit');
    let prioridade_edit = document.getElementById('prioridade-edit');
    let radioConclued = getSelectedRadio()
    console.log(idTask)
    
    if (idTask && title_edit && desc_edit && prioridade_edit ) {
        const payload = {
            id: idTask,
            nome: title_edit,
            descricao: desc_edit,
            prioridade: prioridade_edit,
            realizada: radioConclued
        };
        console.log('Payload enviado:', payload); // Log do payload


        fetch(`http://localhost:8080/todos/${idTask}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao enviar dados: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('Dados alterados com sucesso!');
                console.log('Resposta da API:', data);
                posEditar();
            })
            .catch(error => {
                alert(`Erro: ${error.message}`);
                console.log(error.message)
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};

function getSelectedRadio(){

    const selecionado = document.querySelector(`input[name="realizado"]:checked`)
    if(selecionado.id == 'todo')
        return false
    else{
        return true
    }
}

