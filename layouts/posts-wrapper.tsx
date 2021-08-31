// core
import React, { useEffect, useState } from "react";

// components
import Comment from "../posts/comment";

// styles
import postsWrapperStyle from "../styles/layouts/PostsWrapper.module.css";

// helper
import { Tcommentary } from "../posts/comment";

export default function PostsWrapper() {
   const [commentaries, setCommentaries] = useState<Tcommentary[]>([]);
   const fetchCommentary = async () => {
      const commReq = await fetch("https://scholar-be.herokuapp.com/commentaries");
      const commentaries = await commReq.json();
      setCommentaries(commentaries);
   };
   useEffect(() => {
      fetchCommentary();
   }, []);
   return (
      <div className={`main-wrapper ${postsWrapperStyle.postsWrapper}`}>
         <Comment commentaries={commentaries} reportOption={true} />
      </div>
   );
}
