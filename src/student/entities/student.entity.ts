import { Table, Column, DataType } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'students',
    // timestamps: true,
})
export class Student extends User {
    // 

    @Column({
        type: DataType.STRING,
        defaultValue: 'Student'
    })
    role: string;
}