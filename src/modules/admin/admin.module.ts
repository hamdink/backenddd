// src/modules/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminService } from './services/admin.service';
import { AdminController } from './controller/admin.controller';
import { Admin, AdminSchema } from './schema/admin.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    AuthModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {
  constructor(private configService: ConfigService) {
    console.log('JWT_SECRET:', this.configService.get<string>('JWT_SECRET'));
  }
}
