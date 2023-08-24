import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Upvote } from "./Upvote";

@ObjectType() // this decorator and @Field() converts this class to graphQL's schema
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  pronouns: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  company: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  location: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  timezone: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  socialProfile1: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  socialProfile2: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  socialProfile3: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  socialProfile4: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  socialProfile5: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  website: string | null;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
