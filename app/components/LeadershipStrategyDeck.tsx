"use client";

import PillarDeck from "./deck/PillarDeck";
import { leadershipDeckConfig } from "./deck/pillarConfigs";

export default function LeadershipStrategyDeck() {
  return <PillarDeck config={leadershipDeckConfig} />;
}
