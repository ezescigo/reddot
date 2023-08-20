/* eslint-disable */
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache"
import { dedupExchange, fetchExchange, gql, stringifyVariables } from "urql"
import {
  DeletePostMutation,
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql"
import { typedUpdateQuery } from "./typedUpdateQuery"
import { Exchange } from "urql"
import { pipe, tap } from "wonka"
import Router from "next/router"
import { isServer } from "./isServer"

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error) {
          if (error?.message.includes("not authenticated")) {
            Router.replace("/login")
          }
        }
      })
    )
  }

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }

    const isCached = cache.resolve(
      cache.resolveFieldByKey(
        entityKey,
        `${fieldName}(${stringifyVariables(fieldArgs)})` // posts({ limit: 10, cursor: "4578478546" })
      ) as string,
      "posts"
    )
    info.partial = !isCached
    const results: string[] = []
    let hasMore = true
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, "posts") as string[]
      const _hasMore = cache.resolve(key, "hasMore") ? true : false
      if (!_hasMore) {
        hasMore = _hasMore
      }
      console.log("data: ", data)
      results.push(...data)
    })

    return {
      __typename: "PaginatedPosts",
      hasMore: hasMore,
      posts: results,
    }
  }
}

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query")
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts")
  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate("Query", "posts", fieldInfo.arguments)
  })
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = ""
  if (isServer() && ctx?.req) {
    cookie = ctx?.req?.headers?.cookie
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            // UpdatePost is not necessary because the API returns the Post object and typeorm will update the cache for us.
            deletePost: (_result, args, cache, info) => {
              // We invalidate the cache and refetch posts from the server
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              })
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as any
              )

              if (data) {
                if (data.voteStatus === value) {
                  // if post is voted with 1 (upvote) and user is trying to vote with 1, do not do anything
                  return
                }

                // User is changing their vote or submiting a new vote (didn't vote on this post yet)
                // If user is changing their vote with value +1 or -1, 1 point needs to be substracted and 1 vote needs to be added (either both up or down)

                // Post with 3 votes. User voted up +1 (sees +3)
                // User changes vote to downvote (so, remove upvote, (2 points) and add a downvote (1 point))
                // Post needs to show +1

                // If user is changing their vote by DELETING their vote (value 0), points needs to be changed x1
                // => if user is changing votes, points needs to be changed x2

                const addOrRemoveUserVote =
                  data.voteStatus && value === 0
                    ? -data.voteStatus
                    : data.voteStatus
                    ? 2 * value
                    : value
                const newPoints = (data.points as number) + addOrRemoveUserVote

                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value } as any
                )
              }
            },
            createPost: (_result, args, cache, info) => {
              // We invalidate the cache and refetch posts from the server, to avoid race conditions and have a fresh posts list.
              invalidateAllPosts(cache)
            },
            logout: (_result, args, cache, info) => {
              typedUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              )
            },
            login: (_result, args, cache, info) => {
              typedUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query
                  } else {
                    return {
                      me: result.login.user,
                    }
                  }
                }
              )
              // We invalidate the cache and refetch posts from the server, to avoid race conditions and have a fresh posts list.
              // invalidateAllPosts(cache);
            },
            register: (_result, args, cache, info) => {
              typedUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query
                  } else {
                    return { me: result.register.user }
                  }
                }
              )
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  }
}
