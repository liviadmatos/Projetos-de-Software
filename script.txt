// Aprendedo a usar JavaScript

// 1.Selecionar elementos da página

const campoNovaTarefa = document.getElementById
('nova-tarefa-input')
console.log(campoNovaTarefa)
const  boataoAdicionar = document.getElementById('adicionar-btn')
console.log(botaoAdicionar)
const listaTarefas = document.getElementById('lista-de-tarefas')
const campoPesquisa = document.getElementById('pesquisa-input')
const seletorFiltro = document.getElementById('filtro-select')

// Array principal que armazenará todas as tarefas
let tarefas = [] 

// 2. Função para carregar tarefas salvas no navegador (LocalStorage)
function carregarTarefasSalvas (){
    const tarefasSalvas = localStorage.getItem('')
    if (tarefasSalvas){
        tarefas = JSON.parse(tarefasSalvas) //Converte o texto para array
        exibirTarefas(tarefas)

    }
}

// 3. Função que irá salvas as tarefas no navegador
function salvarTarefas(){
    localStorage.setItem('tarefas',JSON.stringify(tarefas))

}

// 4. Função para adicionar uma nova tarefa
function adicionarTarefa(){
    let texto = campoNovaTarefa.value.trim() //remove espaços em branco

    if (textoTarefa === ""){
        alert('Digite uma nova tarefa')
        return
    }
    const novaTarefa = {
        Id: Date.now(),
        texto: textoTarefa,
        concluida: false
    }
    tarefas.push(novaTarefa)
    salvarTarefas()

    exibirTarefas(tarefas)

    campoNovaTarefa.value = ''

    }

// 5. Função para mostrar as tarefas no navegador
function exibirTarefas(listaParaMostrar){
    listaTarefas.innerHTML

    //adicionar novas tarefas
    for (let tarefa of listaParaMostrar){
        const item = document.createElement('li')
        item.className = 'flex justify-between items center p-3 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-1oo transition'
        if (tarefa.concluida){
            item.classList.add('concluida')

            const textoTarefa = document.createElement('span')
            textoTarefa.textContent = tarefa.texto
            textoTarefa.className = 'tarefa-texto flex=grow cursor-pointer'
            textoTarefa.onclick = function(){
                alternarConclusao(tarefa.id)

            const botoes = document.createElement ('div')
            botoes.className = 'flex-space-x-2'

            const botaoEditar = document.createElement('button')
            botaoEditar.className = 'px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded'
            botaoEditar.textContent = "✏"
            botaoEditar.onclick = function(){
                editarTarefa(tarefa.id)
            }
            const botaoExcluir = document.createElement('button')
            botaoExcluir.className = 'px-2 py-1 bg-red-400 hover:bg-red-500 text-white rounded'
            botaoExcluir.textContent = "🗑"
            botaoExcluir.onclick = function(){
                excluirTarefa(tarefa.id)
            }

            //montagem do elemento tarefa
            botoes.appendChild(botaoEditar)
            botoes.appendChild(botaoExcluir)
            item.appendChild(textoTarefa)
            item.appendChild(botoes)
            listaTarefas.appendChild(item)
    
            }
        }
    }
}
