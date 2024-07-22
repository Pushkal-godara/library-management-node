import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo } from "sequelize-typescript";
import { Book } from "src/book/entities/books.entity";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'feedback',
    timestamps: true
})
export class Feedback extends Model<Feedback> {

    // Allow users to leave feedback & rating for books they have read.Helps other users also.

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,        
        primaryKey: true,
    })
    feedback_id: string;

    @ForeignKey(() => User)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    user_id: string;

    @ForeignKey(() => Book)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    book_id: string;

    @Column({
        type: DataType.STRING
    })
    comment: string;

    @Column({
        type: DataType.STRING
    })
    rating: string;

    @Column({
        type: DataType.STRING
    })
    data_submitted: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Book)
    book: Book;
}