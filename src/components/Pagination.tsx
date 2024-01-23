import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import LoadingFallback from '@/components/LoadingFallback'

interface Props {
  currentPage?: number
  pageSize?: number
  totalCount?: number
  onPageChange?: (page: number) => void
}

export default function Pagination({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
}: Props) {
  if (!currentPage || !pageSize || !totalCount || !onPageChange) {
    return <LoadingFallback height={40} />
  }

  const totalPages = Math.ceil(totalCount / pageSize)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between">
      <p className="hidden md:block text-center">
        Showing{' '}
        <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span>{' '}
        to&nbsp;
        <span className="font-medium">
          {Math.min(currentPage * pageSize, totalCount)}
        </span>{' '}
        of <span className="font-medium">{totalCount}</span> results
      </p>
      <div className="flex items-center justify-center">
        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-r-none border border-gray-300 w-10 h-10 rounded-l-lg disabled:opacity-30"
        >
          <span className="w-5 h-5 inline-block mt-1.5">
            <ChevronLeftIcon className="w-5 h-5" />
          </span>
        </button>
        <ul className="inline-flex">
          {pages.map((page, index) => (
            <li
              className={`inline-block ${
                page === currentPage
                  ? 'bg-blue-600 text-white !opacity-100 border-blue-600'
                  : 'border-gray-300'
              }`}
              key={index}
            >
              <button
                aria-label={`Page ${page}`}
                disabled={page === currentPage}
                onClick={() => onPageChange(page)}
                className={`border !rounded-none w-10 h-10 border-collapse`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
        <button
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="!rounded-l-none border border-gray-300 w-10 h-10 rounded-r-lg disabled:!opacity-30"
        >
          <span className="w-5 h-5 inline-block mt-1.5">
            <ChevronRightIcon className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  )
}
