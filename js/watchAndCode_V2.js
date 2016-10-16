// V3 REQUIREMENTS: It should store the todos array  on an obj
var todoList = {
    // V1 REQUIREMENTS: It should have a place to store todos
    todos: [],

    // V3 REQUIREMENTS: It should have a displayTodos method
    // V2 REQUIREMENTS: It should have a function to display todos
    // displayTodos: function() {
    //     // V5 REQUIREMENTS: .displayTodos should tell you if todos[] is empty
    //     if (this.todos.length > 0) {
    //         // V1 REQUIREMENTS: It should have a way to display todos (console)
    //         // V5 REQUIREMENTS: .displayTodos should show todoText
    //         // V5 REQUIREMENTS: .displayTodos should show .completed
    //         for (var i = 0; i < this.todos.length; i++) {
    //             console.log(this.todos[i].todoText);
    //         }
    //     } else {
    //         console.log("Empty!");
    //     }
    //
    // },

    // V3 REQUIREMENTS: It should have an addTodo method
    // V2 REQUIREMENTS: It should have a function to add todos
    addTodo: function(todoText) {
        // V1 REQUIREMENTS: It should have a way to add new todos
        // V4 REQUIREMENTS: todoList.addTodo should add objects
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    // V3 REQUIREMENTS: It should have a changeTodo method
    // V2 REQUIREMENTS: It should have a function to change todos
    editTodo: function(position, todoText) {
        // V1 REQUIREMENTS: It should have a way to change a todo
        // V4 REQUIREMENTS:  method should change the todoText property
        this.todos[position].todoText = todoText;
    },

    // V3 REQUIREMENTS: It should have a deleteTodo method
    // V2 REQUIREMENTS: It should have a function to delete todos
    deleteTodo: function(position) {
        // V1 REQUIREMENTS: It should have a way to delete a todo
        this.todos.splice(position, 1);
    },

    // V4 REQUIREMENTS: method should change the completed property
    toggleCompleted: function(position){
        this.todos[position].completed = !(this.todos[position].completed);
    },

    // V6 REQUIREMENTS: .toggleAll: If everything is true; Make everything false
    // V6 REQUIREMENTS: .toggleAll: Otherwise, make everything true
    toggleAll: function() {
        var completedCounter = 0;
        for (var i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed) {
                completedCounter++;
            }
        }
        if (completedCounter === this.todos.length) {
            for (var i = 0; i < this.todos.length; i++) {
                this.todos[i].completed = false;
            }
        } else {
            for (var i = 0; i < this.todos.length; i++) {
                this.todos[i].completed = true;
            }
        }
    }


}; // end: todoList

// V7 REQUIREMENTS: There should be a "Display Todos" button
// V7 REQUIREMENTS: There should be a "Toggle All" button
// V8 REQUIREMENTS: There should be a button for todoList.addTodo();
// V8 REQUIREMENTS: There should be a button for todoList.changeTodo();
// V8 REQUIREMENTS: There should be a button for todoList.deleteTodo();
// V8 REQUIREMENTS: There should be a button for todoList.toggleCompleted();
var handlers = {
    // V7 REQUIREMENTS: clicking "Display Todos" should run .displayTodos()
    // displayTodos: function() {
    //     todoList.displayTodos();
    // },

    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';

        views.displayTodos();
    },

    editTodo: function() {
        var editTodoPositionInput = document
            .getElementById('editTodoPositionInput');
        var editTodoTextInput = document
            .getElementById('editTodoTextInput');

        todoList.editTodo((editTodoPositionInput.valueAsNumber),
            (editTodoTextInput.value));
        editTodoPositionInput.value = '';
        editTodoTextInput.value = '';

        views.displayTodos();
    },

    deleteTodo: function(position) {
        // var deleteTodoPositionInput = document
        //     .getElementById('deleteTodoPositionInput');
        todoList.deleteTodo(position);
        // deleteTodoPositionInput.value = '';

        views.displayTodos();
    },

    toggleCompleted: function() {
        var toggleCompletedPositionInput = document
            .getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    },

    // V7 REQUIREMENTS: clicking "Toggle All" should run .toggleAll();
    toggleAll: function() {
        todoList.toggleAll();

        views.displayTodos();
    }
}; // end: handlers

var views = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        var todoTextWithCompletion = '';
        // clear the list before display views
        todosUl.innerHTML = '';
        // V9 REQUIREMENTS: There should be an li element for every todo item
        // V10 REQUIREMENTS: There should be a delete button for each todo item
        todoList.todos.forEach(function(todo) {
            var todoLi = document.createElement('li');
            // V10 REQUIREMENTS: Each li element should have an #id that has the
            // array position
            todoLi.id = todoList.todos.indexOf(todo);

            // V9 REQUIREMENTS: Each li tag element should contain .todoText
            // todoLi.textContent = todoList.todos[i].todoText;
            if (todo.completed) {
                todoTextWithCompletion = "(x) " + todo.todoText + " ";
            } else {
                todoTextWithCompletion = "( ) " + todo.todoText + " ";
            }

            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteTodoButton());
            // V9 REQUIREMENTS: Each li tag element should show .completed
            todosUl.appendChild(todoLi);
        }, this);
    },

    // V10 REQUIREMENTS: There should be a way to create delete buttons
    createDeleteTodoButton: function() {
        var deleteTodoButton = document.createElement('button');
        deleteTodoButton.textContent = 'Delete';
        deleteTodoButton.className = 'deleteTodoButton';
        return deleteTodoButton;
    },

    // V10 REQUIREMENTS: Delete buttons should have access to the todo id
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            console.log(event.target.parentNode.id);
            // if element clicked className === "deleteTodoButton"
            if (event.target.className === 'deleteTodoButton') {
                handlers.deleteTodo(event.target.parentNode.id);
            }
        });
    }
}; // end: views

views.setUpEventListeners();






// V11 REQUIREMENTS: todoList.toggleAll should use forEach
// V11 REQUIREMENTS: view.displayTodos should use forEach
