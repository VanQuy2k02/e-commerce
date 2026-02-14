'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface paginationProps {
  page: number;
  totalPages: number;
}
export default function PaginationPage({ page, totalPages }: paginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updatePages = (page: number) => {
    const param = new URLSearchParams(searchParams.toString());
    if (page < 1 && page > totalPages) return;
    param.set('page', String(page));
    router.replace(`?${param.toString()}`);
  };
  const handlePagination = (page: number) => updatePages(page);

  const handleNext = () => updatePages(page + 1);

  const handlePrevious = () => updatePages(page - 1);
  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p} className="cursor-pointer">
            <PaginationLink isActive={page === p} onClick={() => handlePagination(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
