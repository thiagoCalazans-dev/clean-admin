"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/client/components/ui/modal";
import { Button } from "@/client/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ModuleForm } from "../forms/module-form";

export function CreateModuleModal() {
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
        title="Módulo"
        description="cadastre um novo módulo"
        isOpen={modalState}
        onClose={closeModal}
      >
        <ModuleForm />
      </Modal>
    </>
  );
}
