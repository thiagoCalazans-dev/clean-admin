import { BiddingTypeActions } from "@/client/actions/bidding-type-actions";
import { CreateBiddingTypeModal } from "@/client/components/modals/create-bidding-type-modal";
import { BiddingTypeTable } from "@/client/components/tables/bidding-type-table";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";
import { BiddingType } from "@/client/schema/bidding-type";

export default async function BiddingTypes() {
  const { data } = await BiddingTypeActions.GET();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <>
          <div className="flex items-center justify-between">
            <Heading
              title={`Licitação (${data.length})`}
              description="Cadastre seus tipos de licitações"
            />
            <CreateBiddingTypeModal />
          </div>
          <Separator />
          <BiddingTypeTable data={data} />
        </>
      </div>
    </div>
  );
}
