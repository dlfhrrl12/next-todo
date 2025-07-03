'use client';

import { useCreateTodoMutation } from '@/queries/todoMutation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FormEvent, useState } from 'react';

const CreateTodo = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateTodoMutation();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    mutate(
      { title, author, content },
      {
        onSuccess: () => {
          alert('할 일이 성공적으로 추가되었습니다.');
          router.push('/');
        },
        onError: () => {
          alert('할 일 추가에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };
  return (
    <main className="mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-center text-4xl font-bold mb-10">
        새로운 할 일 추가
      </h1>

      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            disabled={isPending}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {isPending ? '추가 중...' : '추가하기'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTodo;
