import { FacebookClient } from "@/lib/facebook-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreatePosts = () => {
  return useMutation({
    mutationFn: async (payload: { pageId: string }) => {
      await FacebookClient.post(`/posts`, payload);
    },
    onSuccess() {
      toast.success("Page's posts added!");
    },
    onError(err) {
      if (err instanceof AxiosError)
        return toast.error(err.response?.data.message || err.message);
      toast.error("Update fail!");
    },
  });
};
