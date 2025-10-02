"use client";

import * as Select from "@radix-ui/react-select";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  Palette,
  Zap,
  User,
  MapPin,
  Crown,
} from "lucide-react";
import { useState } from "react";

type Country = {
  code: string;
  name: string;
  flag: string;
};

const countries: Country[] = [
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "sg", name: "Singapore", flag: "🇸🇬" },
  { code: "my", name: "Malaysia", flag: "🇲🇾" },
  { code: "th", name: "Thailand", flag: "🇹🇭" },
  { code: "ph", name: "Philippines", flag: "🇵🇭" },
  { code: "vn", name: "Vietnam", flag: "🇻🇳" },
];

const themes = [
  { value: "light", label: "Light", color: "bg-white" },
  { value: "dark", label: "Dark", color: "bg-gray-900" },
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
];

const plans = [
  { value: "free", label: "Free", price: "$0", features: "Basic features" },
  { value: "pro", label: "Pro", price: "$9", features: "All features" },
  { value: "team", label: "Team", price: "$29", features: "Team collaboration" },
  { value: "enterprise", label: "Enterprise", price: "Custom", features: "Custom solutions" },
];

export default function SelectPage() {
  const [country, setCountry] = useState("id");
  const [theme, setTheme] = useState("light");
  const [plan, setPlan] = useState("free");
  const [size, setSize] = useState("md");
  const [position, setPosition] = useState("bottom");

  const selectedCountry = countries.find((c) => c.code === country);
  const selectedTheme = themes.find((t) => t.value === theme);
  const selectedPlan = plans.find((p) => p.value === plan);

  return (
    <main className="min-h-dvh p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Radix UI Select</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Select component yang fully accessible dengan styling custom
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Select */}
          <section className="space-y-4 rounded-2xl border p-6">
            <div className="flex items-start gap-3">
              <Globe className="mt-1 size-5 text-blue-500" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Basic Select</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Select sederhana dengan icon dan custom styling
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Pilih Negara</label>
              <Select.Root value={country} onValueChange={setCountry}>
                <Select.Trigger className="inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-950 dark:hover:bg-white/5">
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
                      {countries.map((c) => (
                        <Select.Item
                          key={c.code}
                          value={c.code}
                          className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 dark:data-[highlighted]:bg-blue-950/30"
                        >
                          <Select.ItemText>
                            <span className="flex items-center gap-2">
                              <span className="text-lg">{c.flag}</span>
                              {c.name}
                            </span>
                          </Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center py-1">
                      <ChevronDown className="size-4" />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Selected: {selectedCountry?.flag} <strong>{selectedCountry?.name}</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Theme Select with Color Preview */}
          <section className="space-y-4 rounded-2xl border p-6">
            <div className="flex items-start gap-3">
              <Palette className="mt-1 size-5 text-purple-500" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Theme Select</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Select dengan custom item rendering
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Pilih Theme</label>
              <Select.Root value={theme} onValueChange={setTheme}>
                <Select.Trigger className="inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-950 dark:hover:bg-white/5">
                  <span className="flex items-center gap-2">
                    <span className={`size-4 rounded-full ${selectedTheme?.color}`} />
                    <Select.Value />
                  </span>
                  <Select.Icon>
                    <ChevronDown className="size-4" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-neutral-950">
                    <Select.Viewport className="p-1">
                      {themes.map((t) => (
                        <Select.Item
                          key={t.value}
                          value={t.value}
                          className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-purple-50 data-[highlighted]:text-purple-600 dark:data-[highlighted]:bg-purple-950/30"
                        >
                          <Select.ItemText>
                            <span className="flex items-center gap-2">
                              <span className={`size-4 rounded-full ${t.color}`} />
                              {t.label}
                            </span>
                          </Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </section>

          {/* Grouped Select */}
          <section className="space-y-4 rounded-2xl border p-6">
            <div className="flex items-start gap-3">
              <User className="mt-1 size-5 text-green-500" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Grouped Select</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Select dengan item grouping
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Pilih Role</label>
              <Select.Root defaultValue="user">
                <Select.Trigger className="inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-neutral-950 dark:hover:bg-white/5">
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDown className="size-4" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-neutral-950">
                    <Select.Viewport className="p-1">
                      <Select.Group>
                        <Select.Label className="px-6 py-2 text-xs font-semibold text-gray-500">
                          User Roles
                        </Select.Label>
                        <Select.Item
                          value="user"
                          className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-600 dark:data-[highlighted]:bg-green-950/30"
                        >
                          <Select.ItemText>User</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item
                          value="moderator"
                          className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-600 dark:data-[highlighted]:bg-green-950/30"
                        >
                          <Select.ItemText>Moderator</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      </Select.Group>

                      <Select.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />

                      <Select.Group>
                        <Select.Label className="px-6 py-2 text-xs font-semibold text-gray-500">
                          Admin Roles
                        </Select.Label>
                        <Select.Item
                          value="admin"
                          className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-600 dark:data-[highlighted]:bg-green-950/30"
                        >
                          <Select.ItemText>Admin</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item
                          value="superadmin"
                          className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-600 dark:data-[highlighted]:bg-green-950/30"
                        >
                          <Select.ItemText>Super Admin</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </section>

          {/* Rich Content Select */}
          <section className="space-y-4 rounded-2xl border p-6">
            <div className="flex items-start gap-3">
              <Crown className="mt-1 size-5 text-yellow-500" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Rich Content Select</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Select dengan konten kompleks di setiap item
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Pilih Plan</label>
              <Select.Root value={plan} onValueChange={setPlan}>
                <Select.Trigger className="inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-neutral-950 dark:hover:bg-white/5">
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDown className="size-4" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-neutral-950">
                    <Select.Viewport className="p-1">
                      {plans.map((p) => (
                        <Select.Item
                          key={p.value}
                          value={p.value}
                          className="relative cursor-pointer rounded-md px-8 py-3 outline-none data-[highlighted]:bg-yellow-50 dark:data-[highlighted]:bg-yellow-950/30"
                        >
                          <Select.ItemText>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="font-medium">{p.label}</div>
                                <div className="text-xs text-gray-500">
                                  {p.features}
                                </div>
                              </div>
                              <div className="font-semibold text-yellow-600">
                                {p.price}
                              </div>
                            </div>
                          </Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2 top-1/2 -translate-y-1/2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              {selectedPlan && (
                <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/30">
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">
                    {selectedPlan.label} Plan - {selectedPlan.price}
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {selectedPlan.features}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Controlled Select with Position */}
          <section className="space-y-4 rounded-2xl border p-6 lg:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 text-red-500" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Positioning & Control</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Kontrol posisi dropdown dan state secara programmatic
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Size</label>
                <Select.Root value={size} onValueChange={setSize}>
                  <Select.Trigger className="inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-neutral-950 dark:hover:bg-white/5">
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="size-4" />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-neutral-950">
                      <Select.Viewport className="p-1">
                        <Select.Item value="sm" className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950/30">
                          <Select.ItemText>Small</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="md" className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950/30">
                          <Select.ItemText>Medium</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="lg" className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950/30">
                          <Select.ItemText>Large</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Position</label>
                <Select.Root value={position} onValueChange={setPosition}>
                  <Select.Trigger className="inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-neutral-950 dark:hover:bg-white/5">
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="size-4" />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content
                      position={position === "top" ? "popper" : "item-aligned"}
                      side={position === "top" ? "top" : "bottom"}
                      className="overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-neutral-950"
                    >
                      <Select.Viewport className="p-1">
                        <Select.Item value="bottom" className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950/30">
                          <Select.ItemText>Bottom</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="top" className="relative flex cursor-pointer items-center gap-2 rounded-md px-8 py-2 text-sm outline-none data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950/30">
                          <Select.ItemText>Top</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="size-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSize("md");
                    setPosition("bottom");
                  }}
                  className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Reset Defaults
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
              <div className="grid gap-2 text-sm text-red-900 dark:text-red-100 md:grid-cols-2">
                <div>
                  <strong>Current Size:</strong> {size}
                </div>
                <div>
                  <strong>Dropdown Position:</strong> {position}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Key Features */}
        <section className="rounded-2xl border bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:from-blue-950/20 dark:to-purple-950/20">
          <h2 className="text-xl font-semibold">Mengapa Radix UI Select?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400">
                <Zap className="size-4" />
                Fully Accessible
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Keyboard navigation (↑↓)</li>
                <li>✓ Type-ahead search</li>
                <li>✓ Screen reader support</li>
                <li>✓ Focus management</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-medium text-purple-600 dark:text-purple-400">
                <Palette className="size-4" />
                Fully Customizable
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Custom styling</li>
                <li>✓ Rich content support</li>
                <li>✓ Icons & images</li>
                <li>✓ Grouping & labels</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                <Globe className="size-4" />
                Cross-browser
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Konsisten di semua browser</li>
                <li>✓ Mobile friendly</li>
                <li>✓ Portal support</li>
                <li>✓ Positioning otomatis</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
