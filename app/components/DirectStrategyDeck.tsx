"use client";

import PillarDeck from "./deck/PillarDeck";
import { directDeckConfig } from "./deck/pillarConfigs";

export default function DirectStrategyDeck() {
  return <PillarDeck config={directDeckConfig} />;
}
