"use client";

import { useForm, Controller } from "react-hook-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Send,
  User,
  Mail,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  role: string;
  newsletter: boolean;
  notifications: boolean;
  theme: string;
  experience: number[];
  interests: string[];
};

const interests = [
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
  { id: "marketing", label: "Marketing" },
  { id: "product", label: "Product Management" },
];

export default function FormPage() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      newsletter: false,
      notifications: true,
      theme: "light",
      experience: [3],
      interests: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    console.log("Form submitted:", data);
  };

  const watchedTheme = watch("theme");
  const watchedExperience = watch("experience");

  return (
    <main className="min-h-dvh p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Form Integration</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Radix UI + React Hook Form untuk form management yang powerful
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-2xl border p-6 lg:col-span-2"
          >
            <h2 className="text-xl font-semibold">User Registration Form</h2>

            {/* Standard Input Fields */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User className="size-4" />
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: "Nama wajib diisi",
                    minLength: {
                      value: 3,
                      message: "Nama minimal 3 karakter",
                    },
                  })}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Mail className="size-4" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email tidak valid",
                    },
                  })}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Lock className="size-4" />
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password wajib diisi",
                    minLength: {
                      value: 6,
                      message: "Password minimal 6 karakter",
                    },
                  })}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Radix RadioGroup with Controller */}
            <div>
              <label className="block text-sm font-medium">Role</label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Pilih role" }}
                render={({ field }) => (
                  <RadioGroup.Root
                    value={field.value}
                    onValueChange={field.onChange}
                    className="mt-2 flex gap-4"
                  >
                    <label className="flex items-center gap-2">
                      <RadioGroup.Item
                        value="user"
                        className="grid size-5 place-items-center rounded-full border"
                      >
                        <RadioGroup.Indicator className="size-2 rounded-full bg-blue-500" />
                      </RadioGroup.Item>
                      <span className="text-sm">User</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <RadioGroup.Item
                        value="admin"
                        className="grid size-5 place-items-center rounded-full border"
                      >
                        <RadioGroup.Indicator className="size-2 rounded-full bg-blue-500" />
                      </RadioGroup.Item>
                      <span className="text-sm">Admin</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <RadioGroup.Item
                        value="moderator"
                        className="grid size-5 place-items-center rounded-full border"
                      >
                        <RadioGroup.Indicator className="size-2 rounded-full bg-blue-500" />
                      </RadioGroup.Item>
                      <span className="text-sm">Moderator</span>
                    </label>
                  </RadioGroup.Root>
                )}
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            {/* Radix Select with Controller */}
            <div>
              <label className="block text-sm font-medium">Theme Preference</label>
              <Controller
                name="theme"
                control={control}
                render={({ field }) => (
                  <Select.Root value={field.value} onValueChange={field.onChange}>
                    <Select.Trigger className="mt-1 inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-950 dark:hover:bg-white/5">
                      <Select.Value />
                      <Select.Icon>
                        <ChevronDown className="size-4" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-neutral-950">
                        <Select.ScrollUpButton className="flex items-center justify-center py-1">
                          <ChevronUp className="size-4" />
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-1">
                          <Select.Item
                            value="light"
                            className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-blue-50 dark:data-[highlighted]:bg-blue-950/30"
                          >
                            <Select.ItemText>Light</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                              <Check className="size-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="dark"
                            className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-blue-50 dark:data-[highlighted]:bg-blue-950/30"
                          >
                            <Select.ItemText>Dark</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                              <Check className="size-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="auto"
                            className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-blue-50 dark:data-[highlighted]:bg-blue-950/30"
                          >
                            <Select.ItemText>Auto</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                              <Check className="size-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        </Select.Viewport>

                        <Select.ScrollDownButton className="flex items-center justify-center py-1">
                          <ChevronDown className="size-4" />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />
            </div>

            {/* Radix Slider with Controller */}
            <div>
              <label className="block text-sm font-medium">
                Experience Level: {watchedExperience?.[0] || 0} years
              </label>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <Slider.Root
                    className="relative mt-3 flex w-full touch-none select-none items-center"
                    max={10}
                    step={1}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Slider.Track className="relative h-2 grow rounded-full bg-black/10 dark:bg-white/10">
                      <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
                    </Slider.Track>
                    <Slider.Thumb className="block size-5 rounded-full bg-white shadow outline-none ring-2 ring-blue-500 dark:bg-neutral-900" />
                  </Slider.Root>
                )}
              />
            </div>

            {/* Radix Checkbox for Multiple Selection */}
            <div>
              <label className="block text-sm font-medium">Interests</label>
              <div className="mt-2 space-y-2">
                {interests.map((interest) => (
                  <Controller
                    key={interest.id}
                    name="interests"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2">
                        <Checkbox.Root
                          checked={field.value?.includes(interest.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), interest.id]
                              : (field.value || []).filter(
                                  (val) => val !== interest.id
                                );
                            field.onChange(newValue);
                          }}
                          className="grid size-5 place-items-center rounded-md border data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-4" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-sm">{interest.label}</span>
                      </label>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Radix Switch with Controller */}
            <div className="space-y-3 rounded-lg border bg-black/5 p-4 dark:bg-white/5">
              <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <div>
                      <label
                        htmlFor="newsletter"
                        className="font-medium"
                      >
                        Newsletter Subscription
                      </label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive weekly updates
                      </p>
                    </div>
                    <Switch.Root
                      id="newsletter"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="inline-flex h-6 w-11 items-center rounded-full border bg-black/5 transition-colors data-[state=checked]:bg-blue-500 dark:bg-white/10"
                    >
                      <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                )}
              />

              <Controller
                name="notifications"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <div>
                      <label
                        htmlFor="notifications"
                        className="font-medium"
                      >
                        Push Notifications
                      </label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get notified about updates
                      </p>
                    </div>
                    <Switch.Root
                      id="notifications"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="inline-flex h-6 w-11 items-center rounded-full border bg-black/5 transition-colors data-[state=checked]:bg-green-500 dark:bg-white/10"
                    >
                      <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                )}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setSubmittedData(null);
                }}
                className="rounded-lg border px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Preview & Info */}
          <div className="space-y-6">
            {/* Live Preview */}
            <section className="rounded-2xl border p-6">
              <h3 className="font-semibold">Live Preview</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="rounded-lg bg-black/5 p-2 dark:bg-white/5">
                  <span className="font-medium">Theme:</span> {watchedTheme}
                </div>
                <div className="rounded-lg bg-black/5 p-2 dark:bg-white/5">
                  <span className="font-medium">Experience:</span>{" "}
                  {watchedExperience?.[0] || 0} years
                </div>
              </div>
            </section>

            {/* Form Data Output */}
            {submittedData && (
              <section className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    Form Submitted!
                  </h3>
                </div>
                <pre className="mt-3 overflow-auto rounded-lg bg-black/10 p-3 text-xs dark:bg-white/10">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </section>
            )}

            {/* Integration Tips */}
            <section className="rounded-2xl border bg-blue-50 p-6 dark:bg-blue-950/30">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Integration Tips
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>✓ Use Controller untuk Radix components</li>
                <li>✓ Standard register() untuk input/textarea</li>
                <li>✓ Validation rules di Controller atau register</li>
                <li>✓ Error handling dengan errors object</li>
                <li>✓ watch() untuk reactive values</li>
              </ul>
            </section>

            {/* Key Concepts */}
            <section className="rounded-2xl border bg-purple-50 p-6 dark:bg-purple-950/30">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                Why React Hook Form?
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li>✓ Minimal re-renders</li>
                <li>✓ Built-in validation</li>
                <li>✓ Easy integration</li>
                <li>✓ TypeScript support</li>
                <li>✓ Small bundle size</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
