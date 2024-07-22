import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo } from "sequelize-typescript";
import { Book } from "src/book/entities/books.entity";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'reservations',
    timestamps: true
})
export class Reservation extends Model<Reservation> {
    // Allow users to reserve books that are currently checked out by others.Track reservations & notifies users when a book is available

    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    reservation_id: string;


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
    reservation_date: Date;


    @Column({
        type: DataType.STRING  // active or cancelled or fulfilled
    })
    status: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Book)
    book: Book;
}