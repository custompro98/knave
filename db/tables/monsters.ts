import { column, defineTable, sql } from "astro:db";
import { Users } from "./users";

export const Monsters = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    userUuid: column.text({ references: () => Users.columns.uuid }),
    name: column.text(),
    level: column.number({ default: 1 }),
    curHp: column.number(),
    maxHp: column.number(),
    scent: column.text(),
    texture: column.text(),
    morale: column.number(),
    numAttacks: column.number(),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});

export const MonsterPowers = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    monsterUuid: column.text({ references: () => Monsters.columns.uuid }),
    name: column.text(),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});

export const MonsterTactics = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    monsterUuid: column.text({ references: () => Monsters.columns.uuid }),
    name: column.text(),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});

export const MonsterWeaknesses = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    monsterUuid: column.text({ references: () => Monsters.columns.uuid }),
    name: column.text(),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});
