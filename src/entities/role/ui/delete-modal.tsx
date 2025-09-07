import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import type { FC } from "react";
import { roleMutations, roleQueryKeys } from "../api";
import { useToast } from "@/shared/hooks/use-toast";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { queryClient } from "@/shared/lib/tanstack-query/client";
import { Trash } from "lucide-react";

interface Props {
  id?: number;
}

export const DeleteModal: FC<Props> = ({ id }) => {
  const { showToast } = useToast();
  const { showError } = useErrorToast();

  const { mutate } = useMutation(
    roleMutations.delete({
      onSuccess: () => {
        showToast("Role deleted successfully", "success");
      },
      onError: showError,
    }),
  );

  const handleDelete = async (id: number) => {
    await mutate(id);

    queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="text-red-600 hover:text-red-700" size={"icon"}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this role?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => handleDelete(id!)}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
