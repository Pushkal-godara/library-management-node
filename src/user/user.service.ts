import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt';

import { User } from "./entities/user.entity";
import { USER_REPO } from "src/common/constant";
import { Role } from "src/auth/entities/role.entity";
import { CreateStaffDto, UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPO)
        private usersRepo: typeof User,
        @InjectModel(Role)
        private roleModel: typeof Role,
    ) { }

    // Admin-only method to create staff users (librarians or admins)
    async createStaffUser(createStaffDto: CreateStaffDto): Promise<any> {
        // Verify the creator is an admin
        const isAdmin = await this.hasRole(createStaffDto.admin_id, 'admin');
        if (!isAdmin) {
            throw new UnauthorizedException('Only administrators can create staff accounts');
        }

        // Verify the role ID is valid (either admin or librarian)
        const role = await this.roleModel.findByPk(createStaffDto.role_id);
        console.log(role);
        if (!role || role.name === 'student') {
            throw new UnauthorizedException('Invalid role selection for staff user');
        }

        // Check if user already exists
        const existingUser = await this.usersRepo.findOne({
            where: { email: createStaffDto.email }
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(createStaffDto.password, 10);

        // Create staff user
        const newStaffUser = await this.usersRepo.create({
            name: createStaffDto.name,
            email: createStaffDto.email,
            contact_info: createStaffDto.contact_info,
            password: hashedPassword,
            role_id: createStaffDto.role_id
        });

        // Remove password from response
        const { password, ...result } = newStaffUser.toJSON();
        return result;
    }

    // Check if user has a specific role
    async hasRole(userId: string, roleName: string): Promise<boolean> {
        const user = await this.usersRepo.findOne({
            where: { user_id: userId },
            include: [{ model: Role }],
        });

        return user?.role?.name === roleName;
    }

    // Admin-only method to update user role
    async updateUserRole(updateUserDto: UpdateUserDto): Promise<User> {
        // Verify the updater is an admin
        const isAdmin = await this.hasRole(updateUserDto.admin_id, 'admin');
        if (!isAdmin) {
            throw new UnauthorizedException('Only administrators can update user roles');
        }

        // Verify the role exists
        const role = await this.roleModel.findByPk(updateUserDto.role_id);
        if (!role) {
            throw new UnauthorizedException('Invalid role');
        }

        // If user exists then Update user's role
        const user = await this.usersRepo.findByPk(updateUserDto.user_id);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        user.role_id = updateUserDto.role_id;
        await user.save();

        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepo.findAll();
        return users;
    }

    // async findOne(id: string): Promise<User> {
    //     const user = await this.usersRepo.findOne({ where: { user_id: id } });
    //     return user;
    // }

    // async create(createUserDto: CreateUserDto): Promise<User> {
    //     const user = await this.usersRepo.create(createUserDto);
    //     return user;
    // }

    // async remove(id: string): Promise<void> {
    //     await this.usersRepo.destroy({ where: { user_id: id } });
    // }
}
