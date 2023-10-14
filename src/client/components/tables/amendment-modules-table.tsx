import { Module } from "@/client/schema/module";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { AmendmentModule } from "@/client/schema/amendment-module";
import { DeleteAmendmentModuleButton } from "../buttons/delete-amendment-module-button";

interface AmendmentModulesProps {
  contractId: string;
  data: AmendmentModule[];
}

export function AmendmentModulesTable({
  contractId,
  data,
}: AmendmentModulesProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.module?.name}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <DeleteAmendmentModuleButton
                    name={item.module!.name}
                    params={{
                      contractId,
                      amendmentId: item.amendmentId,
                      amendmentModuleId: item.id,
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
