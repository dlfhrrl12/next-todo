import { Todo } from "@/types/todo";

export const getTodos = async () => {
  const res = await fetch("http://localhost:3001/todos");
  const data: Todo[] = await res.json();

  return data;
};
