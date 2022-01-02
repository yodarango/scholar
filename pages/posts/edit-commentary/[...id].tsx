import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
// graphQL
import client from "../../../apollo-client";
import { GET_ONE_COMMENTARY } from "../../../graphql/posts/commentaries";

// child comps
import EditPost from "../../../posts/edit-posts/edit-commentary-post";

// helpers / types
import { Tcommentary } from "../../../posts/comment";

const EditCommentary = () => {
   const router = useRouter();
   const postId = router.query.id ? router.query.id[0] : 0;

   const [commentaryState, setCommentaryState] = useState<Tcommentary | undefined>(undefined);

   useEffect(() => {
      const fetchData: () => Promise<Tcommentary> = async () => {
         const { data } = await client.query({
            query: GET_ONE_COMMENTARY,
            variables: { ID: postId, showComments: true }
         });
         setCommentaryState(data.commentary[0]);
         return data.commentary[0];
      };
      fetchData();
   }, []);

   return (
      <>
         <div>{commentaryState != undefined && <EditPost commentary={commentaryState} />}</div>;
         {/* {commentaryState == undefined && <div>this comment does not exists anymore!</div>} */}
      </>
   );
};

export default EditCommentary;
