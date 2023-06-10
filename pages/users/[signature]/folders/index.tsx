import { useRouter } from "next/router";
import { FolderList } from "../../../../components/layouts/stacks/folders_list";

const Index = () => {
   const router = useRouter();
   return (
      <div>
         <FolderList
            includeBulkAction={true}
            cta={{ handleFolderSelection: (id) => router.push(`/users/${id}/folders/${id}`) }}
         />
      </div>
   );
};
export default Index;
