// core
import React from "react";

// sty;es
import contentApprovalStlyes from "../../styles/fragments/chunks/ContentApprovalDorpdown.module.css";

type TcontentApprovalDropdownProps = {
   handleCloseApprovalDropdown: React.MouseEventHandler;
};
const ContentApprovalDropdown = ({
   handleCloseApprovalDropdown
}: TcontentApprovalDropdownProps) => {
   return (
      <div className={contentApprovalStlyes.mianWrapper}>
         <section className={contentApprovalStlyes.listWrapper}>
            <span className={contentApprovalStlyes.listWrapper_a}>A+</span>
            <span className={contentApprovalStlyes.listWrapper_a}>A</span>
            <span className={contentApprovalStlyes.listWrapper_a}>A-</span>
            <span className={contentApprovalStlyes.listWrapper_b}>B+</span>
            <span className={contentApprovalStlyes.listWrapper_b}>B</span>
            <span className={contentApprovalStlyes.listWrapper_b}>B-</span>
            <span className={contentApprovalStlyes.listWrapper_c}>C+</span>
            <span className={contentApprovalStlyes.listWrapper_c}>C</span>
            <span className={contentApprovalStlyes.listWrapper_c}>C-</span>
            <span className={contentApprovalStlyes.listWrapper_d}>D</span>
            <span className={contentApprovalStlyes.listWrapper_f}>F</span>
            <span
               className={contentApprovalStlyes.listWrapper_cancel}
               onClick={handleCloseApprovalDropdown}>
               Cancel
            </span>
         </section>
      </div>
   );
};

export default ContentApprovalDropdown;
