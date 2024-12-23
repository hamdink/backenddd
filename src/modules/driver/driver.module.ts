import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Driver, DriverSchema } from './schema/driver.schema';
import { DriverService } from './services/driver.service';
import { DriverController } from './controller/driver.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  AuthModule,

],
  providers: [DriverService],
  controllers: [DriverController],
  exports: [DriverService],

})
export class DriverModule {}
