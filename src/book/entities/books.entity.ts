import { Table, Column, Model, DataType, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'books',
    timestamps: true
})
export class Book extends Model<Book> {

    // Contain book details
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    book_id: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    title: string;

    @Column({
        type: DataType.STRING
    })
    author: string;

    @Column({
        type: DataType.INTEGER
    })
    publiction_year: number;
}