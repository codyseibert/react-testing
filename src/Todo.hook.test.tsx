import { renderHook, act } from "@testing-library/react-hooks";
import { useTodos } from "./Todo";

describe("App - Component Test", () => {
  it("should allow a user to add a new todo item", async () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setText("clean your room");
      result.current.addTodo();
    });

    expect(result.current.todos.length).toBe(1);
  });

  it("should clear our the existing input when a user adds the todo item", async () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setText("clean your room");
      result.current.addTodo();
    });

    expect(result.current.text).toBe("");
  });

  it("should allow a user to delete a todo item", async () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setText("clean your room");
      result.current.addTodo();
    });

    const todo = result.current.todos[0];
    act(() => {
      result.current.deleteTodoById(todo.id);
    });
    expect(result.current.todos.length).toBe(0);
  });
});
