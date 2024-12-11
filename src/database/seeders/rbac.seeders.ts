import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../../auth/entities/role.entity';
import { Permission } from '../../auth/entities/permission.entity';
import { RolePermission } from '../../auth/entities/role-permission.entity';

@Injectable()
export class RbacSeeder {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
    @InjectModel(RolePermission)
    private rolePermissionModel: typeof RolePermission,
  ) {}

  async seed() {
    // 1. Create Roles
    const roles = await this.roleModel.bulkCreate([
      { name: 'admin', description: 'System Administrator' },
      { name: 'librarian', description: 'Library Staff' },
      { name: 'student', description: 'Student User' }
    ]);

    // 2. Create Permissions
    const permissions = await this.permissionModel.bulkCreate([
      // Book permissions
      { action: 'create', resource: 'books' },
      { action: 'read', resource: 'books' },
      { action: 'update', resource: 'books' },
      { action: 'delete', resource: 'books' },
      // User permissions
      { action: 'create', resource: 'users' },
      { action: 'read', resource: 'users' },
      { action: 'update', resource: 'users' },
      { action: 'delete', resource: 'users' },
      // Loan permissions
      { action: 'create', resource: 'loans' },
      { action: 'read', resource: 'loans' },
      { action: 'update', resource: 'loans' },
      { action: 'delete', resource: 'loans' }
    ]);

    // 3. Assign Permissions to Roles
    const [adminRole, librarianRole, studentRole] = roles;
    const permissionMap = permissions.reduce((map, permission) => {
      map[`${permission.action}:${permission.resource}`] = permission.id;
      return map;
    }, {});

    // Admin gets all permissions
    await Promise.all(
      permissions.map(permission =>
        this.rolePermissionModel.create({
          roleId: adminRole.id,
          permissionId: permission.id
        })
      )
    );

    // Librarian permissions
    const librarianPermissions = [
      'create:books', 'read:books', 'update:books',
      'read:users', 'create:loans', 'read:loans', 'update:loans'
    ];
    await Promise.all(
      librarianPermissions.map(perm =>
        this.rolePermissionModel.create({
          roleId: librarianRole.id,
          permissionId: permissionMap[perm]
        })
      )
    );

    // Student permissions
    const studentPermissions = [
      'read:books',
      'read:loans'
    ];
    await Promise.all(
      studentPermissions.map(perm =>
        this.rolePermissionModel.create({
          roleId: studentRole.id,
          permissionId: permissionMap[perm]
        })
      )
    );
  }
}