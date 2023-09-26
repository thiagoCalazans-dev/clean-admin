import { ContractActions } from "@/client/actions/contract-actions";
import { DeleteContractButton } from "@/client/components/buttons/delete-contract-button";
import { CreateAmendmentModal } from "@/client/components/modals/create-amendment-modal";
import { AmendmentTable } from "@/client/components/tables/amendment.table";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

// export async function generateStaticParams() {
//   const contracts = await ContractActions.GET();

//   return contracts.data.map((item) => ({
//     contractId: item.id,
//   }));
// }

export default async function Contract({
  params,
}: {
  params: { contractId: string };
}) {
  const { data } = await ContractActions.FETCH(params.contractId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={`Contract: ${data.number}`} />
          <DeleteContractButton id={data.id} name="Contrato" />
        </div>

        <ul>
          <li className="flex gap-2">
            Processo:
            <span className="text-muted-foreground">{data.processNumber}</span>
          </li>
          <li className="flex gap-2">
            Fornecedor:
            <span className="text-muted-foreground">{data.supplier.name}</span>
          </li>
          <li className="flex gap-2">
            Tipo de licitação:
            <span className="text-muted-foreground">
              {data.biddingType.name}
            </span>
          </li>
          <li className="flex gap-2">
            Data de assinatura:
            <span className="text-muted-foreground">
              {data.subscriptionDate}
            </span>
          </li>
          <li className="flex gap-2">
            Data de vencimento:
            <span className="text-muted-foreground">{data.dueDate}</span>
          </li>
          <li className="flex gap-2">
            Valor:
            <span className="text-muted-foreground">{data.value}</span>
          </li>
          <li className="flex gap-2">
            Primeira Fatura:
            <span className="text-muted-foreground">
              {data.billingDeadline}
            </span>
          </li>
          <li className="flex gap-2">
            Status:
            {data.endContract ? (
              <span className="text-destructive">Encerrado</span>
            ) : (
              <span className="text-primary">Aberto</span>
            )}
          </li>

          <li className="flex flex-col gap-2">
            Descrição:
            <p className="p-4 border rounded-xl max-w-[1000px] ">
              {data.fixture}{" "}
            </p>
          </li>

          <li>{data.endContract}</li>
        </ul>
        <Separator />
        <div className="flex-1 space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <strong className="text-xl">Aditivos:</strong>
            <CreateAmendmentModal contractId={data.id} />
          </div>
          <AmendmentTable data={data.amendment} />
        </div>
      </div>
    </div>
  );
}
