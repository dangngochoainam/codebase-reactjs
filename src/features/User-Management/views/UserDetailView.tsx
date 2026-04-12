import { forwardRef, useEffect, useState, type InputHTMLAttributes } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/shadcn/form";
import { useUsers } from "../hooks/useUsers";
import { ArrowLeft, Eye, Loader2, Pencil } from "lucide-react";
import { MONO, SANS, SERIF, EYEBROW, FIELD_LABEL } from "@/core/lib/utils/styles";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  isActive: z.boolean(),
  birthday: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

const FieldInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ disabled, ...props }, ref) => (
    <input
      ref={ref}
      disabled={disabled}
      {...props}
      className="w-full px-3 py-2.5 text-app-text placeholder-app-text-dim focus:outline-none transition-colors disabled:text-app-text-muted disabled:cursor-default"
      style={{
        ...MONO,
        fontSize: "12px",
        letterSpacing: "0.02em",
        background: disabled ? "transparent" : "var(--app-surface-raised)",
        border: disabled ? "1px solid var(--app-surface-deep)" : "1px solid var(--app-border-muted)",
      }}
    />
  )
);
FieldInput.displayName = "FieldInput";

export default function UserDetailView() {
  const { id, mode: initialMode } = useParams<{ id: string; mode?: string }>();
  const [mode, setMode] = useState<"view" | "edit">(
    (initialMode as "view" | "edit") || "view"
  );
  const { getUserById, updateUser } = useUsers();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      isActive: false,
      birthday: "",
      timezone: "",
      language: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await getUserById(id);
        form.reset({
          name: response.user.name,
          email: response.user.email,
          isActive: response.user.isActive,
          birthday: response.user.birthday,
          timezone: response.user.timezone,
          language: response.user.language,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const onSubmit = async (data: UserFormValues) => {
    if (!id) return;
    setIsSaving(true);
    setError(null);
    try {
      await updateUser(id, data);
      setMode("view");
      navigate(`/user-management/${id}/view`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleMode = () => {
    const newMode = mode === "view" ? "edit" : "view";
    setMode(newMode);
    navigate(`/user-management/${id}/${newMode}`, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-bg">
        <Loader2 className="h-5 w-5 animate-spin text-app-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        {/* Back + Page title */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/user-management")}
            className="flex items-center gap-2 transition-colors text-app-text-dim hover:text-app-accent"
            style={{ ...MONO, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <ArrowLeft style={{ width: "12px", height: "12px" }} />
            Back
          </button>
          <div className="h-3 w-px bg-app-border-muted" />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-px w-4 bg-app-accent" />
              <span style={EYEBROW}>{mode === "view" ? "Viewing" : "Editing"}</span>
            </div>
            <h1 style={{ ...SERIF, fontSize: "2rem", fontWeight: 400, color: "var(--app-text)", lineHeight: 1.1 }}>
              User {mode === "view" ? "Details" : "Edit"}
            </h1>
          </div>
        </div>

        {/* Form panel */}
        <div className="border border-app-border">
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-3 bg-app-surface-raised border-b border-app-border">
            <span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.35em", color: "var(--app-text-dim)", textTransform: "uppercase" }}>
              User Record
            </span>
            <button
              type="button"
              onClick={handleToggleMode}
              className="flex items-center gap-1.5 transition-colors"
              style={{
                ...MONO,
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: mode === "view" ? "var(--app-accent)" : "var(--app-text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {mode === "view" ? (
                <>
                  <Pencil style={{ width: "10px", height: "10px" }} />
                  Edit
                </>
              ) : (
                <>
                  <Eye style={{ width: "10px", height: "10px" }} />
                  Cancel
                </>
              )}
            </button>
          </div>

          {/* Form body */}
          <div className="p-6 bg-app-surface">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={FIELD_LABEL}>
                          Name
                        </FormLabel>
                        <FormControl>
                          <FieldInput
                            disabled={mode === "view" || isSaving}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={FIELD_LABEL}>
                          Email
                        </FormLabel>
                        <FormControl>
                          <FieldInput
                            disabled={mode === "view" || isSaving}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={FIELD_LABEL}>
                          Birthday
                        </FormLabel>
                        <FormControl>
                          <FieldInput
                            placeholder="YYYY-MM-DD"
                            disabled={mode === "view" || isSaving}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={FIELD_LABEL}>
                          Timezone
                        </FormLabel>
                        <FormControl>
                          <FieldInput
                            disabled={mode === "view" || isSaving}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={FIELD_LABEL}>
                          Language
                        </FormLabel>
                        <FormControl>
                          <FieldInput
                            disabled={mode === "view" || isSaving}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={FIELD_LABEL}>
                          Status
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-3 px-3 py-2.5 border border-app-border">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              disabled={mode === "view" || isSaving}
                              className="h-3.5 w-3.5 accent-app-accent disabled:opacity-50"
                            />
                            <span
                              style={{
                                ...MONO,
                                fontSize: "10px",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: field.value ? "var(--app-success)" : "var(--app-text-dim)",
                              }}
                            >
                              {field.value ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {error && (
                  <div
                    className="px-4 py-3 text-sm"
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

                {mode === "edit" && (
                  <div className="flex justify-end pt-4 border-t border-app-border">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-2 px-8 py-2.5 disabled:opacity-50 transition-opacity"
                      style={{
                        ...MONO,
                        fontSize: "10px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "var(--app-bg)",
                        background: "var(--app-accent)",
                        border: "none",
                        cursor: isSaving ? "not-allowed" : "pointer",
                      }}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Saving
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
