import { FacebookClient } from "@/lib/facebook-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUpsertMetric = () => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await FacebookClient.put("/metrics", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess() {
      toast.success("Update success!");
    },
    onError(e) {
      if (e instanceof AxiosError) {
        return toast.error(e.response?.data.message || e.message);
      }
      toast.error("Update fail!");
    },
  });
};

type Payload = {
  pageId: string;
  type: "page_post_engagements" | "page_impressions" | "page_views_total";
  file: File;
};
