"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/client/components/ui/modal";
import { Button } from "@/client/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { AmendmentModuleForm } from "../forms/amendment-module-form";
import { Module } from "@/client/schema/module";

interface AmendmentModuleModalProps {
  modules: Module[];
  params: {
    contractId: string,
    amendmentId: string,
  }
}


export function CreateAmendmentModuleModal({modules, params}: AmendmentModuleModalProps) {
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
        title="Contrato x Módulos"
        description="vincule um módulo a seu contrato/aditivo"
        isOpen={modalState}
        onClose={closeModal}
      >
        <AmendmentModuleForm params={params} modules={modules} />
      </Modal>
    </>
  );
}
