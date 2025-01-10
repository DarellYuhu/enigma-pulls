"use client";

import { RechartHzBar } from "@/components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePages } from "@/hooks/feature/use-pages";

export default function Demographic() {
  const { data } = usePages();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Follower&apos;s Cities</CardTitle>
          <CardDescription>
            Aggregated Facebook location data, sorted by city, about the people
            who like your Pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          {data && (
            <RechartHzBar
              data={
                data.demographic?.page_fans_city
                  ?.sort((a, b) => b.value - a.value)
                  .slice(0, 10) || []
              }
              dataKey="value"
              label="People"
              labelKey="key"
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Follower&apos;s Countries</CardTitle>
          <CardDescription>
            The number of people, aggregated per country, that like your Page.
            Only the 45 countries with the most people that like your Page are
            included.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          {data && (
            <RechartHzBar
              data={
                data.demographic?.page_fans_country
                  ?.sort((a, b) => b.value - a.value)
                  .slice(0, 10) || []
              }
              dataKey="value"
              label="People"
              labelKey="key"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
