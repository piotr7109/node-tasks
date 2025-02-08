import archiver from "archiver";
import { createWriteStream, mkdirSync, rmSync, writeFileSync } from "fs";
import mongoose from "mongoose";
import { MODELS } from "./models";

const zipFiles = async (backupDir: string) => {
  const output = createWriteStream(backupDir + ".zip");
  output.on("close", function () {
    rmSync(backupDir, { recursive: true, force: true });
  });

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  archive.pipe(output);
  archive.directory(backupDir + "/", false);
  archive.finalize();
};

export const backupGogiga = async () => {
  await mongoose.connect(process.env.GOGIGA_MONGODB!);

  const backupName = `backup_${new Date().getTime()}`;

  const dir = process.env.GOGIGA_BACKUP_DIR + backupName;

  mkdirSync(dir);

  for (const model of MODELS) {
    const data =
      model.modelName === "User"
        ? //@ts-ignore
          await model.find().select("+password").exec()
        : await model.find();

    const fileName = `${dir}/${model.modelName}.json`;

    writeFileSync(fileName, JSON.stringify(data));
  }

  zipFiles(dir);

  mongoose.connection.close();
};
