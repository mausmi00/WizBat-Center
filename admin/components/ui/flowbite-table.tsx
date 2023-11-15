"use client";

import { Table } from "flowbite-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HoverStateProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function HoverState<TData, TValue>({
  columns,
  data,
  searchKey,
}: HoverStateProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const imageUrlCell = (text: any) => {
    return text.includes("imageUrl") || text.includes("Image") ? true : false;
  };

  const imageCell = (text: any) => {
    return text.includes("image") ? true : false;
  };

  return (
    <>
      <div>
        <Table hoverable>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.HeadCell key={header.id}>
                      {typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </Table.HeadCell>
                  );
                })}
              </>
            ))}
          </Table.Head>

          <Table.Body className="divide-y">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                      {imageUrlCell(cell.id) ? (
                        <Image
                          src={(cell.getContext().getValue() as string) || ""}
                          alt="Image"
                          className="aspect-square object-cover rounded-md"
                          height={100}
                          width={100}
                        />
                      ) : imageCell(cell.id) ? (
                        <>
                          {/* {console.log(cell.getContext().getValue())} */}
                          <Image
                            src={(cell.getContext().getValue() as string) || ""}
                            alt="Image"
                            className="aspect-square object-cover rounded-md"
                            height={100}
                            width={100}
                          />
                        </>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default HoverState;
