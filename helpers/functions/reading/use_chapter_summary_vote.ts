import { useState } from "react";
import { client } from "../../../apollo-client";
import { HANDLE_CHAPTER_SUMMARY_VOTE } from "../../../graphql/reading/read";

type TChapterSummaryVote = {
   CHAPTER_ID: string;
   vote: number;
};

export const useChapterSummaryVote = async (variables: TChapterSummaryVote) => {
   try {
      const { data } = await client.mutate({
         mutation: HANDLE_CHAPTER_SUMMARY_VOTE,
         variables
      });

      if (data?.handle_chapter_summary_vote) {
         return { data: data?.handle_chapter_summary_vote, error: null, status: "done" };
      } else {
         return {
            data: null,
            error: "Unable to get chapter summary",
            status: "error"
         };
      }
   } catch (error) {
      console.error(error);
      return {
         data: null,
         error: error,
         status: "error"
      };
   }
};
