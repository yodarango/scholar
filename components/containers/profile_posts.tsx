import { CommentariesWFilter } from "../layouts/stacks/commentaries_w_filter";
import { QuotesWFilter } from "../layouts/stacks/quotes_w_filter";
import { SermonNotesWFilter } from "../layouts/stacks/sermon_notes_w_filter";
import { ThoughtsWFilter } from "../layouts/stacks/thoughts_w_filter";

type TProfilePostsProps = {
   type: number;
   cta: {
      handleClose: () => void;
   };
};

const ProfilePosts = ({ type, cta }: TProfilePostsProps) => {
   return (
      <>
         {type === 1 && <CommentariesWFilter cta={{ handleClose: cta.handleClose }} isSelf />}
         {type === 2 && <QuotesWFilter cta={{ handleClose: cta.handleClose }} isSelf />}
         {type === 3 && <ThoughtsWFilter cta={{ handleClose: cta.handleClose }} isSelf />}
         {/* {type === 4 && <SermonNotesWFilter cta={{ handleClose: cta.handleClose }} />} */}
      </>
   );
};

export default ProfilePosts;
