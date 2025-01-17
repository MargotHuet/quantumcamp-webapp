import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-all duration-300 ${
        open ? "visible backdrop-blur-md bg-black bg-opacity-10" : "invisible"
      }`}
          
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-creamWhite p-4 rounded-xl shadow-md p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } w-11/12 max-w-md laptop:max-w-lg desktop:max-w-xl`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-500 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
