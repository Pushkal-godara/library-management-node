import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Feedback } from "./entities/feedback.entity";
import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";
import { FeedbackProviders } from "./feedback.provider";

@Module({
    imports: [SequelizeModule.forFeature([Feedback])],
    controllers: [FeedbackController],
    providers: [FeedbackService, ...FeedbackProviders]
})
export class FeedbackModule {}