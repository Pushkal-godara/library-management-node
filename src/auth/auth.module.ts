import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./entities/role.entity";
import { Permission } from "./entities/permission.entity";
import { RolePermission } from "./entities/role-permission.entity";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";


@Module({
    imports: [
      SequelizeModule.forFeature([Role, Permission, RolePermission, User]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '1h'},
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy],
  })
  export class AuthModule {}