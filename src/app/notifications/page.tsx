"use client";

import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import * as Toast from "@radix-ui/react-toast";
import { Bell, MoreHorizontal, Check, Trash2, X, Plus } from "lucide-react";
import { useState } from "react";

type Notification = {
  id: number;
  text: string;
  read: boolean;
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      text: "Anda mendapatkan email baru dari tim.",
      read: false,
      timestamp: "2 menit yang lalu",
      type: "info",
    },
    {
      id: 2,
      text: "Pengaturan profil Anda berhasil diperbarui.",
      read: true,
      timestamp: "1 jam yang lalu",
      type: "success",
    },
    {
      id: 3,
      text: "Dokumen Anda sudah disetujui.",
      read: false,
      timestamp: "3 jam yang lalu",
      type: "success",
    },
    {
      id: 4,
      text: "Peringatan: Penyimpanan hampir penuh.",
      read: false,
      timestamp: "5 jam yang lalu",
      type: "warning",
    },
  ]);

  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    showToast("Notifikasi ditandai sebagai dibaca");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    showToast("Semua notifikasi ditandai sebagai dibaca");
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    showToast("Notifikasi dihapus");
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter((n) => !n.read));
    showToast("Semua notifikasi yang sudah dibaca dihapus");
  };

  const addNotification = () => {
    const types: Array<"info" | "success" | "warning" | "error"> = [
      "info",
      "success",
      "warning",
      "error",
    ];
    const messages = [
      "Tugas baru ditambahkan ke daftar Anda.",
      "Pembayaran berhasil diproses.",
      "Sesi Anda akan berakhir dalam 5 menit.",
      "Gagal mengupload file. Coba lagi.",
    ];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const newNotif: Notification = {
      id: Date.now(),
      text: randomMessage,
      read: false,
      timestamp: "Baru saja",
      type: randomType,
    };

    setNotifications([newNotif, ...notifications]);
    showToast("Notifikasi baru ditambahkan");
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotifColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500";
      case "warning":
        return "border-l-yellow-500";
      case "error":
        return "border-l-red-500";
      default:
        return "border-l-blue-500";
    }
  };

  return (
    <Toast.Provider swipeDirection="right">
      <main className="min-h-dvh p-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Notification Center</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Kelola notifikasi Anda dengan Radix UI
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Notification Popover */}
            <section className="space-y-4 rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">Popover Notification</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Klik icon bell untuk melihat notifikasi
              </p>

              <div className="flex items-center gap-4">
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button className="relative rounded-full p-3 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-white/10">
                      <Bell className="size-6" />
                      {unreadCount > 0 && (
                        <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  </Popover.Trigger>

                  <Popover.Portal>
                    <Popover.Content
                      className="z-50 w-80 rounded-lg border bg-white py-4 shadow-xl dark:bg-neutral-950"
                      sideOffset={5}
                    >
                      <div className="flex items-center justify-between border-b px-4 pb-2">
                        <h3 className="text-xl font-bold">Notifikasi</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Push</span>
                          <Switch.Root
                            checked={pushEnabled}
                            onCheckedChange={setPushEnabled}
                            className="inline-flex h-5 w-9 items-center rounded-full bg-gray-300 transition-colors data-[state=checked]:bg-blue-600 dark:bg-gray-700"
                          >
                            <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[18px]" />
                          </Switch.Root>
                        </div>
                      </div>

                      <ul className="max-h-80 divide-y overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <li
                              key={notif.id}
                              className={`group flex items-start gap-3 border-l-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 ${getNotifColor(
                                notif.type
                              )}`}
                            >
                              <div className="flex-1">
                                <p
                                  className={`text-sm ${
                                    notif.read
                                      ? "text-gray-500"
                                      : "font-medium text-gray-800 dark:text-gray-200"
                                  }`}
                                >
                                  {notif.text}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                  {notif.timestamp}
                                </p>
                              </div>
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                  <button className="rounded-full p-1 opacity-0 hover:bg-black/10 group-hover:opacity-100 dark:hover:bg-white/10">
                                    <MoreHorizontal className="size-4" />
                                  </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                  <DropdownMenu.Content className="z-50 rounded-lg border bg-white py-1 shadow-md dark:bg-neutral-950">
                                    <DropdownMenu.Item
                                      onSelect={() => markAsRead(notif.id)}
                                      className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm outline-none hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
                                    >
                                      <Check className="size-4" />
                                      Tandai Dibaca
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                      onSelect={() =>
                                        deleteNotification(notif.id)
                                      }
                                      className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm outline-none hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                                    >
                                      <Trash2 className="size-4" />
                                      Hapus
                                    </DropdownMenu.Item>
                                  </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                              </DropdownMenu.Root>
                            </li>
                          ))
                        ) : (
                          <li className="p-4 text-center text-sm text-gray-500">
                            Tidak ada notifikasi baru.
                          </li>
                        )}
                      </ul>

                      {notifications.length > 0 && (
                        <div className="flex gap-2 border-t px-4 pt-3">
                          <button
                            onClick={markAllAsRead}
                            className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
                          >
                            Tandai Semua Dibaca
                          </button>
                          <button
                            onClick={deleteAllRead}
                            className="flex-1 rounded-lg border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                          >
                            Hapus yang Dibaca
                          </button>
                        </div>
                      )}

                      <Popover.Arrow className="fill-white dark:fill-neutral-950" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>

                <button
                  onClick={addNotification}
                  className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Plus className="size-4" />
                  Tambah Notifikasi
                </button>
              </div>
            </section>

            {/* Settings */}
            <section className="space-y-4 rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">Pengaturan Notifikasi</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Terima notifikasi push
                    </p>
                  </div>
                  <Switch.Root
                    checked={pushEnabled}
                    onCheckedChange={setPushEnabled}
                    className="inline-flex h-6 w-11 items-center rounded-full bg-black/10 transition-colors data-[state=checked]:bg-blue-600 dark:bg-white/10"
                  >
                    <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Terima notifikasi via email
                    </p>
                  </div>
                  <Switch.Root
                    checked={emailEnabled}
                    onCheckedChange={setEmailEnabled}
                    className="inline-flex h-6 w-11 items-center rounded-full bg-black/10 transition-colors data-[state=checked]:bg-green-600 dark:bg-white/10"
                  >
                    <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                <h3 className="font-medium text-blue-900 dark:text-blue-100">
                  Status
                </h3>
                <div className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <p>Total: {notifications.length} notifikasi</p>
                  <p>Belum dibaca: {unreadCount} notifikasi</p>
                  <p>Push: {pushEnabled ? "Aktif" : "Nonaktif"}</p>
                  <p>Email: {emailEnabled ? "Aktif" : "Nonaktif"}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Notification List */}
          <section className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Daftar Notifikasi</h2>
            <div className="space-y-2">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`group flex items-start gap-3 rounded-lg border-l-4 p-4 transition-colors ${getNotifColor(
                      notif.type
                    )} ${
                      notif.read
                        ? "bg-gray-50 dark:bg-neutral-900/50"
                        : "bg-white dark:bg-neutral-950"
                    }`}
                  >
                    <div className="flex-1">
                      <p
                        className={`${
                          notif.read
                            ? "text-gray-500"
                            : "font-medium text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {notif.text}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                        <span>{notif.timestamp}</span>
                        <span>•</span>
                        <span className="capitalize">{notif.type}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="rounded-lg p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          title="Tandai dibaca"
                        >
                          <Check className="size-4 text-blue-600" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="rounded-lg p-2 hover:bg-red-100 dark:hover:bg-red-900/30"
                        title="Hapus"
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-gray-500">
                  Tidak ada notifikasi
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Toast */}
      <Toast.Root
        className="flex items-center gap-3 rounded-lg border bg-white p-4 shadow-lg dark:bg-neutral-950 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[swipe=end]:slide-out-to-right-full"
        open={toastOpen}
        onOpenChange={setToastOpen}
      >
        <Toast.Description className="flex-1 text-sm">
          {toastMessage}
        </Toast.Description>
        <Toast.Action asChild altText="Close">
          <button className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/10">
            <X className="size-4" />
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed right-0 top-0 z-[100] m-0 flex w-96 max-w-[100vw] list-none flex-col gap-3 p-6 outline-none" />
    </Toast.Provider>
  );
}
