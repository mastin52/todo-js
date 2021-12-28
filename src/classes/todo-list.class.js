import { Todo } from ".";
import { todoList } from "..";

export class TodoList{

    constructor () {
        this.cargarLocalStorage();
    }

    nuevoTodo (todo){
        this.todos.push(todo);
        this.guardarLocalStorage(); // actualiza variables en memoria local (dominio)
    }

    eliminarTodo ( id ){
        //reasigna el mismo arreglo pero sin el elemento todo cuyo id es el que se elimina
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage(); // actualiza variables en memoria local (dominio)
    }

    marcarCompletado ( id ){
        for( const todo of this.todos){
            if ( todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage(); // actualiza variables en memoria local (dominio)
                break;
            }
        }
    }

    eliminarCompletados (){
    //reasigna el mismo arreglo pero sin los elementos todo completados
    this.todos = this.todos.filter( todo => !todo.completado);   
    this.guardarLocalStorage(); // actualiza variables en memoria local (dominio)
    }

    guardarLocalStorage (){
        localStorage.setItem('todo', JSON.stringify( this.todos ));
    }

    cargarLocalStorage(){

        // if( localStorage.getItem('todo')){
        //     this.todos = JSON.parse( localStorage.getItem('todo') );

        //     console.log( 'CargarLocal: ', this.todos );

        // }else{
        //     this.todos = [];
        // }


        //Esta instrucción recupera el elemento 'todo' definido en localstorage a el arreglo
        //de tareas del modelo principal 'todos'. Observa que esto construye un arrreglo de 
        //objetos con los datos pero sin sus métodos
        this.todos = ( localStorage.getItem('todo') ) ? JSON.parse( localStorage.getItem('todo') ) : [];

        //Para recuperar también los métodos, es decir convertir los objetos a instancias
        // de la clase Todo, recorrer el arreglo mediante la función javascript de arreglos
        // (map) e invocar al método 'Todo.fromJSON' con cada elemento del arreglo
        this.todos = this.todos.map( obj => Todo.fromJSON(obj));



    }
}