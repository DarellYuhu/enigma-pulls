"use client";

import { Datatable } from "@/components/datatable";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCreatePosts } from "@/hooks/feature/use-create-posts";
import { usePage } from "@/hooks/feature/use-page";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LuRefreshCcw } from "react-icons/lu";

export const Posts = () => {
  const params = useParams();
  const { data } = usePage();
  const { mutate, isPending } = useCreatePosts();

  const handleGetPosts = () => {
    mutate({ pageId: params.id as string });
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleGetPosts} disabled={isPending}>
        <LuRefreshCcw />
        Get New Posts
      </Button>
      <Datatable columns={columns} data={data?.posts || []} />
    </div>
  );
};

type Post = NonNullable<ReturnType<typeof usePage>["data"]>["posts"]["0"];
const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "caption",
    header: "Caption",
  },
  {
    accessorKey: "created_time",
    header: "Created Time",
    cell({ row }) {
      return (
        <Badge variant={"outline"} className="text-nowrap">
          {format(new Date(row.getValue("created_time")), "LLL dd, y")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "metrics.post_reactions_like_total",
    header: "Like",
  },
  {
    accessorKey: "metrics.post_reactions_love_total",
    header: "Love",
  },
  {
    accessorKey: "metrics.post_reactions_wow_total",
    header: "Wow",
  },
  {
    accessorKey: "metrics.post_reactions_haha_total",
    header: "Hah",
  },
  {
    accessorKey: "metrics.post_reactions_sorry_total",
    header: "Sorry",
  },
  {
    accessorKey: "metrics.post_reactions_anger_total",
    header: "Anger",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Link
          href={"https://www.facebook.com/" + row.original.id}
          target={"_blank"}
          className={buttonVariants({ size: "sm" })}
        >
          View
        </Link>
      );
    },
  },
];
