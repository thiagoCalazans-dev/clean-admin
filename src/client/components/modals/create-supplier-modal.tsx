"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/client/components/ui/modal";
import { Button } from "@/client/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { SupplierForm } from "../forms/supplier-form";

export function CreateSupplierModal() {
  const [modalState, setModalState] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  function closeModal() {
    setModalState(false);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button type="button" onClick={() => setModalState(true)}>
        <PlusIcon className="mr-2 h-4 w-4" /> New
      </Button>
      <Modal
        title="Supplier"
        description="create a new item."
        isOpen={modalState}
        onClose={closeModal}
      >
        <SupplierForm />
      </Modal>
    </>
  );
}
