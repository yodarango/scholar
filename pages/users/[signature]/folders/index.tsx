import React, { useEffect, useState } from "react";
import { FolderList } from "../../../../components/layouts/stacks/folders_list";
import { useRouter } from "next/router";

const Index = () => {
   const router = useRouter();

   const [userSignature, setuserSignature] = useState<string>("");

   useEffect(() => {
      if (router.isReady && typeof router.query.signature === "string")
         if (router.query.signature === "@me") setuserSignature("self");
         else setuserSignature("notSelf");
   }, [router.query, router.isReady]);

   return (
      <div>
         {userSignature && (
            <FolderList
               userSignature={userSignature}
               includeBulkAction={true}
               cta={{ handleFolderSelection: (id) => router.push(`/users/${id}/folders/${id}`) }}
            />
         )}
      </div>
   );
};
export default Index;
