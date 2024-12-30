import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./entities/books.entity";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookProviders } from "./book.provider";
import { Author } from "./entities/author.entity";


@Module({
    imports: [SequelizeModule.forFeature([Book, Author])],
    controllers: [BookController],
    providers: [BookService, ...BookProviders],
    exports: [BookService],
})
export class BookModule {}