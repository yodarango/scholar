// core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import CommentariesByBookTemp from "../../../../templates/commentary-folders/commentaries-by-book";

const Book = () => {
   return (
      <div>
         <CommentariesByBookTemp user={""} />
      </div>
   );
};

export default Book;
