import { Inject, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/user.dto";
import { USER_REPO } from "src/common/constant";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPO)
        private usersRepo: typeof User,
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.usersRepo.findAll();
        return users;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepo.findOne({ where: { user_id: id } });
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersRepo.create(createUserDto);
        return user;
    }

    async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
        await this.usersRepo.update(updateUserDto, {
            where: { user_id: id },
        });
        const updatedUser = await this.usersRepo.findOne({ where: { user_id: id } });
        return updatedUser;
    }

    async remove(id: string): Promise<void> {
        await this.usersRepo.destroy({ where: { user_id: id } });
    }
}