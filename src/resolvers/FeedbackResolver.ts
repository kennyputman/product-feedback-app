import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";
import { Category } from "../types/types";

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

  @Mutation(() => Feedback)
  async createFeedback(
    @Arg("title") title: string,
    @Arg("category") category: Category,
    @Arg("description") description: string,
    @Arg("userId") userId: string
  ): Promise<Feedback | undefined> {
    const user = await User.getUserById(userId);
    const newFeedback = {
      title,
      category,
      description,
      user,
    };
    const created = await Feedback.create(newFeedback).save();
    return created;
  }
}
