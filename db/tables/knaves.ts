import { column, defineTable, sql } from "astro:db";
import { Users } from "./users";

export const Knaves = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    userUuid: column.text({ references: () => Users.columns.uuid }),
    name: column.text(),
    level: column.number({ default: 1 }),
    xp: column.number({ default: 0 }),
    curHp: column.number(),
    maxHp: column.number(),
    str: column.number(),
    dex: column.number(),
    con: column.number(),
    int: column.number(),
    wis: column.number(),
    cha: column.number(),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});

export const KnaveCareers = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    knaveUuid: column.text({ references: () => Knaves.columns.uuid }),
    name: column.text(),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});

export const KnaveItems = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    knaveUuid: column.text({ references: () => Knaves.columns.uuid }),
    slotsUsed: column.number({ default: 1 }),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});
