import { TRating } from "./posts_content";

export type TCommentary = {
   ID: string;
   VERSE_ID: string;
   POST_TYPE: string | number;
   body: string;
   category_tags: string;
   referenced_verses: string;
   posted_on: string;
   created_date: string;
   date: string;
   verse_citation: string;
   post_image: string;
   is_private: boolean;
   authority_level: string;
   folder_id: string;
   folder_name: string;
   sticker: string;
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
   };
   approvals: TRating;
};

export type TThought = {
   ID: string;
   POST_TYPE: number | number;
   title: string;
   body: string;
   category_tags: string;
   referenced_verses: string;
   posted_on: string;
   created_date: string;
   date: string;
   post_image: string;
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
   };
   approvals: TRating;
};

export type TSermonNote = {
   ID: string;
   POST_TYPE: number | number;
   content: string;
   DROPBOX_ID: string;
   title: string;
   category_tags: string;
   posted_on: string;
   date: string;
   file_url: string;
   creator: {
      ID: string;
      signature: string;
      avatar: string;
      authority_level: number;
      approval_rating: number;
      first_name?: string;
      last_name?: string;
      my_church: string;
   };
};

export type TQuote = {
   ID: string;
   POST_TYPE: number | number;
   body: string;
   category_tags: string;
   author: string;
   background: string;
   posted_on?: string;
   created_date?: string;
   date: string;
   creator: {
      ID: string;
      signature: string;
      authority_level: number;
      approval_rating: number;
      avatar: string;
   };
   comments: {
      total_count: number;
   };
   approvals: TRating;
};
