import Link from 'next/link';
import { getTodoById, updateTodo } from './../../../api/todo-api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const todo = await getTodoById(id);

  const updateAction = async (formData: FormData) => {
    'use server';
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;

    const updateData = { title, author, content };

    await updateTodo(id, updateData);

    revalidatePath(`/${id}`);
    revalidatePath('/');

    redirect(`/${id}`);
  };

  if (!todo) {
    return <div>해당 할 일을 찾을 수 없습니다.</div>;
  }

  return (
    <main className="mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-center text-4xl font-bold mb-10">할 일 수정하기</h1>

      <form
        action={updateAction}
        className="space-y-6 bg-white p-8 border rounded-xl shadow-lg"
      >
        {/* 제목 입력 */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-800"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            // defaultValue는 나중에 DB에서 불러온 값으로 채워집니다.
            defaultValue={todo.title}
          />
        </div>

        {/* 작성자 입력 */}
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-800"
          >
            작성자
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={todo.author}
          />
        </div>

        {/* 내용 입력 */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-800"
          >
            내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={todo.content}
          />
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-end gap-4 pt-4">
          {/* TODO: 취소 시 이전 상세 페이지로 돌아가도록 id를 사용한 동적 경로 필요 */}
          <Link href={`/${id}`}>
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            수정 완료
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditPage;
