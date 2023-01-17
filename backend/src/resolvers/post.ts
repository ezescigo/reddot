import { Post } from "../entities/Post";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { conn } from "../";
import { Upvote } from "../entities/Upvote";

@ObjectType()
export class ErrorResponse {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class PostResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];

  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field()
  success: boolean;
}

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50);
  }

  // Asign a vote (point) to a post
  @Mutation(() => PostResponse)
  // @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    console.log("req.session", req.session);
    const { userId } = req.session;
    // const userId = 1;
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;
    const vote = await Upvote.findOneBy({ userId, postId: postId });
    console.log(vote);
    if (vote && vote.value === realValue) {
      return {
        success: false,
        errors: [
          {
            field: "upvote",
            message: "User has already voted this post.",
          },
        ],
      };
    }

    if (vote) {
      try {
        await Upvote.update({ postId, userId }, { value: realValue });
        const post = await Post.findOneBy({ id: postId });
        const updatedPoints = (post?.points ?? 0) + realValue * 2;
        await Post.update({ id: postId }, { points: updatedPoints });
        return { success: true };
      } catch (err) {
        return {
          success: false,
          errors: [{ message: "Internal Server Error.", field: "" }],
        };
      }
    }

    // Insert new upvote
    // await Upvote.insert({
    //   userId,
    //   postId,
    //   value: realValue,
    // });

    // Update Post points
    try {
      await conn.transaction(async (tm) => {
        await tm.query(`
        insert into upvote ("userId", "postId", value)
        values (${userId},${postId},${realValue})
        `);

        await tm.query(`update post
        set points = points + ${realValue}
        where id = ${postId}`);
      });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        errors: [{ message: "Internal Server Error.", field: "" }],
      };
    }
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null // Date
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit); // Asked
    const realLimitPlusOne = realLimit + 1; // Query check for limit asked + 1, so we can tell if there's more posts to show in a future query or not.
    const queryBuilder = conn
      .getRepository(Post)
      .createQueryBuilder("p")
      .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
      .orderBy("p.createdAt", "DESC")
      .take(realLimitPlusOne);

    if (cursor) {
      queryBuilder.where("p.createdAt < :cursor", {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const posts = await queryBuilder.getMany();

    // const replacements: any[] = [realLimitPlusOne];

    // if (cursor) {
    //   replacements.push(new Date(parseInt(cursor)));
    // }

    // const posts = await conn.getRepository(Post).query(
    //   `
    // select p.*
    // from post p
    // ${cursor ? `where p."createdAt" < ${new Date(parseInt(cursor))}` : ""}
    // order by p."createdAt" DESC
    // limit ${realLimitPlusOne}
    // `
    // );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | null> {
    return Post.findOneBy({ id });
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOneBy({ id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    try {
      await Post.delete(id);
      return true;
    } catch {
      return false;
    }
  }
}
