"use client";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import {
  AmendmentModule,
  FormAmendmentModule,
  FormAmendmentModuleSchema,
  

} from "@/client/schema/amendment-module";

import { useRouter } from "next/navigation";
import { Combobox } from "@/client/components/ui/combobox";
import { useResponseValidationToast } from "@/client/hooks/use-response-validation-toast";
import { AmendmentModuleActions } from "@/client/actions/amendment-modules-actions";
import { Module } from "@/client/schema/module";

interface AmendmentModuleFormProps {
  modules: Module[];
  params: {
    contractId: string;
    amendmentId: string;
  };
}

export function AmendmentModuleForm({ modules, params }: AmendmentModuleFormProps) {
  const { onError, onSuccess } = useResponseValidationToast();
  const router = useRouter();

  const form = useForm<AmendmentModule>({
    resolver: zodResolver(FormAmendmentModuleSchema),
    defaultValues: {
      amendmentId: params.amendmentId,
    },
  });

  const { isSubmitting, errors } = form.formState;


  async function onSubmit(formValues: FormAmendmentModule) {
    try {      
      await AmendmentModuleActions.CREATE(params, formValues);
      onSuccess("AmendmentModule created");
      form.reset();
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <div className="md:max-w-[768px] flex flex-col gap-3">
          <div className="grid md:grid-cols-2  gap-3">
            <Suspense fallback="carregando...">
              <Combobox
                data={modules}
                form={form}
                label="Módulos"
                name="moduleId"
              />
            </Suspense>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="00,00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={isSubmitting} className="ml-auto" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
