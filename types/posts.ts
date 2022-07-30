import { TRating } from "./posts_contnet";

export type TCommentary = {
   ID: string;
   VERSE_ID: string;
   body: string;
   category_tags: string;
   referenced_verses: string;
   posted_on: string;
   date: string;
   verse_citation: string;
   total_count: number;
   postImage: string;
   creator: {
      ID: string;
      signature: string;
      authority_level: number;
      approval_rating: string | number;
      first_name?: string;
      last_name?: string;
      my_church?: string;
      avatar: string;
   };
   comments: {
      total_count: number;
   }[];
   approvals: TRating[];
};
