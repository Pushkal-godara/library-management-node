import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo } from "sequelize-typescript";
import { Fine } from "./fine.entity";

@Table({
    tableName: 'fines_history',
    timestamps: true
})
export class FineHistory extends Model {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,        
        primaryKey: true,
    })
    fine_history_id : number;

    @ForeignKey(() => Fine)
    @Column({
        type: DataType.INTEGER
    })
    fine_id: number;
  
    @Column({
        type: DataType.FLOAT
    })
    amount_paid: number;

    @Column({
        type: DataType.DATE
    })
    payment_date: Date

    @Column({
        type: DataType.STRING
    })
    payment_method : string;

    @Column({
        type: DataType.STRING
    })
    transaction_reference: string;

    @BelongsTo(() => Fine)
    fine: Fine;
}