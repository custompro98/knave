import { defineDb } from "astro:db";
import {
  KnaveCareers,
  KnaveItems,
  Knaves,
  MonsterPowers,
  Monsters,
  MonsterTactics,
  MonsterWeaknesses,
  Users,
} from "./tables";

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users,
    Knaves,
    KnaveCareers,
    KnaveItems,
    Monsters,
    MonsterPowers,
    MonsterTactics,
    MonsterWeaknesses,
  },
});
