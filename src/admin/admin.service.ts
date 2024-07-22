import { Inject, Injectable } from "@nestjs/common";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/admin.dto";
import { ADMIN_REPO } from "src/common/constant";

@Injectable()
export class AdminService {
    constructor(
        @Inject(ADMIN_REPO)
        private adminsRepo: typeof Admin,
    ) {}

    async findAll(): Promise<Admin[]> {
        const admins = await this.adminsRepo.findAll();
        return admins;
    }

    async findOne(id: string): Promise<Admin> {
        const admin = await this.adminsRepo.findOne({ where: { user_id: id } });
        return admin;
    }

    async create(CreateAdminDto: CreateAdminDto): Promise<Admin> {
        const admin = await this.adminsRepo.create(CreateAdminDto);
        return admin;
    }

    async update(id: string, updateAdminDto: CreateAdminDto): Promise<Admin> {
        await this.adminsRepo.update(updateAdminDto, {
            where: { user_id: id },
        });
        const updatedAdmin = await this.adminsRepo.findOne({ where: { user_id: id } });
        return updatedAdmin;
    }

    async remove(id: string): Promise<void> {
        await this.adminsRepo.destroy({ where: { user_id: id } });
    }
}