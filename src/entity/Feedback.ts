import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Category, Status } from "../types/models";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "enum", enum: Category })
  category: string;

  @Column()
  upvotes: number;

  @Column({ type: "enum", enum: Status, default: Status.SUGGESTION })
  status: string;

  @Column({ type: "varchar", length: 200 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
