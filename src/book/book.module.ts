import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./entities/books.entity";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookProviders } from "./book.provider";


@Module({
    imports: [SequelizeModule.forFeature([Book])],
    controllers: [BookController],
    providers: [BookService, ...BookProviders],
    exports: [BookService],
})
export class BookModule {}