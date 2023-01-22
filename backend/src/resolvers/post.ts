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
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null, // Date
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit); // Asked
    const realLimitPlusOne = realLimit + 1; // Query check for limit asked + 1, so we can tell if there's more posts to show in a future query or not.

    // .getMany is bugged: select returns []. Can't use the queryBuilder, so to avoid doing 2 querys and mapping or using getRawMany, we will give the raw SQL query and use getMany (with entities).
    // const queryBuilder = conn
    //   .getRepository(Post)
    //   .createQueryBuilder("p")
    //   // .leftJoinAndSelect(
    //   //   (qb) => qb.select("value").from(Upvote, "v").where(""),
    //   //   "voteStatus",
    //   // `"voteStatus"."userId" = ${
    //   //   userId ?? 1
    //   // } AND "voteStatus"."postId" = p.id`
    //   // )
    //   .select(
    //     (qb) =>
    //       qb
    //         .select("value")
    //         .from(Upvote, "v")
    //         .where(`"userId" = ${2 ?? 0} AND "postId" = p.id`),
    //     "voteStatus"
    //   )
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')

    //   .orderBy("p.createdAt", "DESC")
    //   .take(realLimitPlusOne);

    // if (cursor) {
    //   queryBuilder.where("p.createdAt < :cursor", {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }

    // const posts = await queryBuilder.getMany();

    const replacements: any[] = [realLimitPlusOne];

    if (req.session.userId) {
      replacements.push(req.session.userId);
    }

    let cursorIdx = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
      cursorIdx = replacements.length;
    }

    const posts = await conn.query(
      `
      select p.*,
      json_build_object(
        'id', u.id,
        'username', u.username,
        'email', u.email,
        'createdAt', u."createdAt",
        'updatedAt', u."updatedAt"
        ) creator,
        ${
          req.session.userId
            ? '(select value from upvote where "userId" = $2 and "postId" = p.id) "voteStatus"'
            : 'null as "voteStatus"'
        }
        from post p
        inner join public.user u on u.id = p."creatorId"
        ${cursor ? `where p."createdAt" < $${cursorIdx}` : ""}
        order by p."createdAt" DESC
        limit $1
      `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id", () => Int) id: number): Promise<Post | null> {
    // const queryBuilder = conn
    //   .getRepository(Post)
    //   .createQueryBuilder("p")
    //   .where(`p.id = ${id}`)
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"');
    // const post = await queryBuilder.getOne();

    // return post;

    return Post.findOne({ where: { id }, relations: ["creator"] });
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
    @Arg("id", () => Int) id: number,
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

  @Mutation(() => PostResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return {
        success: false,
        errors: [{ field: "", message: "Post does not exist." }],
      };
    }

    if (post.creatorId !== req.session.userId) {
      return {
        success: false,
        errors: [
          { field: "", message: "You can only delete posts that you created." },
        ],
      };
    }
    await Upvote.delete({ postId: id });
    await Post.delete({ id, creatorId: req.session.userId });
    return { success: true };
  }
}
