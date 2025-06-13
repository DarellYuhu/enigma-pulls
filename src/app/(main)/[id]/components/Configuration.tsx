"use client";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { usePage } from "@/hooks/feature/use-page";
import { usePageConfigStore } from "@/stores/page-config-store";
import { ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Configuration() {
  const route = useRouter();
  const { refetch, data } = usePage();
  const { from, to, setFrom, setTo } = usePageConfigStore();
  return (
    <div className="grid grid-cols-2 items-center">
      <h2 className="text-lg font-bold">Page: {data?.name}</h2>
      <div className="flex flex-row justify-end gap-3">
        <DateRangePicker
          date={{ from, to }}
          setDate={(date) => {
            setFrom(date?.from);
            setTo(date?.to);
          }}
        />
        <Button disabled={!from || !to} onClick={() => refetch()}>
          Apply
        </Button>
        <Button onClick={() => signOut()} variant={"destructive"}>
          Logout
        </Button>
        <Button onClick={() => route.back()}>
          <ArrowLeft /> Back
        </Button>
      </div>
    </div>
  );
}
