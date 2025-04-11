import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MultipleSelector from "@/components/ui/multiselect";
import { PageData } from "@/hooks/feature/use-pages";
import { useUpdateGroup } from "@/hooks/feature/use-update-group";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddGroupPageDialog = ({
  group,
  pages,
}: {
  group: PageData["data"]["groups"]["0"];
  pages: PageData["data"]["pages"];
}) => {
  const { mutate, isPending } = useUpdateGroup();
  const [addPageIds, setAddPageIds] = useState<
    { value: string; label: string }[]
  >([]);

  const handleSubmit = () => {
    mutate({
      groupId: group.id,
      addPageIds: addPageIds.map((page) => page.value),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{'Add pages to "' + group.name + '"'}</DialogTitle>
          <DialogDescription>
            Select the pages you want to add
          </DialogDescription>
        </DialogHeader>
        <MultipleSelector
          commandProps={{
            label: "Select pages",
          }}
          value={addPageIds}
          onChange={setAddPageIds}
          defaultOptions={pages
            .filter((page) => !group.pages.some((p) => p.id === page.id))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((page) => ({
              value: page.id,
              label: page.name,
            }))}
          placeholder="Select pages"
          hideClearAllButton
          hidePlaceholderWhenSelected
          emptyIndicator={
            <p className="text-center text-sm">No results found</p>
          }
        />
        <DialogFooter>
          <Button size={"sm"} onClick={handleSubmit} disabled={isPending}>
            Save changes
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
