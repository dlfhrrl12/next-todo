import { createTodo } from '@/api/todo-api';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const CreateTodo = () => {
  const handleSubmit = async (formData: FormData) => {
    'use server';

    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;

    // 입력값 검증증
    if (!title || !author || !content) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // API 호출 할 일 생성성
    await createTodo({ title, author, content });

    redirect('/');
  };
  return (
    <main className="mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-center text-4xl font-bold mb-10">
        새로운 할 일 추가
      </h1>

      {/* 입력 폼 */}
      <form
        action={handleSubmit}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="제목을 입력하세요"
            name="title"
            required
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="이름 또는 닉네임을 입력하세요"
            required
            name="author"
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
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="할 일의 내용을 상세히 적어주세요."
            name="content"
            required
          />
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-end gap-4 pt-4">
          <Link href="/">
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            추가하기
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTodo;
