import React from "react";

export type TsermonPost = {
   ID: string;
   content: string;
   USER_ID: string;
   category_tags: string;
   total_count: number;
   creator: {
      ID: string;
      signature: string;
      authority_level: string;
      approval_rating: string;
   };
};

type sermonNotesPostProps = {
   sermonPost: TsermonPost;
   deleteOption: boolean;
   editOption: boolean;
   reportOption: boolean;
};

const SermonNotesPost = ({ sermonPost }: sermonNotesPostProps) => {
   return <div>Hello</div>;
};

export default SermonNotesPost;
