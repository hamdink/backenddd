import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Secteur, SecteurSchema } from "./schema/secteurs.schema";
import { SecteurService } from "./services/secteurs.service";
import { SecteurController } from "./controller/secteurs.controller";
@Module({
  imports: [MongooseModule.forFeature([{ name: Secteur.name, schema: SecteurSchema }])],
  controllers: [SecteurController],
  providers: [SecteurService],
  exports: [SecteurService],
})
export class SecteurModule {}
