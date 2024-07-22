import { Book } from "./entities/books.entity";
import { BOOK_REPO } from "src/common/constant";

export const BookProviders = [
    {
        provide: BOOK_REPO,
        useValue: Book,
    },
]