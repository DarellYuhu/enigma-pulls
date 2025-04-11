"use client";
import { SingleSelect } from "@/components/custom";
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
import { useMemo, useState } from "react";
import { AddGroupPageDialog } from "./AddGroupPageDialog";

export default function MapData() {
  const [option, setOption] = useState("page_fans");
  const { data } = usePages();

  const colors = useMemo(() => {
    const max = Math.max(
      ...(data?.groups.map((g) => g.aggregate[option]) ?? [])
    );
    const min = 0;
    const range = 0.5 - min;
    return Object.fromEntries(
      data?.groups.map((g) => {
        const value = g.aggregate[option];
        const alpha = (value / max) * range + min;
        console.log(value, alpha);
        return [g.id, { alpha, color: chroma("slateblue").hex() }];
      }) ?? []
    );
  }, [data?.groups, option]);

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Grouping Pages</CardTitle>
        <CardDescription>Pages grouped by location</CardDescription>
      </CardHeader>
      <CardContent className="h-96 overflow-hidden">
        {data && (
          <>
            <Maps
              layerData={data.groups.map((g) => ({
                data: g,
                rid: g.id,
                alpha: colors[g.id].alpha,
                color: colors[g.id].color,
              }))}
              renderTooltip={(hovered) =>
                hovered && (
                  <Card>
                    <CardHeader className="p-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{hovered.name}</CardTitle>
                        <CardDescription>
                          Total: {hovered.aggregate[option]}
                        </CardDescription>
                      </div>
                      <AddGroupPageDialog group={hovered} pages={data.pages} />
                    </CardHeader>
                    <CardContent className="p-2 border-t">
                      {hovered.pages.map((page) => (
                        <div
                          className="grid grid-cols-12 gap-1 items-center text-sm"
                          key={page.id}
                        >
                          <div className="col-span-1 size-2 rounded-full bg-slate-200" />
                          <div className="col-span-9">{page.name}</div>
                          <div className="col-span-2">
                            {page.metrics[option]}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              }
            />
            <div className={"absolute top-6 right-6"}>
              <SingleSelect
                selections={options}
                setValue={setOption}
                value={option}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

const options = [
  {
    label: "Likes",
    value: "page_fans",
  },
  {
    label: "Followers",
    value: "page_follows",
  },
  {
    label: "Impressions",
    value: "page_impressions",
  },
  {
    label: "Engagements",
    value: "page_post_engagements",
  },
  {
    label: "Video Views",
    value: "page_video_views",
  },
];
