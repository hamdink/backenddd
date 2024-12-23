import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Product {
    @Prop({ required: true })
    name: string;
    @Prop({ required: false })
    description?: string;
    @Prop({ required: true })
    price: number;
   /* @Prop({ required: true })
    stock: number;*/
    @Prop({ required: false })
    image?: string;

}
export const ProductSchema = SchemaFactory.createForClass(Product);
