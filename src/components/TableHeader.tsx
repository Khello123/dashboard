import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import SelectMenu from "./ui/Select";

export default function TableHeader({
  title,
  onChange,
  onCategoryChange,
}: {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: string) => void;
}) {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b p-4 border-gray-200 dark:border-gray-800">
      <h1 className="mb-3 text-black/90  font-semibold text-lg dark:text-white">
        {title}
      </h1>
      <form className="w-full flex items-center justify-between">
        <SelectMenu
          onChange={onCategoryChange}
          title="Category"
          items={[
            {
              name: "Gynecologist",
            },
            {
              name: "Family medicine",
            },
            {
              name: "Internal Medicine",
            },
            {
              name: "Pediatrician",
            },
            {
              name: "Cardiologist",
            },
            {
              name: "Oncologist",
            },
            {
              name: "Pulmonologist",
            },
          ]}
        />
        <label
          htmlFor="search"
          className="flex items-center h-10 rounded-full bg-slate-300/50 text-slate-600 dark:text-slate-100 dark:bg-slate-500 pr-2"
        >
          <input
            onChange={onChange}
            id="search"
            placeholder="search"
            className="w-52 rounded-full h-10 focus:outline-none px-4 bg-transparent placeholder:text-slate-600 dark:placeholder:text-slate-100"
          />
          <MagnifyingGlassIcon className="h-5 w-5" strokeWidth={2} />
        </label>
      </form>
    </div>
  );
}
