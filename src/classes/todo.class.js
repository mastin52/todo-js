export class Todo{

    //Método estático para crear una instancia de todo a partir de los datos almacenados
    //en el localStorage

    static fromJSON ({id, tarea, completado, creado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;
        return tempTodo;
    }


    constructor( tarea ) {
        this.tarea = tarea; // Descripciín de la tarea por parámetro
        this.id    = new Date().getTime(); //hora en milisegundos como identificador
        this.completado = false;
        this.creado     = new Date();
    }

    imprimirClase(){
        console.log(`${this.tarea}  - ${this.id}`);
    }
}