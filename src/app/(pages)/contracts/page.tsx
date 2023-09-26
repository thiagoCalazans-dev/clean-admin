import { BiddingTypeActions } from "@/client/actions/bidding-type-actions";
import { ContractActions } from "@/client/actions/contract-actions";
import { SupplierActions } from "@/client/actions/supplier-actions";
import { CreateContractModal } from "@/client/components/modals/create-contract-modal";
import { ContractTable } from "@/client/components/tables/contract-table";
import { Heading } from "@/client/components/ui/heading";

import { Separator } from "@/client/components/ui/separator";

export default async function Contracts() {
  const { data } = await ContractActions.GET();
  const { data: biddingTypes } = await BiddingTypeActions.GET();
  const { data: suppliers } = await SupplierActions.GET();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <>
          <div className="flex items-center justify-between">
            <Heading
              title={`Contracts (${data.length})`}
              description="Manage your contractss"
            />
            <CreateContractModal
              suppliers={suppliers}
              biddingTypes={biddingTypes}
            />
          </div>
          <Separator />
          <ContractTable data={data} />
        </>
      </div>
    </div>
  );
}
