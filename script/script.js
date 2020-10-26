'use strict';

let todoСontrol = document.querySelector('.todo-control'), //форма ввода дел
      headerInput = document.querySelector('.header-input'), // поле ввода дел
      todoList = document.querySelector('.todo-list'), // список добавленных дел
      todoСompleted = document.querySelector('.todo-completed'); // список выполненных дел

let todoData = [];

let setLocalStorage = function () {
  localStorage.setItem('todoItems', JSON.stringify(todoData));
};

let getLocalStorage = function () {
  if (JSON.parse(localStorage.getItem('todoItems'))) {
      todoData = JSON.parse(localStorage.getItem('todoItems'));
      return todoData;
  }
};

let addTodo = function () {

  todoList.textContent = '';
  todoСompleted.textContent = '';

  todoData.forEach(function(item) {
    let li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
			'<div class="todo-buttons">' +
				'<button class="todo-remove"></button>' +
				'<button class="todo-complete"></button>' +
      '</div>';
    if (item.completed) {
      todoСompleted.append(li);
    } else {
      todoList.append(li);
    }
    let btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      addTodo();
      setLocalStorage();
    });

    let btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function() {
      li.remove();
      todoData.splice( todoData.indexOf(item), 1 );
      addTodo();
      setLocalStorage();
    });
  });
};

todoСontrol.addEventListener('submit', function(event) {
  event.preventDefault();
  let newTodo = {
    value: headerInput.value,
    completed: false
  };
  if (newTodo.value !== '') {
    todoData.push(newTodo);
    headerInput.value = '';
    addTodo();
    setLocalStorage();
  }
});

getLocalStorage();
addTodo();
