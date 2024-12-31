import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Author } from "./author.entity";

@Table({
    tableName: 'books',
    timestamps: true
})
export class Book extends Model<Book> {

    // Contain book details
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    book_id: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    title: string;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER
    })
    author_id: number;

    @Column({
        type: DataType.TEXT
    })
    image_url: string;

    @Column({
        type: DataType.TEXT
    })
    description: string;

    @Column({
        type: DataType.INTEGER
    })
    publication_year: number;

    @BelongsTo(() => Author)
    author: Author;
}