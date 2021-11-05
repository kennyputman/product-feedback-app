import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Comment } from "../entity/Comment";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async Comments() {
    return await Comment.find();
  }

  @Query(() => Comment, { nullable: true })
  async Comment(@Arg("id") id: number) {
    const comment = await Comment.findOne(id);
    return comment;
  }

  @Mutation(() => Comment)
  async CreateComment(
    @Arg("content") content: string,
    @Arg("userId") userId: string,
    @Arg("feedbackId") feedbackId: string
  ): Promise<Comment | undefined> {
    const user = await User.getUserById(userId);
    const feedback = await Feedback.getFeedbackById(feedbackId);

    const newComment = {
      content,
      user,
      feedback,
    };
    const createdComment = await Comment.create(newComment).save();
    return createdComment;
  }
}
