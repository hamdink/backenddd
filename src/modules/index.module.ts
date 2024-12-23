// src/index.module.ts
import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';
import { AdminModule } from './admin/admin.module';
import { DriverModule } from './driver/driver.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { SecteurModule } from './secture/secteurs.module';
import { LivraisonModule } from './livraision/livraision.module';
import { PlansModule } from './plans/plans.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
import { RolesGuard } from './common/guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { GeoModule } from './geocoding/geomodule';
import { UsersModule } from './Accounts/User.module';

@Module({
  imports: [
    MarketModule,
    AdminModule,
    DriverModule,
    ProductModule,
    ClientModule,
    SecteurModule,
    LivraisonModule,
    PlansModule,
    AuthModule,
    GeoModule,
    UsersModule,
    
  ],
  controllers: [],
  providers: [
 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class IndexModule {}
