import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { TodoItem } from './TodoItem.js';
export const Todo = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [update, setUpdate] = useState(false);
    let inputEl = useRef();
    let indexUpdate = useRef();
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
            .then(response => response.json())
            .then(json => setTodos(json));
    }, []);

    const handleMarkCompeleted = id => {
        const checkedTask = todos.map((todos) => {
            if (todos.id === id) todos.completed = !todos.completed;
            return todos;
        });
        setTodos(checkedTask);
    };

    const handleSetTodo = value => {
        setTodo(value);
    };

    const handleAddTodo = () => {
        setTodo('');
        inputEl.current.focus();
        if (!todo) return;
        try {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: todo,
                    completed: false
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => setTodos(prev => {
                    return [...prev, { ...json, id: prev.at(-1)?.id + 1 || 1 }];
                }));
        }
        catch (err) {
            alert(err);
        }
    };

    const handleDelete = id => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    };

    const handleEdit = id => {
        indexUpdate.current = id;
        inputEl.current.value = todos.find(todo => todo.id === id).title;
        inputEl.current.focus();
        setUpdate(true);
        setTodo(inputEl.current.value);
    };

    const handleUpdateTodo = () => {
        const newArr = todos.map(td => td.id === indexUpdate.current ? { ...td, title: todo } : td);
        setUpdate(false);
        setTodos(newArr);
        setTodo('');
        inputEl.current.focus();
    };

    return <>
        <h2 className='heading'>Todo App</h2>
        <div className='box--input'>
            <input ref={inputEl} placeholder='Add a task...'
                value={todo}
                spellCheck={false}
                onChange={(e) => handleSetTodo(e.target.value)}
            />
            <button className='update--btn' onClick={update ? handleUpdateTodo : handleAddTodo}>
                <FontAwesomeIcon icon={update ? faSave : faPlus} style={{ fontSize: '2rem', color: '#fff' }} />
            </button>
        </div>
        <TodoItem todos={todos}
            markCompeleted={handleMarkCompeleted}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            inputEl={inputEl}
        />
    </>;
};
