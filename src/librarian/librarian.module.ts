import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Librarian } from "./entities/librarian.entity";
import { LibrarianController } from "./librarian.controller";
import { LibrarianService } from "./librarian.service";
import { LibrarianProviders } from "./librarian.provider";

@Module({
    imports: [SequelizeModule.forFeature([Librarian])],
    controllers: [LibrarianController],
    providers: [LibrarianService, ...LibrarianProviders],
    exports: [LibrarianService],
})
export class LibrarianModule {}