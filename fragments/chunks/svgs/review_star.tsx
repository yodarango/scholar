// revamp 2.0
type TColors = {
   gradient_dark: string;
   gradient_light: string;
};

type TVectorProps = {
   color?: TColors;
   size: string;
};

export const ReviewStar = ({ color, size }: TVectorProps) => {
   let gradientDark = color?.gradient_dark ? color?.gradient_dark : "#FCA101";
   let gradientLight = color?.gradient_light ? color?.gradient_light : "#FFE600";

   return (
      <div style={{ width: size }}>
         <svg viewBox='0 0 10 10' fill='none'>
            <path
               d='M5 0L3.87743 3.45492H0.244718L3.18364 5.59017L2.06107 9.04508L5 6.90983L7.93893 9.04508L6.81636 5.59017L9.75528 3.45492H6.12257L5 0Z'
               fill='url(#paint0_linear_42_1279)'
            />
            <defs>
               <linearGradient
                  id='paint0_linear_42_1279'
                  x1='2.5'
                  y1='1.5'
                  x2='8'
                  y2='9'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor={gradientDark} />
                  <stop offset='1' stopColor={gradientLight} />
               </linearGradient>
            </defs>
         </svg>
      </div>
   );
};
