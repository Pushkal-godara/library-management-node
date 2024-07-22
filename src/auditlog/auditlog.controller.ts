import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Auditlog } from './entities/auditlog.entity';
import { AuditlogService } from './auditlog.service';
import { CreateAuditlogDto } from "./dto/auditlog.dto";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auditlog')
@Controller('auditlog')
export class AuditlogController {
    constructor(private readonly auditlogService: AuditlogService) {}

    @Get()
    async findAll(): Promise<Auditlog[]> {
        const auditlogs = await this.auditlogService.findAll();
        return auditlogs;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Auditlog> {
        const auditlog = await this.auditlogService.findOne(id);
        return auditlog;
    }

    @Post()
    async create(@Body() createAuditlogDto: CreateAuditlogDto): Promise<Auditlog> {
        const auditlog = await this.auditlogService.create(createAuditlogDto);
        return auditlog;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAuditlogDto: CreateAuditlogDto): Promise<Auditlog> {
        const auditlog = await this.auditlogService.update(id, updateAuditlogDto);
        return auditlog;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.auditlogService.remove(id);
    }
}
