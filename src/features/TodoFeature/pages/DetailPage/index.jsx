import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { todoSlice } from '../../../../redux/todoSlice';
import TodoDetail from '../../components/TodoDetail';
import { todoListSelector } from '../../../../redux/selectors';

DetailPage.propTypes = {
    
};

function DetailPage(props) {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const todoList = useSelector(todoListSelector)
    const todoId = match.params.todoId;
    const index = todoList.findIndex(todo => todo.id === todoId);

    const handleStatusClick = (id) => {
        dispatch(todoSlice.actions.changeStatus({id}))
    }

    return (
        <div>
            <h3>Todo Detail</h3>
            <TodoDetail 
                todo={todoList[index]}
                onStatusClick={handleStatusClick}
            />
        </div>
    );
}

export default DetailPage;