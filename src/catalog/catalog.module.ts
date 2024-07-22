import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Catalog } from "./entities/catalog.entity";
import { CatalogController } from "./catalog.controller";
import { CatalogService } from "./catalog.service";
import { CatalogProviders } from "./catalog.provider";


@Module({
    imports: [SequelizeModule.forFeature([Catalog])],
    controllers: [CatalogController],
    providers: [CatalogService, ...CatalogProviders]
})
export class CatalogModule {}