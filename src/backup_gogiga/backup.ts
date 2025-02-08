import { mkdirSync, writeFileSync } from "fs";
import mongoose from "mongoose";
import { MODELS } from "./models";

export const backupGogiga = async () => {
  await mongoose.connect(process.env.GOGIGA_MONGODB!);

  const backupName = `backup_${new Date().getTime()}`;

  const dir = __dirname + "/../../backups_gogiga/" + backupName;

  mkdirSync(dir);
  for (const model of MODELS) {
    const data =
      model.modelName === "User"
        ? //@ts-ignore
          await model.find().select("+password").exec()
        : await model.find();
    writeFileSync(`${dir}/${model.modelName}.json`, JSON.stringify(data));
  }

  mongoose.connection.close();
};
