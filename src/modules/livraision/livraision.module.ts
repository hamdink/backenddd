import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LivraisonService } from './services/livraision.service';
import { LivraisonController } from './controller/livraison.controller';
import { Livraison, LivraisonSchema } from './schema/livraision.schema';
import { Client, ClientSchema } from '../client/schema/client.schema';
import { Product, ProductSchema } from '../product/schema/product.schema';
import { Market, MarketSchema } from '../market/schema/market.schema';
import { Driver, DriverSchema } from '../driver/schema/driver.schema';
import { LivraisonGateway } from './livraison.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Livraison.name, schema: LivraisonSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Product.name, schema: ProductSchema },
      {name:Market.name,schema:MarketSchema},
      {name:Driver.name,schema:DriverSchema}
    ]),
  ],
  controllers: [LivraisonController],
  providers: [LivraisonService,LivraisonGateway],
})
export class LivraisonModule {}
