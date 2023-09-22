import { Contract } from "@/client/schema/contract";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";

interface ContractProps {
  data: Contract[];
}

export function ContractTable({ data }: ContractProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Numero</TableHead>
            <TableHead>Numero Processo</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.supplier.name}</TableCell>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.processNumber}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <Button asChild>
                    <Link href={`/contracts/${item.id}`}>
                      <MagnifyingGlassIcon className="text-primary-foreground" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
