

// step 1 - initialize the list of todos && display the todos
let mainContainer = document.querySelector('main')
let addBtn = document.getElementById('addBtn')
let todoInput = document.getElementById('todoInput')
let todo_list = localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')).todo_list : []  // array of todos to add to the list

function paintUI() {
    let new_inner_html = ''
    for (let i = 0; i < todo_list.length; i++) {
        const todo = todo_list[i];
        new_inner_html += `<div class="todoItem">
            <p>${todo}</p>
            <div class="actionsContainer">
                <button onclick = "editTodo(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick = "deleteTodo(${i})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `
    }
    mainContainer.innerHTML = new_inner_html
    saveData()
}

paintUI()

// step 2 - write a function that allows us to add a new todo

function addTodo() {
    let current_todo = todoInput.value
    if (!current_todo) { return }
    if(todo_list.includes(current_todo)) { alert('Todo already exists'); return }

    todo_list.push(current_todo)
    todoInput.value = ''
    paintUI()
}
addBtn.addEventListener('click', addTodo)

// step 3 - write a function that allows us to delete a todo

function deleteTodo(index) {
    let new_todo_list = todo_list.filter((current_value, current_index) => { return current_index !== index })

    todo_list = new_todo_list
    paintUI()
}

// step 4 write a function that allows us to edit a todo

function editTodo(index) {
    let current_todo = todo_list[index]
    todoInput.value = current_todo
    deleteTodo(index)
}

// step 5 - persist all information after refreshing the page

function saveData() {
    localStorage.setItem('todo-list', JSON.stringify({ todo_list }))
}
