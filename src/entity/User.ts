import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
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
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  // @Field(() => [Feedback])
  @OneToMany(() => Comment, (feedback) => feedback.user)
  feedbacks: Feedback[];

  static getUserById(userId: string) {
    return this.createQueryBuilder("user")
      .where("user.id = :id", { id: userId })
      .getOne();
  }
}
