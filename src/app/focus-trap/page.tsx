"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X, Lock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function FocusTrapPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savedName, setSavedName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [nestedDialogOpen, setNestedDialogOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [focusLog, setFocusLog] = useState<string[]>([]);

  const handleSave = () => {
    if (name.trim()) {
      setSavedName(name);
      setDialogOpen(false);
      setName("");
      addToLog("Dialog disimpan dan ditutup");
    }
  };

  const handleAlertConfirm = () => {
    setSavedName("");
    setAlertOpen(false);
    addToLog("Data dihapus via AlertDialog");
  };

  const addToLog = (message: string) => {
    setFocusLog((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    if (dialogOpen && inputRef.current) {
      addToLog("Dialog dibuka - fokus ke input");
    }
  }, [dialogOpen]);

  return (
    <main className="min-h-dvh p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Focus Trap Dialog</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Dialog dengan focus trap untuk aksesibilitas keyboard yang optimal
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Focus Trap Dialog */}
            <section className="space-y-4 rounded-2xl border p-6">
              <div className="flex items-start gap-3">
                <Lock className="mt-1 size-5 text-blue-500" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Basic Focus Trap</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Dialog dengan input field yang otomatis menerima fokus
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Coba:</strong> Buka dialog, lalu tekan tombol Tab
                  berulang kali. Perhatikan fokus akan berputar di dalam dialog
                  (input → Batal → Simpan → input).
                </p>
              </div>

              <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Trigger asChild>
                  <button
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => addToLog("Tombol dialog diklik")}
                  >
                    Buka Dialog dengan Focus Trap
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                  <Dialog.Content
                    className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-6 shadow-xl focus:outline-none dark:bg-neutral-950 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                    onOpenAutoFocus={(e) => {
                      e.preventDefault();
                      inputRef.current?.focus();
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-semibold">
                        Masukkan Nama Anda
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button
                          className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-white/10"
                          onClick={() => addToLog("Dialog ditutup via tombol X")}
                        >
                          <X className="size-4" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Fokus otomatis akan berpindah ke input field. Coba tekan
                      Tab untuk navigasi keyboard.
                    </Dialog.Description>

                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="name-input"
                          className="block text-sm font-medium"
                        >
                          Nama
                        </label>
                        <input
                          ref={inputRef}
                          id="name-input"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => addToLog("Input nama mendapat fokus")}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave();
                            }
                          }}
                          placeholder="Ketik nama Anda..."
                          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Dialog.Close asChild>
                          <button
                            className="rounded-lg border px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:hover:bg-white/10"
                            onClick={() => addToLog("Tombol Batal diklik")}
                            onFocus={() => addToLog("Tombol Batal mendapat fokus")}
                          >
                            Batal
                          </button>
                        </Dialog.Close>
                        <button
                          onClick={handleSave}
                          onFocus={() => addToLog("Tombol Simpan mendapat fokus")}
                          disabled={!name.trim()}
                          className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              {savedName && (
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <p className="text-sm text-green-900 dark:text-green-100">
                    Nama tersimpan: <strong>{savedName}</strong>
                  </p>
                </div>
              )}
            </section>

            {/* Alert Dialog */}
            <section className="space-y-4 rounded-2xl border p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 size-5 text-orange-500" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Alert Dialog</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Dialog konfirmasi yang memblokir interaksi hingga user memilih
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950/30">
                <p className="text-sm text-orange-900 dark:text-orange-100">
                  <strong>Perbedaan:</strong> AlertDialog tidak bisa ditutup
                  dengan klik overlay atau ESC. User harus memilih aksi.
                </p>
              </div>

              <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialog.Trigger asChild>
                  <button
                    disabled={!savedName}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => addToLog("AlertDialog dibuka")}
                  >
                    Hapus Data
                  </button>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                  <AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                  <AlertDialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-6 shadow-xl focus:outline-none dark:bg-neutral-950">
                    <AlertDialog.Title className="text-lg font-semibold">
                      Konfirmasi Penghapusan
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Apakah Anda yakin ingin menghapus data{" "}
                      <strong>{savedName}</strong>? Aksi ini tidak dapat
                      dibatalkan.
                    </AlertDialog.Description>

                    <div className="mt-4 flex justify-end gap-2">
                      <AlertDialog.Cancel asChild>
                        <button
                          className="rounded-lg border px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:hover:bg-white/10"
                          onClick={() => addToLog("AlertDialog dibatalkan")}
                        >
                          Batal
                        </button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <button
                          onClick={handleAlertConfirm}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Ya, Hapus
                        </button>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </section>

            {/* Nested Dialog */}
            <section className="space-y-4 rounded-2xl border p-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex size-5 items-center justify-center">
                  <div className="size-4 rounded border-2 border-purple-500" />
                  <div className="absolute size-3 rounded border-2 border-purple-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Nested Dialog</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Dialog di dalam dialog dengan focus trap terpisah
                  </p>
                </div>
              </div>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    Buka Dialog Utama
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-6 shadow-xl focus:outline-none dark:bg-neutral-950">
                    <Dialog.Title className="text-lg font-semibold">
                      Dialog Utama
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Dari sini, Anda bisa membuka dialog kedua
                    </Dialog.Description>

                    <div className="mt-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Anda..."
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-900"
                      />
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Dialog.Root
                        open={nestedDialogOpen}
                        onOpenChange={setNestedDialogOpen}
                      >
                        <Dialog.Trigger asChild>
                          <button className="rounded-lg border border-purple-500 px-4 py-2 text-sm text-purple-500 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:hover:bg-purple-950/30">
                            Buka Dialog Nested
                          </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-purple-500 bg-white p-6 shadow-xl focus:outline-none dark:bg-neutral-900">
                            <Dialog.Title className="text-lg font-semibold text-purple-600">
                              Dialog Nested
                            </Dialog.Title>
                            <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              Ini adalah dialog di dalam dialog. Focus trap
                              bekerja independen.
                            </Dialog.Description>

                            <div className="mt-4 flex justify-end">
                              <Dialog.Close asChild>
                                <button className="rounded-lg bg-purple-500 px-4 py-2 text-sm text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                                  Tutup
                                </button>
                              </Dialog.Close>
                            </div>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>

                      <Dialog.Close asChild>
                        <button className="rounded-lg bg-purple-500 px-4 py-2 text-sm text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                          Tutup
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </section>
          </div>

          {/* Sidebar - Focus Log & Tips */}
          <div className="space-y-6">
            {/* Focus Log */}
            <section className="rounded-2xl border p-4">
              <h3 className="font-semibold">Focus Activity Log</h3>
              <div className="mt-3 space-y-1 rounded-lg bg-black/5 p-3 font-mono text-xs dark:bg-white/5">
                {focusLog.length > 0 ? (
                  focusLog.map((log, i) => (
                    <div key={i} className="text-gray-600 dark:text-gray-400">
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">Belum ada aktivitas</div>
                )}
              </div>
            </section>

            {/* Accessibility Tips */}
            <section className="rounded-2xl border p-4">
              <h3 className="font-semibold">Aksesibilitas Tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <span>⌨️</span>
                  <span>
                    <strong>Tab:</strong> Navigasi antar elemen
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>⎋</span>
                  <span>
                    <strong>Escape:</strong> Tutup dialog (kecuali AlertDialog)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>↩️</span>
                  <span>
                    <strong>Enter:</strong> Submit form di dialog
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>🔒</span>
                  <span>
                    <strong>Focus Trap:</strong> Fokus tidak bisa keluar dari
                    dialog
                  </span>
                </li>
              </ul>
            </section>

            {/* Key Concepts */}
            <section className="rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                Key Concepts
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-green-800 dark:text-green-200">
                <li>✓ Auto-focus pada elemen pertama</li>
                <li>✓ Focus trap mencegah Tab keluar</li>
                <li>✓ Return focus saat dialog tutup</li>
                <li>✓ Screen reader friendly</li>
                <li>✓ Keyboard navigation lengkap</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
