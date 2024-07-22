import { Auditlog } from "./entities/auditlog.entity";
import { AUDITLOG_REPO } from "src/common/constant";

export const AuditlogProviders = [
    {
        provide: AUDITLOG_REPO,
        useValue: Auditlog,
    },
]