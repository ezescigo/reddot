import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';
import { COOKIE_NAME } from "../constants";


@InputType()
class UsernamePasswordInput {
  @Field()
  username: string

  @Field()
  password: string
}

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { req, em }: MyContext
  ) {
    // Not logged in
    if (!req.session.userId) {
      return null
    }

    const user = await em.findOne(User, { id: req.session.userId })
    return user;
  }


  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username length must be longer than 2 characters.'
          }
        ]
        
      }
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password length must be longer than 2 characters.'
          }
        ]
      }
    }

    const usernameExists = await em.findOne(User, { username: options.username });
    if (usernameExists) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username already exists.'
          }
        ]
      }
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, { username: options.username, password: hashedPassword });
    await em.persistAndFlush(user);

    // store user id in session (cookie)
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [{
            field: 'username',
            message: 'User does not exist.'
          },
        ],
      }
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{
          field: 'password',
          message: 'Incorrect password.'
        },
      ],
      }
    }
    
    req.session.userId = user.id;

    return {
      user
    };
  }

  @Mutation(() => Boolean, { nullable: true })
  async logout(
    @Ctx() {req, res}: MyContext
  ) {
    return new Promise(resolve => req.session.destroy(err => {
      if (err) {
        console.log(err)
        resolve(false)
        return
      }

      res.clearCookie(COOKIE_NAME)
      resolve(true)
    }))
  }
}