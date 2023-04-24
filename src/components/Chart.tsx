import { cn } from "@/lib/utils";
import { Card, LineChart, Title } from "@tremor/react";
import React from "react";
interface ChartProps {
  title: string;
  data: any[];
  className?: string;
}
export default function Chart({ className, title, data }: ChartProps) {
  return (
    <Card
      className={cn(
        "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
        className
      )}
    >
      <Title>{title}</Title>
      <LineChart
        data={data}
        index="time"
        categories={["users"]}
        colors={["blue"]}
      />
    </Card>
  );
}
