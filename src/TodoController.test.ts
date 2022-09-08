import { controller } from './TodoController';

describe('TodoController - Unit Test', () => {
  it('should allow a user to add a new todo item', async () => {
    const { addTodo, setText, getTodos } = controller({
      model: {
        todos: [],
        text: '',
      },
    });
    setText('clean your room');
    addTodo();
    expect(getTodos().length).toEqual(1);
  });

  it('should allow a user to delete a todo item', async () => {
    const { addTodo, setText, getTodos, deleteTodoById } = controller({
      model: {
        todos: [],
        text: '',
      },
    });
    setText('clean your room');
    addTodo();
    expect(getTodos().length).toEqual(1);
    deleteTodoById(getTodos()[0].id);
    expect(getTodos().length).toEqual(0);
  });
});
