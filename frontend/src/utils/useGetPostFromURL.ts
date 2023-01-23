import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetId } from "./useGetId";

export const useGetPostFromURL = () => {
  const id = useGetId();
  return usePostQuery({
    pause: id === 0,
    variables: { id },
  });
};
