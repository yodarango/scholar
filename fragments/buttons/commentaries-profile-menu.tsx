// core
import Link from "next/link";
import { useRouter } from "next/router";

// styles
import commentaryProfileChapterStyles from "../../styles/buttons/CommentaryProfileMenu.module.css";

const CommentariesProfileMenu = () => {
   const router = useRouter();
   const user_id = router.query.userId;

   return (
      <div className={commentaryProfileChapterStyles.mainWrapper}>
         <Link href={`/users/${user_id}/commentaries/book`}>
            <a>by folder</a>
         </Link>
         <Link href={`/users/${user_id}/commentaries/`}>
            <a> All</a>
         </Link>
         <Link href={`/users/${user_id}/commentaries/folder`}>
            <a> by folder</a>
         </Link>
      </div>
   );
};

export default CommentariesProfileMenu;
