import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Catalog } from './entities/catalog.entity';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/catalog.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Catlog')
@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Get()
    async findAll(): Promise<Catalog[]> {
        const catalogs = await this.catalogService.findAll();
        return catalogs;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Catalog> {
        const catalog = await this.catalogService.findOne(id);
        return catalog;
    }

    @Post()
    async create(@Body() createCatalogDto: CreateCatalogDto): Promise<Catalog> {
        const catalog = await this.catalogService.create(createCatalogDto);
        return catalog;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCatalogDto: CreateCatalogDto): Promise<Catalog> {
        const catalog = await this.catalogService.update(id, updateCatalogDto);
        return catalog;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.catalogService.remove(id);
    }
}
