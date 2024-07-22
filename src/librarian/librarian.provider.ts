import { Librarian } from "./entities/librarian.entity";
import { LIBRARIAN_REPO } from "src/common/constant";

export const LibrarianProviders = [
    {
        provide: LIBRARIAN_REPO,
        useValue: Librarian,
    },
]