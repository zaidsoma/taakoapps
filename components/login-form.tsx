"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import image from "next/image";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await authClient.signIn.email(
      {
        email: values.email, // user email address
        password: values.password, // user password -> min 8 characters by default
        callbackURL: "/admin", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          router.push("/admin");
          setIsLoading(false);
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("flex flex-col gap-6", className)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input placeholder="m@example.com" {...field} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="password"
                    placeholder="must be at least 8 characters"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}{" "}
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
