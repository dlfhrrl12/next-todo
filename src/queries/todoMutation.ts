'use client';

import { createTodo, deleteTodo, updateTodo } from '@/api/todo-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      alert('할 일이 성공적으로 추가되었습니다.');
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
      alert('할 일 추가에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 2. 수정(Update) 뮤테이션 훅
export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    // mutationFn은 인자 하나만 받는 것을 권장하므로, 객체로 묶어 전달합니다.
    mutationFn: (variables: {
      id: string;
      updatedContent: { title?: string; author?: string; content?: string };
    }) => updateTodo(variables.id, variables.updatedContent),
    onSuccess: (data) => {
      // 성공 시 해당 id의 상세 정보와 전체 목록 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['todos', data.id] });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      alert('할 일이 수정되었습니다!');
      router.push(`/todos/${data.id}`);
    },
    onError: (error) => {
      console.error(error);
      alert('할 일 수정에 실패했습니다.');
    },
  });
};

// 3. 삭제(Delete) 뮤테이션 훅
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // 성공 시 'todos' 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      alert('할 일이 삭제되었습니다.');
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
      alert('할 일 삭제에 실패했습니다.');
    },
  });
};
