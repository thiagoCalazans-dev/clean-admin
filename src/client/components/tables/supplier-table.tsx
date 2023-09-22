import { Supplier } from "@/client/schema/supplier";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { DeleteButton } from "../buttons/delete-supplier-button";


interface SupplierProps {
  data: Supplier[];
}

export function SupplierTable({ data }: SupplierProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.cnpj}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <DeleteButton name={item.name} id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
