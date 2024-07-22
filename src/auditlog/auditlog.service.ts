import { Inject, Injectable } from "@nestjs/common";
import { Auditlog } from "./entities/auditlog.entity";
import { CreateAuditlogDto } from "./dto/auditlog.dto";
import { AUDITLOG_REPO } from "src/common/constant";

@Injectable()
export class AuditlogService {
    constructor(
        @Inject(AUDITLOG_REPO)
        private auditlogRepo: typeof Auditlog,
    ) {}

    async findAll(): Promise<Auditlog[]> {
        const auditlogs = await this.auditlogRepo.findAll();
        return auditlogs;
    }

    async findOne(id: string): Promise<Auditlog> {
        const auditlog = await this.auditlogRepo.findOne({ where: { audit_log_id: id } });
        return auditlog;
    }

    async create(createAuditlogDto: CreateAuditlogDto): Promise<Auditlog> {
        const auditlog = await this.auditlogRepo.create(createAuditlogDto);
        return auditlog;
    }

    async update(id: string, updateAuditlogDto: CreateAuditlogDto): Promise<Auditlog> {
        await this.auditlogRepo.update(updateAuditlogDto, {
            where: { audit_log_id: id },
        });
        const updatedAuditlog = await this.auditlogRepo.findOne({ where: { audit_log_id: id } });
        return updatedAuditlog;
    }

    async remove(id: string): Promise<void> {
        await this.auditlogRepo.destroy({ where: { audit_log_id: id } });
    }
}