import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";

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
  async registerUser(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("image", { nullable: true }) image: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      username,
      image,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser).save();
    return createdUser;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") userId: string): Promise<boolean> {
    const deleteResult = await User.createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: userId })
      .execute();
    if (deleteResult.affected === 0) {
      return false;
    }
    return true;
  }
}
