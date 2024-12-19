import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserProviders } from "./user.provider";
import { Role } from "src/auth/entities/role.entity";
import { Permission } from "src/auth/entities/permission.entity";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [SequelizeModule.forFeature([User, Role, Permission]), AuthModule],
    controllers: [UserController],
    providers: [UserService, ...UserProviders],
    exports: [UserService, ...UserProviders],
})
export class UserModule {}