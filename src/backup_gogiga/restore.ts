import { existsSync, readFileSync } from "fs";
import mongoose from "mongoose";
import { MODELS } from "./models";

export const restoreGogiga = async () => {
  await mongoose.connect(process.env.GOGIGA_MONGODB!);
  if (!existsSync(__dirname + `/${process.env.BACKUP}`)) {
    return;
  }
  await Promise.all(MODELS.map((model) => model.deleteMany()));

  for (const model of MODELS) {
    try {
      const data = readFileSync(
        __dirname + `/${process.env.BACKUP}/${model.modelName}.json`
      );

      await model.insertMany(JSON.parse(data.toString()));
    } catch (error) {
      throw error;
    }
  }

  mongoose.connection.close();
};
