import './styles.css';
// import { Todo } from './classes/todo.class.js';
// import { TodoList } from './classes/todo-list.class';
import { Todo, TodoList } from './classes'; //Toma la definición del ./classes/index.js
import { crearTodoHTML } from './js/componentes';

export const todoList = new TodoList();
// const tarea = new Todo('Aprender javaScript');

// todoList.nuevoTodo( tarea );

// console.log ( todoList );

// crearTodoHTML( tarea );

// console.log( todoList.todos );

todoList.todos.forEach(todo => crearTodoHTML(todo) );

console.log('Estos son los todos', todoList.todos);
