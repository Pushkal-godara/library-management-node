import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Fine } from './entities/fine.entity';
import { FineService } from './fine.service';
import { CreateFineDto } from './dto/fine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fine')
@Controller('fine')
export class FineController {
    constructor(private readonly fineService: FineService) {}

    @Get()
    async findAll(): Promise<Fine[]> {
        const fines = await this.fineService.findAll();
        return fines;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Fine> {
        const fine = await this.fineService.findOne(id);
        return fine;
    }

    @Post()
    async create(@Body() createFineDto: CreateFineDto): Promise<Fine> {
        const fine = await this.fineService.create(createFineDto);
        return fine;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateFineDto: CreateFineDto): Promise<Fine> {
        const fine = await this.fineService.update(id, updateFineDto);
        return fine;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.fineService.remove(id);
    }
}
