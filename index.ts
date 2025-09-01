import { sql } from "kysely";
import { db } from "./database";
import * as PersonRepository from "./PersonRepository";

async function main() {
  await db.schema
    .createTable("person")
    .addColumn("id", "integer", (cb) =>
      cb.primaryKey().autoIncrement().notNull()
    )
    .addColumn("first_name", "varchar(255)", (cb) => cb.notNull())
    .addColumn("last_name", "varchar(255)")
    .addColumn("gender", "varchar(50)", (cb) => cb.notNull())
    .addColumn("created_at", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`current_timestamp`)
    )
    .execute();
  //@ts-ignore
  await PersonRepository.createPerson({
    first_name: "Tanaka",
    last_name: "Tarou",
    gender: "man",
  });
  const getAll = await db.selectFrom("person").selectAll().execute();
  console.log("getAll result:", getAll);
  const findOne = await db
    .selectFrom("person")
    .selectAll()
    .where("first_name", "=", "Tanaka")
    .execute();
  console.log("findOne result:", findOne);
}

main();
