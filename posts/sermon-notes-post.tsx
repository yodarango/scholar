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
};

const SermonNotesPost = ({ sermonPost }: sermonNotesPostProps) => {
   return <div></div>;
};

export default SermonNotesPost;
