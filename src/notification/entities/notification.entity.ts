import { Table, Column, Model, DataType, ForeignKey, IsUUID, BelongsTo } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'notifications',
    timestamps: true
})
export class Notification extends Model<Notification> {
    // Manages communication with users reminders for due dates overdue fines.

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    notification_id: string;

    @ForeignKey(() => User)
    @IsUUID(4)
    @Column({
        type: DataType.UUID
    })
    user_id: string;

    @Column({
        type: DataType.STRING
    })
    message: string;

    @Column({
        type: DataType.DATE
    })
    date_sent: Date;

    @Column({
        type: DataType.STRING  // Read or Unread!
    })
    status: string;

    @BelongsTo(() => User)
    user: User;

}