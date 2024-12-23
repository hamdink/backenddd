import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';


@Schema()
export class Admin extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
  @Prop({required: false})
  image: string;
}

const AdminSchema = SchemaFactory.createForClass(Admin);

export { AdminSchema };
