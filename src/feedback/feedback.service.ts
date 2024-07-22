import { Inject, Injectable } from "@nestjs/common";
import { Feedback } from "./entities/feedback.entity";
import { CreateFeedbackDto } from "./dto/feedback.dto";
import { FEEDBACK_REPO } from "src/common/constant";

@Injectable()
export class FeedbackService {
    constructor(
        @Inject(FEEDBACK_REPO)
        private feedbackRepo: typeof Feedback,
    ) {}

    async findAll(): Promise<Feedback[]> {
        const feedbacks = await this.feedbackRepo.findAll();
        return feedbacks;
    }

    async findOne(id: string): Promise<Feedback> {
        const feedback = await this.feedbackRepo.findOne({ where: { feedback_id: id } });
        return feedback;
    }

    async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const feedback = await this.feedbackRepo.create(createFeedbackDto);
        return feedback;
    }

    async update(id: string, updateFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        await this.feedbackRepo.update(updateFeedbackDto, {
            where: { feedback_id: id },
        });
        const updatedFeedback = await this.feedbackRepo.findOne({ where: { feedback_id: id } });
        return updatedFeedback;
    }

    async remove(id: string): Promise<void> {
        await this.feedbackRepo.destroy({ where: { feedback_id: id } });
    }
}