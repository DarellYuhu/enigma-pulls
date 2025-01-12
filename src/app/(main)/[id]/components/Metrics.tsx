"use client";
import { MetricCard } from "@/components/custom";
import { usePage } from "@/hooks/feature/use-page";
import {
  ChartNoAxesCombined,
  Heart,
  MousePointerClick,
  SquarePlay,
  Star,
} from "lucide-react";

export default function Metrics() {
  const { data } = usePage();
  return (
    <div>
      {data && (
        <div className="grid grid-cols-5 gap-3">
          <MetricCard
            data={{
              icon: ChartNoAxesCombined,
              name: "Total Impressions",
              value: data.aggregate.page_impressions,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: MousePointerClick,
              name: "Total Engagements",
              value: data.aggregate.page_post_engagements,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: SquarePlay,
              name: "Total Page Video Views",
              value: data.aggregate.page_video_views,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: Heart,
              name: "Total Likes",
              value: data.aggregate.page_fans,
              description: "",
            }}
          />
          <MetricCard
            data={{
              icon: Star,
              name: "Total Followers",
              value: data.aggregate.page_follows,
              description: "",
            }}
          />
        </div>
      )}
    </div>
  );
}
