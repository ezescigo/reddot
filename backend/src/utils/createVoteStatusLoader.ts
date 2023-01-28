import DataLoader from "dataloader";
import { Upvote } from "../entities/Upvote";

export const createVoteStatusLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Upvote | null>(
    async (keys) => {
      const upvotes = await Upvote.findByIds(keys as any);
      let upvotesIdsToUpvote: Record<string, Upvote> = {};
      upvotes.forEach((upvote) => {
        upvotesIdsToUpvote[`${upvote.postId}-${upvote.userId}`] = upvote;
      });
      return keys.map(
        (key) => upvotesIdsToUpvote[`${key.postId}-${key.userId}`]
      );
    }
  );
