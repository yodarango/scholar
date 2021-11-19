// core
import React, { useEffect, useState } from "react";

// components
import Comment from "../posts/comment";

// styles
import postsWrapperStyle from "../styles/layouts/PostsWrapper.module.css";

// helper
import { Tcommentary } from "../posts/comment";

export default function PostsWrapper() {
   const [commentaries, setCommentaries] = useState<Tcommentary[]>([
      {
         id: "string;",
         userId: "string;",
         userSignature: "string;",
         content: "string;",
         referencedScriptures: [{ verseId: "string", verseReferences: "string" }],
         tags: ["string[];"],
         colors: ["string[];"],
         approves: ["string[];"],
         disapproves: ["string[];"],
         comments: ["string[];"],
         commentedOn: { verseId: "string", verseReferences: "string" },
         userAvatar: "string;"
      }
   ]);
   /* const fetchCommentary = async () => {
      const commReq = await fetch("https://scholar-be-dev.herokuapp.com/commentaries");
      const commentaries = await commReq.json();
      setCommentaries(commentaries);
   };
   useEffect(() => {
      fetchCommentary();
   }, []);*/

   return (
      <div className={`main-wrapper ${postsWrapperStyle.postsWrapper}`}>
         {commentaries && <Comment commentaries={commentaries} reportOption={true} />}
      </div>
   );
}
