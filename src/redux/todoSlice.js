import { createSlice } from "@reduxjs/toolkit"
import handleLocalStorage from "../utils/handleLocalStorage";

const initTodoList = handleLocalStorage.get('todoList');

export const todoSlice = createSlice({
    name: 'todoList',
    initialState: initTodoList,
    reducers: {
        addTodo: (state, action) => {

        },
        updateTodo: (state, action) => {

        },
        deleteTodo: (state, action) => {

        },
        changeStatus: (state,action) => {
            let index = state.findIndex(todo => todo.id === action.payload);
            console.log(action)
            state[index] = {
                ...state[index],
                status: state[index].status === 'completed' ? 'incompleted' : 'completed',
            }
            handleLocalStorage.set('todoList', state);
        },
    }
});