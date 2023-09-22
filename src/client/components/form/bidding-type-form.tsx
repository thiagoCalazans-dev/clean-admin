"use client";
import { BiddingTypeActions } from "@/client/actions/bidding-type-actions";
import { useResponseValidationToast } from "@/client/hooks/use-response-validation-toast";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  BiddingType,
  FormBiddingTypeSchema,
} from "@/client/schema/bidding-type";
import { zodResolver as resolver } from "@hookform/resolvers/zod";

export function BiddingTypeForm() {
  const router = useRouter();
  const { onError, onSuccess } = useResponseValidationToast();

  const form = useForm<BiddingType>({
    resolver: resolver(FormBiddingTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: BiddingType) {
    try {
      await BiddingTypeActions.CREATE(formValues);
      onSuccess("Bidding Type created");
      form.reset();
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className=" gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="ml-auto w-full" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
function zodResolver(
  FormBiddingTypeSchema: any
): import("react-hook-form").Resolver<BiddingType, any> | undefined {
  throw new Error("Function not implemented.");
}
