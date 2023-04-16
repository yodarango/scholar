type TuseSwipeLeft = {
   e: any;
   handleSwipeLeft: (delta: any) => void;
   handleSwipeRight: () => void;
};

export const useSwipeLeft: any = ({ e, handleSwipeLeft, handleSwipeRight }: TuseSwipeLeft) => {
   const touchStartX = e.changedTouches[0].pageX;
   let touchMoveX = 0;

   function handleTouchMove(e: any) {
      touchMoveX = e.changedTouches[0].pageX;
      const deltaX = touchMoveX - touchStartX;

      if (deltaX < -50) {
         handleSwipeLeft(deltaX);
      } else if (deltaX > 50) {
         handleSwipeRight();
      }
   }

   function handleTouchEnd() {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
   }

   document.addEventListener("touchmove", handleTouchMove);
   document.addEventListener("touchend", handleTouchEnd);
};
