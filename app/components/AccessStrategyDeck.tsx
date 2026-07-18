"use client";

import PillarDeck from "./deck/PillarDeck";
import { accessDeckConfig } from "./deck/pillarConfigs";

export default function AccessStrategyDeck() {
  return <PillarDeck config={accessDeckConfig} />;
}
