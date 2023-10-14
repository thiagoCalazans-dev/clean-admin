import { AmendmentActions } from "@/client/actions/amendment-actions";
import { ModuleActions } from "@/client/actions/module-actions";
import { CreateAmendmentModuleModal } from "@/client/components/modals/create-amendment-module-modal";
import { AmendmentModulesTable } from "@/client/components/tables/amendment-modules-table";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function Amendment({
  params,
}: {
  params: { contractId: string; amendmentId: string };
}) {
  const { data } = await AmendmentActions.FETCH({
    contractId: params.contractId,
    amendmentId: params.amendmentId,
  });

  const { data: modules } = await ModuleActions.GET();

  type DueDateStatus = "DANGER" | "ALERT" | "SAFE";

  function StatusToDueDate(data: Date): DueDateStatus {
    const today = new Date();
    //TO-DO LOGIC FOR DAYS HERE
    return "DANGER";
  }

  const status = StatusToDueDate(new Date());

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={`Contrato: ${data.contract?.number}`} />
        </div>
        <ul>
          <li className="flex gap-2">
            Processo:
            <span className="text-muted-foreground">
              {data.contract?.processNumber}
            </span>
          </li>
          <li className="flex gap-2">
            Aditivo:
            <span className="text-muted-foreground">{data.number}</span>
          </li>
          <li className="flex gap-2">
            Data de Assinatura:
            <span className="text-muted-foreground">
              {data.subscriptionDate}
            </span>
          </li>
          <li className="flex gap-2">
            Data de Vencimento:
            <span
              data-status={status}
              className="text-muted-foreground data-[status=DANGER]:text-red-500"
            >
              {data.dueDate}
            </span>
          </li>
          <li className="flex gap-2">
            Valor:
            <span className="text-muted-foreground">{data.value}</span>
          </li>
        </ul>
        <Separator />
        <div className="flex-1 space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <strong className="text-xl">Modulos:</strong>
            <CreateAmendmentModuleModal params={params} modules={modules} />
          </div>
          <AmendmentModulesTable
            data={data.amendmentModules!}
            contractId={params.contractId}
          />
        </div>
      </div>
    </div>
  );
}
