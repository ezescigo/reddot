import { Box } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import React from "react"
import { Layout } from "../../app/layout"
import { PostItem } from "../../components/PostItem"
import { useMeQuery } from "../../generated/graphql"
import { createUrqlClient } from "../../utils/createUrqlClient"
import { useGetPostFromURL } from "../../utils/useGetPostFromURL"

interface PostProps {
  // id: number;
}

const Post: React.FC<PostProps> = () => {
  const [{ data: meData }] = useMeQuery()
  const [{ data, fetching, error }] = useGetPostFromURL()

  if (fetching) {
    return (
      <Layout>
        <Box>loading</Box>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Box>error</Box>
      </Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Cannot find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <PostItem
        key={data.post.id}
        post={data.post}
        canDelete={data.post.creator.id === meData?.me?.id}
        canEdit={data.post.creator.id === meData?.me?.id}
      />
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
