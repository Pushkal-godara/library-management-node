import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
import { Book } from "src/book/entities/books.entity";

@Table({
    tableName: 'loan',
    timestamps: true
})
export class Loan extends Model<Loan> {

    // Tracks which user has borrowed which book & relevant dates.

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    loan_id: string;

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
        type: DataType.DATE
    })
    return_date: Date;

    @Column({
        type: DataType.DATE
    })
    due_date: Date;

    @Column({
        type: DataType.DATE
    })
    issue_date: Date;

    @Column({
        type: DataType.STRING  // (borrowed or returned or overdue)
    })
    status: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Book)
    book: Book;

}