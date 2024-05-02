import { Radio } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min.js';
import { todoSlice } from '../../../../redux/todoSlice.js';
import TodoList from '../../components/TodoList/index.jsx';

ListPage.propTypes = {
    
};

function ListPage(props) {
    const dispatch = useDispatch();
    const todoList = useSelector((state => state.todoList));
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    
    const [filter, setFilter] = useState(() => {
        const urlParams = queryString.parse(location.search);
        return urlParams.status || 'all';

    });

    useEffect(() => {
        const urlParams = queryString.parse(location.search);
        setFilter(urlParams.status || 'all');
    }, [location.search] )


    const handleStatusClick = (id) => {
        dispatch(todoSlice.actions.changeStatus({id}))
    }
    
    const handleUpdate = (id, title) => {
        dispatch(todoSlice.actions.updateTodo({id, title}))
    }

    const handleDelete = (id) => {
        dispatch(todoSlice.actions.deleteTodo({id}))
    }
    
    //add new task btn
    const handleAdd = (task) => {
        dispatch(todoSlice.actions.addTodo({task}))
    }

    //filter buttons
    const handleFilterClick = (filterStatus) => {
        const queryParams = { status:  filterStatus};
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        })
    }

    const renderedTodoList = todoList.filter(todo => filter === "all" || filter === todo.status)

    return (
        <div>
            <h3>TodoList</h3>
            <Radio.Group value={filter} onChange={(e) => handleFilterClick(e.target.value)}>
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="completed">Completed</Radio.Button>
                <Radio.Button value="incompleted">Incompleted</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            <TodoList 
                todoList={renderedTodoList} 
                onStatusClick={handleStatusClick}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onAdd={handleAdd}
            >
            </TodoList>
        
        </div>
    );
}

export default ListPage;