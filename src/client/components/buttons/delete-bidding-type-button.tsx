"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/client/components/ui/button";
import { AlertModal } from "@/client/components/modals/alert-modal";
import { TrashIcon } from "@radix-ui/react-icons";
import { useResponseValidationToast } from "../../hooks/use-response-validation-toast";
import { BiddingTypeActions } from "../../actions/bidding-type-actions";

interface DeleteButtonProps {
  id: string;
  name: string;
}

export function DeleteButton({ name, id }: DeleteButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onSuccess, onError } = useResponseValidationToast();

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      await await BiddingTypeActions.REMOVE(id);
      onSuccess(`${name} deleted!`);
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  function onClose() {
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="">
      <AlertModal
        isOpen={open}
        onClose={onClose}
        onConfirm={() => onDeleteConfirm()}
        loading={loading}
      />

      <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
        <TrashIcon />
      </Button>
    </div>
  );
}
