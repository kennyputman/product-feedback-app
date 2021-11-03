import { Arg, Query, Resolver } from "type-graphql";
import { Comment } from "../entity/Comment";

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
}
