import { CommentariesWFilter } from "../layouts/stacks/commentaries_w_filter";
import { ImagesFromVerseGridModal } from "../layouts/stacks/images_from_verses_modal";
import { QuotesWFilter } from "../layouts/stacks/quotes_w_filter";
import { ArticlesWFilter } from "../layouts/stacks/articles_w_filter";

type TProfilePostsProps = {
   type: number;
   cta: {
      handleClose: () => void;
   };
};

const ProfilePosts = ({ type, cta }: TProfilePostsProps) => {
   return (
      <>
         {type === 1 && <CommentariesWFilter cta={{ handleClose: cta.handleClose }} />}
         {type === 2 && <QuotesWFilter cta={{ handleClose: cta.handleClose }} />}
         {type === 3 && <ArticlesWFilter cta={{ handleClose: cta.handleClose }} />}
         {type === 4 && <ImagesFromVerseGridModal cta={{ handleClose: cta.handleClose }} />}
      </>
   );
};

export default ProfilePosts;
