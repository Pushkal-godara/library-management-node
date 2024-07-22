import { Feedback } from "./entities/feedback.entity";
import { FEEDBACK_REPO } from "src/common/constant";

export const FeedbackProviders = [
    {
        provide: FEEDBACK_REPO,
        useValue: Feedback,
    },
]