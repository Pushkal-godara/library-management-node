import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";


@Table({
    tableName: 'role_permission',
    timestamps: true
})

export class RolePermission extends Model {
    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @ForeignKey(() => Permission)
    @Column
    permissionId: number;
}