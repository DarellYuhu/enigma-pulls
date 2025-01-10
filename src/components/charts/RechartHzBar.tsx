import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

type Props = {
  label: string;
  hidelabel?: boolean;
  labelKey: string;
  dataKey: string;
  data: { [key: string]: any }[];
  selectedId?: string;
};

export const RechartHzBar = ({
  hidelabel = true,
  label,
  labelKey,
  dataKey,
  data,
  selectedId,
}: Props) => {
  return (
    <ResponsiveContainer>
      <ChartContainer
        config={{
          [labelKey]: {
            label: label,
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            right: 16,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" dataKey={dataKey} hide />
          <YAxis
            dataKey={labelKey}
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            hide
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent hideLabel={hidelabel} indicator="line" />
            }
          />
          <Bar dataKey={dataKey} radius={5} fill="#c4e5f3">
            {data.map((entry, index) => (
              <Cell
                fill={selectedId !== entry.channel_id ? "#87cfed" : "#c4e5f3"}
                key={`cell-${index}`}
              />
            ))}
            <LabelList
              dataKey={labelKey}
              position="insideLeft"
              offset={8}
              className="fill-[#000000]"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};
