import { useState } from "react";

// Components
import { Notification } from "./popups/notification";
import { Icon } from "./chunks/icons";
import { Parragraph } from "./Typography/parragraph";

// styles
import styles from "./text_editor_formating.module.css";

// helpers
import Portal from "../hoc/potal";

export const TextEditorFormating = () => {
   // ------------------- states --------------
   const [showNotification, setshowNotification] = useState<number>(0);

   return (
      <>
         {showNotification === 1 && (
            <Portal>
               <Notification
                  type='1'
                  title='Insert bold text'
                  jsxContent={
                     <Parragraph
                        size='small'
                        text={
                           <>
                              <span>Type '**text**'</span> and get <b>text</b>
                           </>
                        }
                     />
                  }
                  cta={{ handleClose: () => setshowNotification(0) }}
               />
            </Portal>
         )}

         {showNotification === 2 && (
            <Portal>
               <Notification
                  type='1'
                  title='Insert a title'
                  jsxContent={
                     <Parragraph
                        size='small'
                        text={
                           <>
                              <span>Type: '# Title' and get </span> and get <b>Title</b>
                              <span>
                                 Continue to add '#' to make a smaller title, for example '######
                                 Title'
                              </span>
                           </>
                        }
                     />
                  }
                  cta={{ handleClose: () => setshowNotification(0) }}
               />
            </Portal>
         )}

         {showNotification === 3 && (
            <Portal>
               <Notification
                  type='1'
                  title='Insert italic text'
                  jsxContent={
                     <Parragraph
                        size='small'
                        text={
                           <>
                              <span>Type: '*Text*' and get </span> and get <i>Title</i>
                           </>
                        }
                     />
                  }
                  cta={{ handleClose: () => setshowNotification(0) }}
               />
            </Portal>
         )}

         {showNotification === 4 && (
            <Portal>
               <Notification
                  type='1'
                  title='Insert a link'
                  jsxContent={
                     <Parragraph
                        size='small'
                        text={
                           <>
                              <span>type: '[Link title](http://www.example.com)' and get </span>{" "}
                              <a style={{ color: "#ff9214", textDecoration: "underline" }} href='#'>
                                 Link title
                              </a>
                           </>
                        }
                     />
                  }
                  cta={{ handleClose: () => setshowNotification(0) }}
               />
            </Portal>
         )}

         {showNotification === 5 && (
            <Portal>
               <Notification
                  type='1'
                  title='Insert numbered list'
                  jsxContent={
                     <Parragraph
                        size='small'
                        text={
                           <>
                              <span>
                                 Type: <br /> '1. One' <br /> '2. Two' <br /> '3. Three' <br /> and
                                 get
                              </span>
                              <span>
                                 <br />
                                 1. One
                                 <br />
                                 2. Two
                                 <br />
                                 3. Three
                                 <br />
                              </span>
                           </>
                        }
                     />
                  }
                  cta={{ handleClose: () => setshowNotification(0) }}
               />
            </Portal>
         )}

         {showNotification === 6 && (
            <Portal>
               <Notification
                  type='1'
                  title='Insert bulleted list'
                  jsxContent={
                     <Parragraph
                        size='small'
                        text={
                           <>
                              <span>
                                 Type: <br /> '* One' <br /> '* Two' <br /> '* Three' <br /> and get
                              </span>
                              <span>
                                 <br /> &#8226; One <br /> &#8226; Two <br /> &#8226; Three <br />{" "}
                              </span>
                           </>
                        }
                     />
                  }
                  cta={{ handleClose: () => setshowNotification(0) }}
               />
            </Portal>
         )}

         {showNotification === 7 && (
            <Portal>
               <Notification
                  type='1'
                  title='Insert a break'
                  jsxContent={
                     <Parragraph
                        size='small'
                        text={
                           <>
                              <span>{`type: "&nbsp;" and get: `}</span>
                              <br />
                              <span>top text</span>
                              <br />
                              <span>bottom text</span>
                           </>
                        }
                     />
                  }
                  cta={{ handleClose: () => setshowNotification(0) }}
               />
            </Portal>
         )}

         <div className={styles.mainWrapper}>
            <div onClick={() => setshowNotification(1)}>
               <Icon name='bold' size='2rem' color='#F1EAFF' />
            </div>
            <div onClick={() => setshowNotification(2)}>
               <Icon name='title' size='2rem' color='#F1EAFF' />
            </div>
            <div onClick={() => setshowNotification(3)}>
               <Icon name='italics' size='2rem' color='#F1EAFF' />
            </div>
            <div onClick={() => setshowNotification(4)}>
               <Icon name='link' size='2rem' color='#F1EAFF' />
            </div>
            <div onClick={() => setshowNotification(5)}>
               <Icon name='listOl' size='2rem' color='#F1EAFF' />
            </div>
            <div onClick={() => setshowNotification(6)}>
               <Icon name='listUl' size='2rem' color='#F1EAFF' />
            </div>
            <div onClick={() => setshowNotification(7)}>
               <Icon name='parragraph' size='2rem' color='#F1EAFF' />
            </div>
         </div>
      </>
   );
};
