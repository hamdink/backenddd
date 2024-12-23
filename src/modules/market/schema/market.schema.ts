import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Market extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: () => new Date().setHours(0, 0, 0, 0) })
  created_at: Date;

  @Prop({ required: true })
  numberMa: number;

  @Prop({ required: true })
  numberMi: number;

  @Prop({ required: true })
  numberMaInitial: number;

  @Prop({ required: true })
  numberMiInitial: number;

  @Prop({ required: true })
  codePostal: string;
  
  @Prop() 
  latitude: number;

  @Prop() 
  longitude: number;

  @Prop({required: false})
  image: string;
}

export const MarketSchema = SchemaFactory.createForClass(Market);
