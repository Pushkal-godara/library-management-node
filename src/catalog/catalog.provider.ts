import { Catalog } from "./entities/catalog.entity";
import { CATALOG_REPO } from "src/common/constant";

export const CatalogProviders = [
    {
        provide: CATALOG_REPO,
        useValue: Catalog,
    },
] 