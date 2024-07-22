import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/student.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    async findAll(): Promise<Student[]> {
        const students = await this.studentService.findAll();
        return students;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Student> {
        const student = await this.studentService.findOne(id);
        return student;
    }

    @Post()
    async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        const student = await this.studentService.create(createStudentDto);
        return student;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateStudentDto: CreateStudentDto): Promise<Student> {
        const student = await this.studentService.update(id, updateStudentDto);
        return student;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.studentService.remove(id);
    }
}
