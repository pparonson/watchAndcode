$(document).ready(() => {
    "use strict";

    views.setUpEventListeners();

});

var todoList = {

    todos: [],

    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });

        views.displayTodos();
    },

    editTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;

        views.displayTodos();
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);

        views.displayTodos();
    },

    toggleCompleted: function(position) {
        this.todos[position].completed = !(this.todos[position].completed);

        views.displayTodos();
    },

    toggleAll: function() {
        var completedCounter = 0;
        this.todos.forEach((todo) => {
            if (todo.completed) {
                completedCounter++;
            }
        });

        // V6 REQUIREMENTS: .toggleAll: If everything is true;
        if (completedCounter === this.todos.length) {
            // Make everything false
            this.todos.forEach((todo) => {
                todo.completed = false;
            });
        } else {
            // V6 REQUIREMENTS: .toggleAll: Otherwise, make everything true
            this.todos.forEach((todo) => {
                todo.completed = true;
            });
        }

        views.displayTodos();
    }

}; // end: todoList

var handlers = {

    toggleAll: function() {
        todoList.toggleAll();
    },

    toggleCompleted: function() {
        var position = $('#toggleCompletedPositionInput').eq(0).val();
        todoList.toggleCompleted(position);
    },

    addTodo: function() {
        var todoText = $('#addTodoTextInput').eq(0).val();
        todoList.addTodo(todoText);
    },

    editTodo: function() {
        var position = $('#editTodoPositionInput').eq(0).val();
        var todoText = $('#editTodoTextInput').eq(0).val();
        todoList.editTodo(position, todoText);
    },

    deleteTodo: function(position) {
        todoList.deleteTodo(position);
    }

}; // end: handlers

var views = {
    // V9 REQUIREMENTS: There should be an li tag element for every todo item

    // V9 REQUIREMENTS: Each li tag element should show .completed

    // V9 REQUIREMENTS: Each li tag element should contain .todoText

    // V9 REQUIREMENTS: Each li tag element should show .completed
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        var todoTextWithCompletion = '';
        // clear the page before displaying the list items
        todosUl.innerHTML = '';
        todoList.todos.forEach((todo) => {
            var todoLi = document.createElement('li');
            todoLi.id = todoList.todos.indexOf(todo);

            if (todo.completed) {
                todoTextWithCompletion = "(X) " + todo.todoText + ' ';
            } else {
                todoTextWithCompletion = "( ) " + todo.todoText + ' ';
            }

            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(views.createDeleteButton());
            todosUl.appendChild(todoLi);
        });
    },

    createDeleteButton: function() {
        var todoDeleteButton = document.createElement('button');
        todoDeleteButton.textContent = 'Delete';
        todoDeleteButton.className = 'todoDeleteButton';
        return todoDeleteButton;
    },

    setUpEventListeners: function() {
        var todoUl = document.querySelector('ul');
        todoUl.addEventListener('click', (event) => {
            // console.log(event);

            // if delete button is clicked
            var elementClicked = event.target;
            // Get id of 'li' element
            if (elementClicked.className === 'todoDeleteButton') {
                // assign position value and pass to deleteTodo
                var position = elementClicked.parentNode.id;
                handlers.deleteTodo(position);
            }
        });
    }
}; // end: views






// V10 REQUIREMENTS: Each li element should have an id of the array position

// V10 REQUIREMENTS: There should be a delete button for each todo

// V10 REQUIREMENTS: There should be a way to create delete buttons

// V10 REQUIREMENTS: Delete buttons should have access to to the todo id

// V11 REQUIREMENTS: todoList.toggleAll should use forEach

// V11 REQUIREMENTS: view.displayTodos should use forEach
