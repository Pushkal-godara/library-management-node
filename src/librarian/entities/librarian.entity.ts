import { Table, Column, DataType } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'librarian',
    // timestamps: true,
})
export class Librarian extends User {

    // Manage operation of library, adding new books/updating book info processing loans & return.

    @Column({
        type: DataType.STRING,
        defaultValue: 'Librarian'
    })
    role: string;
}