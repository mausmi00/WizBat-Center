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
    <Table hoverable>
      <Table.Head>
        {table.getHeaderGroups().map((headerGroup) => (
          <>
            {headerGroup.headers.map((header) => {
              return (
                <Table.HeadCell key={header.id}>
                  {header.column.columnDef.header}
                </Table.HeadCell>
              );
            })}
          </>
        ))}

        {/* {headers.map((header) => (
          <Table.HeadCell>{header}</Table.HeadCell>
        ))} */}
        {/* <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell> */}
      </Table.Head>

      <Table.Body className="divide-y">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {imageUrlCell(cell.id) ? (
                        <Image
                          src={cell.getContext().getValue()}
                          alt="Image"
                          className="aspect-square object-cover rounded-md"
                          height={45}
                          width={45}
                        />
                      ) : imageCell(cell.id) ? (
                        <Image
                          src={cell.getContext().getValue().url}
                          alt="Image"
                          className="aspect-square object-cover rounded-md"
                          height={45}
                          width={45}
                        />
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



{/* 
        {data.map((item) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.name}
            </Table.Cell>
            <Table.Cell>{item.color}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
        ))} */}
        {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Apple MacBook Pro 17"
          </Table.Cell>
          <Table.Cell>Sliver</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </a>
          </Table.Cell>
        </Table.Row> */}

        {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <p>Microsoft Surface Pro</p>
          </Table.Cell>
          <Table.Cell>White</Table.Cell>
          <Table.Cell>Laptop PC</Table.Cell>
          <Table.Cell>$1999</Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </a>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Magic Mouse 2
          </Table.Cell>
          <Table.Cell>Black</Table.Cell>
          <Table.Cell>Accessories</Table.Cell>
          <Table.Cell>$99</Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </a>
          </Table.Cell>
        </Table.Row> */}
      </Table.Body>
    </Table>
  );
}

export default HoverState;
