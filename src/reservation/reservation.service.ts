import { Inject, Injectable } from "@nestjs/common";
import { Reservation } from "./entities/reservation.entity";
import { CreateReservationDto } from "./dto/reservation.dto";
import { RESERVATION_REPO } from "src/common/constant";

@Injectable()
export class ReserveService {
    constructor(
        @Inject(RESERVATION_REPO)
        private reserveRepo: typeof Reservation,
    ) {}

    async findAll(): Promise<Reservation[]> {
        const reservations = await this.reserveRepo.findAll();
        return reservations;
    }

    async findOne(id: string): Promise<Reservation> {
        const reservation = await this.reserveRepo.findOne({ where: { reservation_id: id } });
        return reservation;
    }

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const reservation = await this.reserveRepo.create(createReservationDto);
        return reservation;
    }

    async update(id: string, updateReservationDto: CreateReservationDto): Promise<Reservation> {
        await this.reserveRepo.update(updateReservationDto, {
            where: { reservation_id: id },
        });
        const updatedReservation = await this.reserveRepo.findOne({ where: { reservation_id: id } });
        return updatedReservation;
    }

    async remove(id: string): Promise<void> {
        await this.reserveRepo.destroy({ where: { reservation_id: id } });
    }
}