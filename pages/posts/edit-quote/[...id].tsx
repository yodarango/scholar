// core
import { GetServerSideProps } from "next";

//graphQL
import { GET_ONE_QUOTE } from "../../../graphql/posts/quotes";
import client from "../../../apollo-client";

// child comps
import EditQuotePost from "../../../posts/edit-posts/edit-quote-post";
import NavigationMenu from "../../../layouts/navigation-menu";

// helpers/ types
import { Tstory } from "../../../posts/quotes-stroies";

type editQuoteProps = {
   story: Tstory;
};
const EditQuote = ({ story }: editQuoteProps) => {
   return (
      <>
         {story && <div className='main-wrapper'>{<EditQuotePost story={story} />}</div>}
         {!story && <div>this post does not exists anymore #NEEDS_GRAPHICS</div>}
         <NavigationMenu />
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const postId = query.id ? query.id[0] : 0;
   const { data } = await client.query({
      query: GET_ONE_QUOTE,
      variables: { ID: postId, showComments: false }
   });

   console.log(data);
   return {
      props: { story: data.quote[0] || null }
   };
};

export default EditQuote;
