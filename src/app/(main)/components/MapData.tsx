"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Maps } from "@/components/ui/maps";
import { usePages } from "@/hooks/feature/use-pages";
import chroma from "chroma-js";
import { useMemo } from "react";

export default function MapData() {
  const { data } = usePages();

  const colors = useMemo(() => {
    return Object.fromEntries(
      data?.groups.map((g) => [g.id, chroma.random().hex()]) ?? []
    );
  }, [data?.groups]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grouping Pages</CardTitle>
        <CardDescription>Pages grouped by location</CardDescription>
      </CardHeader>
      <CardContent className="h-96 overflow-hidden">
        {data && (
          <Maps
            layerData={data.groups.map((g) => ({
              data: g,
              rid: g.id,
              color: colors[g.id],
            }))}
            renderTooltip={(hovered) =>
              hovered && (
                <Card>
                  <CardHeader className="p-2">
                    <CardTitle>{hovered.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 border-t">
                    {hovered.pageIds.map((id) => (
                      <div key={id}>
                        {data.pages.find((p) => p.id === id)?.name}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
