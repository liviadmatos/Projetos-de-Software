// =============================================================
//  EsToDoList - CRUD básico de tarefas
//  Autor: Prof. Rafael Ribas
//  Objetivo: Introduzir JavaScript com um exemplo prático
// =============================================================

// -------------------------------
// 1. Selecionar os elementos da página
// -------------------------------
const campoNovaTarefa = document.getElementById('nova-tarefa-input')
const botaoAdicionar = document.getElementById('adicionar-btn')
const listaTarefas = document.getElementById('lista-de-tarefas')
const campoPesquisa = document.getElementById('pesquisa-input')
const seletorFiltro = document.getElementById('filtro-select')

// Array principal que armazenará todas as tarefas
let tarefas = []

// -------------------------------
// 2. Carregar tarefas salvas no navegador (localStorage)
// -------------------------------
function carregarTarefasSalvas() {
  const tarefasSalvas = localStorage.getItem('tarefas')
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas) // converte o texto salvo em array
    exibirTarefas(tarefas)
  }
}

// -------------------------------
// 3. Salvar as tarefas no navegador
// -------------------------------
function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// -------------------------------
// 4. Função para adicionar uma nova tarefa
// -------------------------------
function adicionarTarefa() {
  const texto = campoNovaTarefa.value.trim() // remove espaços extras

  if (texto === '') {
    alert('Digite uma tarefa antes de adicionar!')
    return
  }

  // Criamos um objeto representando a tarefa
  const novaTarefa = {
    id: Date.now(), // cria um número único com base no tempo atual
    texto: texto,
    concluida: false
  }

  // Adicionamos ao array e salvamos
  tarefas.push(novaTarefa)
  salvarTarefas()

  // Atualizamos a lista exibida
  exibirTarefas(tarefas)

  // Limpamos o campo de texto
  campoNovaTarefa.value = ''
}

// -------------------------------
// 5. Função para exibir as tarefas na tela
// -------------------------------
function exibirTarefas(listaParaMostrar) {
  // Limpamos a lista antes de mostrar novamente
  listaTarefas.innerHTML = ''

  // Percorremos todas as tarefas do array
  for (let tarefa of listaParaMostrar) {
    // Criar um elemento <li> para cada tarefa
    const item = document.createElement('li')
    item.className = 'flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition'

    // Adicionamos a classe "concluida" se estiver marcada
    if (tarefa.concluida) {
      item.classList.add('concluida')
    }

    // Criar um span para o texto da tarefa
    const textoTarefa = document.createElement('span')
    textoTarefa.textContent = tarefa.texto
    textoTarefa.className = 'tarefa-texto flex-grow cursor-pointer'
    textoTarefa.onclick = function () {
      alternarConclusao(tarefa.id)
    }

    // Criar os botões de editar e excluir
    const botoes = document.createElement('div')
    botoes.className = 'flex space-x-2'

    const botaoEditar = document.createElement('button')
    botaoEditar.textContent = '✏️'
    botaoEditar.className = 'px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded'
    botaoEditar.onclick = function () {
      editarTarefa(tarefa.id)
    }

    const botaoExcluir = document.createElement('button')
    botaoExcluir.textContent = '🗑️'
    botaoExcluir.className = 'px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded'
    botaoExcluir.onclick = function () {
      excluirTarefa(tarefa.id)
    }

    // Montamos o elemento completo
    botoes.appendChild(botaoEditar)
    botoes.appendChild(botaoExcluir)
    item.appendChild(textoTarefa)
    item.appendChild(botoes)
    listaTarefas.appendChild(item)
  }
}

// Fui até aqui no dia 16/10/2025


// -------------------------------
// 6. Função para alternar entre concluída e ativa
// -------------------------------
function alternarConclusao(id) {
  for (let tarefa of tarefas) {
    if (tarefa.id === id) {
      tarefa.concluida = !tarefa.concluida
    }
  }
  salvarTarefas()
  exibirTarefas(tarefas)
}

// -------------------------------
// 7. Função para editar o texto de uma tarefa
// -------------------------------
function editarTarefa(id) {
  const novaDescricao = prompt('Edite a tarefa:')

  if (novaDescricao === null || novaDescricao.trim() === '') {
    return // se cancelar ou deixar em branco, não faz nada
  }

  for (let tarefa of tarefas) {
    if (tarefa.id === id) {
      tarefa.texto = novaDescricao.trim()
    }
  }
  salvarTarefas()
  exibirTarefas(tarefas)
}

// -------------------------------
// 8. Função para excluir uma tarefa
// -------------------------------
function excluirTarefa(id) {
  const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?')

  if (confirmar) {
    tarefas = tarefas.filter(function (tarefa) {
      return tarefa.id !== id
    })
    salvarTarefas()
    exibirTarefas(tarefas)
  }
}

// -------------------------------
// 9. Função de pesquisa
// -------------------------------
function pesquisarTarefas() {
  const termo = campoPesquisa.value.toLowerCase()
  const filtradas = tarefas.filter(function (tarefa) {
    return tarefa.texto.toLowerCase().includes(termo)
  })
  exibirTarefas(filtradas)
}

// -------------------------------
// 10. Filtro: todos / ativos / concluídos
// -------------------------------
function filtrarTarefas() {
  const tipo = seletorFiltro.value
  let filtradas = []

  if (tipo === 'todos') {
    filtradas = tarefas
  } else if (tipo === 'ativos') {
    filtradas = tarefas.filter(tarefa => !tarefa.concluida)
  } else if (tipo === 'concluidos') {
    filtradas = tarefas.filter(tarefa => tarefa.concluida)
  }

  exibirTarefas(filtradas)
}

// -------------------------------
// 11. Eventos (interações do usuário)
// -------------------------------
botaoAdicionar.addEventListener('click', adicionarTarefa)
campoPesquisa.addEventListener('input', pesquisarTarefas)
seletorFiltro.addEventListener('change', filtrarTarefas)

// -------------------------------
// 12. Permitir adicionar tarefa ao pressionar Enter
// -------------------------------
campoNovaTarefa.addEventListener('keydown', function (evento) {
  // Verifica se a tecla pressionada foi "Enter"
  if (evento.key === 'Enter') {
    adicionarTarefa()
  }
})

// -------------------------------
// 13. Quando a página carregar, buscamos as tarefas salvas
// -------------------------------
window.onload = carregarTarefasSalvas
