/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
import gql from "graphql-tag"
import * as Urql from "urql"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type ErrorResponse = {
  __typename?: "ErrorResponse"
  field: Scalars["String"]
  message: Scalars["String"]
}

export type FieldError = {
  __typename?: "FieldError"
  field: Scalars["String"]
  message: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  changePassword: UserResponse
  createPost?: Maybe<Post>
  deletePost?: Maybe<PostResponse>
  editProfile: UserResponse
  forgotPassword: Scalars["Boolean"]
  login: UserResponse
  logout?: Maybe<Scalars["Boolean"]>
  register: UserResponse
  updatePost: PostResponse
  vote: PostResponse
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"]
  token: Scalars["String"]
}

export type MutationCreatePostArgs = {
  input: PostInput
}

export type MutationDeletePostArgs = {
  id: Scalars["Int"]
}

export type MutationEditProfileArgs = {
  options: ProfileInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationLoginArgs = {
  password: Scalars["String"]
  usernameOrEmail: Scalars["String"]
}

export type MutationRegisterArgs = {
  options: UsernamePasswordInput
}

export type MutationUpdatePostArgs = {
  id: Scalars["Int"]
  text: Scalars["String"]
  title: Scalars["String"]
}

export type MutationVoteArgs = {
  postId: Scalars["Int"]
  value: Scalars["Int"]
}

export type PaginatedPosts = {
  __typename?: "PaginatedPosts"
  hasMore: Scalars["Boolean"]
  posts: Array<Post>
}

export type Post = {
  __typename?: "Post"
  createdAt: Scalars["String"]
  creator: User
  creatorId: Scalars["Float"]
  id: Scalars["Float"]
  points: Scalars["Float"]
  text: Scalars["String"]
  textSnippet: Scalars["String"]
  title: Scalars["String"]
  updatedAt: Scalars["String"]
  voteStatus?: Maybe<Scalars["Int"]>
}

export type PostInput = {
  text: Scalars["String"]
  title: Scalars["String"]
}

export type PostResponse = {
  __typename?: "PostResponse"
  errors?: Maybe<Array<ErrorResponse>>
  post?: Maybe<Post>
  success: Scalars["Boolean"]
}

export type ProfileInput = {
  company?: InputMaybe<Scalars["String"]>
  description?: InputMaybe<Scalars["String"]>
  id: Scalars["Float"]
  location?: InputMaybe<Scalars["String"]>
  name?: InputMaybe<Scalars["String"]>
  pronouns?: InputMaybe<Scalars["String"]>
  socialProfile1?: InputMaybe<Scalars["String"]>
  socialProfile2?: InputMaybe<Scalars["String"]>
  socialProfile3?: InputMaybe<Scalars["String"]>
  socialProfile4?: InputMaybe<Scalars["String"]>
  socialProfile5?: InputMaybe<Scalars["String"]>
  timezone?: InputMaybe<Scalars["String"]>
  website?: InputMaybe<Scalars["String"]>
}

export type Query = {
  __typename?: "Query"
  getProfile?: Maybe<User>
  hello: Scalars["String"]
  me?: Maybe<User>
  post?: Maybe<Post>
  posts: PaginatedPosts
}

export type QueryPostArgs = {
  id: Scalars["Int"]
}

export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
}

export type User = {
  __typename?: "User"
  company?: Maybe<Scalars["String"]>
  createdAt: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  id: Scalars["Float"]
  location?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  pronouns?: Maybe<Scalars["String"]>
  socialProfile1?: Maybe<Scalars["String"]>
  socialProfile2?: Maybe<Scalars["String"]>
  socialProfile3?: Maybe<Scalars["String"]>
  socialProfile4?: Maybe<Scalars["String"]>
  socialProfile5?: Maybe<Scalars["String"]>
  timezone?: Maybe<Scalars["String"]>
  updatedAt: Scalars["String"]
  username: Scalars["String"]
  website?: Maybe<Scalars["String"]>
}

export type UserResponse = {
  __typename?: "UserResponse"
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type UsernamePasswordInput = {
  email: Scalars["String"]
  password: Scalars["String"]
  username: Scalars["String"]
}

export type PostFragment = {
  __typename?: "Post"
  id: number
  title: string
  textSnippet: string
  points: number
  createdAt: string
  updatedAt: string
  creator: { __typename?: "User"; id: number; username: string }
} & { " $fragmentName"?: "PostFragment" }

export type RegularUserFragment = { __typename?: "User"; id: number; username: string } & {
  " $fragmentName"?: "RegularUserFragment"
}

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"]
  newPassword: Scalars["String"]
}>

export type ChangePasswordMutation = {
  __typename?: "Mutation"
  changePassword: {
    __typename?: "UserResponse"
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
    user?: { __typename?: "User"; id: number; username: string } | null
  }
}

export type CreatePostMutationVariables = Exact<{
  input: PostInput
}>

export type CreatePostMutation = {
  __typename?: "Mutation"
  createPost?: {
    __typename?: "Post"
    id: number
    title: string
    creatorId: number
    createdAt: string
    updatedAt: string
    text: string
    points: number
  } | null
}

export type DeletePostMutationVariables = Exact<{
  id: Scalars["Int"]
}>

export type DeletePostMutation = {
  __typename?: "Mutation"
  deletePost?: {
    __typename?: "PostResponse"
    success: boolean
    errors?: Array<{ __typename?: "ErrorResponse"; field: string; message: string }> | null
  } | null
}

export type EditProfileMutationVariables = Exact<{
  options: ProfileInput
}>

export type EditProfileMutation = {
  __typename?: "Mutation"
  editProfile: {
    __typename?: "UserResponse"
    user?: {
      __typename?: "User"
      id: number
      username: string
      email: string
      name?: string | null
      description?: string | null
      pronouns?: string | null
      company?: string | null
      location?: string | null
      timezone?: string | null
      socialProfile1?: string | null
      socialProfile2?: string | null
      socialProfile3?: string | null
      socialProfile4?: string | null
      socialProfile5?: string | null
      website?: string | null
      createdAt: string
    } | null
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
  }
}

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]
}>

export type ForgotPasswordMutation = { __typename?: "Mutation"; forgotPassword: boolean }

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"]
  password: Scalars["String"]
}>

export type LoginMutation = {
  __typename?: "Mutation"
  login: {
    __typename?: "UserResponse"
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
    user?: {
      __typename?: "User"
      id: number
      username: string
      name?: string | null
      company?: string | null
      location?: string | null
      description?: string | null
      email: string
      createdAt: string
    } | null
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation"; logout?: boolean | null }

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput
}>

export type RegisterMutation = {
  __typename?: "Mutation"
  register: {
    __typename?: "UserResponse"
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
    user?: {
      __typename?: "User"
      id: number
      username: string
      name?: string | null
      company?: string | null
      location?: string | null
      description?: string | null
      email: string
      createdAt: string
    } | null
  }
}

export type UpdatePostMutationVariables = Exact<{
  updatePostId: Scalars["Int"]
  title: Scalars["String"]
  text: Scalars["String"]
}>

export type UpdatePostMutation = {
  __typename?: "Mutation"
  updatePost: {
    __typename?: "PostResponse"
    success: boolean
    post?: {
      __typename?: "Post"
      id: number
      title: string
      text: string
      textSnippet: string
    } | null
    errors?: Array<{ __typename?: "ErrorResponse"; field: string; message: string }> | null
  }
}

export type VoteMutationVariables = Exact<{
  value: Scalars["Int"]
  postId: Scalars["Int"]
}>

export type VoteMutation = {
  __typename?: "Mutation"
  vote: {
    __typename?: "PostResponse"
    success: boolean
    errors?: Array<{ __typename?: "ErrorResponse"; field: string; message: string }> | null
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: "Query"
  me?: {
    __typename?: "User"
    id: number
    username: string
    email: string
    createdAt: string
    name?: string | null
    company?: string | null
    location?: string | null
    description?: string | null
    website?: string | null
    socialProfile1?: string | null
    socialProfile2?: string | null
    socialProfile3?: string | null
    socialProfile4?: string | null
    socialProfile5?: string | null
  } | null
}

export type PostQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type PostQuery = {
  __typename?: "Query"
  post?: {
    __typename?: "Post"
    id: number
    title: string
    points: number
    text: string
    textSnippet: string
    createdAt: string
    updatedAt: string
    creatorId: number
    voteStatus?: number | null
    creator: {
      __typename?: "User"
      id: number
      email: string
      username: string
      createdAt: string
      updatedAt: string
    }
  } | null
}

export type PostsQueryVariables = Exact<{
  limit: Scalars["Int"]
  cursor?: InputMaybe<Scalars["String"]>
}>

export type PostsQuery = {
  __typename?: "Query"
  posts: {
    __typename?: "PaginatedPosts"
    hasMore: boolean
    posts: Array<{
      __typename?: "Post"
      id: number
      title: string
      text: string
      textSnippet: string
      voteStatus?: number | null
      points: number
      createdAt: string
      updatedAt: string
      creator: { __typename?: "User"; id: number; username: string }
    }>
  }
}

export const PostFragmentDoc = gql`
  fragment Post on Post {
    id
    title
    textSnippet
    points
    createdAt
    updatedAt
    points
    creator {
      id
      username
    }
  }
`
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    ChangePasswordDocument
  )
}
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      creatorId
      createdAt
      updatedAt
      text
      points
    }
  }
`

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument)
}
export const DeletePostDocument = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      success
      errors {
        field
        message
      }
    }
  }
`

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument)
}
export const EditProfileDocument = gql`
  mutation EditProfile($options: ProfileInput!) {
    editProfile(options: $options) {
      user {
        id
        username
        email
        name
        description
        pronouns
        company
        location
        timezone
        socialProfile1
        socialProfile2
        socialProfile3
        socialProfile4
        socialProfile5
        website
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`

export function useEditProfileMutation() {
  return Urql.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument)
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument
  )
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        username
        name
        company
        location
        description
        email
        createdAt
      }
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        id
        username
        name
        company
        location
        description
        email
        createdAt
      }
    }
  }
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
}
export const UpdatePostDocument = gql`
  mutation UpdatePost($updatePostId: Int!, $title: String!, $text: String!) {
    updatePost(id: $updatePostId, title: $title, text: $text) {
      success
      post {
        id
        title
        text
        textSnippet
      }
      errors {
        field
        message
      }
    }
  }
`

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument)
}
export const VoteDocument = gql`
  mutation vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId) {
      success
      errors {
        field
        message
      }
    }
  }
`

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument)
}
export const MeDocument = gql`
  query Me {
    me {
      id
      username
      email
      createdAt
      name
      company
      location
      description
      website
      socialProfile1
      socialProfile2
      socialProfile3
      socialProfile4
      socialProfile5
    }
  }
`

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options })
}
export const PostDocument = gql`
  query Post($id: Int!) {
    post(id: $id) {
      id
      title
      points
      text
      textSnippet
      createdAt
      updatedAt
      creatorId
      voteStatus
      creator {
        id
        email
        username
        createdAt
        updatedAt
      }
    }
  }
`

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, "query">) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({ query: PostDocument, ...options })
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      posts {
        id
        title
        text
        textSnippet
        voteStatus
        points
        createdAt
        updatedAt
        points
        creator {
          id
          username
        }
      }
    }
  }
`

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, "query">) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options })
}
