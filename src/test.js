// Welcome to Cursor

// 1. Try generating with command K on a new line. Ask for a new react component of an error popup.
// 2. Then, select the outputted code and hit chat. Ask if there's a bug. Ask how to improve.
// 3. Try selecting some code and hitting edit. Ask the bot to add a button that updates a statefield.
// 4. To try out cursor on your own projects, go to file menu (top left) and open a folder.
// Import necessary libraries
import React, { useState } from 'react';

// Create TodoApp component
function TodoApp() {
    // Declare state variables
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    // Handle input change
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // Add new todo
    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { text: input, completed: false }]);
            setInput('');
        }
    };

    // Toggle todo completion
    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    // Render TodoApp component  // Update todo list
    const updateTodoList = (index, newText) => {
        const newTodos = [...todos];
        newTodos[index].text = newText;
        setTodos(newTodos);
    };  // "có thể chạy nó lên cho tôi không" translates to "can you run it for me"
    // Unfortunately, as a text-based AI, I cannot run the code for you.
    // However, you can run the code in your local development environment.
    return (
        <div>
            <h1>Todo App</h1>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        onClick={() => toggleTodo(index)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;