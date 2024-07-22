import { Inject, Injectable } from "@nestjs/common";
import { Fine } from "./entities/fine.entity";
import { CreateFineDto } from "./dto/fine.dto";
import { FINE_REPO } from "src/common/constant";

@Injectable()
export class FineService {
    constructor(
        @Inject(FINE_REPO)
        private fineRepo: typeof Fine,
    ) {}

    async findAll(): Promise<Fine[]> {
        const fines = await this.fineRepo.findAll();
        return fines;
    }

    async findOne(id: string): Promise<Fine> {
        const fine = await this.fineRepo.findOne({ where: { fine_id: id } });
        return fine;
    }

    async create(createFineDto: CreateFineDto): Promise<Fine> {
        const fine = await this.fineRepo.create(createFineDto);
        return fine;
    }

    async update(id: string, updateFineDto: CreateFineDto): Promise<Fine> {
        await this.fineRepo.update(updateFineDto, {
            where: { fine_id: id },
        });
        const updatedFine = await this.fineRepo.findOne({ where: { fine_id: id } });
        return updatedFine;
    }

    async remove(id: string): Promise<void> {
        await this.fineRepo.destroy({ where: { fine_id: id } });
    }
}