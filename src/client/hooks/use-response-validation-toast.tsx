"use client";

import { useToast } from "../components/ui/use-toast";

export function useResponseValidationToast() {
  const { toast } = useToast();

  function onSuccess(title: string) {
    toast({
      title,
      description: new Date().toDateString(),
      color: "red",
    });
  }

  function onError(message: string) {
    toast({
      title: "Error",
      description: message,
      color: "red"
    });
  }

  return {
    onSuccess,
    onError,
  };
}
