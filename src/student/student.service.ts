import { Inject, Injectable } from "@nestjs/common";
import { Student } from "./entities/student.entity";
import { CreateStudentDto } from "./dto/student.dto";
import { STUDENT_REPO } from "src/common/constant";

@Injectable()
export class StudentService {
    constructor(
        @Inject(STUDENT_REPO)
        private studentRepo: typeof Student,
    ) {}

    async findAll(): Promise<Student[]> {
        const students = await this.studentRepo.findAll();
        return students;
    }

    async findOne(id: string): Promise<Student> {
        const students = await this.studentRepo.findOne({ where: { user_id: id } });
        return students;
    }

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const student = await this.studentRepo.create(createStudentDto);
        return student;
    }

    async update(id: string, updateStudentDto: CreateStudentDto): Promise<Student> {
        await this.studentRepo.update(updateStudentDto, {
            where: { user_id: id },
        });
        const updatedStudent = await this.studentRepo.findOne({ where: { user_id: id } });
        return updatedStudent;
    }

    async remove(id: string): Promise<void> {
        await this.studentRepo.destroy({ where: { user_id: id } });
    }
}