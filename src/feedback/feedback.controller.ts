import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Feedback } from './entities/feedback.entity';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/feedback.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedbacks')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Get()
    async findAll(): Promise<Feedback[]> {
        const feedbacks = await this.feedbackService.findAll();
        return feedbacks;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Feedback> {
        const feedback = await this.feedbackService.findOne(id);
        return feedback;
    }

    @Post()
    async create(@Body() createfeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const feedback = await this.feedbackService.create(createfeedbackDto);
        return feedback;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const feedback = await this.feedbackService.update(id, updateFeedbackDto);
        return feedback;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.feedbackService.remove(id);
    }
}
