import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./entities/role.entity";
import { Permission } from "./entities/permission.entity";
import { RolePermission } from "./entities/role-permission.entity";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
      SequelizeModule.forFeature([Role, Permission, RolePermission, User]),
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('SECRET'),
          signOptions: { expiresIn: '1h'},
        }),
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
  })
  export class AuthModule {}