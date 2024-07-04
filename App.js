import React, { useState, useEffect } from 'react';

import "./App.css"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()!== '') {
      const newTodoItem = {
        id: new Date().getTime(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id!== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, completed:!todo.completed };
        }
        return todo;
      })
    );
  };

  const handleEdit = (id) => {
    setEditingTodo(id);
    setEditingText(todos.find((todo) => todo.id === id).text);
  };

  const handleUpdate = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, text: editingText };
        }
        return todo;
      })
    );
    setEditingTodo(null);
    setEditingText('');
  };

  return (
    <div className='App'>
      <h1 className='head'>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className='input-field'
        />
        <button type="submit" className='submit-btn'>Add</button>
      </form>
      <div >
        <ul className='ul-list'>
          {todos.map((todo) => (
            <li key={todo.id} className='list-edit'>
              <div className='col'>
              {editingTodo === todo.id? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className='input-field'
                />
              ) : (
                <span
                  style={{
                    textDecoration: todo.completed? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </span>
              )}
              </div>
              <div className='ro'>
              <button onClick={() => handleDelete(todo.id)} className='delete-btn'>Delete</button>
              <button onClick={() => handleToggleComplete(todo.id)} className={todo.completed ? 'complete-btn' : 'uncomplete-btn'}>
                {todo.completed? 'Uncomplete' : 'Complete'}
              </button>
              {editingTodo!== todo.id? (
                <button onClick={() => handleEdit(todo.id)} className='edit-btn'>Edit</button>
              ) : (
                <button onClick={() => handleUpdate(todo.id)} className='update-btn'>Update</button>
              )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;