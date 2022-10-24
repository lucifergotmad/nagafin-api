import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClosePeriodeModel } from "./model/close-periode.mongo-entity";
import { closePeriodeRepositoryProvider } from "./close-periode.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(ClosePeriodeModel)],
  providers: [closePeriodeRepositoryProvider],
  exports: [closePeriodeRepositoryProvider],
})
export class ClosePeriodeRepositoryModule {}
