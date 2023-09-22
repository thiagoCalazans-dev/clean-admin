"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormSupplier,
  FormSupplierSchema,
  Supplier,
  SupplierSchema,
} from "@/client/schema/supplier";
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

import { SupplierActions } from "@/client/actions/supplier-actions";

import { useRouter } from "next/navigation";
import { useResponseValidationToast } from "@/client/hooks/use-response-validation-toast";
import {
  normalizeCnpjNumber,
  normalizeZipCode,
} from "@/client/helpers/validators";

interface SupplierFormProps {
  initialData?: FormSupplier;
}

export function SupplierForm({ initialData }: SupplierFormProps) {
  const { onError, onSuccess } = useResponseValidationToast();
  const router = useRouter();

  const form = useForm<Supplier>({
    resolver: zodResolver(FormSupplierSchema),
    defaultValues: initialData || {
      address: "",
      city: "",
      cnpj: "",
      corporateName: "",
      name: "",
      neighborhood: "",
      number: "",
      zipcode: "",
      observation: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const cnpjValue = form.watch("cnpj");
  const zipcodeValue = form.watch("zipcode");

  useEffect(() => {
    form.setValue("cnpj", normalizeCnpjNumber(cnpjValue));
  }, [cnpjValue, form]);

  useEffect(() => {
    form.setValue("zipcode", normalizeZipCode(zipcodeValue));
  }, [zipcodeValue, form]);

  async function onSubmit(formValues: Supplier) {
    try {
      await SupplierActions.CREATE(formValues);
      onSuccess("Supplier created");
      form.reset();
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="md:max-w-[768px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="corporateName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Corporate Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="example ltda"
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
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="00.000/0000-00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="00000-000"
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Osasco"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:max-w-[768px]">
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neighborhood</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Presidente Altino"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Rua Henry Ford"
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
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="96"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:max-w-[768px]">
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observation</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="" {...field} />
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
