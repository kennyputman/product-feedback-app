import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Category, Status } from "../types/models";
import { User } from "./User";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "enum", enum: Category })
  category: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ type: "enum", enum: Status, default: Status.SUGGESTION })
  status: string;

  @Column({ type: "varchar", length: 200 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;
}
