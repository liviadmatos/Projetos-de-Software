// =============================================================
//  EsToDoList - CRUD básico de tarefas
//  Baseado no modelo do Professor, adaptado para index.html
//  Objetivo: Introduzir JavaScript com um exemplo prático
// =============================================================

// -------------------------------
// 1. Selecionar os elementos da página (Adaptação para index.html)
// -------------------------------
// IDs no index.html:
// Input de Nova Tarefa: 'new-task-input'
// Botão Adicionar: 'add-task-btn'
// Lista de Tarefas: 'task-list'
// Input de Pesquisa: (Não tem ID, vamos usar a tag/classe/atributo se o HTML fosse interativo,
// mas para seguir o modelo, vamos selecionar pelo placeholder 'Buscar tarefas...')
// Seletor de Filtro: (Não tem <select>, os filtros são botões. Vamos adaptar a lógica.)

const campoNovaTarefa = document.getElementById('new-task-input');
const botaoAdicionar = document.getElementById('add-task-btn');
const listaTarefas = document.getElementById('task-list');

// No seu HTML, o campo de busca não tem ID. Vamos usar a classe,
// ou simplesmente buscar o primeiro input com o placeholder de busca
const campoPesquisa = document.querySelector('input[placeholder="Buscar tarefas..."]');

// No seu HTML, o filtro é feito com botões: 'Todas', 'Concluídas', 'Pendentes'
const botoesFiltro = document.querySelectorAll('.flex.justify-center.space-x-4 button');

// Array principal que armazenará todas as tarefas
let tarefas = [];

// Variável para rastrear o filtro ativo (usado pelos botões de filtro)
let filtroAtual = 'todos'; // Pode ser 'todos', 'concluidas', 'pendentes'


// -------------------------------
// 2. Carregar tarefas salvas no navegador (localStorage)
// -------------------------------
function carregarTarefasSalvas() {
  const tarefasSalvas = localStorage.getItem('tarefas');
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas); // converte o texto salvo em array
    // Chama o filtro para exibir o estado inicial (todas as tarefas)
    aplicarFiltro(filtroAtual);
  } else {
     // Se não houver tarefas salvas, remove os exemplos estáticos do HTML
     listaTarefas.innerHTML = '';
  }
}

// -------------------------------
// 3. Salvar as tarefas no navegador
// -------------------------------
function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// -------------------------------
// 4. Função para adicionar uma nova tarefa
// -------------------------------
function adicionarTarefa() {
  const texto = campoNovaTarefa.value.trim(); // remove espaços extras

  if (texto === '') {
    alert('Digite uma tarefa antes de adicionar!');
    return;
  }

  // Criamos um objeto representando a tarefa
  const novaTarefa = {
    id: Date.now(), // cria um número único com base no tempo atual
    texto: texto,
    concluida: false
  };

  // Adicionamos ao array e salvamos
  tarefas.push(novaTarefa);
  salvarTarefas();

  // Atualizamos a lista exibida com o filtro atual
  aplicarFiltro(filtroAtual);

  // Limpamos o campo de texto
  campoNovaTarefa.value = '';
}

// -------------------------------
// 5. Função para exibir as tarefas na tela (Renderização)
// -------------------------------
function exibirTarefas(listaParaMostrar) {
  // Limpamos a lista antes de mostrar novamente,
  // removendo os itens de exemplo do HTML
  listaTarefas.innerHTML = '';

  // Percorremos todas as tarefas do array
  for (let tarefa of listaParaMostrar) {
    // Criar um elemento <li> para cada tarefa com a estrutura do index.html
    const li = document.createElement('li');
    // Classes base da <li> no index.html
    li.className = `flex items-center justify-between p-4 rounded-lg shadow-sm border transition duration-150 ease-in-out dark:hover:bg-gray-600`;

    // Adapta as classes de cor e hover de acordo com o status
    if (tarefa.concluida) {
        li.classList.add('task-completed', 'bg-green-50', 'border-green-200', 'dark:bg-green-800', 'dark:border-green-600');
    } else {
        li.classList.add('bg-gray-50', 'border-gray-200', 'hover:bg-gray-100', 'dark:bg-gray-700', 'dark:border-gray-600');
    }

    // Estrutura interna (div flex-grow)
    const divConteudo = document.createElement('div');
    divConteudo.className = 'flex items-center space-x-3 flex-grow';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida;
    checkbox.className = 'form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer';
    // Evento para alternar conclusão ao clicar no checkbox
    checkbox.onchange = function() {
        alternarConclusao(tarefa.id);
    };

    // Texto da Tarefa
    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarefa.texto;
    // Classes do texto no index.html
    spanTexto.className = 'task-text text-gray-800 text-lg font-medium dark:text-gray-100';

    // Monta a div de conteúdo
    divConteudo.appendChild(checkbox);
    divConteudo.appendChild(spanTexto);

    // Div dos Botões (Editar e Excluir)
    const divBotoes = document.createElement('div');
    divBotoes.className = 'flex space-x-2';

    // Botão Editar
    const botaoEditar = document.createElement('button');
    botaoEditar.title = 'Editar';
    botaoEditar.className = 'text-yellow-600 hover:text-yellow-700 transition duration-150 p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-gray-600';
    // O botão deve ser desabilitado se a tarefa estiver concluída (como no index.html)
    if (tarefa.concluida) {
        botaoEditar.disabled = true;
        // Adapta as classes para o estado desabilitado (copiado do index.html)
        botaoEditar.className = 'text-yellow-600 opacity-50 cursor-not-allowed p-2 rounded-full';
    } else {
        botaoEditar.onclick = function() {
            editarTarefa(tarefa.id);
        };
    }
    botaoEditar.innerHTML = '<i class="fas fa-pencil-alt"></i>';

    // Botão Excluir
    const botaoExcluir = document.createElement('button');
    botaoExcluir.title = 'Excluir';
    // As classes do botão de excluir são ligeiramente diferentes para tarefas concluídas (dark:hover:bg-green-700)
    if (tarefa.concluida) {
        botaoExcluir.className = 'text-red-500 hover:text-red-600 transition duration-150 p-2 rounded-full hover:bg-red-100 dark:hover:bg-green-700';
    } else {
        botaoExcluir.className = 'text-red-500 hover:text-red-600 transition duration-150 p-2 rounded-full hover:bg-red-100 dark:hover:bg-gray-600';
    }
    botaoExcluir.onclick = function() {
        excluirTarefa(tarefa.id);
    };
    botaoExcluir.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Monta o elemento completo
    divBotoes.appendChild(botaoEditar);
    divBotoes.appendChild(botaoExcluir);

    li.appendChild(divConteudo);
    li.appendChild(divBotoes);

    listaTarefas.appendChild(li);
  }

  // Atualiza as classes dos botões de filtro para refletir o estado atual
  atualizarEstiloBotoesFiltro();
}

// -------------------------------
// 6. Função para alternar entre concluída e ativa
// -------------------------------
function alternarConclusao(id) {
  for (let tarefa of tarefas) {
    if (tarefa.id === id) {
      tarefa.concluida = !tarefa.concluida;
      break; // Sai do loop após encontrar e atualizar
    }
  }
  salvarTarefas();
  // Reaplica o filtro para que a lista seja atualizada corretamente
  aplicarFiltro(filtroAtual);
}

// -------------------------------
// 7. Função para editar o texto de uma tarefa
// -------------------------------
function editarTarefa(id) {
  const tarefaParaEditar = tarefas.find(t => t.id === id);

  if (!tarefaParaEditar) return;

  const novaDescricao = prompt('Edite a tarefa:', tarefaParaEditar.texto);

  if (novaDescricao === null || novaDescricao.trim() === '') {
    return; // se cancelar ou deixar em branco, não faz nada
  }

  tarefaParaEditar.texto = novaDescricao.trim();

  salvarTarefas();
  // Reaplica o filtro para que a lista seja atualizada corretamente
  aplicarFiltro(filtroAtual);
}

// -------------------------------
// 8. Função para excluir uma tarefa
// -------------------------------
function excluirTarefa(id) {
  const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');

  if (confirmar) {
    // Filtra o array para remover a tarefa com o ID correspondente
    tarefas = tarefas.filter(function (tarefa) {
      return tarefa.id !== id;
    });
    salvarTarefas();
    // Reaplica o filtro para que a lista seja atualizada corretamente
    aplicarFiltro(filtroAtual);
  }
}

// -------------------------------
// 9. Função de pesquisa
// -------------------------------
function pesquisarTarefas() {
  // A pesquisa deve ser feita apenas nas tarefas que já foram filtradas
  const termo = campoPesquisa.value.toLowerCase();
  let tarefasFiltradasPorTipo;

  // Primeiro, aplica o filtro de status
  if (filtroAtual === 'todos') {
    tarefasFiltradasPorTipo = tarefas;
  } else if (filtroAtual === 'pendentes') {
    tarefasFiltradasPorTipo = tarefas.filter(tarefa => !tarefa.concluida);
  } else if (filtroAtual === 'concluidas') {
    tarefasFiltradasPorTipo = tarefas.filter(tarefa => tarefa.concluida);
  } else {
    tarefasFiltradasPorTipo = tarefas;
  }

  // Em seguida, aplica o filtro de pesquisa no resultado
  const filtradas = tarefasFiltradasPorTipo.filter(function (tarefa) {
    return tarefa.texto.toLowerCase().includes(termo);
  });

  exibirTarefas(filtradas);
}

// -------------------------------
// 10. Filtro: todos / pendentes / concluídos (Adaptado para botões do index.html)
// -------------------------------
function aplicarFiltro(tipo) {
  filtroAtual = tipo; // Atualiza a variável de controle

  let filtradas = [];

  if (tipo === 'todos') {
    filtradas = tarefas;
  } else if (tipo === 'pendentes') {
    filtradas = tarefas.filter(tarefa => !tarefa.concluida);
  } else if (tipo === 'concluidas') {
    filtradas = tarefas.filter(tarefa => tarefa.concluida);
  }

  // Após filtrar por status, aplica a pesquisa (se houver termo)
  const termo = campoPesquisa.value.toLowerCase();
  if (termo) {
    filtradas = filtradas.filter(function (tarefa) {
        return tarefa.texto.toLowerCase().includes(termo);
    });
  }

  exibirTarefas(filtradas);
}

// -------------------------------
// 10.1 Função para atualizar os estilos dos botões de filtro
// -------------------------------
function atualizarEstiloBotoesFiltro() {
    botoesFiltro.forEach(button => {
        const textoBotao = button.textContent.trim().toLowerCase();
        let tipoFiltro;

        if (textoBotao === 'todas') tipoFiltro = 'todos';
        else if (textoBotao === 'concluídas') tipoFiltro = 'concluidas';
        else if (textoBotao === 'pendentes') tipoFiltro = 'pendentes';

        // Remove classes do estado "ativo" (índigo/ciano)
        button.classList.remove('bg-indigo-600', 'hover:bg-indigo-700', 'dark:bg-cyan-600', 'dark:hover:bg-cyan-700', 'text-white', 'border-transparent');
        // Adiciona classes do estado "inativo" (cinza/branco)
        button.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300', 'shadow-sm', 'hover:bg-gray-50', 'dark:bg-gray-700', 'dark:text-gray-200', 'dark:border-gray-600', 'dark:hover:bg-gray-600');

        // Se for o filtro ativo, aplica o estilo "ativo"
        if (tipoFiltro === filtroAtual) {
            // Remove classes do estado "inativo"
            button.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300', 'shadow-sm', 'hover:bg-gray-50', 'dark:bg-gray-700', 'dark:text-gray-200', 'dark:border-gray-600', 'dark:hover:bg-gray-600');
            // Adiciona classes do estado "ativo"
            button.classList.add('bg-indigo-600', 'hover:bg-indigo-700', 'dark:bg-cyan-600', 'dark:hover:bg-cyan-700', 'text-white', 'border-transparent');
        }
    });
}


// -------------------------------
// 11. Eventos (interações do usuário)
// -------------------------------
botaoAdicionar.addEventListener('click', adicionarTarefa);
campoPesquisa.addEventListener('input', pesquisarTarefas);

// Eventos para os botões de filtro (Adaptação para index.html)
botoesFiltro.forEach(button => {
    button.addEventListener('click', function() {
        const textoBotao = button.textContent.trim().toLowerCase();
        let tipoFiltro;

        if (textoBotao === 'todas') tipoFiltro = 'todos';
        else if (textoBotao === 'concluídas') tipoFiltro = 'concluidas';
        else if (textoBotao === 'pendentes') tipoFiltro = 'pendentes';

        aplicarFiltro(tipoFiltro);
    });
});


// -------------------------------
// 12. Permitir adicionar tarefa ao pressionar Enter
// -------------------------------
campoNovaTarefa.addEventListener('keydown', function (evento) {
  // Verifica se a tecla pressionada foi "Enter"
  if (evento.key === 'Enter') {
    evento.preventDefault(); // Impede o comportamento padrão (se houver)
    adicionarTarefa();
  }
});

// -------------------------------
// 13. Quando a página carregar, buscamos as tarefas salvas
// -------------------------------
window.onload = carregarTarefasSalvas;