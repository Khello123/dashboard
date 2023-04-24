import { CheckIcon } from "@heroicons/react/24/outline";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { ReactNode, forwardRef } from "react";

interface SelectItemProps {
  children: ReactNode;
  className?: string;
  value: string;
}
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, value }, forwardedRef) => {
    return (
      <Select.Item
        value={value}
        className={classnames(
          "text-[13px] leading-none text- rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none  data-[highlighted]:outline-none data-[highlighted]:bg-gray-200/80 dark:data-[highlighted]:bg-gray-500/80",
          className
        )}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon className="h-4 w-4" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";
