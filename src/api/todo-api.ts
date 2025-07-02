import { Todo } from '@/types/todo';

const URL = 'http://localhost:3001/todos';

export const getTodos = async () => {
  const res = await fetch(URL);
  const data: Todo[] = await res.json();

  return data;
};

export const getTodoById = async (id: string): Promise<Todo | null> => {
  const res = await fetch(`${URL}/${id}`);

  if (!res.ok) {
    return null;
  }

  const data: Todo = await res.json();
  return data;
};

export const createTodo = async (newTodo: {
  title: string;
  author: string;
  content: string;
}) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newTodo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isDone: false,
    }),
  });
  const data: Todo = await res.json();
  return data;
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const updateTodo = async (id: string, updateTodo: Partial<Todo>) => {
  const res = await fetch(`${URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateTodo),
  });

  if (!res.ok) {
    throw new Error('할 일 업데이트에 실패했습니다.');
  }

  const data: Todo = await res.json();
  return data;
};
