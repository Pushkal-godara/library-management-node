import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'auditlog',
    timestamps: true
})
export class Auditlog extends Model<Auditlog> {

    //  Records all significant actions performed in the system for security & accountability.

    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    audit_log_id: string;

    @ForeignKey(() => User)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    user_id: string;

    @Column({
        type: DataType.STRING
    })
    action: string;

    @Column({
        type: DataType.STRING
    })
    description: string;

    @BelongsTo(() => User)
    user: User;

}