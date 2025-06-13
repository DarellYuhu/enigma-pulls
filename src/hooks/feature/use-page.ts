import { FacebookClient } from "@/lib/facebook-client";
import { usePageConfigStore } from "@/stores/page-config-store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const usePage = () => {
  const { from, to } = usePageConfigStore();
  const { id } = useParams();

  return useQuery({
    queryKey: ["page", id],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (from && to)
        searchParams.set(
          "date",
          [from.toISOString(), to.toISOString()].join(",")
        );
      const { data } = await FacebookClient.get<Data>(
        `/page/${id}?${searchParams.toString()}`
      );
      return data.data;
    },
  });
};

type Data = {
  data: {
    id: string;
    name: string;
    isActive: boolean;
    aggregate: Record<string, number>;
    timeseries: Record<string, { end_time: string; value: number }[]>;
    posts: {
      metrics: Record<Key, number>;
      id: string;
      pageId: string;
      created_time: string;
      caption: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
  statusCode: number;
};

enum Key {
  "post_reactions_like_total",
  "post_reactions_love_total",
  "post_reactions_wow_total",
  "post_reactions_haha_total",
  "post_reactions_sorry_total",
  "post_reactions_anger_total",
}
