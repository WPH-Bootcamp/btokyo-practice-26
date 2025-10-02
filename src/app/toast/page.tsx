"use client";

import * as Toast from "@radix-ui/react-toast";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
  Rocket,
  Mail,
  Download,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

type ToastItem = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export default function ToastPage() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [duration, setDuration] = useState(3000);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  const addToast = (toast: Omit<ToastItem, "id">) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showSuccessToast = () => {
    addToast({
      type: "success",
      title: "Berhasil disimpan!",
      description: "Data Anda telah tersimpan dengan aman.",
    });
  };

  const showErrorToast = () => {
    addToast({
      type: "error",
      title: "Terjadi kesalahan",
      description: "Gagal menyimpan data. Silakan coba lagi.",
      action: {
        label: "Coba Lagi",
        onClick: () => {
          console.log("Retry clicked");
          showSuccessToast();
        },
      },
    });
  };

  const showWarningToast = () => {
    addToast({
      type: "warning",
      title: "Perhatian!",
      description: "Sesi Anda akan berakhir dalam 5 menit.",
      action: {
        label: "Perpanjang",
        onClick: () => console.log("Session extended"),
      },
    });
  };

  const showInfoToast = () => {
    addToast({
      type: "info",
      title: "Tips hari ini",
      description: "Gunakan keyboard shortcut Ctrl+K untuk pencarian cepat.",
    });
  };

  const showActionToast = (actionType: string) => {
    const actions: Record<string, Omit<ToastItem, "id">> = {
      email: {
        type: "info",
        title: "Email terkirim",
        description: "Pesan Anda telah terkirim ke penerima.",
        action: {
          label: "Lihat",
          onClick: () => console.log("View email"),
        },
      },
      download: {
        type: "success",
        title: "Download dimulai",
        description: "File sedang diunduh ke perangkat Anda.",
      },
      delete: {
        type: "warning",
        title: "File dihapus",
        description: "File telah dipindahkan ke Recycle Bin.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo delete"),
        },
      },
    };

    if (actions[actionType]) {
      addToast(actions[actionType]);
    }
  };

  const getToastStyles = (type: ToastType) => {
    const styles = {
      success: {
        border: "border-green-200 dark:border-green-800",
        bg: "bg-green-50 dark:bg-green-950/30",
        icon: <CheckCircle2 className="size-5 text-green-600" />,
        text: "text-green-900 dark:text-green-100",
      },
      error: {
        border: "border-red-200 dark:border-red-800",
        bg: "bg-red-50 dark:bg-red-950/30",
        icon: <XCircle className="size-5 text-red-600" />,
        text: "text-red-900 dark:text-red-100",
      },
      warning: {
        border: "border-yellow-200 dark:border-yellow-800",
        bg: "bg-yellow-50 dark:bg-yellow-950/30",
        icon: <AlertTriangle className="size-5 text-yellow-600" />,
        text: "text-yellow-900 dark:text-yellow-100",
      },
      info: {
        border: "border-blue-200 dark:border-blue-800",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        icon: <Info className="size-5 text-blue-600" />,
        text: "text-blue-900 dark:text-blue-100",
      },
    };
    return styles[type];
  };

  return (
    <Toast.Provider swipeDirection={position === "bottom" ? "down" : "up"}>
      <main className="min-h-dvh p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Toast Notifications</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sistem notifikasi sementara yang accessible dan customizable
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Basic Toasts */}
            <section className="space-y-4 rounded-2xl border p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold">Toast Types</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Berbagai jenis toast notification untuk berbagai use case
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={showSuccessToast}
                  className="flex items-center gap-2 rounded-lg border border-green-500 bg-green-50 px-4 py-3 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:hover:bg-green-950/50"
                >
                  <CheckCircle2 className="size-5" />
                  <span className="font-medium">Success Toast</span>
                </button>

                <button
                  onClick={showErrorToast}
                  className="flex items-center gap-2 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-red-700 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
                >
                  <XCircle className="size-5" />
                  <span className="font-medium">Error Toast</span>
                </button>

                <button
                  onClick={showWarningToast}
                  className="flex items-center gap-2 rounded-lg border border-yellow-500 bg-yellow-50 px-4 py-3 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:text-yellow-300 dark:hover:bg-yellow-950/50"
                >
                  <AlertTriangle className="size-5" />
                  <span className="font-medium">Warning Toast</span>
                </button>

                <button
                  onClick={showInfoToast}
                  className="flex items-center gap-2 rounded-lg border border-blue-500 bg-blue-50 px-4 py-3 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/50"
                >
                  <Info className="size-5" />
                  <span className="font-medium">Info Toast</span>
                </button>
              </div>

              <div className="pt-4">
                <h3 className="mb-3 font-medium">Action Toasts</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={() => showActionToast("email")}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Mail className="size-4" />
                    Email Sent
                  </button>
                  <button
                    onClick={() => showActionToast("download")}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Download className="size-4" />
                    Download
                  </button>
                  <button
                    onClick={() => showActionToast("delete")}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </button>
                </div>
              </div>
            </section>

            {/* Settings */}
            <section className="space-y-4 rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Duration (ms)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    step={1000}
                    min={1000}
                    max={10000}
                    className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {duration / 1000} detik
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium">Position</label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="position"
                        value="bottom"
                        checked={position === "bottom"}
                        onChange={(e) =>
                          setPosition(e.target.value as "top" | "bottom")
                        }
                        className="size-4"
                      />
                      <span className="text-sm">Bottom Right</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="position"
                        value="top"
                        checked={position === "top"}
                        onChange={(e) =>
                          setPosition(e.target.value as "top" | "bottom")
                        }
                        className="size-4"
                      />
                      <span className="text-sm">Top Right</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setToasts([])}
                    disabled={toasts.length === 0}
                    className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5"
                  >
                    Clear All ({toasts.length})
                  </button>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section className="space-y-4 rounded-2xl border p-6 lg:col-span-3">
              <h2 className="text-xl font-semibold">Common Use Cases</h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                  <h3 className="font-medium text-green-900 dark:text-green-100">
                    Form Submission
                  </h3>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    Konfirmasi bahwa data berhasil disimpan ke database
                  </p>
                  <button
                    onClick={() =>
                      addToast({
                        type: "success",
                        title: "Form submitted successfully",
                        description: "Your changes have been saved.",
                      })
                    }
                    className="mt-3 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
                  >
                    Simulate Submit
                  </button>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                  <h3 className="font-medium text-red-900 dark:text-red-100">
                    API Error
                  </h3>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                    Tampilkan error message dari server dengan opsi retry
                  </p>
                  <button
                    onClick={() =>
                      addToast({
                        type: "error",
                        title: "Failed to load data",
                        description: "Network error occurred.",
                        action: {
                          label: "Retry",
                          onClick: () => console.log("Retrying..."),
                        },
                      })
                    }
                    className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                  >
                    Simulate Error
                  </button>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">
                    Feature Update
                  </h3>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    Informasikan user tentang fitur baru atau tips
                  </p>
                  <button
                    onClick={() =>
                      addToast({
                        type: "info",
                        title: "New feature available!",
                        description: "Check out our new dark mode.",
                        action: {
                          label: "Learn More",
                          onClick: () => console.log("Learn more clicked"),
                        },
                      })
                    }
                    className="mt-3 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                  >
                    Show Update
                  </button>
                </div>
              </div>
            </section>

            {/* Implementation Guide */}
            <section className="rounded-2xl border bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:from-purple-950/20 dark:to-pink-950/20 lg:col-span-3">
              <div className="flex items-start gap-3">
                <Rocket className="mt-1 size-6 text-purple-600" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    Kenapa Menggunakan Radix Toast?
                  </h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <h3 className="font-medium text-purple-600 dark:text-purple-400">
                        Accessibility
                      </h3>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>✓ Screen reader announcements</li>
                        <li>✓ Focus management</li>
                        <li>✓ Keyboard dismissible</li>
                        <li>✓ ARIA live regions</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-pink-600 dark:text-pink-400">
                        Developer Experience
                      </h3>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>✓ Portal rendering</li>
                        <li>✓ Queue management</li>
                        <li>✓ Swipe to dismiss</li>
                        <li>✓ Auto dismiss timer</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-600 dark:text-blue-400">
                        Customization
                      </h3>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>✓ Full styling control</li>
                        <li>✓ Action buttons</li>
                        <li>✓ Multiple positions</li>
                        <li>✓ Animation support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Toast Viewport */}
      <Toast.Viewport
        className={`fixed ${
          position === "bottom" ? "bottom-0" : "top-0"
        } right-0 z-[100] m-0 flex w-96 max-w-[100vw] list-none flex-col gap-3 p-6 outline-none`}
      />

      {/* Render Toasts */}
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        return (
          <Toast.Root
            key={toast.id}
            duration={duration}
            className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg ${styles.border} ${styles.bg} data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out ${
              position === "bottom"
                ? "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full data-[swipe=end]:slide-out-to-right-full"
                : "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[swipe=end]:slide-out-to-right-full"
            }`}
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id);
            }}
          >
            {styles.icon}
            <div className="flex-1">
              <Toast.Title className={`font-medium ${styles.text}`}>
                {toast.title}
              </Toast.Title>
              {toast.description && (
                <Toast.Description
                  className={`mt-1 text-sm ${styles.text} opacity-90`}
                >
                  {toast.description}
                </Toast.Description>
              )}
              {toast.action && (
                <Toast.Action
                  asChild
                  altText={toast.action.label}
                  className="mt-2"
                >
                  <button
                    onClick={toast.action.onClick}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                      toast.type === "success"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : toast.type === "error"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : toast.type === "warning"
                        ? "bg-yellow-600 text-white hover:bg-yellow-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {toast.action.label}
                  </button>
                </Toast.Action>
              )}
            </div>
            <Toast.Close
              className={`rounded-lg p-1 hover:bg-black/10 dark:hover:bg-white/10`}
            >
              <X className="size-4" />
            </Toast.Close>
          </Toast.Root>
        );
      })}
    </Toast.Provider>
  );
}
