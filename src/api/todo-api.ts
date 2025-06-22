import { Todo } from "@/types/todo";

const URL = "http://localhost:3001/todos";

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
