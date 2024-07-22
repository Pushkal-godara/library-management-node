import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Reservation } from "./entities/reservation.entity";
import { ReservationController } from "./reservation.controller";
import { ReserveService } from "./reservation.service";
import { ReservationProviders } from "./reservation.provider";

@Module({
    imports: [SequelizeModule.forFeature([Reservation])],
    controllers: [ReservationController],
    providers: [ReserveService, ...ReservationProviders]
})
export class ReservationModule {}