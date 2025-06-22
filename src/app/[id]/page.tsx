import { getTodoById } from "@/api/todo-api";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const todo = await getTodoById(id);

  if (!todo) {
    return <div>해당 일정을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{todo.title}</h1>
      <h3>{todo.author}</h3>
      <p>{todo.content}</p>
      <p>{new Date(todo.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default DetailPage;
