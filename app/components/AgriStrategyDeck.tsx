"use client";

import PillarDeck from "./deck/PillarDeck";
import { agriDeckConfig } from "./deck/pillarConfigs";

export default function AgriStrategyDeck() {
  return <PillarDeck config={agriDeckConfig} />;
}
