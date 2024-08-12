import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./entities/admin.entity";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminProviders } from "./admin.provider";


@Module({
    imports: [SequelizeModule.forFeature([Admin])],
    controllers: [AdminController],
    providers: [AdminService, ...AdminProviders],
    exports: [AdminService],
})
export class AdminModule {}