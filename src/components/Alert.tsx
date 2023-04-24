import React from "react";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
export default function Alert({
  name,
  onCancel,
  onDelete,
}: {
  name: string;
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="h-full w-full absolute z-50 bg-white dark:bg-[#111827] bg-opacity-50 backdrop-blur-lg top-0 left-0 flex items-center justify-center">
      <motion.div
        className="max-w-md p-6 bg-white dark:bg-[#111827] space-y-5  rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="flex items-center gap-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-400"  strokeWidth={2}/>
          <h1 className="text-lg font-semibold">Delete Doctor</h1>
        </span>
        <p>
          Are you sure you want to delete Dr. {name} from your list of doctors?
        </p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-blue-500 px-4 py-2 font-medium text-white rounded-md hover:bg-blue-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500  font-medium text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
