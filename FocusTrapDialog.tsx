import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const FocusTrapDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Nama yang dimasukkan: ${name}`);
    setOpen(false);
    setName('');
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Buka Dialog
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full max-w-sm
                                 bg-white p-6 rounded-lg shadow-xl data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
            Konfirmasi
          </Dialog.Title>
          <Dialog.Description className="text-gray-700 mb-4">
            Masukkan nama Anda untuk melanjutkan.
          </Dialog.Description>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Lengkap"
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              aria-label="Tutup"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FocusTrapDialog;
