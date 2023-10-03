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
  Contract,
  ContractSchema,
  FormContract,
  FormContractSchema,
} from "@/client/schema/contract";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ContractActions } from "@/client/actions/contract-actions";

import { useRouter } from "next/navigation";
import { Combobox } from "@/client/components/ui/combobox";
import { Supplier } from "@/client/schema/supplier";
import { BiddingType } from "@/client/schema/bidding-type";
import { normalizeDate } from "@/client/helpers/validators";
import { useResponseValidationToast } from "@/client/hooks/use-response-validation-toast";

interface ContractFormProps {
  biddingTypes: BiddingType[];
  suppliers: Supplier[];
}

export function ContractForm({ biddingTypes, suppliers }: ContractFormProps) {
  const { onError, onSuccess } = useResponseValidationToast();
  const router = useRouter();

  const form = useForm<Contract>({
    resolver: zodResolver(FormContractSchema),
    defaultValues: {
      value: "",
      billingDeadline: "",
      dueDate: "",
      endContract: false,
      fixture: "",
      number: "",
      processNumber: "",
      subscriptionDate: "",
      supplierId: "",
      biddingTypeId: "",
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

  async function onSubmit(formValues: Contract) {
    try {
      await ContractActions.CREATE(formValues);
      onSuccess("Contract created");
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
              name="processNumber"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Process Number</FormLabel>
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
          </div>
          <div className="grid md:grid-cols-2  gap-3">
            <Suspense fallback="carregando...">
              <Combobox
                data={suppliers}
                form={form}
                label="Supplier"
                name="supplierId"
              />
            </Suspense>
            <Suspense fallback="carregando...">
              <Combobox
                data={biddingTypes}
                form={form}
                label="Bidding type"
                name="biddingTypeId"
              />
            </Suspense>
          </div>
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
          <div className="grid md:grid-cols-2  gap-3">
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
          <FormField
            control={form.control}
            name="billingDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Deadline</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    placeholder="30 days"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fixture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fixture</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Lorem ipsum dolor sit amet. Sit ratione nemo et quam officiis et molestiae nihil ad facere omnis"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endContract"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2 mt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">End Contract</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isSubmitting} className="ml-auto" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
