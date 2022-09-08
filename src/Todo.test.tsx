import { render, fireEvent, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Todo } from "./Todo";
import React from "react";

describe("Todo - Component Test", () => {
  it("should allow a user to add a new todo item", async () => {
    const renderedApp = render(<Todo />);
    const input = await renderedApp.findByLabelText("todo-text");
    await user.type(input, "clean your room");
    const addTodoButton = await renderedApp.findByLabelText("add-todo-btn");
    await user.click(addTodoButton);
    const todos = await renderedApp.findAllByTestId(/^todo-/);
    expect(todos.length).toEqual(1);
  });

  it("should clear our the existing input when a user adds the todo item", async () => {
    const renderedApp = render(<Todo />);
    const input = await renderedApp.findByLabelText("todo-text");
    await user.type(input, "clean your room");
    const addTodoButton = await renderedApp.findByLabelText("add-todo-btn");
    await user.click(addTodoButton);
    expect(input.value).toEqual("");
  });

  it("should allow a user to delete a todo item", async () => {
    const renderedApp = render(<Todo />);
    const input = await renderedApp.findByLabelText("todo-text");
    await user.type(input, "clean your room");
    const addTodoButton = await renderedApp.findByLabelText("add-todo-btn");
    await user.click(addTodoButton);
    const allTodos = await renderedApp.findAllByTestId(/^todo-/);
    expect(allTodos.length).toEqual(1);
    const deleteButton = await within(allTodos[0]).findByLabelText(
      "delete-todo"
    );
    await user.click(deleteButton);
    expect(renderedApp.queryAllByTestId(/^todo-/)).toHaveLength(0);
  });
});
