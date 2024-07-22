import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo } from "sequelize-typescript";
import { Loan } from "../../loan/entities/loan.entity";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'fines',
    timestamps: true
})
export class Fine extends Model<Fine> {
    // Tracks fines for overdue books.Manages the payment status of those fines.

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,        
        primaryKey: true,
    })
    fine_id: string;

    @ForeignKey(() => User)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    user_id: string;

    @ForeignKey(() => Loan)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    loan_id: string;
  
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
}