

// step 1 - initialize the list of todos && display the todos
let mainContainer = document.querySelector('main')
let addBtn = document.getElementById('addBtn')
let todoInput = document.getElementById('todoInput')
let overallScoreDisplay = document.getElementById('overallScoreDisplay');
let listScoreDisplay = document.getElementById('listScoreDisplay');
let todo_list = localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')).todo_list : []  // array of todos to add to the list
let overallScore = localStorage.getItem('overall-score') ? parseInt(localStorage.getItem('overall-score')) : 0;


let listScore = 0;

overallScoreDisplay.textContent = overallScore;
listScoreDisplay.textContent = listScore;



function paintUI() {
    let new_inner_html = ''
    listScore = 0;
    for (let i = 0; i < todo_list.length; i++) {
        const todo = todo_list[i];
        let checked = todo.completed ? 'checked' : '';
        let completedClass = todo.completed ? 'completed' : '';

        if (todo.completed) {
            listScore += 10;
        }

        new_inner_html += `<div class="todoItem ${completedClass}" id="todo-${i}">
            <input type="checkbox" class="completeCheckbox" data-index="${i}" ${checked} />
            <p>${todo.text}</p>
            <div class="actionsContainer">
                <button onclick = "editTodo(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick = "deleteTodo(${i})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        
        `
    }
    mainContainer.innerHTML = new_inner_html
    saveData()
    addCheckboxListeners();
    addTodoItemClickListeners();

    listScoreDisplay.textContent = listScore;


}

paintUI()

// step 2 - write a function that allows us to add a new todo

function addTodo() {
    let current_todo = todoInput.value
    if (!current_todo) { return }
    if (todo_list.some(todo => todo.text === current_todo)) { alert('Todo already exists'); return } // Tekrar kontrol

    todo_list.push({ text: current_todo, completed: false });
    todoInput.value = '' //clear new todo input
    paintUI()
}
addBtn.addEventListener('click', addTodo)

// step 3 - write a function that allows us to delete a todo

function deleteTodo(index) {
    if (todo_list[index].completed) {
        listScore -= 10;

        overallScoreDisplay.textContent = overallScore; // update overall score
    }
    todo_list.splice(index, 1); // delete the todo
    paintUI(); // update the UI
}

// step 4 write a function that allows us to edit a todo

function editTodo(index) {
    let current_todo = todo_list[index].text
    todoInput.value = current_todo
    deleteTodo(index)
}

// step 5 - persist all information after refreshing the page


function toggleComplete(e) {
    let index = e.target.dataset.index;
    todo_list[index].completed = !todo_list[index].completed; // reverse the completed status

    if (todo_list[index].completed) {
        document.querySelector(`#todo-${index}`).classList.add('completed'); // line-through effect
        listScore += 10;
        overallScore += 10;
    } else {
        document.querySelector(`#todo-${index}`).classList.remove('completed'); // remove line-through effect 
        listScore -= 10;
        overallScore -= 10;
    }

    listScoreDisplay.textContent = listScore; // update list-based score
    overallScoreDisplay.textContent = overallScore; //update overall score
    saveData();
}

function addCheckboxListeners() {
    let checkboxes = document.querySelectorAll('.completeCheckbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation(); // stop the event from bubbling up to the parent element
            toggleComplete(e);
        });
    });
}

function addTodoItemClickListeners() {
    let todoItems = document.querySelectorAll('.todoItem');
    todoItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            // if the click was not on the edit or delete button, toggle the checkbox :) love you fritz
            if (!e.target.closest('button')) {
                const checkbox = item.querySelector('.completeCheckbox');
                checkbox.checked = !checkbox.checked;
                toggleComplete({ target: checkbox });
            }
        });
    });
}

function saveData() {
    localStorage.setItem('todo-list', JSON.stringify({ todo_list }))
    localStorage.setItem('overall-score', overallScore.toString()); // save the overall score

}