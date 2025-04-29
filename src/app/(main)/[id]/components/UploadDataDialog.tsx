"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUploader } from "@/components/ui/file-uploader";
import { useUpsertMetric } from "@/hooks/feature/use-upsert-metric";
import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
  pageId: z.string(),
  type: z.enum([
    "page_post_engagements",
    "page_impressions",
    "page_views_total",
  ]),
  file: z.array(z.instanceof(File)).length(1),
});
type FormSchema = z.infer<typeof formSchema>;

export const UploadDataDialog = () => {
  const { mutate, isPending } = useUpsertMetric();
  const params: { id: string } = useParams();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      pageId: params.id ?? "",
      type: "page_post_engagements",
    },
  });

  const onSubmit = (data: FormSchema) => {
    mutate({
      file: data.file[0],
      pageId: data.pageId,
      type: data.type,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className={`${buttonVariants()}`}>
        Upload Data
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Data</DialogTitle>
          <DialogDescription>
            You can upload data here manually
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="upload-form"
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metric Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={"Select Metric Type"} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option, idx) => (
                          <SelectItem value={option.value} key={idx}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <FileUploader
                      accept={{ "text/csv": [] }}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            size={"sm"}
            type="submit"
            form="upload-form"
            disabled={isPending}
          >
            Submit
          </Button>
          <DialogClose
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const options = [
  {
    value: "page_post_engagements",
    label: "Engagements",
  },
  {
    value: "page_impressions",
    label: "Impressions",
  },
  {
    value: "page_views_total",
    label: "Views",
  },
];
