import { Arg, Query, Resolver } from "type-graphql";
import { Feedback } from "../entity/Feedback";

@Resolver()
export class FeedbackResolver {
  @Query(() => [Feedback])
  async Feedbacks() {
    return await Feedback.find();
  }

  @Query(() => Feedback, { nullable: true })
  async Feedback(@Arg("id") id: number) {
    const feedbackById = await Feedback.findOne(id);
    return feedbackById;
  }
}
