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

export type TThought = {
   ID: string;
   title: string;
   body: string;
   category_tags: string;
   referenced_verses: string;
   posted_on: string;
   date: string;
   total_count: number;
   postImage: string;
   creator: {
      ID: string;
      signature: string;
      authority_level: number;
      approval_rating: number;
      avatar: string;
      first_name: string;
      last_name: string;
      my_church: string;
   };
   comments: {
      total_count: number;
   }[];
   approvals: TRating[];
};

export type TSermonNote = {
   ID: string;
   content: string;
   DROPBOX_ID: string;
   title: string;
   category_tags: string;
   posted_on: string;
   date: string;
   // total_count: number;
   file_url: string;
   creator: {
      ID: string;
      signature: string;
      avatar: string;
      authority_level: number;
      approval_rating: string | number;
      first_name?: string;
      last_name?: string;
      my_church: string;
   };
};
