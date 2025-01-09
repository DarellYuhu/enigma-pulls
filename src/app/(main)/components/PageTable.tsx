"use client";

import { Datatable } from "@/components/datatable";
import { Button } from "@/components/ui/button";
import { PageData, usePages } from "@/hooks/feature/use-pages";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export default function PageTable() {
  const { data } = usePages();

  return <Datatable columns={column} data={data?.pages || []} />;
}

const column: ColumnDef<PageData["data"]["pages"]["0"]>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    cell(props) {
      return (
        <Link href={`/page/${props.row.original.id}`}>
          <Button variant={"outline"}>{props.row.original.name}</Button>
        </Link>
      );
    },
  },
];
