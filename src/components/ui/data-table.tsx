import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { flexRender, type ColumnDef, type Table as TanStackTable } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface DataTableProps<TData> {
  table: TanStackTable<TData>
  columns: ColumnDef<TData, unknown>[]
  isLoading?: boolean
  skeletonRows?: number
  emptyMessage?: string
  headerSlot?: ReactNode
}

export function DataTable<TData>({
  table,
  columns,
  isLoading = false,
  skeletonRows = 5,
  emptyMessage = 'No data found.',
  headerSlot
}: DataTableProps<TData>) {
  const { t } = useTranslation()

  // Pagination State from Table
  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const pageCount = table.getPageCount()
  const canPreviousPage = table.getCanPreviousPage()
  const canNextPage = table.getCanNextPage()

  // Calculate "Showing X to Y of Z"
  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(totalRows, (pageIndex + 1) * pageSize)

  return (
    <div className="flex flex-col gap-4">
      <div className="border-card-border bg-card relative rounded-xl border shadow-sm">
        {headerSlot && <div className="border-primary border-t-4 border-b p-6">{headerSlot}</div>}

        <div className="overflow-x-auto rounded-b-xl">
          <table className="text-muted w-full text-left text-sm">
            <thead className="border-primary/20 bg-primary/5 text-foreground border-y text-xs font-semibold uppercase">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-card-border divide-y">
              {/* Loading skeleton */}
              {isLoading &&
                Array.from({ length: skeletonRows }).map((_, rowIdx) => (
                  <tr key={`skeleton-${rowIdx}`}>
                    {columns.map((_, colIdx) => (
                      <td key={`skeleton-${rowIdx}-${colIdx}`} className="px-6 py-4">
                        <Skeleton className="h-8 w-full" />
                      </td>
                    ))}
                  </tr>
                ))}

              {/* Empty state */}
              {!isLoading && table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="text-muted px-6 py-12 text-center">
                    {emptyMessage}
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!isLoading &&
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-card-hover/50 even:bg-card-hover/20 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="text-muted flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>{t('dashboard.common.pagination.perPage')}:</span>
            <select
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="hover:border-primary focus:border-primary focus:ring-primary/20 border-card-border bg-card cursor-pointer rounded-lg border px-2 py-1 transition-colors outline-none focus:ring-2"
            >
              {[5, 10, 15, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <span>
            {t('dashboard.common.pagination.showing')} <span className="text-foreground font-semibold">{from}</span>{' '}
            {t('dashboard.common.pagination.to')} <span className="text-foreground font-semibold">{to}</span> {t('dashboard.common.pagination.of')}{' '}
            <span className="text-foreground font-semibold">{totalRows}</span> {t('dashboard.common.pagination.entries')}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage}
            className="hover:text-primary-dark border-card-border bg-card text-muted hover:bg-card-hover flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page numbers (limited) */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
              let pageNum = 0
              if (pageCount <= 5) {
                pageNum = i
              } else if (pageIndex <= 2) {
                pageNum = i
              } else if (pageIndex >= pageCount - 3) {
                pageNum = pageCount - 5 + i
              } else {
                pageNum = pageIndex - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => table.setPageIndex(pageNum)}
                  className={cn(
                    'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition-all',
                    pageIndex === pageNum
                      ? 'border-primary bg-primary text-slate-900 shadow-sm'
                      : 'hover:text-primary-dark border-card-border bg-card text-muted hover:bg-card-hover'
                  )}
                >
                  {pageNum + 1}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!canNextPage}
            className="hover:text-primary-dark border-card-border bg-card text-muted hover:bg-card-hover flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
