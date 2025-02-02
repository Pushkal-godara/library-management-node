import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo, HasMany } from "sequelize-typescript";
import { Loan } from "../../loan/entities/loan.entity";
import { User } from "src/user/entities/user.entity";
import { FineHistory } from "./fines_history.entity";

@Table({
    tableName: 'fines',
    timestamps: true
})
export class Fine extends Model<Fine> {
    // Tracks fines for overdue books.Manages the payment status of those fines.

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    fine_id: number;

    @ForeignKey(() => User)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    user_id: string;

    @ForeignKey(() => Loan)
    @Column({
        type: DataType.INTEGER
    })
    loan_id: number;
  
    @Column({
        type: DataType.INTEGER
    })
    amount: number;

    @Column({
        type: DataType.STRING
    })
    payment_status: string;

    @Column({
        type: DataType.DATE
    })
    issue_date: Date;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Loan)
    loan: Loan;

    @HasMany(() => FineHistory)
    post: FineHistory[];
}