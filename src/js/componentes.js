
//Referencias en el HTML

import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList   = document.querySelector('.todo-list'); //Lista de tareas (todos) html
const txtInput      = document.querySelector('.new-todo'); //Entrada de nueva tarea html
const btnBorrar     = document.querySelector('.clear-completed'); //Borrar completados html
const ulFilters     = document.querySelector('.filters'); //los tres enlaces de filtros
const anchorFiltro  = document.querySelectorAll('.filtro');

//Función para agregar el HTML asociado a una tarea (todo)
export const crearTodoHTML = ( todo ) =>{

    //Primero el código html inerpolado con la tarea a exponer y sus atributos
    const htmlTodo =`
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado)? 'checked' : ''}>
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>
    `;
    //Segundo se crea el contenedor html en el documento
    const div = document.createElement('div');
    //Tercero agrega el código html al contenedor
    div.innerHTML = htmlTodo;
    //Cuarto inserta el primer hijo (li) del contenedor en la referencia al documento
    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
}

//Eventos

txtInput.addEventListener('keyup', ( event ) =>{

    if ( event.keyCode === 13 && txtInput.value.length > 0){ //Pulsó enter
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHTML( nuevoTodo );
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) =>{
    
    const nombreElemento    = event.target.localName; //input, label, button
    const todoElemento      = event.target.parentElement.parentElement;
    const todoId            = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){ //Borrar tarea
        todoList.eliminarTodo(todoId);           //acá se borra el elemento del modelo
        divTodoList.removeChild(todoElemento);   //acá elimina el elemento html
    }

});

btnBorrar.addEventListener('click', () =>{
    todoList.eliminarCompletados(); //Elimina tareas completadas del modelo
    //Para eliminar tareas del html
    for( let i = divTodoList.children.length - 1 ; i >= 0; i-- ){
        let elemento = divTodoList.children[i];
        //console.log(elemento);
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

//Escucha los eventos de ulFilters
ulFilters.addEventListener('click', (event) => {
    
    const filtro = event.target.text;
    if (!filtro) {return;}

    // console.log('filtro', filtro);

    // console.log(divTodoList.children)

    anchorFiltro.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children){
        //elemento.classList.remove('hidden'); //Inicia los valores

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

//        console.log('completado', completado );

 
        switch(filtro){
            case 'Pendientes':{
                if (completado){
                    elemento.classList.add('hidden');
                }
                break;
            }

            case 'Completados':{
                if (!completado){
                    elemento.classList.add('hidden');
                }
                break;
            }

        }
    }
})