import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Fine } from "./entities/fine.entity";
import { FineController } from "./fine.controller";
import { FineService } from "./fine.service";
import { FineProviders } from "./fine.provider";


@Module({
    imports: [SequelizeModule.forFeature([Fine])],
    controllers: [FineController],
    providers: [FineService, ...FineProviders]
})
export class FineModule {}