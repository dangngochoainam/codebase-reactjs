import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
  FormLabel,
  FormMessage,
} from "@/core/components/shadcn/form";
import { useUsers } from "../hooks/useUsers";
import { ArrowLeft, Loader2 } from "lucide-react";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  isActive: z.boolean(),
  birthday: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

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
      <div className="min-h-screen bg-[#1a1c2e] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-[#1a1c2e]">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/user-management")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-light text-gray-100">
          User{" "}
          <span className="font-semibold">
            {mode === "view" ? "Details" : "Edit"}
          </span>
        </h1>
      </div>

      <div className="max-w-2xl bg-[#21233d] rounded-sm p-8 shadow-xl border border-gray-700/30">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mode === "view" || isSaving}
                        className="bg-gray-800/50 text-white border-gray-700 focus-visible:ring-gray-600 disabled:opacity-70 disabled:cursor-default"
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
                    <FormLabel className="text-gray-400">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mode === "view" || isSaving}
                        className="bg-gray-800/50 text-white border-gray-700 focus-visible:ring-gray-600 disabled:opacity-70 disabled:cursor-default"
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
                    <FormLabel className="text-gray-400">Birthday</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        disabled={mode === "view" || isSaving}
                        className="bg-gray-800/50 text-white border-gray-700 focus-visible:ring-gray-600 disabled:opacity-70 disabled:cursor-default"
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
                    <FormLabel className="text-gray-400">Timezone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mode === "view" || isSaving}
                        className="bg-gray-800/50 text-white border-gray-700 focus-visible:ring-gray-600 disabled:opacity-70 disabled:cursor-default"
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
                    <FormLabel className="text-gray-400">Language</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mode === "view" || isSaving}
                        className="bg-gray-800/50 text-white border-gray-700 focus-visible:ring-gray-600 disabled:opacity-70 disabled:cursor-default"
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-gray-800/50">
                    <div className="space-y-0.5">
                      <FormLabel className="text-gray-400 cursor-default">
                        Active Status
                      </FormLabel>
                    </div>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={mode === "view" || isSaving}
                        className="h-4 w-4 bg-gray-900 border-gray-700 rounded focus:ring-gray-600 accent-blue-500 disabled:opacity-50"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 p-3 rounded-md border border-red-400/20">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700/30">
              {mode === "view" ? (
                <Button
                  type="button"
                  onClick={handleToggleMode}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  Edit User
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleToggleMode}
                    disabled={isSaving}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
