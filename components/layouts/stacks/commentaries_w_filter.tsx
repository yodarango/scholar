/**************************************************************************************** 
-  renders a list of commentary posts width a filter on the top that passes down the 
   filters to the post wrapper
-  The filter is handled in the tagFilter prop which is manipulated through the useEffect
-  Allows users to filter what types of posts they want to see, by book or all. Eventually
   folders will be used which will be selected by Id through the currentView prop
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { PrimaryStack } from "./templates/primary_stack";
import { CategoryTag } from "../../fragments/chunks/category_tag";
import { CommentariesGrid } from "../scrollers/user_content/commentaries_grid";

// styles
import styles from "./commentaries_w_filter.module.css";
import { Dropdown } from "../../fragments/inputs/dropdown";
import { SelectCommentaryGroups } from "../menus/select_commentary_groups";
import { CommentariesByFolder } from "../scrollers/user_content/commentaries_by_folder";
import { BackLink } from "../../fragments/buttons/back_link";
import { parseRouter } from "../../../helpers/utils/parse_next_router";

type TCommentariesByBookProps = {
   cta: {
      handleClose: () => void;
   };
};

export const CURRENT_VIEW_COMMENTARIES_BY_GROUP = "by-group";
export const CURRENT_VIEW_BOOK_BY_FOLDER = "my-folders";
export const CURRENT_VIEW_BOOK_BY_BOOK = "by-book";
export const CURRENT_VIEW_COMMENTARIES = "";

export const CommentariesWFilter = ({ cta }: TCommentariesByBookProps) => {
   // router
   const router = useRouter();

   // modal and view
   const [currentModal, setcurrentModal] = useState<string>("none");
   const [currentView, setcurrentView] = useState(CURRENT_VIEW_COMMENTARIES);

   // header
   const [scrollYDis, setscrollYDis] = useState<number>(0); // header styles
   const [scrollingDir, setscrollingDir] = useState<string>("none"); //scrolling direction to know how to move header

   // category filter
   const [tagFilter, settagFilter] = useState<any>(null); // category

   // folder filter
   const [currentFolderValue, setcurrentFolderValue] = useState<string>("Show Groups");
   const [showFolderOptions, setshowFolderOptions] = useState<boolean>(false);

   // userSignature
   const [userSignature, setuserSignature] = useState<string>("");

   const renderFolderView =
      currentModal === CURRENT_VIEW_BOOK_BY_BOOK || currentModal === CURRENT_VIEW_BOOK_BY_FOLDER;
   const renderCommentariesView = currentModal === CURRENT_VIEW_COMMENTARIES;
   const renderCommentariesByGroupView = currentModal === CURRENT_VIEW_COMMENTARIES_BY_GROUP;

   // when the user clicks folder or tag: push new category tag to the router
   const handleFilterSelection = (query: any) => {
      // parse the pathname
      const parsedRouter = parseRouter(router.pathname, router, "signature");
      const variables = { ...parsedRouter.query, ...query };

      /****************************************************************************
       * since the 'folder-id' for commentaries is actually VERSE_ID I to swap the
       * query names folder for VERSE_ID 🌼
       * *********************************
       * */
      delete variables.group;
      if (router.query.group === CURRENT_VIEW_BOOK_BY_BOOK) {
         variables["VERSE_ID"] = variables.folder;
         setcurrentView(CURRENT_VIEW_BOOK_BY_BOOK);
         delete variables.folder;
      } else {
         setcurrentView(CURRENT_VIEW_BOOK_BY_FOLDER);
      }

      router.push({
         pathname: parsedRouter.pathname,
         query: { ...variables }
      });
   };

   //when the user clicks the group type: erase all current query params and push the folders query param
   const handleGroupSelection = ({ value, label }: { label: string; value: string }) => {
      const query: { view: number; group?: string } = { view: 1 };

      if (value !== "all") query["group"] = value;

      const parsedRouter = parseRouter(router.pathname, router, "signature");

      settagFilter("*");
      router.push({
         pathname: parsedRouter.pathname,
         query
      });
      setcurrentFolderValue(label);
      setshowFolderOptions(false);
   };

   // handle show header
   const handleHeader = (e: any) => {
      const distance = e.target.scrollTop;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;
      setscrollYDis(distance);
      setscrollingDir(isScrollingDown ? "down" : "up");
   };

   // check for query changes
   useEffect(() => {
      if (router.query.category) {
         settagFilter(router.query.category);
      }

      if (typeof router.query.signature === "string") {
         setuserSignature(router.query.signature);
      }

      if (typeof router.query.group === "string") {
         setcurrentModal(router.query.group);
      } else if (
         typeof router.query.VERSE_ID === "string" ||
         typeof router.query.folder === "string"
      ) {
         setcurrentModal(CURRENT_VIEW_COMMENTARIES_BY_GROUP);
         typeof router.query.folder === "string"
            ? setcurrentView(CURRENT_VIEW_BOOK_BY_FOLDER)
            : setcurrentView(CURRENT_VIEW_BOOK_BY_BOOK);
      } else {
         setcurrentModal(CURRENT_VIEW_COMMENTARIES);
      }
   }, [router.isReady, router.query]);

   return (
      <PrimaryStack
         title='Commentaries'
         cta={{ handleClose: cta.handleClose, handleScroll: handleHeader }}>
         <div
            className={`${styles.filters} ${scrollingDir === "up" && styles.scrollingUp} ${
               scrollingDir === "down" && styles.scrollingDown
            }`}>
            {/* dropdown filter */}
            {(renderFolderView || renderCommentariesView) && (
               <div className={styles.dropdown}>
                  <Dropdown
                     initialValue={currentFolderValue}
                     showOptions={showFolderOptions}
                     setshowOptions={setshowFolderOptions}>
                     <SelectCommentaryGroups
                        cta={{
                           handleSelection: ({ label, value }) => {
                              handleGroupSelection({ label, value });
                              setshowFolderOptions(false);
                           },
                           handleCloseModal: () => setshowFolderOptions(false)
                        }}
                     />
                  </Dropdown>

                  {renderFolderView && (
                     <div className={styles.icon}>
                        <BackLink
                           icon='folder'
                           iconLeft
                           quiet
                           title='My folders'
                           link={`/users/${userSignature}/folders`}
                        />
                     </div>
                  )}
               </div>
            )}

            {/* categories filter */}

            {renderCommentariesByGroupView && (
               <div className={styles.backLink}>
                  <BackLink
                     quiet
                     title={
                        currentView === CURRENT_VIEW_BOOK_BY_BOOK
                           ? "Back to books"
                           : currentView === CURRENT_VIEW_BOOK_BY_FOLDER
                           ? "Back to folders"
                           : ""
                     }
                     cta={{
                        handleClick: () => {
                           handleGroupSelection(
                              currentView === CURRENT_VIEW_BOOK_BY_BOOK
                                 ? { label: "By book", value: "by-book" }
                                 : currentView === CURRENT_VIEW_BOOK_BY_FOLDER
                                 ? { label: "My folders", value: "my-folders" }
                                 : { label: "All", value: "*" }
                           );
                        }
                     }}
                  />
               </div>
            )}

            {(renderCommentariesView || renderCommentariesByGroupView) && (
               <div className={styles.tag}>
                  <CategoryTag
                     initiaValue={tagFilter}
                     cta={{
                        handleSelection: (val) => handleFilterSelection({ category: val })
                     }}
                     informativeOnly={false}
                  />
               </div>
            )}
         </div>

         <section className={styles.posts}>
            {(renderCommentariesView || renderCommentariesByGroupView) && <CommentariesGrid />}

            {renderFolderView && (
               <CommentariesByFolder
                  query_type={currentModal}
                  cta={{ handleSelection: (val) => handleFilterSelection({ folder: val }) }}
               />
            )}
         </section>
      </PrimaryStack>
   );
};
