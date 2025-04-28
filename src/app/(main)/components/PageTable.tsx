"use client";

import { Datatable, DataTableColumnHeader } from "@/components/datatable";
import { Button } from "@/components/ui/button";
import { PageData, usePages } from "@/hooks/feature/use-pages";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export default function PageTable() {
  const { data } = usePages();

  return (
    <Datatable
      columns={column}
      data={data?.pages || []}
      initialSortingState={[{ id: "metrics.page_follows", desc: true }]}
    />
  );
}

const column: ColumnDef<PageData["data"]["pages"]["0"]>[] = [
  {
    accessorKey: "name",
    header: "Page Name",
    cell(props) {
      return (
        <Link href={`/${props.row.original.id}`}>
          <Button variant={"outline"}>{props.row.original.name}</Button>
        </Link>
      );
    },
  },
  {
    id: "metrics.page_follows",
    accessorKey: "metrics.page_follows",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Followers" />;
    },
  },
  {
    accessorKey: "metrics.page_fans",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Likes" />;
    },
  },
  {
    accessorKey: "metrics.page_impressions",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Impressions" />;
    },
  },
  {
    accessorKey: "metrics.page_post_engagements",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Engagements" />;
    },
  },
  {
    accessorKey: "metrics.page_video_views",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Video Views" />;
    },
  },
  {
    id: "action",
    header: "Action",
    cell(props) {
      return (
        <Link
          href={`https://www.facebook.com/${props.row.original.id}`}
          target="_blank"
        >
          <Button variant={"outline"}>View</Button>
        </Link>
      );
    },
  },
];
