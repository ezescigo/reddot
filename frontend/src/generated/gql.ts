/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment Post on Post {\n  id\n  title\n  textSnippet\n  points\n  createdAt\n  updatedAt\n  points\n  creator {\n    id\n    username\n  }\n}": types.PostFragmentDoc,
    "fragment RegularUser on User {\n  id\n  username\n}": types.RegularUserFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n    creatorId\n    createdAt\n    updatedAt\n    text\n    points\n  }\n}": types.CreatePostDocument,
    "mutation DeletePost($id: Int!) {\n  deletePost(id: $id) {\n    success\n    errors {\n      field\n      message\n    }\n  }\n}": types.DeletePostDocument,
    "mutation EditProfile($options: ProfileInput!) {\n  editProfile(options: $options) {\n    user {\n      id\n      username\n      email\n      name\n      description\n      pronouns\n      company\n      location\n      timezone\n      socialProfile1\n      socialProfile2\n      socialProfile3\n      socialProfile4\n      socialProfile5\n      website\n      createdAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.EditProfileDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      name\n      company\n      location\n      description\n      email\n      createdAt\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      name\n      company\n      location\n      description\n      email\n      createdAt\n    }\n  }\n}": types.RegisterDocument,
    "mutation UpdatePost($updatePostId: Int!, $title: String!, $text: String!) {\n  updatePost(id: $updatePostId, title: $title, text: $text) {\n    success\n    post {\n      id\n      title\n      text\n      textSnippet\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.UpdatePostDocument,
    "mutation vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId) {\n    success\n    errors {\n      field\n      message\n    }\n  }\n}": types.VoteDocument,
    "query Me {\n  me {\n    id\n    username\n    email\n    createdAt\n    name\n    company\n    location\n    description\n    website\n    socialProfile1\n    socialProfile2\n    socialProfile3\n    socialProfile4\n    socialProfile5\n  }\n}": types.MeDocument,
    "query Post($id: Int!) {\n  post(id: $id) {\n    id\n    title\n    points\n    text\n    textSnippet\n    createdAt\n    updatedAt\n    creatorId\n    voteStatus\n    creator {\n      id\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}": types.PostDocument,
    "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      id\n      title\n      text\n      textSnippet\n      voteStatus\n      points\n      createdAt\n      updatedAt\n      points\n      creator {\n        id\n        username\n      }\n    }\n  }\n}": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Post on Post {\n  id\n  title\n  textSnippet\n  points\n  createdAt\n  updatedAt\n  points\n  creator {\n    id\n    username\n  }\n}"): (typeof documents)["fragment Post on Post {\n  id\n  title\n  textSnippet\n  points\n  createdAt\n  updatedAt\n  points\n  creator {\n    id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUser on User {\n  id\n  username\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  username\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n    creatorId\n    createdAt\n    updatedAt\n    text\n    points\n  }\n}"): (typeof documents)["mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n    creatorId\n    createdAt\n    updatedAt\n    text\n    points\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePost($id: Int!) {\n  deletePost(id: $id) {\n    success\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation DeletePost($id: Int!) {\n  deletePost(id: $id) {\n    success\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation EditProfile($options: ProfileInput!) {\n  editProfile(options: $options) {\n    user {\n      id\n      username\n      email\n      name\n      description\n      pronouns\n      company\n      location\n      timezone\n      socialProfile1\n      socialProfile2\n      socialProfile3\n      socialProfile4\n      socialProfile5\n      website\n      createdAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation EditProfile($options: ProfileInput!) {\n  editProfile(options: $options) {\n    user {\n      id\n      username\n      email\n      name\n      description\n      pronouns\n      company\n      location\n      timezone\n      socialProfile1\n      socialProfile2\n      socialProfile3\n      socialProfile4\n      socialProfile5\n      website\n      createdAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      name\n      company\n      location\n      description\n      email\n      createdAt\n    }\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      name\n      company\n      location\n      description\n      email\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      name\n      company\n      location\n      description\n      email\n      createdAt\n    }\n  }\n}"): (typeof documents)["mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      name\n      company\n      location\n      description\n      email\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePost($updatePostId: Int!, $title: String!, $text: String!) {\n  updatePost(id: $updatePostId, title: $title, text: $text) {\n    success\n    post {\n      id\n      title\n      text\n      textSnippet\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation UpdatePost($updatePostId: Int!, $title: String!, $text: String!) {\n  updatePost(id: $updatePostId, title: $title, text: $text) {\n    success\n    post {\n      id\n      title\n      text\n      textSnippet\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId) {\n    success\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId) {\n    success\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    username\n    email\n    createdAt\n    name\n    company\n    location\n    description\n    website\n    socialProfile1\n    socialProfile2\n    socialProfile3\n    socialProfile4\n    socialProfile5\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    username\n    email\n    createdAt\n    name\n    company\n    location\n    description\n    website\n    socialProfile1\n    socialProfile2\n    socialProfile3\n    socialProfile4\n    socialProfile5\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($id: Int!) {\n  post(id: $id) {\n    id\n    title\n    points\n    text\n    textSnippet\n    createdAt\n    updatedAt\n    creatorId\n    voteStatus\n    creator {\n      id\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query Post($id: Int!) {\n  post(id: $id) {\n    id\n    title\n    points\n    text\n    textSnippet\n    createdAt\n    updatedAt\n    creatorId\n    voteStatus\n    creator {\n      id\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      id\n      title\n      text\n      textSnippet\n      voteStatus\n      points\n      createdAt\n      updatedAt\n      points\n      creator {\n        id\n        username\n      }\n    }\n  }\n}"): (typeof documents)["query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      id\n      title\n      text\n      textSnippet\n      voteStatus\n      points\n      createdAt\n      updatedAt\n      points\n      creator {\n        id\n        username\n      }\n    }\n  }\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;