import { SupplierActions } from "@/client/actions/supplier-actions";
import { CreateSupplierModal } from "@/client/components/modals/create-supplier-modal";
import { SupplierTable } from "@/client/components/tables/supplier-table";

import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function Suppliers() {
  const { data } = await SupplierActions.GET();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <>
          <div className="flex items-center justify-between">
            <Heading
              title={`Suppliers (${data.length})`}
              description="Manage your suppliers"
            />
            <CreateSupplierModal />
          </div>
          <Separator />
          <SupplierTable data={data} />
        </>
      </div>
    </div>
  );
}
