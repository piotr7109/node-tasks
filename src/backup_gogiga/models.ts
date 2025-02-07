import { model, Schema } from "mongoose";

const BandModel = model("Band", new Schema());
const GigModel = model("Gig", new Schema());
const UserModel = model("User", new Schema());
const MetadataModel = model("Metadata", new Schema());
const MagicLinkModel = model("Magiclink", new Schema());

export const MODELS: Array<{
  modelName: string;
  deleteMany: () => Promise<any>;
  insertMany: (data: any) => Promise<any>;
  find: () => Promise<any>;
}> = [BandModel, GigModel, MagicLinkModel, MetadataModel, UserModel];
