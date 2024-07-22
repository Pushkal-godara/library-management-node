import { Admin } from "./entities/admin.entity";
import { ADMIN_REPO } from "src/common/constant";

export const AdminProviders = [
    {
        provide: ADMIN_REPO,
        useValue: Admin,
    },
]