// core
import React from "react";

// sty;es
import contentApprovalStlyes from "../../styles/fragments/chunks/ContentApprovalDorpdown.module.css";

type TcontentApprovalDropdownProps = {
   handleCloseApprovalDropdown: React.MouseEventHandler;
   additionalClassOne?: any;
   additionalClassTwo?: any;
   additionalClassThree?: any;
};
const ContentApprovalDropdown = ({
   handleCloseApprovalDropdown,
   additionalClassOne,
   additionalClassTwo,
   additionalClassThree
}: TcontentApprovalDropdownProps) => {
   return (
      <div className={`${additionalClassOne} ${contentApprovalStlyes.mianWrapper}`}>
         <section className={`${additionalClassTwo} ${contentApprovalStlyes.listWrapper}`}>
            <span className={`${contentApprovalStlyes.listWrapper_a} ${additionalClassThree}`}>
               A+
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_a} ${additionalClassThree}`}>
               A
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_a} ${additionalClassThree}`}>
               A-
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_b} ${additionalClassThree}`}>
               B+
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_b} ${additionalClassThree}`}>
               B
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_b} ${additionalClassThree}`}>
               B-
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_c} ${additionalClassThree}`}>
               C+
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_c} ${additionalClassThree}`}>
               C
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_c} ${additionalClassThree}`}>
               C-
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_d} ${additionalClassThree}`}>
               D
            </span>
            <span className={`${contentApprovalStlyes.listWrapper_f} ${additionalClassThree}`}>
               F
            </span>
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
