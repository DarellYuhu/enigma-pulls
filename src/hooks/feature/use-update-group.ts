import { FacebookClient } from "@/lib/facebook-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUpdateGroup = () => {
  return useMutation({
    mutationFn: async ({ groupId, ...payload }: Payload) => {
      await FacebookClient.patch(`/groups/${groupId}`, payload);
    },
    onSuccess() {
      toast.success("Update success!");
    },
    onError(err) {
      if (err instanceof AxiosError)
        return toast.error(err.response?.data.message || err.message);
      toast.error("Update fail!");
    },
  });
};

type Payload = {
  groupId: string;
  addPageIds?: string[];
};
