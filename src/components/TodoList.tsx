"use client";

import { Todo } from "@/types/todo";
import Link from "next/link";
import React, { useState } from "react";

const TodoList = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const handleToggle = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  return (
    <ul className="space-y-4 flex flex-col gap-2">
      {todos.map(({ id, title, completed }) => (
        <div key={id} className="flex items-center gap-4">
          <Link href={`/${id}`} className="flex-grow">
            <li
              className={`p-4 border rounded-lg shadow-sm cursor-pointer ${
                completed ? "bg-gray-100" : ""
              }`}
            >
              <span className={completed ? "line-through text-gray-500" : ""}>
                {title}
              </span>
            </li>
          </Link>
          <button
            onClick={() => handleToggle(id)}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            {completed ? "Undo" : "Check"}
          </button>
        </div>
      ))}
    </ul>
  );
};

export default TodoList;
