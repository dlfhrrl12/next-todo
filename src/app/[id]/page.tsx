"use client";
import { getTodoById } from "@/api/todo-api";
import { formatDate } from "@/lib/date";
import { useDeleteTodoMutation } from "@/queries/todoMutation";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { useParams } from "next/navigation";

const DetailPage = () => {
  const params = useParams();
  // 4. params 객체에서 id를 추출합니다. (타입 단언이 필요할 수 있습니다)
  const id = params.id as string;

  // 1. useQuery를 사용해 상세 데이터를 불러옵니다.
  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getTodoById(id),
  });

  // 2. useDeleteTodoMutation 훅을 호출합니다.
  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteTodoMutation();

  // 3. 삭제 버튼 클릭 시 실행될 핸들러
  const handleDelete = () => {
    if (window.confirm("정말로 이 할 일을 삭제하시겠습니까?")) {
      // mutate 함수에 삭제할 todo의 id를 전달합니다.
      deleteMutate(id);
    }
  };

  if (isLoading) return <div className="text-center mt-10">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">오류가 발생했습니다.</div>
    );
  if (!todo)
    return (
      <div className="text-center mt-10">해당 할 일을 찾을 수 없습니다.</div>
    );

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
            <span>작성일: {new Date(todo.createdAt).toLocaleDateString()}</span>
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
        <button className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          수정
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          삭제
        </button>
      </div>
    </main>
  );
};

export default DetailPage;
