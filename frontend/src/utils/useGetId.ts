import { useRouter } from "next/router";

export const useGetId = () => {
  const router = useRouter();
  return typeof router.query.id === "string" ? parseInt(router.query!.id!) : 0;
};
