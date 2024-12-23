import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansService } from './services/plans.service';
import { PlansController } from './controller/plans.controller';
import { Plan, PlanSchema } from './schema/plans.schema';
import { Market, MarketSchema } from '../market/schema/market.schema';
import { Secteur, SecteurSchema } from '../secture/schema/secteurs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: Market.name, schema: MarketSchema },
      { name: Secteur.name, schema: SecteurSchema },
    ]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}