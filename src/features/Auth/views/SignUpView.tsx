import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/core/components/shadcn/button";
import { Input } from "@/core/components/shadcn/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/core/components/shadcn/form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters long"),
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long"),
  phone: z.string().optional(),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpView() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
      });

      navigate("/signin");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during signup";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Create an account</h1>
          <p className="text-white text-sm">
            Enter your information below to create your account
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email@example.com"
                      className="bg-gray-800/50 text-white border-gray-700 placeholder:text-gray-400 focus-visible:ring-gray-600 rounded-md h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="bg-gray-800/50 text-white border-gray-700 placeholder:text-gray-400 focus-visible:ring-gray-600 rounded-md h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name"
                      className="bg-gray-800/50 text-white border-gray-700 placeholder:text-gray-400 focus-visible:ring-gray-600 rounded-md h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Phone"
                      className="bg-gray-800/50 text-white border-gray-700 placeholder:text-gray-400 focus-visible:ring-gray-600 rounded-md h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-200 text-black hover:bg-gray-300 font-medium rounded-md h-11 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-xs text-white/70 mt-8">
          Already have an account?{" "}
          <a href="/signin" className="underline underline-offset-4 hover:text-white">
            Sign in
          </a>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-white/70 mt-8">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-white">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
