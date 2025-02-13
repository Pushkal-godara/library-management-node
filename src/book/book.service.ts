import { Inject, Injectable } from "@nestjs/common";
import { Book } from "./entities/books.entity";
import { CreateBookDto } from "./dto/book.dto";
import { BOOK_REPO } from "src/common/constant";
import { Op } from "sequelize";
import { Author } from "./entities/author.entity";

@Injectable()
export class BookService {
    constructor(
        @Inject(BOOK_REPO)
        private booksRepo: typeof Book,
    ) { }

    // Method to search books
    async searchByBook(bookName: string) {
        // Find all books where title matches (case insensitive)
        return await this.booksRepo.findAll({
            where: {
                title: {
                    [Op.like]: `%${bookName}%`,
                }
            },
            include: [{  // Include author details with each book
                model: Author,
                attributes: ['author_id', 'author_name']
            }]
        });
    }

    // Method to search by author
    async searchByAuthor(authorName: string) {
        // Find all books where author name matches
        return await this.booksRepo.findAll({
            include: [{
                model: Author,
                where: {
                    author_name: {
                        [Op.like]: `%${authorName}%`,
                    }
                },
                attributes: ['author_id', 'author_name']
            }]
        });
    }

    async findAll(page: number, limit: number): Promise<PaginatedResponse<Book>> {
        const offset = (page - 1) * limit;
        
        // For Sequelize, we use findAndCountAll to get both data and total count
        const { count, rows: books } = await this.booksRepo.findAndCountAll({
          offset: offset,
          limit: limit,
          order: [['createdAt', 'DESC']], 
        });
      
        const totalPages = Math.ceil(count / limit);
      
        return {
          data: books,
          meta: {
            total: count,
            page,
            limit,
            totalPages
          }
        };
      }

    // async findOne(id: string): Promise<Book> {
    //     const book = await this.booksRepo.findOne({ where: { book_id: id } });
    //     return book;
    // }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = await this.booksRepo.create(createBookDto);
        return book;
    }

    // async update(id: string, updateBookDto: CreateBookDto): Promise<Book> {
    //     await this.booksRepo.update(updateBookDto, {
    //         where: { book_id: id },
    //     });
    //     const updatedBook = await this.booksRepo.findOne({ where: { book_id: id } });
    //     return updatedBook;
    // }

    // async remove(id: string): Promise<void> {
    //     await this.booksRepo.destroy({ where: { book_id: id } });
    // }
}