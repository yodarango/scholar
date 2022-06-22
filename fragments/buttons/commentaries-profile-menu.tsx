// core
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// styles
import commentaryProfileChapterStyles from "../../styles/buttons/CommentaryProfileMenu.module.css";

const CommentariesProfileMenu = () => {
   const router = useRouter();
   const user_id = router.query.userId;

   // check the current page to color the button appropiately
   const [currOption, setCurrOption] = useState<{ by_folder: boolean; all: boolean }>({
      by_folder: true,
      all: false
   });

   useEffect(() => {
      if (router.query.books) {
         setCurrOption({ by_folder: true, all: false });
      } else {
         setCurrOption({ by_folder: false, all: true });
      }
   }, [router.query]);

   return (
      <div className={commentaryProfileChapterStyles.mainWrapper}>
         <Link href={`/users/${user_id}/commentaries/book`}>
            <a
               className={`${commentaryProfileChapterStyles.option} ${
                  currOption.by_folder ? commentaryProfileChapterStyles.selected : ""
               }`}>
               📒
            </a>
         </Link>
         <Link href={`/users/${user_id}/commentaries/`}>
            <a
               className={`${commentaryProfileChapterStyles.option} ${
                  currOption.all ? commentaryProfileChapterStyles.selected : ""
               }`}>
               📖
            </a>
         </Link>
         {/* <Link href={`/users/${user_id}/commentaries/folder`}>
            <a className={commentaryProfileChapterStyles.option}> by folder</a>
         </Link> */}
      </div>
   );
};

export default CommentariesProfileMenu;
