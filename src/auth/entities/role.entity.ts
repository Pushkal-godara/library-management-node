import { Table, Column, Model, DataType, AllowNull, BelongsToMany, HasMany } from "sequelize-typescript";

import { User } from "src/user/entities/user.entity";
import { Permission } from "./permission.entity";
import { RolePermission } from "./role-permission.entity";

@Table({
    tableName: 'role',
    timestamps: true
})

export class Role extends Model {
    @Column
    name: string;

    @Column
    description: string;

    @HasMany(() => User)
    users: User[];

    @BelongsToMany(() => Permission, () => RolePermission)
    permissions: Permission[];
}