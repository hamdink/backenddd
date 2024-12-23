import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from '../../client/schema/client.schema';
import { Market } from '../../market/schema/market.schema';
import { Driver } from '../../driver/schema/driver.schema';
import { Status } from '../../common/enums/status.enum';

@Schema({ timestamps: true }) // Enable timestamps to auto-manage createdAt and updatedAt
export class Livraison extends Document {
    @Prop({ unique: true })
    NumeroCommande: string;

    @Prop()
    reference: string;

    @Prop()
    part_du_magasin: string;

    @Prop()
    Observations: string;

    @Prop({ required: true })
    Date: string;

    @Prop()
    Periode: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
    client: Client;

    @Prop({
        type: [{
            productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            Dépôt: Boolean,
            Montage: Boolean,
            Install: Boolean
        }]
    })
    products: Array<{
        productId: MongooseSchema.Types.ObjectId;
        quantity: number;
        Dépôt: boolean;
        Montage: boolean;
        Install: boolean;
    }>;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Market' })
    market: Market;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Driver' })
    driver?: Driver;

    @Prop({ type: String, enum: Object.values(Status), default: Status.EN_ATTENTE })
    status: Status;

    @Prop()
    price: number;

    @Prop({ unique: true }) 
    QRCode: string;

    @Prop({ unique: true })
    shortId: string;

    @Prop({ default: Date.now }) 
    createdAt: Date;
    @Prop({ type: String, required: false })
    signature?: string;
    @Prop()
    distance: number;
}

export const LivraisonSchema = SchemaFactory.createForClass(Livraison);
