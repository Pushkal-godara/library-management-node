import { Table, Column, Model, BelongsToMany } from "sequelize-typescript";

import { Role } from "./role.entity";
import { RolePermission } from "./role-permission.entity";

@Table({
    tableName: 'permissions',
    timestamps: true,
})

export class Permission extends Model {
    @Column
    action: string;    // e.g., 'create', 'read', 'update', 'delete'

    @Column
    resource: string;    // e.g., 'books', 'users', 'loans'

    @BelongsToMany(() => Role, () => RolePermission)
    roles: Role[];
}