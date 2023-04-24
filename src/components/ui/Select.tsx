import React, { ReactNode, useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SelectItem } from "./SelectItem";
const selectVariants = cva(
  "flex items-center justify-center rounded text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10  focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-slate-800 dark:data-[placeholder]:text-gray-100 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-slate-300 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-500 dark:bg-slate-800 dark:data-[placeholder]:text-slate-100",
        outline:
          "bg-transparent border text-slate-700 border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700",
      },
      size: {
        default: "h-8 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
        square: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
interface TableSelectProps extends VariantProps<typeof selectVariants> {
  title: string | ReactNode;
  items: { name: string; icon?: ReactNode }[];
  onChange: (e: string) => void;
  className?: string;
}
export default function SelectMenu({
  title,
  items,
  onChange,
  className,
  variant,
  size,
}: TableSelectProps) {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    icon?: ReactNode;
  } | null>();
  const handleValueChange = (value: string) => {
    const selectedItem = items.find((item) => item.name === value);
    setSelectedItem(selectedItem || items[0]);
    onChange(value);
  };
  const [icon, setIcon] = useState<ReactNode | null>(null);
  useEffect(() => {
    if (items[0].icon !== undefined) {
      let theme = localStorage.getItem("theme");
      if (theme !== null) {
        let i = items.findIndex((item) => item.name === theme);
        setIcon(items[i].icon);
      }
    }
  }, [items]);
  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger
        className={cn(selectVariants({ size, variant, className }))}
      >
        <Select.Value
          placeholder={
            items[0].icon === undefined
              ? title
              : icon !== null
              ? icon
              : items[0].icon
          }
        >
          {selectedItem?.icon}
        </Select.Value>
        <Select.Icon className="text-gray-500">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              {items?.map(({ name, icon }) => (
                <SelectItem value={name} className="uppercase" key={name}>
                  <div className="flex items-center gap-4 text-slate-800 dark:text-slate-100">
                    {icon && <span>{icon}</span>}
                    <p>{name}</p>
                  </div>
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
