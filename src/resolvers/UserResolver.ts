import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async Users() {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async User(@Arg("id") id: number) {
    const user = await User.findOne(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("username") username: string,
    @Arg("image", { nullable: true }) image: string
  ): Promise<User> {
    const newUser = {
      firstName,
      lastName,
      username,
      image,
    };

    const createdUser = await User.create(newUser).save();
    return createdUser;
  }
}
