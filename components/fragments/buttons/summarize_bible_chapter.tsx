import { loggedInUser } from "../../../helpers/auth/get-loggedin-user";
import { YouNeedToLoginModal } from "../../common/modals/you_need_to_login_modal";
import { BibleChapterSummary } from "../../layouts/bible_chapter_summary";
import { IconButton } from "./icon_button";
import React, { useState } from "react";

type TSummarizeBibleChapterProps = {
   chapterId?: string;
};

export const SummarizeBibleChapter = ({ chapterId }: TSummarizeBibleChapterProps) => {
   const [openModal, setOpenModal] = useState(false);
   const [openLoginModal, setOpenLoginModal] = useState(false);

   const handleClick = () => {
      const user = loggedInUser();

      if (!user) setOpenLoginModal(true);
      else setOpenModal(true);
   };
   return (
      <div>
         {openModal && (
            <BibleChapterSummary chapterId={chapterId} onClose={() => setOpenModal(false)} />
         )}
         <YouNeedToLoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
         <IconButton icon='sparkles' backgroundColor='1' cta={{ handleClick: handleClick }} />
      </div>
   );
};
