import { Reservation } from "./entities/reservation.entity";
import { RESERVATION_REPO } from "src/common/constant";

export const ReservationProviders = [
    {
        provide: RESERVATION_REPO,
        useValue: Reservation,
    },
]