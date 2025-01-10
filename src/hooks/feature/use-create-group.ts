import { CreateGroupSchema } from "@/app/(main)/components/CreateGroupDialog";
import { FacebookClient } from "@/lib/facebook-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: async (values: CreateGroupSchema) => {
      const { data } = await FacebookClient.post("/groups", {
        ...values,
        pageIds: values.pageIds.map((item) => item.value),
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Create success!");
    },
    onError: () => {
      toast.error("Create fail!");
    },
  });
};
