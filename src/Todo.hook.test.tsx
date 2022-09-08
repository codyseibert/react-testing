import { render, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import App, { useTodos } from './App';
import { renderHook, act } from '@testing-library/react-hooks';

describe('App - Component Test', () => {
  it('should allow a user to add a new todo item', async () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setText('clean your room');
      result.current.addTodo();
    });

    expect(result.current.todos.length).toBe(1);
  });

  it('should allow a user to delete a todo item', async () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setText('clean your room');
      result.current.addTodo();
    });

    const todo = result.current.todos[0];
    act(() => {
      result.current.deleteTodoById(todo.id);
    });
    expect(result.current.todos.length).toBe(0);
  });
});
