import { Module } from "@/client/schema/module";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { DeleteButton } from "../buttons/delete-module-button";


interface ModuleProps {
  data: Module[];
}

export function ModuleTable({ data }: ModuleProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
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
