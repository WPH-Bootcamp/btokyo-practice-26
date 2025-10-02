import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Switch from '@radix-ui/react-switch';
import { BellIcon, DotsHorizontalIcon, CheckIcon, TrashIcon } from '@radix-ui/react-icons';

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Anda mendapatkan email baru dari tim.', read: false },
    { id: 2, text: 'Pengaturan profil Anda berhasil diperbarui.', read: true },
    { id: 3, text: 'Dokumen Anda sudah disetujui.', read: false },
  ]);

  const [pushEnabled, setPushEnabled] = useState(false);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <BellIcon className="w-6 h-6 text-gray-700" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping-once" />
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-xl py-4 w-80 z-50
                     data-[side=bottom]:animate-slideUpAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <div className="flex justify-between items-center px-4 pb-2 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Notifikasi</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Push</span>
              <Switch.Root
                checked={pushEnabled}
                onCheckedChange={setPushEnabled}
                className="w-8 h-4 rounded-full bg-gray-300 data-[state=checked]:bg-blue-600 transition-colors"
              >
                <Switch.Thumb className="block w-3 h-3 rounded-full bg-white transition-transform translate-x-[2px] data-[state=checked]:translate-x-[18px]" />
              </Switch.Root>
            </div>
          </div>

          <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <li key={notif.id} className="group flex items-center justify-between p-4 hover:bg-gray-50">
                  <p className={`flex-1 text-sm ${notif.read ? 'text-gray-500' : 'font-medium text-gray-800'}`}>
                    {notif.text}
                  </p>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200">
                        <DotsHorizontalIcon className="w-4 h-4 text-gray-500" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="bg-white rounded-lg shadow-md py-1 z-50">
                        <DropdownMenu.Item
                          onSelect={() => markAsRead(notif.id)}
                          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer text-sm hover:bg-blue-50 hover:text-blue-600 outline-none"
                        >
                          <CheckIcon /> Tandai Dibaca
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          onSelect={() => deleteNotification(notif.id)}
                          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer text-sm hover:bg-red-50 hover:text-red-600 outline-none"
                        >
                          <TrashIcon /> Hapus
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 text-sm">Tidak ada notifikasi baru.</li>
            )}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default NotificationCenter;
