import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";

@ObjectType()
class FieldError {
  @Field({ nullable: true })
  field: string;

  @Field({ nullable: true })
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

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
  @Mutation(() => User)
  async registerUser(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("image", { nullable: true }) image: string
  ): Promise<User> {
    // *** Update to user response
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

    return { user: user, errors: [] };
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
