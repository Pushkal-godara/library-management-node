import { Table, Column, Model, DataType, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'users',
    timestamps: true
})
export class User extends Model<User> {

    // Users can perform various actions depending on their role(Member/Librarian/Admin)

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

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    role: string;

    @Column({
        type: DataType.STRING
    })
    contact_info: string;
}