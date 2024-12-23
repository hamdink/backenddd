import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: () => new Date().setHours(0, 0, 0, 0) })
  created_at: Date;

  @Prop({ required: false })
  role: string;

  @Prop() 
  address?: string;

  @Prop() 
  codePostal?: string;
  
  @Prop() 
  latitude?: number;

  @Prop() 
  longitude?: number;

  @Prop()
  numberMa?: number;

  @Prop()
  numberMi?: number;

  @Prop()
  numberMaInitial?: number;

  @Prop()
  numberMiInitial?: number;

  @Prop({ required: false })
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
