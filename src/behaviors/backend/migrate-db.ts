import fs from "fs";

import getPgClient from "./get-pg-client";
import { MigrationType } from "../../types";

const migrateDb = async () => {
  // scan `migrations` folder
  const sqlScripts = fs.readdirSync("sql");
  const pgClient = getPgClient();
  pgClient.connect();
  // run each migration in ascending order
  for (let i = 0; i < fs.readdirSync("sql").length; i++) {
    if (sqlScripts[i].endsWith(".sql")) {
      await new MigrationType(sqlScripts[i], pgClient).up();
    }
  }
  pgClient.end();
};

export default migrateDb;
