import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Role } from "src/auth/entities/role.entity";

@Table({
    tableName: 'users',
    timestamps: true
})
export class User extends Model<User> {

    // Users can perform various actions depending on their role(Librarian/Admin)

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    user_id: string;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING
    })
    password: string;

    @ForeignKey(() => Role)
    @Column
    role_id: number;

    @Column({
        type: DataType.STRING
    })
    contact_info: string;

    @BelongsTo(() => Role)
    role: Role;   
}