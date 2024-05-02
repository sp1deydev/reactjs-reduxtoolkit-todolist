import { createSlice } from "@reduxjs/toolkit"
import handleLocalStorage from "../utils/handleLocalStorage";

const initTodoList = handleLocalStorage.get('todoList');

export const todoSlice = createSlice({
    name: 'todoList',
    initialState: initTodoList,
    reducers: {
        addTodo: (state, action) => {
            let newTask ={...action.payload.task, id: Math.random().toString(36).substring(2, 6)};
            state.push(newTask);
            handleLocalStorage.set('todoList', state);
        },
        updateTodo: (state, action) => {
            let index = state.findIndex(todo => todo.id === action.payload.id);
            state[index] = {
                ...state[index],
                title: action.payload.title,
            }
            handleLocalStorage.set('todoList', state);
        },
        deleteTodo: (state, action) => {
            let index = state.findIndex(todo => todo.id === action.payload.id);
            state.splice(index, 1)
            handleLocalStorage.set('todoList', state);
        },
        changeStatus: (state,action) => {
            let index = state.findIndex(todo => todo.id === action.payload.id);
            state[index] = {
                ...state[index],
                status: state[index].status === 'completed' ? 'incompleted' : 'completed',
            }
            handleLocalStorage.set('todoList', state);
        },
    }
});