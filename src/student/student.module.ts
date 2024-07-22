import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Student } from "./entities/student.entity";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { StudentProviders } from "./student.provider";

@Module({
    imports: [SequelizeModule.forFeature([Student])],
    controllers: [StudentController],
    providers: [StudentService, ...StudentProviders],
})
export class StudentModule {}