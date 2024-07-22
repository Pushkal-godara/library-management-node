import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Librarian } from './entities/librarian.entity';
import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/librarian.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Librarian')
@Controller('librarian')
export class LibrarianController {
    constructor(private readonly librarianService: LibrarianService) {}

    @Get()
    async findAll(): Promise<Librarian[]> {
        const librarians = await this.librarianService.findAll();
        return librarians;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Librarian> {
        const librarian = await this.librarianService.findOne(id);
        return librarian;
    }

    @Post()
    async create(@Body() createLibrarianDto: CreateLibrarianDto): Promise<Librarian> {
        const librarian = await this.librarianService.create(createLibrarianDto);
        return librarian;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateLibrarianDto: CreateLibrarianDto): Promise<Librarian> {
        const librarian = await this.librarianService.update(id, updateLibrarianDto);
        return librarian;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.librarianService.remove(id);
    }
}
