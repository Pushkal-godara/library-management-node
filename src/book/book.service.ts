import { Inject, Injectable } from "@nestjs/common";
import { Book } from "./entities/books.entity";
import { CreateBookDto } from "./dto/book.dto";
import { BOOK_REPO } from "src/common/constant";

@Injectable()
export class BookService {
    constructor(
        @Inject(BOOK_REPO)
        private booksRepo: typeof Book,
    ) {}

    async findAll(): Promise<Book[]> {
        const books = await this.booksRepo.findAll();
        return books;
    }

    async findOne(id: string): Promise<Book> {
        const book = await this.booksRepo.findOne({ where: { book_id: id } });
        return book;
    }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = await this.booksRepo.create(createBookDto);
        return book;
    }

    async update(id: string, updateBookDto: CreateBookDto): Promise<Book> {
        await this.booksRepo.update(updateBookDto, {
            where: { book_id: id },
        });
        const updatedBook = await this.booksRepo.findOne({ where: { book_id: id } });
        return updatedBook;
    }

    async remove(id: string): Promise<void> {
        await this.booksRepo.destroy({ where: { book_id: id } });
    }
}