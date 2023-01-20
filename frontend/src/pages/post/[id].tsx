import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostCard } from "../../components/PostCard";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface PostProps {
  // id: number;
}

const Post: React.FC<PostProps> = () => {
  const router = useRouter();
  // console.log(router)
  console.log(router.query);
  const id =
    typeof router.query.id === "string" ? parseInt(router.query!.id!) : 0;
  const [{ data, fetching }] = usePostQuery({
    pause: id === 0,
    variables: { id },
  });

  console.log(data);

  if (fetching || !data?.post) {
    <Layout>loading</Layout>;
  }
  // return "asd";
  return (
    <Layout>
      <PostCard key={id} post={data?.post!} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
