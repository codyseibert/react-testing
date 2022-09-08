import { render, fireEvent, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import App, { useTodos } from './App';
import React from 'react';

describe('App - Component Test', () => {
  it('should allow a user to add a new todo item', async () => {
    const renderedApp = render(<App />);
    const input = await renderedApp.findByLabelText('cost-input');
    user.type(input, 'clean your room');
    const addTodoButton = await renderedApp.findByLabelText('add-todo-btn');
    user.click(addTodoButton);
    const todos = await renderedApp.findAllByTestId(/^todo-/);
    expect(todos.length).toEqual(1);
  });

  it('should allow a user to delete a todo item', async () => {
    const renderedApp = render(<App />);
    const input = await renderedApp.findByLabelText('cost-input');
    await user.type(input, 'clean your room');
    const addTodoButton = await renderedApp.findByLabelText('add-todo-btn');
    await user.click(addTodoButton);
    const allTodos = await renderedApp.findAllByTestId(/^todo-/);
    expect(allTodos.length).toEqual(1);
    const deleteButton = await within(allTodos[0]).findByLabelText(
      'delete-todo'
    );
    await user.click(deleteButton);
    expect(renderedApp.queryAllByTestId(/^todo-/)).toHaveLength(0);
  });
});
