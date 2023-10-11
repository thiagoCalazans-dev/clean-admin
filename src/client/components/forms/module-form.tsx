"use client";
import { ModuleActions } from "@/client/actions/module-actions";
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
  Module,
  FormModuleSchema,
} from "@/client/schema/module";
import { zodResolver as resolver } from "@hookform/resolvers/zod";

export function ModuleForm() {
  const router = useRouter();
  const { onError, onSuccess } = useResponseValidationToast();

  const form = useForm<Module>({
    resolver: resolver(FormModuleSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: Module) {
    try {
      await ModuleActions.CREATE(formValues);
      onSuccess("Module created");
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
