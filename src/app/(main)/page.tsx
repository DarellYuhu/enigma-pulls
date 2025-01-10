"use client";
import Configuration from "./components/Configuration";
import Demographic from "./components/Demographic";
import Metrics from "./components/Metrics";
import PageTable from "./components/PageTable";
import TimeSeries from "./components/TimeSeries";

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <Configuration />

      <Metrics />

      <PageTable />

      <TimeSeries />

      <Demographic />
    </div>
  );
}
