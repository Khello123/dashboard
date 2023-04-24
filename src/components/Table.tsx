import { FC, useState } from "react";
import {
  CheckIcon,
  PauseCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import TableSelect from "./ui/TableSelect";
import TableHeader from "./TableHeader";
import {
  sortField,
  sortName,
  sortPhone,
  searchName,
  removeDoctor,
  sortByCategory,
} from "@/lib/table_methods";
import {AnimatePresence} from "framer-motion"
import Alert from "./Alert";
interface TableProps {
  doctors: doctor[];
  approved: boolean;
  title: string;
}

const Table: FC<TableProps> = ({ title, doctors, approved }) => {
  const [items, setItems] = useState<doctor[]>(doctors);
  const [selectedDoctor,setSelectedDoctor]=useState<any>(null)
  const [open,setOpen]=useState(false);
  return (
    
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
       <AnimatePresence>
          {open && <Alert name={selectedDoctor.name} onCancel={() => setOpen(false)} onDelete={() => {
            setItems(prev => removeDoctor(selectedDoctor.name, prev))
          setOpen(false)}} />}
        </AnimatePresence>
      <TableHeader
        onCategoryChange={(e) => setItems(sortByCategory(e, doctors))}
        title={title}
        onChange={(e) => setItems(searchName(e.target.value, doctors))}
      />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="sm:px-6 py-3">
              <p className="sr-only">doc_pic</p>
            </th>
            <th scope="col" className="sm:px-6 py-3">
              <TableSelect
                items={["Ascending Order", "Descending Order"]}
                title="Name"
                onSelect={(item) => {
                  setItems(sortName(items, item));
                }}
              />
              <p className="sr-only">Name</p>
            </th>
            <th scope="col" className="sm:px-6 py-3">
              <TableSelect
                items={["Ascending Order", "Descending Order"]}
                title="Phone"
                onSelect={(item) => {
                  setItems(sortPhone(items, item));
                }}
              />
              <p className="sr-only">Phone</p>
            </th>
            <th scope="col" className="sm:px-6 py-3">
              <TableSelect
                items={["Ascending Order", "Descending Order"]}
                title="Field"
                onSelect={(item) => {
                  setItems(sortField(items, item));
                }}
              />
              <p className="sr-only">Field</p>
            </th>
            <th scope="col" className="sm:px-6 py-3">
              <span className="sr-only">remove</span>
            </th>
            <th scope="col" className="sm:px-6 py-3">
              <span className="sr-only">{approved ? "suspend" : "accept"}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, field, image, name, phone }) => (
            <tr
              key={id}
              className="bg-white w-full border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <p className="sr-only">profile</p>
                <Image
                  height={100}
                  width={100}
                  src={image}
                  alt={"dr-" + name + "-image"}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                />
              </th>
              <td className="sm:px-6 py-4">{name}</td>
              <td className="sm:px-6 py-4">{phone}</td>
              <td className="sm:px-6 py-4">{field}</td>
              <td className="sm:px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoctor({ id, name })
                    setOpen(true)
                  }}
                  aria-label="remove doctor"
                  className="h-6 w-6 rounded-full backdrop-blur-md flex items-center justify-center dark:hover:bg-gray-500/50 hover:text-red-500"
                >
                  <XMarkIcon className="h-4 w-4" strokeWidth={2} />
                </button>
              </td>
              <td className="sm:px-6 py-4 text-right">
                <button
                  type="button"
                  aria-label={approved ? "suspend doctor" : "approve doctor"}
                  className="h-6 w-6 rounded-full backdrop-blur-md flex items-center justify-center dark:hover:bg-gray-500/50 hover:text-emerald-500"
                >
                  {approved ? (
                    <PauseCircleIcon className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <CheckIcon className="h-4 w-4" strokeWidth={2} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-5 w-full bg-gray-50 flex gap-1 justify-end items-center dark:bg-gray-700 dark:text-gray-400 border-b p-4 border-gray-200 dark:border-gray-800 ">
        {Array.from(Array(4), (_, i) => i + 1).map((i) => (
          <div key={i} className="px-2 border rounded cursor-pointer">
            {i}
          </div>
        ))}
      </div>
      </div>
  );
};

export default Table;
