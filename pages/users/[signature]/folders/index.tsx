import React, { useEffect, useState } from "react";
import { FolderList } from "../../../../components/layouts/stacks/folders_list";
import { useRouter } from "next/router";

const Index = () => {
   const router = useRouter();

   const [id, setId] = useState<string>("");

   useEffect(() => {
      if (router.isReady && typeof router.query.signature === "string")
         if (router.query.signature === "@me") setId("self");
         else setId("notSelf");
   }, [router.query, router.isReady]);

   return (
      <div>
         {id && (
            <FolderList
               isSelf={id === "self"}
               cta={{ handleFolderSelection: (id) => router.push(`/users/${id}/folders/${id}`) }}
            />
         )}
      </div>
   );
};
export default Index;
