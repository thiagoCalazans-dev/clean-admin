"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/client/components/ui/modal";
import { Button } from "@/client/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ContractForm } from "../forms/contract-form";
import { BiddingType } from "@/client/schema/bidding-type";
import { Supplier } from "@/client/schema/supplier";

interface ContractModalProps {
  biddingTypes: BiddingType[];
  suppliers: Supplier[];
}

export function CreateContractModal({biddingTypes, suppliers}: ContractModalProps) {
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
        title="Contract"
        description="create a new item."
        isOpen={modalState}
        onClose={closeModal}
      >
        <ContractForm biddingTypes={biddingTypes} suppliers={suppliers} />
      </Modal>
    </>
  );
}
