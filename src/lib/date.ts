export const formatDate = (dateString: string | undefined): string => {
  // 날짜 문자열이 주어지지 않은 경우 처리
  if (!dateString) {
    return '날짜 정보 없음';
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '유효하지 않은 날짜';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
};
