import { useRouter } from "next/router";
import { FolderList } from "../../../../components/layouts/stacks/folders_list";

const Index = () => {
   const router = useRouter();
   const { signature } = router.query;
   let userId = signature ? signature.toString().replaceAll("[", "").replaceAll("]", "") : "@me";

   return (
      <div>
         <FolderList
            includeBulkAction={true}
            cta={{ handleClose: () => router.push(`/users/${userId}`) }}
         />
      </div>
   );
};
export default Index;
