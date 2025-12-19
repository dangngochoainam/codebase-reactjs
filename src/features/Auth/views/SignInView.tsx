import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Github } from "lucide-react";
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
import { useState } from "react";
import { useNavigate } from "react-router";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInView() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      navigate("/products");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during signin";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = () => {
    console.log("GitHub sign in clicked");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Hi there!</h1>
          <p className="text-white text-sm">Wellcome to our platform!</p>
        </div>

        {/* GitHub Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGitHubSignIn}
          className="w-full bg-gray-800/50 text-white border-gray-700 hover:bg-gray-700/50 rounded-md h-11 mb-0 "
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-white">Or continue with</span>
          </div>
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
                      placeholder="name@example.com"
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

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-200 text-black hover:bg-gray-300 font-medium rounded-md h-11"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-xs text-white/70 mt-8">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="underline underline-offset-4 hover:text-white"
          >
            Sign up
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
