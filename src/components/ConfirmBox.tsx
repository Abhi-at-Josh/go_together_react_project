import React from "react";

interface ConfirmBoxProps {
  onConfirm: (result: boolean) => void;
}

const ConfirmBox: React.FC<ConfirmBoxProps> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="bg-white w-1/3 p-6 rounded-md shadow-lg bg-gray-50">
        <h1 className="text-2xl font-bold text-indigo-500 mb-4">Are you sure?</h1>
        <p className="text-gray-700 text-left mb-6">Do you want to proceed?</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onConfirm(false)}
            className="bg-gray-300 py-2 px-4 text-gray-700 rounded-md font-semibold uppercase text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(true)}
            className="bg-indigo-500 py-2 px-4 text-white rounded-md font-semibold uppercase text-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
