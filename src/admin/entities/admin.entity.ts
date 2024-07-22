import { Table, Column, DataType } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'admin',
    // timestamps: true,
})
export class Admin extends User {
    // Manages system setting, user roles & maintain system.

    @Column({
        type: DataType.STRING,
        defaultValue: 'Admin'
    })
    role: string;
}