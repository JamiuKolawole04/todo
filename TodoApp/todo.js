// Array that holds the todo list items
let  todoItems = [];

//bRender each item on the screen
function renderTodo(todo) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    // seleting the first element with a class of "js-todo-list"
    const list = document.querySelector(".js-todo-list");
    // Select the current todo items in the DOM
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted) {
        // remove the item from the DOM
        item.remove();
        return
    }

    // use te ternary opertor to check if the "todo.checked" is true 
    // if so, assign 'done' to 'isChecked'.Otherwise, assign an empty string
    const isChecked = todo.checked ? 'done' : " ";

    //create a 'li' element and assign it to 'node'
    const node = document.createElement("li");
    //set the class attribute
    node.setAttribute("class", `todo-item ${isChecked}`);
    //set the data-key attribute to the id of the todo
    node.setAttribute("data-key", todo.id);
    
    //Setting the contents of the 'li' element created above 
    node.innerHTML = `
       <input id ="${todo.id}" type="checkbox" />
       <label for ="${todo.id}" class="tick js-tick"></label>
       <span>${todo.text}</span>
       <button class="delete-todo js-delete-todo"> <svg><use href="#delete-icon"></use></svg> </button>
    
    `;
    // If the item already exists in the DOM 
    if (item) {
        list.replaceChild(node, item);
    } else {
        // Otherwise append it to the end of the list
        list.append(node);
    }


}


// This function will create a new todo object based on the 
// text that was entered in the text input, and push it into the "todoItems array"
function addTodo(text) {
    const todo = {
        text,
        checked : false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
};


//Selecting the form element
const form = document.querySelector("form");
form.addEventListener("submit", event => {
    // prevent page refresh on form submission
    event.preventDefault();

    //Select the text input
    const input = document.getElementById("js-todo-input");
    const text = input.value.trim();
    if (text !== " ") {
        addTodo(text);
        input.value = "";
        input.focus();
        
    } 
});

const list = document.querySelector(".js-todo-list");
// Add a click event to the list and its children
list.addEventListener("click", event => {
    if (event.target.classList.contains("js-tick")) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains("js-delete-todo")) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

function toggleDone(key) {
    // findIndex is an array method that returns the position of an element in the array
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Locate the todo items in the todoItems array and set its checked property to the opposite
    // That means 'true' will become 'false'  and vice versa
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    // Find the corresponding todo object in the todoItems array
    const index = todoItems.findIndex(item => item.id  === Number(key));
    // Create a new object with propertiies of the current todo items and a 'deleted' proprty which is set to true
    const todo = {
        deleted : true,
        ...todoItems[index],
    };

    // remove the todo item from the array by filtering it out
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);

}

document.addEventListener("DOMContentLoaded", () => {
    const ref = localStorage.getItem("todoItems");
    if (ref) {
        todoItems = JSON.parse(ref);
        todoItems.forEach(t => {
            renderTodo(t)
        });
    }
});