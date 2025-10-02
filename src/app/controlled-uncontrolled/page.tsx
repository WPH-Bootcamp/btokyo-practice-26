"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import * as Accordion from "@radix-ui/react-accordion";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ControlledUncontrolledPage() {
  // Controlled states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("controlled");
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string>("");

  return (
    <main className="min-h-dvh p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Controlled vs Uncontrolled Components
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Demonstrasi penggunaan Radix UI dalam mode controlled dan
            uncontrolled
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* UNCONTROLLED SECTION */}
          <section className="space-y-6 rounded-2xl border p-6">
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                Uncontrolled
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Component mengelola state-nya sendiri secara internal
              </p>
            </div>

            {/* Dialog Uncontrolled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Dialog</h3>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                    Open Dialog (Uncontrolled)
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-6 shadow-xl dark:bg-neutral-950">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium">
                        Uncontrolled Dialog
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                          <X className="size-4" />
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Dialog ini tidak memiliki state eksternal. Radix UI
                      mengelola open/close secara internal.
                    </Dialog.Description>
                    <div className="mt-4">
                      <Dialog.Close asChild>
                        <button className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600">
                          Tutup
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <p className="text-xs text-gray-500">
                Tidak ada useState untuk open/close
              </p>
            </div>

            {/* Tabs Uncontrolled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tabs</h3>
              <Tabs.Root defaultValue="tab1">
                <Tabs.List className="inline-flex gap-2 rounded-lg border p-1">
                  <Tabs.Trigger
                    value="tab1"
                    className="rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Tab 1
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="tab2"
                    className="rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Tab 2
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1" className="mt-3 rounded-lg border p-3 text-sm">
                  Konten Tab 1 (uncontrolled)
                </Tabs.Content>
                <Tabs.Content value="tab2" className="mt-3 rounded-lg border p-3 text-sm">
                  Konten Tab 2 (uncontrolled)
                </Tabs.Content>
              </Tabs.Root>
              <p className="text-xs text-gray-500">
                Menggunakan defaultValue, tidak ada value + onValueChange
              </p>
            </div>

            {/* RadioGroup Uncontrolled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Radio Group</h3>
              <RadioGroup.Root defaultValue="option1" className="space-y-2">
                <label className="flex items-center gap-2">
                  <RadioGroup.Item
                    value="option1"
                    className="grid size-5 place-items-center rounded-full border"
                  >
                    <RadioGroup.Indicator className="size-2 rounded-full bg-blue-500" />
                  </RadioGroup.Item>
                  <span className="text-sm">Option 1</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroup.Item
                    value="option2"
                    className="grid size-5 place-items-center rounded-full border"
                  >
                    <RadioGroup.Indicator className="size-2 rounded-full bg-blue-500" />
                  </RadioGroup.Item>
                  <span className="text-sm">Option 2</span>
                </label>
              </RadioGroup.Root>
              <p className="text-xs text-gray-500">defaultValue, tanpa state</p>
            </div>

            {/* Switch Uncontrolled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Switch</h3>
              <div className="flex items-center gap-2">
                <Switch.Root
                  defaultChecked={false}
                  className="inline-flex h-6 w-11 items-center rounded-full border bg-black/5 transition-colors data-[state=checked]:bg-blue-500 dark:bg-white/10"
                >
                  <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
                <span className="text-sm">Toggle me</span>
              </div>
              <p className="text-xs text-gray-500">defaultChecked, tanpa state</p>
            </div>

            {/* Accordion Uncontrolled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Accordion</h3>
              <Accordion.Root type="single" collapsible className="rounded-lg border">
                <Accordion.Item value="item-1">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-black/5 dark:hover:bg-white/10">
                      <span className="text-sm">Item 1</span>
                      <ChevronDown className="size-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                    Konten item 1 (uncontrolled accordion)
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
              <p className="text-xs text-gray-500">
                Tidak menggunakan value prop
              </p>
            </div>
          </section>

          {/* CONTROLLED SECTION */}
          <section className="space-y-6 rounded-2xl border p-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">
                Controlled
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                State dikelola oleh parent component menggunakan useState
              </p>
            </div>

            {/* Dialog Controlled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Dialog</h3>
              <div className="space-y-2">
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                  <Dialog.Trigger asChild>
                    <button className="rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                      Open Dialog (Controlled)
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-6 shadow-xl dark:bg-neutral-950">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium">
                          Controlled Dialog
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                            <X className="size-4" />
                          </button>
                        </Dialog.Close>
                      </div>
                      <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Dialog ini controlled dengan useState. Kita bisa
                        mengontrol open/close dari parent.
                      </Dialog.Description>
                      <div className="mt-4 space-y-2">
                        <Dialog.Close asChild>
                          <button className="w-full rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600">
                            Tutup
                          </button>
                        </Dialog.Close>
                        <button
                          onClick={() => setDialogOpen(false)}
                          className="w-full rounded-lg border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                        >
                          Close via State
                        </button>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <button
                  onClick={() => setDialogOpen(true)}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Open via State
                </button>
              </div>
              <p className="text-xs text-gray-500">
                State: <code className="rounded bg-black/10 px-1 dark:bg-white/10">{String(dialogOpen)}</code>
              </p>
            </div>

            {/* Tabs Controlled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tabs</h3>
              <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
                <Tabs.List className="inline-flex gap-2 rounded-lg border p-1">
                  <Tabs.Trigger
                    value="uncontrolled"
                    className="rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Uncontrolled
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="controlled"
                    className="rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Controlled
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="uncontrolled" className="mt-3 rounded-lg border p-3 text-sm">
                  Tab Uncontrolled dipilih
                </Tabs.Content>
                <Tabs.Content value="controlled" className="mt-3 rounded-lg border p-3 text-sm">
                  Tab Controlled dipilih
                </Tabs.Content>
              </Tabs.Root>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTab("uncontrolled")}
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Set Uncontrolled
                </button>
                <button
                  onClick={() => setSelectedTab("controlled")}
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Set Controlled
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Active: <code className="rounded bg-black/10 px-1 dark:bg-white/10">{selectedTab}</code>
              </p>
            </div>

            {/* RadioGroup Controlled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Radio Group</h3>
              <RadioGroup.Root value={theme} onValueChange={setTheme} className="space-y-2">
                <label className="flex items-center gap-2">
                  <RadioGroup.Item
                    value="light"
                    className="grid size-5 place-items-center rounded-full border"
                  >
                    <RadioGroup.Indicator className="size-2 rounded-full bg-green-500" />
                  </RadioGroup.Item>
                  <span className="text-sm">Light</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroup.Item
                    value="dark"
                    className="grid size-5 place-items-center rounded-full border"
                  >
                    <RadioGroup.Indicator className="size-2 rounded-full bg-green-500" />
                  </RadioGroup.Item>
                  <span className="text-sm">Dark</span>
                </label>
              </RadioGroup.Root>
              <p className="text-xs text-gray-500">
                Selected: <code className="rounded bg-black/10 px-1 dark:bg-white/10">{theme}</code>
              </p>
            </div>

            {/* Switch Controlled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Switch</h3>
              <div className="flex items-center gap-2">
                <Switch.Root
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                  className="inline-flex h-6 w-11 items-center rounded-full border bg-black/5 transition-colors data-[state=checked]:bg-green-500 dark:bg-white/10"
                >
                  <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
                <span className="text-sm">Notifications</span>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="rounded-lg border px-2 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10"
              >
                Toggle via State
              </button>
              <p className="text-xs text-gray-500">
                Enabled: <code className="rounded bg-black/10 px-1 dark:bg-white/10">{String(notificationsEnabled)}</code>
              </p>
            </div>

            {/* Accordion Controlled */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Accordion</h3>
              <Accordion.Root
                type="single"
                collapsible
                value={accordionValue}
                onValueChange={setAccordionValue}
                className="rounded-lg border"
              >
                <Accordion.Item value="controlled-item">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-black/5 dark:hover:bg-white/10">
                      <span className="text-sm">Controlled Item</span>
                      <ChevronDown className="size-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                    Konten accordion yang controlled dengan state
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setAccordionValue(
                      accordionValue === "controlled-item" ? "" : "controlled-item"
                    )
                  }
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Toggle via State
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Open: <code className="rounded bg-black/10 px-1 dark:bg-white/10">{accordionValue || "none"}</code>
              </p>
            </div>
          </section>
        </div>

        {/* Explanation */}
        <section className="rounded-2xl border bg-gradient-to-r from-blue-50 to-green-50 p-6 dark:from-blue-950/20 dark:to-green-950/20">
          <h2 className="text-xl font-semibold">Kapan Menggunakan?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium text-blue-600 dark:text-blue-400">
                Uncontrolled
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Component sederhana</li>
                <li>✓ Tidak perlu akses state dari parent</li>
                <li>✓ Tidak perlu sinkronisasi dengan state lain</li>
                <li>✓ Lebih sedikit boilerplate code</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-green-600 dark:text-green-400">
                Controlled
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Perlu kontrol programatik</li>
                <li>✓ Sinkronisasi dengan state lain</li>
                <li>✓ Validasi atau transformasi nilai</li>
                <li>✓ Tracking atau logging perubahan</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
