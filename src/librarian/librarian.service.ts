import { Inject, Injectable } from "@nestjs/common";
import { Librarian } from "./entities/librarian.entity";
import { CreateLibrarianDto } from "./dto/librarian.dto";
import { LIBRARIAN_REPO } from "src/common/constant";

@Injectable()
export class LibrarianService {
    constructor(
        @Inject(LIBRARIAN_REPO)
        private librarianRepo: typeof Librarian,
    ) {}

    async findAll(): Promise<Librarian[]> {
        const librarians = await this.librarianRepo.findAll();
        return librarians;
    }

    async findOne(id: string): Promise<Librarian> {
        const librarian = await this.librarianRepo.findOne({ where: { user_id: id } });
        return librarian;
    }

    async create(createLibrarianDto: CreateLibrarianDto): Promise<Librarian> {
        const librarian = await this.librarianRepo.create(createLibrarianDto);
        return librarian;
    }

    async update(id: string, updateLibrarianDto: CreateLibrarianDto): Promise<Librarian> {
        await this.librarianRepo.update(updateLibrarianDto, {
            where: { user_id: id },
        });
        const updatedLibrarian = await this.librarianRepo.findOne({ where: { user_id: id } });
        return updatedLibrarian;
    }

    async remove(id: string): Promise<void> {
        await this.librarianRepo.destroy({ where: { user_id: id } });
    }
}