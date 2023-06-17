import React from "react";
import { FolderEditor } from "../../../../../components/templates/content/folder_editor";
import { UseIsAuth } from "../../../../../hooks/use_check_auth";

const New = () => {
   return (
      <UseIsAuth redirect='/login'>
         <FolderEditor />
      </UseIsAuth>
   );
};

export default New;
