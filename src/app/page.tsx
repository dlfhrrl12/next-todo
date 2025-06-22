export default function Home() {
  return (
    <div className="mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-center text-4xl font-bold">Next-TodoList</h1>
      <div className="text-center my-8">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          New
        </button>
      </div>
      <ul>
        <li>1 번째 일</li>
        <li>2 번째 일</li>
        <li>3 번째 일</li>
      </ul>
    </div>
  );
}
