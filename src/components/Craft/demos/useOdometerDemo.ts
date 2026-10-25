import { useState } from "react";
import { nextIndex, odometerTickers, tickerDelay } from "@/lib/craft/odometer";
import odometer from "./odometer.json";

export const useOdometerDemo = () => {
  const [run, setRun] = useState({ id: 0, setIndex: 0 });

  const next = () =>
    setRun((current) => ({
      id: current.id + 1,
      setIndex: nextIndex(current.setIndex, odometer.sets.length),
    }));

  return {
    runId: run.id,
    balanceLabel: odometer.balanceLabel,
    tickers: odometerTickers(odometer.sets[run.setIndex], odometer.currency),
    delay: tickerDelay(run.id > 0),
    next,
  };
};
