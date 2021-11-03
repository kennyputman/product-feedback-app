import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Comment } from "./Comment";
import { Feedback } from "./Feedback";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  // @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  // @Field(() => [Feedback])
  @OneToMany(() => Comment, (feedback) => feedback.user)
  feedbacks: Feedback[];
}
