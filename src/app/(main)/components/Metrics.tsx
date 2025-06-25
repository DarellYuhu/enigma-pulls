"use client";
import { MetricCard } from "@/components/custom";
import { usePages } from "@/hooks/feature/use-pages";
import {
  ChartNoAxesCombined,
  Heart,
  MousePointerClick,
  SquarePlay,
  Star,
} from "lucide-react";

export default function Metrics() {
  const { data } = usePages();
  return (
    <div>
      {data && (
        <div className="grid grid-cols-5 gap-3">
          <MetricCard
            data={{
              icon: ChartNoAxesCombined,
              name: "Total Impressions",
              value: data.metrics.page_impressions,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: MousePointerClick,
              name: "Total Engagements",
              value: data.metrics.page_post_engagements,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: SquarePlay,
              name: "Views",
              value: data.metrics.page_video_views,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: Heart,
              name: "Total Likes",
              value: data.metrics.page_fans,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: Star,
              name: "Total Followers",
              value: data.metrics.page_follows,
              description: "",
            }}
          />
        </div>
      )}
    </div>
  );
}
