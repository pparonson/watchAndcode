var todoList = {

    todos: [],

    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        view.displayTodos();
    },

    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
        view.displayTodos();
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        view.displayTodos();
    },

    toggleCompleted: function(position) {
        this.todos[position].completed = !(this.todos[position]
            .toggleCompleted);
        view.displayTodos();
    },

    toggleAll: function() {
        var completedCounter = 0;
        this.todos.forEach(function(todo) {
            if (todo.completed) {
                completedCounter++;
            }
        });
        if (completedCounter === this.todos.length) {
            this.todos.forEach(function(todo) {
                todo.completed = false;
            });
        } else {
            this.todos.forEach(function(todo) {
                todo.completed = true;
            });
        }
        view.displayTodos();
    }

}; // end: todoList
var handlers = {

    toggleAll: function() {
        todoList.toggleAll();
    },

    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
    },

    changeTodo: function() {
        var changeTodoPositionInput = document
            .getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document
            .getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber,
            changeTodoTextInput.value);
        changeTodoTextInput.value = '';
        changeTodoPositionInput.value = '';
    },

    deleteTodo: function(position) {
        todoList.deleteTodo(position);
    },

    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.
            getElementById('toggleCompletedPositionInput');
        var position = parseInt(toggleCompletedPositionInput.value);
        todoList.toggleCompleted(position);
        toggleCompletedPositionInput.value = '';
    }

}; // end: handlers
var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.className = 'todosUl';
        todosUl.innerHTML = '';
        todoList.todos.forEach(function(todo) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';
            todoLi.id = todoList.todos.indexOf(todo);
            console.log("indexOf: ", todoLi.id);
            if (todo.completed) {
                todoTextWithCompletion = "(x) " + todo.todoText + " ";
            } else {
                todoTextWithCompletion = "( ) " + todo.todoText + " ";
            }
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteTodoButton());
            todosUl.appendChild(todoLi);
        }, this);
    },

    createDeleteTodoButton: function() {
        var deleteTodoButton = document.createElement('button');
        deleteTodoButton.textContent = 'Delete';
        deleteTodoButton.className = 'deleteTodoButton';
        return deleteTodoButton;
    },

    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event){
            console.log(event.target.parentNode.id);
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteTodoButton') {
                var deleteTodoPositionInput = parseInt(elementClicked.parentNode.id);
                handlers.deleteTodo(deleteTodoPositionInput);
            }
        });
    }

}; // end: view

view.setUpEventListeners();
