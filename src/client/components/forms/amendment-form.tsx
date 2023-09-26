"use client";
import { useEffect } from "react";
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
  Amendment,
  AmendmentSchema,
  FormAmendment,
  FormAmendmentSchema,
} from "@/client/schema/amendment";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { AmendmentActions } from "@/client/actions/amendment-actions";

import { useRouter } from "next/navigation";
import { Combobox } from "@/client/components/ui/combobox";
import { Supplier } from "@/client/schema/supplier";
import { BiddingType } from "@/client/schema/bidding-type";
import { normalizeDate } from "@/client/helpers/validators";
import { useResponseValidationToast } from "@/client/hooks/use-response-validation-toast";

interface AmendmentFormProps {
  contractId: string;
}

export function AmendmentForm({ contractId }: AmendmentFormProps) {
  const { onError, onSuccess } = useResponseValidationToast();
  const router = useRouter();

  const form = useForm<FormAmendment>({
    resolver: zodResolver(FormAmendmentSchema),
    defaultValues: {
      contractId: contractId,
      value: 0,
      dueDate: "",
      number: 0,
      subscriptionDate: "",
    },
  });

  // const dueDateValue = form.watch("dueDate");
  // const subscriptionDateValue = form.watch("subscriptionDate");

  //   useEffect(() => {
  //     form.setValue("dueDate", normalizeDate(dueDateValue));
  //   }, [dueDateValue, form]);

  //   useEffect(() => {
  //     form.setValue("subscriptionDate", normalizeDate(subscriptionDateValue));
  //   }, [subscriptionDateValue, form]);

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: FormAmendment) {
    try {
      await AmendmentActions.CREATE(formValues);
      onSuccess("Amendment created");
      form.reset();
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        <div className="w-full py-2">
          <div className="grid md:grid-cols-2  gap-3">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="subscriptionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Date</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="text"
                      {...field}
                      placeholder="01/01/2023"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="text"
                      placeholder="01/01/2023"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isSubmitting}
            className="ml-auto mt-2 w-full"
            type="submit"
          >
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
