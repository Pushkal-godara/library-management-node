import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../auth/entities/role.entity';
import { Permission } from '../auth/entities/permission.entity';
import { RolePermission } from '../auth/entities/role-permission.entity';
import { RbacSeeder } from './seeders/rbac.seeders';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, Permission, RolePermission])
  ],
  providers: [RbacSeeder],
  exports: [RbacSeeder]
})
export class DatabaseModule {}