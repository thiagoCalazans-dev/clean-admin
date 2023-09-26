import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";

import { Amendment, CreateAmendmentParams } from "@/client/schema/amendment";
import { DeleteAmendmentButton } from "../buttons/delete-amendment-button";

interface ContractProps {
  data: Amendment[] | undefined;
}

export function AmendmentTable({ data }: ContractProps) {
  if (!data || data.length === 0)
    return (
      <div className="flex  flex-1 justify-center items-center">
        <span className="text-primary"> Ainda nao possui aditamentos</span>
      </div>
    );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numero</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Assinatura</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const params: CreateAmendmentParams = {
              amendmentId: item.id,
              contractId: item.contractId,
            };

            return (
              <TableRow key={item.id}>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.subscriptionDate}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <DeleteAmendmentButton name="Amendment" params={params} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
