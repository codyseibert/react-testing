import React from 'react';
import './App.css';
import { useVM } from './hooks/useVM';

export type TTodo = {
  text: string;
  date: string;
  id: string;
};

export type Model = {
  todos: TTodo[];
  text: string;
};

export const controller = ({ model }: { model: Model }) => {
  const addTodo = () => {
    model.todos.push({
      text: model.text,
      date: new Date().toISOString(),
      id: Math.random() + '',
    });
    model.text = '';
  };

  const deleteTodoById = (id: string) => {
    model.todos = model.todos.filter((todo) => todo.id !== id);
  };

  const setText = (value: string) => (model.text = value);

  return {
    addTodo,
    deleteTodoById,
    setText,
    getText: () => model.text,
    getTodos: () => model.todos,
  };
};

export function TodoController() {
  const { deleteTodoById, addTodo, setText, getText, getTodos } = useVM({
    model: {
      todos: [],
      text: '',
    },
    controller,
  });

  return (
    <>
      <label htmlFor="todo-text">Todo Text</label>
      <input
        value={getText()}
        aria-label="cost-input"
        id="todo-text"
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button aria-label="add-todo-btn" onClick={addTodo}>
        Add Todo
      </button>
      {getTodos().map((todo) => (
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
