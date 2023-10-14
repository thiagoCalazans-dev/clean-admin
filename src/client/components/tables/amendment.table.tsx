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
import { Button } from "../ui/button";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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

const status = ""

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
                <TableCell
                  data-status={status}
                  className="data-[status=ALERT]:text-yellow-500 data-[status=DANGER]:text-red-500 text-primary"
                >
                  {item.dueDate}
                </TableCell>
                <TableCell className="flex justify-end gap-3 items-center">
                  <Button asChild>
                    <Link href={`/contracts/${item.contractId}/${item.id}`}>
                      <MagnifyingGlassIcon className="text-primary-foreground" />
                    </Link>
                  </Button>
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
