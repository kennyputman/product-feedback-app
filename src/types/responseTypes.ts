import { ObjectType, Field } from "type-graphql";
import { User } from "../entity/User";

@ObjectType()
export class FieldError {
  @Field({ nullable: true })
  field: string;

  @Field({ nullable: true })
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
