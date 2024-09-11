import { column, defineTable, sql } from "astro:db";

export const Users = defineTable({
  columns: {
    uuid: column.text({ primaryKey: true, default: sql`uuid()` }),
    email: column.text({ unique: true }),
    verified: column.boolean({ default: false }),

    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    deletedAt: column.date({ optional: true }),
  },
});
