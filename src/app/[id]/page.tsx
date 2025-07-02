import { deleteTodo, getTodoById } from '@/api/todo-api';
import { formatDate } from '@/lib/date';
import { revalidatePath } from 'next/cache';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const todo = await getTodoById(id);

  if (!todo) {
    return <div>해당 일정을 찾을 수 없습니다.</div>;
  }
  const deleteAction = async () => {
    'use server';

    await deleteTodo(id);

    revalidatePath(`/`);

    redirect('/');
  };

  return (
    // 1. 전체 레이아웃 설정
    <main className="mx-auto max-w-3xl py-12 px-4">
      {/* 2. 콘텐츠를 감싸는 카드 UI */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* 3. 정보 중요도에 따른 텍스트 스타일링 */}
          {/* 제목 */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {todo.title}
          </h1>

          {/* 작성자 및 날짜 정보 */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <span>작성자: {todo.author}</span>
            <span>작성일: {formatDate(todo.createdAt)}</span>
          </div>

          {/* 구분선 */}
          <hr className="my-6" />

          {/* 내용 */}
          <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
            {todo.content}
          </p>
        </div>
      </div>

      {/* 4. 상호작용 버튼들 */}
      <div className="mt-8 flex justify-end gap-4">
        <Link href="/">
          <button className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">
            목록으로
          </button>
        </Link>

        <Link href={`/edit/${todo.id}`}>
          <button className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
            수정
          </button>
        </Link>

        <form action={deleteAction}>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            삭제
          </button>
        </form>
      </div>
    </main>
  );
};

export default DetailPage;
