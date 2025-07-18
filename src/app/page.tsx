import { getTodos } from "@/api/todo-api";
import TodoList from "@/components/TodoList";
import Link from "next/link";

export default async function Home() {
  const initialTodos = await getTodos();
  return (
    <div className="mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-center text-4xl font-bold">Next-TodoList</h1>
      <div className="text-center my-8">
        <Link href="/add">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            New
          </button>
        </Link>
      </div>
      {/* <ul className="space-y-4 flex flex-col gap-2">
        {todos.map(({ id, title, completed }) => (
          <Link key={id} href={`/${id}`}>
            <li className="p-4 border rounded-lg shadow-sm cursor-pointer">
              {title}
            </li>
          </Link>
        ))}
      </ul> */}
      <TodoList initialTodos={initialTodos} />
    </div>
  );
}
