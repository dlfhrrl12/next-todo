'use client';

import React from 'react';
import { getTodoById } from '@/api/todo-api';
import { useUpdateTodoMutation } from '@/queries/todoMutation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPage() {
  const params = useParams();
  // 4. params 객체에서 id를 추출합니다. (타입 단언이 필요할 수 있습니다)
  const id = params.id as string;
  const router = useRouter();

  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos', id],
    queryFn: () => getTodoById(id),
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const { mutate, isPending } = useUpdateTodoMutation();

  // 3. useEffect를 사용하여 데이터 로딩 후 state를 업데이트합니다.
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setAuthor(todo.author);
      setContent(todo.content);
    }
  }, [todo]);

  const updateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedContent = { title, author, content };
    mutate(
      { id, updatedContent },
      {
        onSuccess: (data) => {
          alert('할 일이 수정되었습니다!');
          router.push(`/${data.id}`);
        },
        onError: (error) => {
          alert('할 일 수정에 실패했습니다.');
          console.error(error);
        },
      }
    );
  };

  // 4. 로딩 및 에러 처리를 먼저 수행합니다.
  if (isLoading) {
    return <div className="text-center mt-10">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="text-center mt-10">해당 할 일을 찾을 수 없습니다.</div>
    );
  }

  // 5. 모든 검사를 통과한 후 메인 JSX를 렌더링합니다.
  return (
    <main className="mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-center text-4xl font-bold mb-10">할 일 수정하기</h1>

      <form
        onSubmit={updateSubmit}
        className="space-y-6 bg-white p-8 border rounded-xl shadow-lg"
      >
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
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
            disabled={isPending}
            className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors disabled:bg-gray-400"
          >
            {isPending ? '수정 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </main>
  );
}
