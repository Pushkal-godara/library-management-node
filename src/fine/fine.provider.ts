import { Fine } from "./entities/fine.entity";
import { FINE_REPO } from "src/common/constant";

export const FineProviders = [
    {
        provide: FINE_REPO,
        useValue: Fine,
    },
]