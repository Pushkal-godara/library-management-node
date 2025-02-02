import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo, AllowNull } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
import { Book } from "src/book/entities/books.entity";

@Table({
    tableName: 'loan',
    timestamps: true
})
export class Loan extends Model<Loan> {

    // Tracks which user has borrowed which book & relevant dates.

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,        
        primaryKey: true,
    })
    loan_id: number;

    @ForeignKey(() => User)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    user_id: string;

    @ForeignKey(() => Book)
    @Column({
        type: DataType.INTEGER
    })
    book_id: number;

    @Column({
        type: DataType.DATE
    })
    return_date: Date;

    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    due_date: Date;

    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    issue_date: Date;

    @AllowNull(false)
    @Column({
        type: DataType.STRING  // (borrowed or returned or overdue)
    })
    status: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Book)
    book: Book;

}