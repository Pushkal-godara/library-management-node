import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReserveService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
    constructor(private readonly reserveService: ReserveService) {}

    @Get()
    async findAll(): Promise<Reservation[]> {
        const reservations = await this.reserveService.findAll();
        return reservations;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Reservation> {
        const reservation = await this.reserveService.findOne(id);
        return reservation;
    }

    @Post()
    async create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
        const reservation = await this.reserveService.create(createReservationDto);
        return reservation;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateReservationDto: CreateReservationDto): Promise<Reservation> {
        const reservation = await this.reserveService.update(id, updateReservationDto);
        return reservation;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.reserveService.remove(id);
    }
}
