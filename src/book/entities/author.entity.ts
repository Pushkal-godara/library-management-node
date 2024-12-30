import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Book } from "./books.entity";

@Table({
    tableName: 'author',
    timestamps: true
})

export class Author extends Model {
        @Column({
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
            primaryKey: true
        })
        author_id: string;

        @Column({
            type: DataType.STRING,
            allowNull: false
        })
        author_name: string;

        @HasMany(() => Book)
        books: Book[];
}