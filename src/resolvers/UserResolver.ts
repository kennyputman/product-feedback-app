import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import { UserResponse } from "../types/responseTypes";

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

  // *** check if input type is better for args
  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: username } });

    if (user !== undefined) {
      return {
        errors: [
          {
            field: "username",
            message: "username is already taken",
          },
        ],
      };
    }

    // Add validatior for username and password

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      username,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser).save();
    return { user: createdUser };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: username } });
    if (user === undefined) {
      return {
        errors: [
          { field: "username", message: "No user found for that username" },
        ],
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "Incorrect Password" }],
      };
    }

    return { user };
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
