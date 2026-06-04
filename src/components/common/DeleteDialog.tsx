"use client";

import React, { useEffect, useRef, useState } from "react";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemText?: string;
}

const dialogStyles = `
  @keyframes slideUpFromBottom {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDownToBottom {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100px);
    }
  }

  dialog[open]::backdrop {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  dialog.dialog-closing::backdrop {
    animation: fadeOut 0.3s ease-out forwards;
  }

  dialog.dialog-closing {
    animation: slideDownToBottom 0.3s ease-out forwards;
  }
`;

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  itemText = "this item",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <style>{dialogStyles}</style>
      <dialog
        ref={dialogRef}
        aria-labelledby="delete-dialog-title"
        className={`w-full max-w-md rounded-xl border-0 bg-white p-0 text-left shadow-xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm m-auto ${
          isClosing ? "dialog-closing" : ""
        }`}
        style={{
          animation: isClosing ? undefined : "slideUpFromBottom 0.3s ease-out",
        }}
        onCancel={(event) => {
          event.preventDefault();
          handleClose();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
      >
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3
                id="delete-dialog-title"
                className="text-lg font-semibold text-slate-950"
              >
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete the expense <br />
                <span className="font-medium text-slate-900"> {itemText} </span>
                <br />
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                handleClose();
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
