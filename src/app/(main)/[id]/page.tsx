import Configuration from "./components/Configuration";
import Metrics from "./components/Metrics";
import TimeSeries from "./components/TimeSeries";

export default function PageById() {
  return (
    <div className="p-4 space-y-4">
      <Configuration />

      <Metrics />

      <TimeSeries />

      {/* <Demographic /> */}
    </div>
  );
}
