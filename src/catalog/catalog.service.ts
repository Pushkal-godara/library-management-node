import { Inject, Injectable } from "@nestjs/common";
import { Catalog } from "./entities/catalog.entity";
import { CreateCatalogDto } from "./dto/catalog.dto";
import { CATALOG_REPO } from "src/common/constant";

@Injectable()
export class CatalogService {
    constructor(
        @Inject(CATALOG_REPO)
        private catalogsRepo: typeof Catalog,
    ) {}

    async findAll(): Promise<Catalog[]> {
        const catalogs = await this.catalogsRepo.findAll();
        return catalogs;
    }

    async findOne(id: string): Promise<Catalog> {
        const catalog = await this.catalogsRepo.findOne({ where: { catalog_id: id } });
        return catalog;
    }

    async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
        const catalog = await this.catalogsRepo.create(createCatalogDto);
        return catalog;
    }

    async update(id: string, updateCatalogDto: CreateCatalogDto): Promise<Catalog> {
        await this.catalogsRepo.update(updateCatalogDto, {
            where: { catalog_id: id },
        });
        const updatedCatalog = await this.catalogsRepo.findOne({ where: { catalog_id: id } });
        return updatedCatalog;
    }

    async remove(id: string): Promise<void> {
        await this.catalogsRepo.destroy({ where: { catalog_id: id } });
    }
}