import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/core/components/shadcn/form";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { MONO, SANS, SERIF } from "@/core/lib/utils/styles";

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

const FIELD_LABEL_STYLE = {
  ...MONO,
  fontSize: "9px",
  letterSpacing: "0.3em",
  color: "var(--app-text-dim)",
  textTransform: "uppercase" as const,
  display: "block",
  marginBottom: "6px",
};

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
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-6"
      style={{ background: "linear-gradient(160deg, #07080d 0%, #0c0d19 60%, #080b12 100%)" }}
    >
      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(78,91,224,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Corner brackets */}
      <div
        className="absolute top-8 left-8 w-10 h-10"
        style={{
          borderLeft: "1px solid rgba(201,168,76,0.3)",
          borderTop: "1px solid rgba(201,168,76,0.3)",
        }}
      />
      <div
        className="absolute top-8 right-8 w-10 h-10"
        style={{
          borderRight: "1px solid rgba(201,168,76,0.3)",
          borderTop: "1px solid rgba(201,168,76,0.3)",
        }}
      />
      <div
        className="absolute bottom-8 left-8 w-10 h-10"
        style={{
          borderLeft: "1px solid rgba(201,168,76,0.3)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
        }}
      />
      <div
        className="absolute bottom-8 right-8 w-10 h-10"
        style={{
          borderRight: "1px solid rgba(201,168,76,0.3)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="h-px w-8" style={{ background: "#c9a84c" }} />
          <span
            style={{
              ...MONO,
              fontSize: "10px",
              letterSpacing: "0.45em",
              color: "#c9a84c",
              textTransform: "uppercase",
            }}
          >
            Registration
          </span>
          <div className="h-px w-8" style={{ background: "#c9a84c" }} />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            style={{
              ...SERIF,
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 400,
              color: "#eee9f0",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Join the Project
          </h1>
          <p
            className="mt-2"
            style={{ ...SANS, fontSize: "13px", color: "var(--app-text-dim)" }}
          >
            Create your account to get started
          </p>
        </div>

        {/* Form panel */}
        <div
          style={{
            border: "1px solid var(--app-border)",
            background: "var(--app-surface)",
          }}
        >
          {/* Panel header */}
          <div
            className="flex items-center gap-2 px-5 py-2.5"
            style={{
              borderBottom: "1px solid var(--app-border)",
              background: "var(--app-surface-raised)",
            }}
          >
            <div className="h-px w-3" style={{ background: "var(--app-accent)" }} />
            <span
              style={{
                ...MONO,
                fontSize: "9px",
                letterSpacing: "0.35em",
                color: "var(--app-text-dim)",
                textTransform: "uppercase",
              }}
            >
              Account Details
            </span>
          </div>

          {/* Form body */}
          <div className="p-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <label style={FIELD_LABEL_STYLE}>Full name</label>
                        <FormControl>
                          <div className="border border-app-border-muted focus-within:border-app-accent transition-colors bg-app-surface-raised">
                            <input
                              type="text"
                              placeholder="Your name"
                              className="w-full px-3 py-2.5 text-app-text placeholder-app-text-dim focus:outline-none bg-transparent"
                              style={{ ...MONO, fontSize: "12px", letterSpacing: "0.02em" }}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage style={{ ...SANS, fontSize: "11px", color: "var(--app-danger)" }} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label style={FIELD_LABEL_STYLE}>Phone (optional)</label>
                        <FormControl>
                          <div className="border border-app-border-muted focus-within:border-app-accent transition-colors bg-app-surface-raised">
                            <input
                              type="text"
                              placeholder="+1 000 000 0000"
                              className="w-full px-3 py-2.5 text-app-text placeholder-app-text-dim focus:outline-none bg-transparent"
                              style={{ ...MONO, fontSize: "12px", letterSpacing: "0.02em" }}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage style={{ ...SANS, fontSize: "11px", color: "var(--app-danger)" }} />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <label style={FIELD_LABEL_STYLE}>Email address</label>
                      <FormControl>
                        <div className="border border-app-border-muted focus-within:border-app-accent transition-colors bg-app-surface-raised">
                          <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-3 py-2.5 text-app-text placeholder-app-text-dim focus:outline-none bg-transparent"
                            style={{ ...MONO, fontSize: "12px", letterSpacing: "0.02em" }}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage style={{ ...SANS, fontSize: "11px", color: "var(--app-danger)" }} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <label style={FIELD_LABEL_STYLE}>Password</label>
                      <FormControl>
                        <div className="border border-app-border-muted focus-within:border-app-accent transition-colors bg-app-surface-raised">
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-3 py-2.5 text-app-text placeholder-app-text-dim focus:outline-none bg-transparent"
                            style={{ ...MONO, fontSize: "12px", letterSpacing: "0.02em" }}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage style={{ ...SANS, fontSize: "11px", color: "var(--app-danger)" }} />
                    </FormItem>
                  )}
                />

                {error && (
                  <div
                    className="px-4 py-3"
                    style={{
                      ...SANS,
                      fontSize: "12px",
                      color: "var(--app-danger)",
                      background: "rgba(224,87,87,0.06)",
                      border: "1px solid rgba(224,87,87,0.2)",
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 transition-opacity disabled:opacity-50"
                  style={{
                    ...MONO,
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--app-bg)",
                    background: "var(--app-accent)",
                    border: "none",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    marginTop: "8px",
                  }}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            </Form>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-6 space-y-3 text-center">
          <p style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "var(--app-text-dim)" }}>
            Already have an account?{" "}
            <Link
              to="/signin"
              style={{ color: "var(--app-accent)", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
            >
              Sign in
            </Link>
          </p>
          <p style={{ ...MONO, fontSize: "9px", letterSpacing: "0.05em", color: "var(--app-text-dim)" }}>
            By continuing, you agree to our{" "}
            <a
              href="#"
              style={{ color: "var(--app-text-muted)", textDecoration: "underline" }}
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              style={{ color: "var(--app-text-muted)", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Version tag */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span
          style={{
            ...MONO,
            fontSize: "9px",
            letterSpacing: "0.35em",
            color: "#484858",
            textTransform: "uppercase",
          }}
        >
          v1.0.0
        </span>
      </div>
    </div>
  );
}
