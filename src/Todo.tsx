import React, { useEffect, useState } from 'react';
import './App.css';

type TTodo = {
  text: string;
  date: string;
  id: string;
};

export const useTodos = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        text,
        date: new Date().toISOString(),
        id: Math.random() + '',
      },
    ]);
    setText('');
  };

  const deleteTodoById = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, deleteTodoById, addTodo, setText, text };
};

export function Todo() {
  const { todos, deleteTodoById, addTodo, setText, text } = useTodos();

  return (
    <>
      <label htmlFor="todo-text">Todo Text</label>
      <input
        value={text}
        aria-label="cost-input"
        id="todo-text"
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button aria-label="add-todo-btn" onClick={addTodo}>
        Add Todo
      </button>
      {todos.map((todo) => (
        <div key={todo.id} data-testid={`todo-item`}>
          <div>{todo.text}</div>
          <div>{todo.id}</div>
          <div>{todo.date}</div>
          <button
            onClick={() => deleteTodoById(todo.id)}
            aria-label={`delete-todo`}
          >
            delete
          </button>
        </div>
      ))}
    </>
  );
}
