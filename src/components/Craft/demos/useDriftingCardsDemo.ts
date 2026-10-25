import { SETS_PER_COLUMN, heroColumnAnimation, heroSets } from "@/lib/craft/driftingCards";
import data from "./driftingCards.json";

const SETS = heroSets(SETS_PER_COLUMN);

const COLUMNS = data.columns.map((creators, index) => ({
  key: String(index),
  creators,
  animation: heroColumnAnimation(index),
}));

export const useDriftingCardsDemo = () => ({ columns: COLUMNS, sets: SETS });
