import Table from "@/components/Table";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import SelectMenu from "@/components/ui/Select";
import { useEffect, useState } from "react";
import Head from "next/head";
import Chart from "@/components/Chart";
import { unApprovedDoctors, approvedDoctors, datachart } from "@/data";

const themeMenu = [
  { name: "Default", icon: <ComputerDesktopIcon className="h-5 w-5" /> },
  { name: "Light", icon: <SunIcon className="h-5 w-5" /> },
  { name: "Dark", icon: <MoonIcon className="h-5 w-5" /> },
];
export default function Home() {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      setTheme(storedTheme);
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mediaQuery.matches ? "Dark" : "Light");
      localStorage.setItem("theme", mediaQuery.matches ? "Dark" : "Light");
    }
  }, []);

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "Default") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      const handleChange = () => {
        if (theme === "Default") {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      };
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", handleChange);
      return () => {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .removeEventListener("change", handleChange);
      };
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center ">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex w-full items-center justify-between border-b border-slate-200 dark:border-b-slate-700 h-14 mb-10 py-3 px-4 lg:px-10">
        <h1 className="self-start text-lg font-semibold mb-10 text-slate-900 dark:text-slate-50">
          Dashboard
        </h1>
        <SelectMenu
          onChange={(e) => {
            setTheme(e);
            localStorage.setItem("theme", e);
          }}
          items={themeMenu}
          title=""
          variant={"outline"}
          size={"square"}
        />
      </div>
      <div className="w-full px-4 lg:px-10 space-y-5 mb-10">
        <Chart title="Total users" data={datachart} />
        <div className="flex flex-col gap-5 lg:gap-10 items-center lg:flex-row lg:justify-evenly ">
          <Chart title="Android users" data={datachart} />
          <Chart title="IOS users" data={datachart} />
        </div>
      </div>
      <div className="w-full px-4 space-y-10 lg:px-10">
        <Table
          doctors={unApprovedDoctors}
          approved={false}
          title="Requested doctors"
        />
        <Table
          doctors={approvedDoctors}
          approved={true}
          title="Accepted doctors"
        />
      </div>
    </main>
  );
}
