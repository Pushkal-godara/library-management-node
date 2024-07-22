import { Student } from "./entities/student.entity";
import { STUDENT_REPO } from "src/common/constant";

export const StudentProviders = [
    {
        provide: STUDENT_REPO,
        useValue: Student,
    },
]