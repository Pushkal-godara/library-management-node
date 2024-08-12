import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Auditlog } from "./entities/auditlog.entity";
import { AuditlogController } from "./auditlog.controller";
import { AuditlogService } from "./auditlog.service";
import { AuditlogProviders } from "./auditlog.provider";


@Module({
    imports: [SequelizeModule.forFeature([Auditlog])],
    controllers: [AuditlogController],
    providers: [AuditlogService, ...AuditlogProviders],
    exports: [AuditlogService],
})
export class AuditlogModule {}