"use client";

import PillarDeck from "./deck/PillarDeck";
import { foundationDeckConfig } from "./deck/pillarConfigs";

export default function FoundationStrategyDeck() {
  return <PillarDeck config={foundationDeckConfig} />;
}
