import { configDotenv } from "dotenv";
import nodeCron from "node-cron";
import { backupGogiga } from "./backup_gogiga/backup";

configDotenv();

const cronEveryday2AM = "0 2 * * *";

(async () => {
  backupGogiga();
  nodeCron.schedule(cronEveryday2AM, () => {
    backupGogiga();
  });
})();
