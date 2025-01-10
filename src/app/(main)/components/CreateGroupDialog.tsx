"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePages } from "@/hooks/feature/use-pages";
import MultipleSelector from "@/components/ui/multiselect";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateGroup } from "@/hooks/feature/use-create-group";

const formSchema = z.object({
  id: z.string().trim().min(1, "Required"),
  name: z.string().trim().min(1, "Required"),
  type: z.string().trim().min(1, "Required"),
  pageIds: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, "Required"),
});

export type CreateGroupSchema = z.infer<typeof formSchema>;

export default function CreateGroupDeialog() {
  const { mutate, isPending } = useCreateGroup();
  const { data } = usePages();
  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      type: "",
      pageIds: [],
    },
  });

  //   const { fields } = useFieldArray({ control: form.control, name: "pageIds" });

  const onSubmit = (data: CreateGroupSchema) => mutate(data);

  console.log(form.formState.errors);

  return (
    <Dialog onOpenChange={(open) => open && form.reset()}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Create Group
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Page Group</DialogTitle>
          <DialogDescription>
            This will create a new page group.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-1.5">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Must be a region id</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageIds"
                render={() => (
                  <FormItem>
                    <FormLabel>Pages</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        commandProps={{
                          label: "Select Pages",
                        }}
                        defaultOptions={data?.pages.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        value={form.watch("pageIds")}
                        placeholder="Select Pages"
                        hideClearAllButton
                        hidePlaceholderWhenSelected
                        onChange={(value) => form.setValue("pageIds", value)}
                        emptyIndicator={
                          <p className="text-center text-sm">
                            No results found
                          </p>
                        }
                      />
                    </FormControl>
                    <FormDescription>Add pages to this group</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
