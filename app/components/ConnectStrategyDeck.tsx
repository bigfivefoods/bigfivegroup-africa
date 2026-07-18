"use client";

import PillarDeck from "./deck/PillarDeck";
import { connectDeckConfig } from "./deck/pillarConfigs";

export default function ConnectStrategyDeck() {
  return <PillarDeck config={connectDeckConfig} />;
}
