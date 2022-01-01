import { GetServerSideProps } from "next";

// graphQL
import client from "../../../apollo-client";
import { GET_ONE_COMMENTARY } from "../../../graphql/posts/commentaries";

// child comps
import EditPost from "../../../posts/edit-posts/edit-commentary-post";

// helpers / types
import { Tcommentary } from "../../../posts/comment";

type editCommentaryprops = {
   commentary: Tcommentary;
};
const EditCommentary = ({ commentary }: editCommentaryprops) => {
   return (
      <div>
         <EditPost commentary={commentary} />
      </div>
   );
};

export default EditCommentary;

export const getServerSideProps: GetServerSideProps = async (context) => {
   const postId = context.params?.id ? context.params?.id[0] : null;

   const { data } = await client.query({
      query: GET_ONE_COMMENTARY,
      variables: { ID: postId, showComments: true }
   });

   return {
      props: {
         commentary: data.commentary[0]
      }
   };
};
