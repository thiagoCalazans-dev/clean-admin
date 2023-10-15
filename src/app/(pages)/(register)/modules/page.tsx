import { ModuleActions } from "@/client/actions/module-actions";
import { CreateModuleModal } from "@/client/components/modals/create-module-modal";
import { ModuleTable } from "@/client/components/tables/module-table";

import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";
import { Module } from "@/client/schema/module";

export default async function Modules() {
  // const { data } = await ModuleActions.GET();

  let data: Module[] = []
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <>
          <div className="flex items-center justify-between">
            <Heading
              title={`Modulos (${data.length})`}
              description="Cadastre seus modulos"
            />
            <CreateModuleModal />
          </div>
          <Separator />
          <ModuleTable data={data} />
        </>
      </div>
    </div>
  );
}
