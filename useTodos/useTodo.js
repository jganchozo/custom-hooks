import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer" ;


const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del alma',
    //     done: false,
    // }
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        
        localStorage.setItem('todos', JSON.stringify(todos) || []);

    }, [todos]);
    

    const handleAdd = (todo) => {
        console.log({ todo });

        const action = {
            type: '[TODO] add todo',
            payload: todo,
        }

        dispatch(action);
    }

    const handleDelete = (id) => {
        
        const action = {
            type: '[TODO] remove todo',
            payload: id
        }

        dispatch(action);
    }

    const handleToggle = (id) => {

        const action = {
            type: '[TODO] toggle todo',
            payload: id
        }

        dispatch(action);
    } 


    return {
        todos,
        ...todos,
        handleAdd,
        handleDelete,
        handleToggle,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
    }
}
