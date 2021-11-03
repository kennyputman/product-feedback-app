import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { Category, Status } from "../types/types";
import { User } from "./User";

registerEnumType(Category, {
  name: "Category",
});

registerEnumType(Status, {
  name: "Status",
});

@ObjectType()
@Entity()
export class Feedback extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Category)
  @Column({ type: "enum", enum: Category })
  category: Category;

  @Field()
  @Column({ default: 0 })
  upvotes: number;

  @Field(() => Status)
  @Column({ type: "enum", enum: Status, default: Status.SUGGESTION })
  status: string;

  @Field()
  @Column({ type: "varchar", length: 200 })
  description: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;
}
