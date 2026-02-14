export function formatDate(value?: string) {
  if (!value) return '—';

  const date = new Date(value);
  if (isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('vi-VN');
}
