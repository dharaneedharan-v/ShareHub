// hooks/use-toast.ts
import { toast as sonnerToast } from "sonner";

type UseToastOpts = {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "destructive";
};

export function useToast() {
  return {
    toast: (opts: UseToastOpts | string) => {
      if (typeof opts === "string") {
        sonnerToast(opts);
        return;
      }

      const message = opts.description ?? opts.title ?? "";
      if (opts.variant === "destructive") {
        // sonner has toast.error / toast.success in some versions — try them if available
        // @ts-ignore
        if (typeof (sonnerToast as any).error === "function") {
          // @ts-ignore
          (sonnerToast as any).error(message || opts.title || "Error");
          return;
        }
      } else if (opts.variant === "success") {
        // @ts-ignore
        if (typeof (sonnerToast as any).success === "function") {
          // @ts-ignore
          (sonnerToast as any).success(message || opts.title || "Success");
          return;
        }
      }

      sonnerToast(message || opts.title || "");
    },
  };
}
