# 📝 EsToDoList - Lista de Tarefas Moderna

## 🚀 Sobre o Projeto

O **EsToDoList** é uma aplicação simples e moderna de Lista de Tarefas (To-Do List) desenvolvida com foco no *front-end* e na aplicação de conceitos de **Clean Code** e **adaptação de padrões**. O principal objetivo deste projeto foi praticar o desenvolvimento de interfaces responsivas e dinâmicas, utilizando JavaScript puro para manipulação do DOM e persistência de dados localmente.

O design do projeto prioriza a experiência de tela cheia e a clareza visual, com suporte total ao tema escuro.

## ✨ Funcionalidades

O EsToDoList oferece as seguintes funcionalidades essenciais para o gerenciamento de tarefas:

* **Adicionar Tarefa:** Insira novas atividades na lista de forma rápida.
* **Excluir Tarefa:** Remova permanentemente tarefas indesejadas.
* **Marcar como Concluída:** Alterne o status da tarefa (pendente/concluída), com feedback visual de risco no texto.
* **Pesquisar:** Filtre a lista em tempo real digitando termos no campo de busca.
* **Filtrar por Status:** Visualize apenas tarefas `Todas`, `Pendentes` ou `Concluídas` através de botões na interface.
* **Persistência de Dados:** As tarefas são salvas automaticamente no `localStorage` do navegador, garantindo que elas permaneçam após o recarregamento da página.

## 💻 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias de desenvolvimento front-end:

| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estrutura semântica da aplicação. |
| **JavaScript (ES6+)** | Lógica de programação, manipulação do DOM (CRUD de tarefas) e controle do `localStorage`. |
| **Tailwind CSS** | Framework CSS *utility-first* para estilos rápidos, responsivos e o suporte ao modo escuro. |

## 🛠️ Como Usar

Para rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório** (ou baixe os arquivos `index.html` e `meu_script.js`).
2.  Certifique-se de que os arquivos `index.html` e o script (`meu_script.js` ou o nome que você usou) estão no **mesmo diretório**.
3.  **Abra o arquivo `index.html`** no seu navegador (clique duas vezes no arquivo ou use um servidor local como o Live Server do VS Code).
4.  A aplicação estará pronta para uso. Adicione, exclua e filtre suas tarefas!

---

**Nota:** Este projeto utiliza o `localStorage`, portanto, os dados são salvos apenas no seu navegador e não em um banco de dados externo. Se você limpar os dados do seu navegador, as tarefas serão perdidas.