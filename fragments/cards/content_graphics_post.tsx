import Image from "next/image";
import React, { useState, useRef } from "react";
import { SlideCounter } from "../chunks/slide_counter";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./content_graphics_post.module.css";

type TContentGraphicsPostProps = {
   images: string[];
};

export const ContentGraphicsPost = ({ images }: TContentGraphicsPostProps) => {
   // states
   const [isDown, setisDown] = useState<boolean>(false);
   const [startX, setstartX] = useState<number>(0);
   const [scrollLeft, setscrollLeft] = useState<number>(0);
   const [currClass, setcurrClass] = useState<string>("");
   const [currIndex, setcurrIndex] = useState<number>(1);
   const [swipDir, setswipeDir] = useState<any>(0);

   // refs
   const gallery = useRef<HTMLDivElement>(null);

   const mouseDown = (e: any) => {
      setisDown(true);
      setcurrClass(styles.active);
      if (gallery.current) {
         setstartX(e.pageX - gallery.current.offsetLeft);
         setscrollLeft(gallery.current.scrollLeft);
      }
   };

   const mouseLeave = () => {
      setisDown(false);
      setcurrClass("");
   };

   const mouseUp = () => {
      setisDown(false);
      setcurrClass("");

      if (gallery.current) {
         // get the width of the galllery to make sure the user has scrrolled at least halfway
         const galleryWidth = gallery.current.getBoundingClientRect();
         const minScroll = galleryWidth.width / 2;

         // check that user scrolled at least past half way
         if (Math.abs(swipDir) > minScroll) {
            if (swipDir < 0 && currIndex < images.length) {
               setcurrIndex(currIndex + 1);
            } else if (swipDir > 0 && currIndex > 0) {
               setcurrIndex(currIndex - 1);
            }
         }
      }
   };

   const mouseMove = (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      if (gallery.current) {
         const x = e.pageX - gallery.current.offsetLeft;
         const SCROLL_SPEED = 3;
         const walk = (x - startX) * SCROLL_SPEED;
         gallery.current.scrollLeft = scrollLeft - walk;

         setswipeDir(walk);
      }
   };

   return (
      <>
         {images.length > 0 && (
            <div className={styles.mainWrapper}>
               <div className={styles.imagePosition}>
                  <SlideCounter currIndex={currIndex} length={images.length} />
               </div>
               <div
                  className={`${styles.gallery} ${currClass}`}
                  onMouseDown={mouseDown}
                  onMouseLeave={mouseLeave}
                  onMouseUp={mouseUp}
                  onMouseMove={mouseMove}
                  ref={gallery}>
                  {images.map((image: string, index: number) => (
                     <div className={styles.image} key={index}>
                        <Image src={image} alt='image' className={styles.image} layout='fill' />
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   );
};
