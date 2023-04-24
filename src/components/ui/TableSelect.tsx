import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

type TableSelectProps = {
  items: string[];
  onSelect: (item: string) => void;
  title: string;
};

const TableSelect: React.FC<TableSelectProps> = ({
  items,
  onSelect,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | 0>(0);
  const listRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const handleSelect = useCallback(
    (item: string) => {
      onSelect(item);
      setIsOpen(false);
      setSelectedIndex(0);
    },
    [onSelect]
  );

  const handleClick = (event: MouseEvent) => {
    if (ref.current && ref.current.contains(event.target as Node)) {
      setIsOpen(true);
      setSelectedIndex(0);
      if (ref.current) {
        ref.current.focus();
      }
    } else {
      setIsOpen(false);
      setSelectedIndex(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((selectedIndex) =>
          selectedIndex === null
            ? 0
            : items.length - 1 === selectedIndex
            ? 0
            : Math.min(selectedIndex + 1, items.length - 1)
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((selectedIndex) =>
          selectedIndex === null
            ? items.length - 1
            : selectedIndex === 0
            ? items.length - 1
            : Math.max(selectedIndex - 1, 0)
        );
      } else if (event.key === "Enter" && selectedIndex !== null) {
        event.preventDefault();
        handleSelect(items[selectedIndex]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [handleSelect, isOpen, items, selectedIndex]);

  useEffect(() => {
    if (listRef.current && selectedIndex !== null) {
      const itemHeight = (listRef.current.children[0] as HTMLElement)
        .offsetHeight;
      const scrollTop = itemHeight * selectedIndex;
      listRef.current.scrollTop = scrollTop;
    }
  }, [selectedIndex]);

  return (
    <div ref={ref} className="relative inline-block text-left ">
      <div onClick={(e) => e.stopPropagation()}>
        <span
          onClick={() => {
            setIsOpen(!isOpen);
            setSelectedIndex(0);
          }}
          className="cursor-pointer flex items-center gap-3 select-none"
          id="options-menu"
          aria-haspopup="true"
        >
          <p>{title}</p>
          <ChevronUpDownIcon className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      {isOpen && (
        <ul
          id="menu_scroll"
          ref={listRef}
          className="absolute left-0 z-30 space-y-1 mt-2 w-44 max-h-60 p-2 bg-gray-50 dark:bg-gray-900 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          dir="rtld"
        >
          {items.map((item, index) => (
            <li
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(-1)}
              key={item}
              className={`${
                selectedIndex === index
                  ? "bg-gray-200/80 dark:bg-gray-500/80 "
                  : ""
              } py-2 pl-3 pr-5 text-xs text-slate-800 font-normal dark:text-slate-100 rounded-md select-none relative cursor-pointer`}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableSelect;
