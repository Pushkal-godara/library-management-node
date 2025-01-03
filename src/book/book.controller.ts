import { Controller, Get, Put, Post, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/book.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    // Endpoint to search books by title
    @Get('search/book')
    async searchByBook(@Query('name') bookName: string) {
        try {
            const books = await this.bookService.searchByBook(bookName);
            return {
                success: true,
                data: books
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Endpoint to search books by author
    @Get('search/author')
    async searchByAuthor(@Query('name') authorName: string) {
        try {
            const books = await this.bookService.searchByAuthor(authorName);
            return {
                success: true,
                data: books
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    @Get()
    async findAll(): Promise<Book[]> {
        const books = await this.bookService.findAll();
        return books;
    }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<Book> {
    //     const book = await this.bookService.findOne(id);
    //     return book;
    // }

    // @Post()
    // async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    //     const book = await this.bookService.create(createBookDto);
    //     return book;
    // }

    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto): Promise<Book> {
    //     const book = await this.bookService.update(id, updateBookDto);
    //     return book;
    // }

    // @Delete(':id')
    // async remove(@Param('id') id: string): Promise<void> {
    //     await this.bookService.remove(id);
    // }
}
