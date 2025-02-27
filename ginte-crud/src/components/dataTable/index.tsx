"use client";
import React, { useEffect } from "react";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onChangeSelectedIds: (value: any) => void;
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  onChangeSelectedIds,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    onChangeSelectedIds(table.getSelectedRowModel());
  }, [table.getSelectedRowModel()]);

  return (
    <div className="w-full mt-6">
      <div className="rounded-md border border-[#3F3F46]">
        <Table className="text-white divide-[#3f3f46]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-[#3F3F46]" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-[#3F3F46]">
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index} className="border-[#3F3F46]">
                  <TableCell>
                    <Skeleton className="h-4 w-7 bg-gray-400" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32 bg-gray-400" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48 bg-gray-400" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48 bg-gray-400" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48 bg-gray-400" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48 bg-gray-400" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-[#3F3F46] ${
                    row.getIsSelected() ? "bg-[#27272A] hover:bg-[#27272A]" : ""
                  } `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Não houve resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2 text-white">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`${
              table.getCanNextPage() ? "bg-[#52525B]" : ""
            } text-white`}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
