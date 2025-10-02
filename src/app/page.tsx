"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as RSwitch from "@radix-ui/react-switch";
import * as Slider from "@radix-ui/react-slider";
import { X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState<number[]>([50]);

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Radix UI + Next.js</h1>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
            <Dialog.Content
              className="
                fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2
                rounded-2xl border bg-white p-6 shadow-xl dark:bg-neutral-950
                focus:outline-none
              "
            >
              <div className="flex items-start justify-between gap-4">
                <Dialog.Title className="text-lg font-medium">
                  Hello from Radix Dialog
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Ini contoh Dialog menggunakan Radix. Styling pakai Tailwind.
              </Dialog.Description>
              <div className="mt-6 flex justify-end">
                <Dialog.Close asChild>
                  <button className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white dark:bg-red-400 dark:text-black">
                    Tutup
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>

          <Dialog.Trigger asChild>
            <button className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
              Open Dialog
            </button>
          </Dialog.Trigger>
        </Dialog.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
              Hover Tooltip
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="rounded-lg border bg-white px-3 py-1.5 text-sm shadow dark:bg-neutral-950"
              sideOffset={8}
            >
              Ini tooltip Radix
              <Tooltip.Arrow className="fill-white dark:fill-neutral-950" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        {/* Tabs */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Tabs</h2>
          <Tabs.Root defaultValue="account" className="w-[320px]">
            <Tabs.List className="inline-flex gap-2 rounded-lg border p-1">
              <Tabs.Trigger
                value="account"
                className="rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Account
              </Tabs.Trigger>
              <Tabs.Trigger
                value="password"
                className="rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Password
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              value="account"
              className="mt-4 rounded-lg border p-4 text-sm"
            >
              Make changes to your account here.
            </Tabs.Content>
            <Tabs.Content
              value="password"
              className="mt-4 rounded-lg border p-4 text-sm"
            >
              Change your password here.
            </Tabs.Content>
          </Tabs.Root>
        </section>

        {/* Accordion */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Accordion</h2>
          <Accordion.Root
            type="single"
            collapsible
            className="w-[320px] rounded-lg border"
          >
            <Accordion.Item value="item-1">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-2 text-left">
                  What is Radix UI?
                  <span className="select-none">▾</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm">
                Unstyled, accessible components for building high‑quality design
                systems.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-2 text-left">
                  Why use it?
                  <span className="select-none">▾</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm">
                It handles a11y and interactions so you can focus on styling.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </section>

        {/* Dropdown Menu */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Dropdown Menu</h2>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                Open Menu
                <ChevronDown className="ml-1 size-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={8}
                className="min-w-[160px] rounded-lg border bg-white p-1 shadow dark:bg-neutral-950"
              >
                <DropdownMenu.Item className="rounded-md px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-black/5 dark:data-[highlighted]:bg-white/10">
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item className="rounded-md px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-black/5 dark:data-[highlighted]:bg-white/10">
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-black/10 dark:bg-white/10" />
                <DropdownMenu.Item className="rounded-md px-2 py-1.5 text-sm text-red-600 outline-none data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950/30">
                  Log out
                </DropdownMenu.Item>
                <DropdownMenu.Arrow className="fill-white dark:fill-neutral-950" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </section>

        {/* Popover */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Popover</h2>
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                Open Popover
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                sideOffset={8}
                className="rounded-lg border bg-white p-3 text-sm shadow dark:bg-neutral-950"
              >
                This is a popover. Put any content here.
                <Popover.Arrow className="fill-white dark:fill-neutral-950" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </section>

        {/* Checkbox, Radio Group, Switch */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Form Primitives</h2>
          <label className="inline-flex items-center gap-2">
            <Checkbox.Root
              id="cb-terms"
              className="grid size-5 place-items-center rounded-md border data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black"
            >
              <Checkbox.Indicator>
                <Check className="size-4" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm">Accept terms</span>
          </label>

          <div className="flex items-center gap-4">
            <RadioGroup.Root
              defaultValue="light"
              aria-label="Theme"
              className="flex gap-4"
            >
              <label className="inline-flex items-center gap-2">
                <RadioGroup.Item
                  value="light"
                  className="grid size-5 place-items-center rounded-full border"
                >
                  <RadioGroup.Indicator className="size-2 rounded-full bg-black dark:bg-white" />
                </RadioGroup.Item>
                <span className="text-sm">Light</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <RadioGroup.Item
                  value="dark"
                  className="grid size-5 place-items-center rounded-full border"
                >
                  <RadioGroup.Indicator className="size-2 rounded-full bg-black dark:bg-white" />
                </RadioGroup.Item>
                <span className="text-sm">Dark</span>
              </label>
            </RadioGroup.Root>
          </div>

          <div className="flex items-center gap-2">
            <RSwitch.Root
              id="sw-notif"
              className="peer inline-flex h-6 w-11 items-center rounded-full border bg-black/5 transition-colors data-[state=checked]:bg-black dark:bg-white/10 dark:data-[state=checked]:bg-white"
            >
              <RSwitch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px] dark:bg-neutral-900" />
            </RSwitch.Root>
            <label htmlFor="sw-notif" className="text-sm">
              Enable notifications
            </label>
          </div>
        </section>

        {/* Slider */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Slider</h2>
          <div className="space-y-2">
            <Slider.Root
              className="relative flex w-64 touch-none select-none items-center"
              max={100}
              step={1}
              value={volume}
              onValueChange={setVolume}
            >
              <Slider.Track className="relative h-1.5 grow rounded-full bg-black/10 dark:bg-white/10">
                <Slider.Range className="absolute h-full rounded-full bg-black dark:bg-white" />
              </Slider.Track>
              <Slider.Thumb className="block size-4 rounded-full bg-white shadow outline-none ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/20" />
            </Slider.Root>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Volume: {volume[0]}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
