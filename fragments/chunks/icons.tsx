// revamp 2.0
type TiconsProps = {
   name: string;
   strokeWidth?: string;
   color: string;
   size: string;
};

export const Icon = ({ name, strokeWidth, color, size }: TiconsProps) => {
   let icon: any;

   switch (name) {
      case "add":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M256 112v288M400 256H112'
               />
            </svg>
         );
         break;

      case "apple":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z' />
               <path d='M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z' />
            </svg>
         );
         break;

      case "arrowBackLong":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M244 400L100 256l144-144M120 256h292'
               />
            </svg>
         );
         break;

      case "arrowBack":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M328 112L184 256l144 144'
               />
            </svg>
         );
         break;

      case "arrowForthLong":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M268 112l144 144-144 144M392 256H100'
               />
            </svg>
         );
         break;

      case "arrowForth":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M184 112l144 144-144 144'
               />
            </svg>
         );
         break;

      case "arrowTop":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "48"}
                  d='M112 328l144-144 144 144'
               />
            </svg>
         );
         break;

      case "arrowTopLong":
         icon = (
            <svg viewBox='0 0 24 8' fill='none'>
               <path
                  d='M2 5.7037L12 2L22 5.7037'
                  stroke={color}
                  strokeWidth={strokeWidth ? strokeWidth : "3"}
                  strokeLinecap='round'
                  strokeLinejoin='round'
               />
            </svg>
         );
         break;

      case "article":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M368 415.86V72a24.07 24.07 0 00-24-24H72a24.07 24.07 0 00-24 24v352a40.12 40.12 0 0040 40h328'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M416 464h0a48 48 0 01-48-48V128h72a24 24 0 0124 24v264a48 48 0 01-48 48z'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M240 128h64M240 192h64M112 256h192M112 320h192M112 384h192'
               />
               <path
                  d='M176 208h-64a16 16 0 01-16-16v-64a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16z'
                  fill={color}
               />
            </svg>
         );
         break;

      case "bell":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "bellWithNot":
         icon = (
            <svg viewBox='0 0 21 22' fill='none'>
               <path
                  d='M13.5462 17.1538V17.9231C13.5462 18.7391 13.222 19.5218 12.645 20.0988C12.068 20.6758 11.2853 21 10.4693 21C9.65324 21 8.87061 20.6758 8.29357 20.0988C7.71654 19.5218 7.39237 18.7391 7.39237 17.9231V17.1538M18.7231 15.588C17.4885 14.0769 16.6169 13.3077 16.6169 9.14183C16.6169 5.32692 14.6688 3.96779 13.0654 3.30769C12.8525 3.22019 12.652 3.01923 12.5871 2.80048C12.3058 1.84327 11.5174 1 10.4693 1C9.42121 1 8.63227 1.84375 8.3539 2.80144C8.289 3.0226 8.08852 3.22019 7.87554 3.30769C6.27025 3.96875 4.3241 5.32308 4.3241 9.14183C4.32169 13.3077 3.45006 14.0769 2.21544 15.588C1.7039 16.2139 2.15198 17.1538 3.04669 17.1538H17.8967C18.7866 17.1538 19.2318 16.2111 18.7231 15.588Z'
                  stroke={color}
                  strokeWidth={strokeWidth ? strokeWidth : "2"}
                  strokeLinecap='round'
                  strokeLinejoin='round'
               />
               <circle cx='16' cy='6' r='5' fill='#FF4D62' />
            </svg>
         );
         break;

      case "bold":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z' />
            </svg>
         );
         break;

      case "book":
         icon = (
            <svg
               viewBox='0 0 24 24'
               fill='none'
               stroke={color}
               strokeWidth={strokeWidth ? strokeWidth : "2"}
               strokeLinecap='round'
               strokeLinejoin='round'>
               <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'></path>
               <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'></path>
            </svg>
         );
         break;

      case "bookmarkFilled":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill={color}
                  d='M400 480a16 16 0 01-10.63-4L256 357.41 122.63 476A16 16 0 0196 464V96a64.07 64.07 0 0164-64h192a64.07 64.07 0 0164 64v368a16 16 0 01-16 16z'
               />
            </svg>
         );
         break;

      case "bookmarkOutline":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "brush":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M452.37 59.63h0a40.49 40.49 0 00-57.26 0L184 294.74c23.08 4.7 46.12 27.29 49.26 49.26l219.11-227.11a40.49 40.49 0 000-57.26zM138 336c-29.88 0-54 24.5-54 54.86 0 23.95-20.88 36.57-36 36.57C64.56 449.74 92.82 464 120 464c39.78 0 72-32.73 72-73.14 0-30.36-24.12-54.86-54-54.86z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "bug":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M370 378c28.89 23.52 46 46.07 46 86M142 378c-28.89 23.52-46 46.06-46 86M384 208c28.89-23.52 32-56.07 32-96M128 206c-28.89-23.52-32-54.06-32-94M464 288.13h-80M128 288.13H48M256 192v256'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M256 448h0c-70.4 0-128-57.6-128-128v-96.07c0-65.07 57.6-96 128-96h0c70.4 0 128 25.6 128 96V320c0 70.4-57.6 128-128 128z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M179.43 143.52a49.08 49.08 0 01-3.43-15.73A80 80 0 01255.79 48h.42A80 80 0 01336 127.79a41.91 41.91 0 01-3.12 14.3'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "chart":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z' />
            </svg>
         );
         break;

      case "chat":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "checkmark":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M416 128L192 384l-96-96'
               />
            </svg>
         );
         break;

      case "clock":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M112.91 128A191.85 191.85 0 0064 254c-1.18 106.35 85.65 193.8 192 194 106.2.2 192-85.83 192-192 0-104.54-83.55-189.61-187.5-192a4.36 4.36 0 00-4.5 4.37V152'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path d='M233.38 278.63l-79-113a8.13 8.13 0 0111.32-11.32l113 79a32.5 32.5 0 01-37.25 53.26 33.21 33.21 0 01-8.07-7.94z' />
            </svg>
         );
         break;

      case "close":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M368 368L144 144M368 144L144 368'
               />
            </svg>
         );
         break;

      case "cloudDownload":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "comment":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "delete":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M80 112h352'
               />
               <path
                  d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "edit":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
            </svg>
         );
         break;

      case "ellipsisH":
         icon = (
            <svg viewBox='0 0 512 512'>
               <circle
                  cx='256'
                  cy='256'
                  r='32'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <circle
                  cx='416'
                  cy='256'
                  r='32'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <circle
                  cx='96'
                  cy='256'
                  r='32'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "eye":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <circle
                  cx='256'
                  cy='256'
                  r='80'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "flash":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M315.27 33L96 304h128l-31.51 173.23a2.36 2.36 0 002.33 2.77h0a2.36 2.36 0 001.89-.95L416 208H288l31.66-173.25a2.45 2.45 0 00-2.44-2.75h0a2.42 2.42 0 00-1.95 1z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "female":
         icon = (
            <svg viewBox='0 0 512 512'>
               <circle
                  cx='256'
                  cy='184'
                  r='152'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M256 336v144M314 416H198'
               />
            </svg>
         );
         break;

      case "flame":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 01-288 0z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "folder":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M440 432H72a40 40 0 01-40-40V120a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H440a40 40 0 0140 40v240a40 40 0 01-40 40zM32 192h448'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "goBack":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M244 400L100 256l144-144M120 256h292'
               />
            </svg>
         );
         break;

      case "google":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
            </svg>
         );
         break;

      case "highlight":
         icon = (
            <svg fill={color}>
               <path
                  d='M4 48v-6.05h40V48Zm4.1-11.35V30l18.65-18.65L33.4 18 14.75 36.65Zm3-3h2.25L29.1 17.9l-2.25-2.25L11.1 31.4ZM35.6 15.8l-6.65-6.65 4.2-4.2q.55-.65 1.25-.675.7-.025 1.4.675l3.9 3.9q.65.65.65 1.375T39.8 11.6ZM11.1 33.65Z'
                  fill={color}
               />
            </svg>
         );
         break;

      case "halfStar":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z' />
            </svg>
         );
         break;

      case "heart":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "home":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "image":
         icon = (
            <svg viewBox='0 0 512 512'>
               <rect
                  x='48'
                  y='80'
                  width='416'
                  height='352'
                  rx='48'
                  ry='48'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <circle
                  cx='336'
                  cy='176'
                  r='32'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "italics":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z' />
            </svg>
         );
         break;

      case "library":
         icon = (
            <svg viewBox='0 0 512 512'>
               <rect
                  x='32'
                  y='96'
                  width='64'
                  height='368'
                  rx='16'
                  ry='16'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M112 224h128M112 400h128'
               />
               <rect
                  x='112'
                  y='160'
                  width='128'
                  height='304'
                  rx='16'
                  ry='16'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <rect
                  x='256'
                  y='48'
                  width='96'
                  height='416'
                  rx='16'
                  ry='16'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M422.46 96.11l-40.4 4.25c-11.12 1.17-19.18 11.57-17.93 23.1l34.92 321.59c1.26 11.53 11.37 20 22.49 18.84l40.4-4.25c11.12-1.17 19.18-11.57 17.93-23.1L445 115c-1.31-11.58-11.42-20.06-22.54-18.89z'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "link":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "listOl":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path
                  fillRule='evenodd'
                  d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z'
               />
               <path d='M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z' />
            </svg>
         );
         break;

      case "listUl":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path
                  fillRule='evenodd'
                  d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
               />
            </svg>
         );
         break;

      case "location":
         icon = (
            <svg
               viewBox='0 0 24 24'
               fill='none'
               stroke={color}
               strokeWidth={strokeWidth ? strokeWidth : "2"}
               strokeLinecap='round'
               strokeLinejoin='round'>
               <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
               <circle cx='12' cy='10' r='3'></circle>
            </svg>
         );
         break;

      case "lockClosed":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M336 208v-95a80 80 0 00-160 0v95'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <rect
                  x='96'
                  y='208'
                  width='320'
                  height='272'
                  rx='48'
                  ry='48'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "lockOpen":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M336 112a80 80 0 00-160 0v96'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <rect
                  x='96'
                  y='208'
                  width='320'
                  height='272'
                  rx='48'
                  ry='48'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "logout":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "male":
         icon = (
            <svg viewBox='0 0 512 512'>
               <circle
                  cx='216'
                  cy='296'
                  r='152'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M448 160V64h-96M324 188L448 64'
               />
            </svg>
         );
         break;

      case "menu":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M80 160h352M80 256h352M80 352h352'
               />
            </svg>
         );
         break;

      case "mic":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80'
               />
               <path
                  d='M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "parragraph":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path
                  fill={color}
                  d='M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5z'
               />
            </svg>
         );
         break;

      case "people":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "play":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "privacy":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M336 176L225.2 304 176 255.8'
               />
               <path
                  d='M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "profile":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "quote":
         icon = (
            <svg viewBox='0 0 22 22' fill='none'>
               <path
                  d='M10.6071 8.90042C10.3779 8.54353 10.0391 8.27067 9.64157 8.12284C9.24404 7.97501 8.80927 7.9602 8.4026 8.08063C7.99593 8.20107 7.63933 8.45024 7.38641 8.79071C7.13348 9.13117 6.9979 9.54453 7.00002 9.96865C7.00024 10.3199 7.09476 10.6646 7.27372 10.9668C7.45268 11.269 7.70952 11.5176 8.01739 11.6866C8.32526 11.8556 8.67287 11.9389 9.02391 11.9276C9.37495 11.9164 9.71653 11.8111 10.013 11.6228C9.85885 12.0804 9.57179 12.5687 9.09885 13.0581C9.00836 13.1517 8.95877 13.2774 8.96097 13.4076C8.96207 13.472 8.97584 13.5356 9.00152 13.5948C9.02719 13.6539 9.06426 13.7074 9.11061 13.7522C9.15696 13.797 9.21168 13.8322 9.27165 13.8559C9.33161 13.8795 9.39565 13.8911 9.46011 13.8901C9.59028 13.8878 9.71424 13.834 9.80473 13.7404C11.553 11.9287 11.3259 9.95924 10.6071 8.90277V8.90042ZM15.313 8.90042C15.0838 8.54353 14.745 8.27067 14.3475 8.12284C13.9499 7.97501 13.5151 7.9602 13.1085 8.08063C12.7018 8.20107 12.3452 8.45024 12.0923 8.79071C11.8394 9.13117 11.7038 9.54453 11.7059 9.96865C11.7061 10.3199 11.8006 10.6646 11.9796 10.9668C12.1586 11.269 12.4154 11.5176 12.7233 11.6866C13.0311 11.8556 13.3788 11.9389 13.7298 11.9276C14.0808 11.9164 14.4224 11.8111 14.7188 11.6228C14.5647 12.0804 14.2777 12.5687 13.8047 13.0581C13.7599 13.1044 13.7247 13.1591 13.701 13.2191C13.6774 13.2791 13.6658 13.3431 13.6669 13.4076C13.6679 13.472 13.6817 13.5356 13.7074 13.5948C13.7331 13.6539 13.7701 13.7074 13.8165 13.7522C13.8628 13.797 13.9176 13.8322 13.9775 13.8559C14.0375 13.8795 14.1015 13.8911 14.166 13.8901C14.2304 13.889 14.2941 13.8752 14.3532 13.8495C14.4123 13.8238 14.4658 13.7868 14.5106 13.7404C16.2588 11.9287 16.0318 9.95924 15.313 8.90277V8.90042Z'
                  fill={color}
               />
               <path
                  d='M2.8986 16.9615C2.95581 16.751 2.82937 16.4582 2.7087 16.2471C2.67112 16.1842 2.63036 16.1232 2.58658 16.0644C1.55162 14.4948 0.999981 12.6561 1.00005 10.776C0.98322 5.37933 5.45821 1 10.9919 1C15.8178 1 19.8462 4.34327 20.7875 8.78125C20.9285 9.43923 20.9998 10.1102 21 10.7832C21 16.1875 16.6976 20.6356 11.164 20.6356C10.2842 20.6356 9.09666 20.4144 8.44907 20.2332C7.80147 20.0519 7.15484 19.8115 6.98801 19.7471C6.81739 19.6815 6.63619 19.6478 6.4534 19.6476C6.25374 19.6468 6.05601 19.6866 5.87215 19.7644L2.6111 20.9413C2.53966 20.9721 2.46396 20.9919 2.38658 21C2.32552 20.9998 2.26511 20.9875 2.20884 20.9638C2.15256 20.9401 2.10155 20.9055 2.05876 20.8619C2.01597 20.8184 1.98224 20.7668 1.95953 20.7101C1.93683 20.6534 1.9256 20.5928 1.92649 20.5317C1.9305 20.4781 1.94017 20.4251 1.95533 20.3736L2.8986 16.9615Z'
                  stroke={color}
                  strokeWidth={strokeWidth ? strokeWidth : "2"}
                  strokeMiterlimit='10'
                  strokeLinecap='round'
               />
            </svg>
         );
         break;

      case "read":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zM256 160v288'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "remove":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M400 256H112'
               />
            </svg>
         );
         break;

      case "search":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
                  d='M338.29 338.29L448 448'
               />
            </svg>
         );
         break;

      case "settings":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "share":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M448 256L272 88v96C103.57 184 64 304.77 64 424c48.61-62.24 91.6-96 208-96v96z'
                  fill='none'
                  stroke={color}
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "shareLink":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M336 192h40a40 40 0 0140 40v192a40 40 0 01-40 40H136a40 40 0 01-40-40V232a40 40 0 0140-40h40M336 128l-80-80-80 80M256 321V48'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "spotify":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z' />
            </svg>
         );
         break;

      case "star":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
            </svg>
         );
         break;

      case "sunLow":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4z' />
            </svg>
         );
         break;

      case "sun":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z' />
            </svg>
         );
         break;

      case "textBody":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path
                  fillRule='evenodd'
                  fill={color}
                  d='M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z'
               />
            </svg>
         );
         break;

      case "think":
         icon = (
            <svg stroke={color} viewBox='0 0 48 48'>
               <path
                  fill={color}
                  d='M18.45 42v-6.35H14.9q-1.2 0-2.1-.9-.9-.9-.9-2.1V27.1h-2q-1 0-1.5-.925t.05-1.975L11.9 18q1.3-5.45 5.125-8.725Q20.85 6 26 6q5.75 0 9.875 4.125T40 20q0 4.25-2.35 7.5t-6.4 5.2V42Zm3-3h6.8v-8.25l1.4-.65Q33 28.55 35 25.875 37 23.2 37 20q0-4.55-3.225-7.775Q30.55 9 26 9q-4.45 0-7.575 2.975T15.05 18.6L12 24.1h2.9v8.55h6.55Zm3-11.7h3l.15-2.2q.7-.15 1.2-.475.5-.325.85-.675l2.1.7 1.4-2.4-1.5-1.2q.25-.7.25-1.45t-.25-1.45l1.5-1.2-1.4-2.4-2.1.7q-.35-.35-.875-.65-.525-.3-1.175-.5l-.15-2.2h-3l-.15 2.2q-.65.2-1.175.5t-.875.65l-2.1-.7-1.4 2.4 1.5 1.2q-.25.7-.25 1.45t.25 1.45l-1.5 1.2 1.4 2.4 2.1-.7q.35.35.85.675.5.325 1.2.475Zm1.5-4.2q-1.45 0-2.475-1.025Q22.45 21.05 22.45 19.6q0-1.45 1.025-2.475Q24.5 16.1 25.95 16.1q1.45 0 2.475 1.025Q29.45 18.15 29.45 19.6q0 1.45-1.025 2.475Q27.4 23.1 25.95 23.1Zm-1.45.9Z'
               />
            </svg>
         );
         break;

      case "thought":
         icon = (
            <svg viewBox=' 0 0 16 16'>
               <path
                  d='M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "thumbsDown":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M192 53.84S208 48 256 48s74 16 96 32h64a64 64 0 0164 64v48a64 64 0 01-64 64h-30a32.34 32.34 0 00-27.37 15.4S350 290.19 324 335.22 248 448 240 464c-29 0-43-22-34-47.71 10.28-29.39 23.71-54.38 27.46-87.09.54-4.78-3.14-12-8-12L96 307'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M96 241l80 2c20 1.84 32 12.4 32 30h0c0 17.6-14 28.84-32 30l-80 4c-17.6 0-32-16.4-32-34v-.17A32 32 0 0196 241zM64 176l112 2c18 .84 32 12.41 32 30h0c0 17.61-14 28.86-32 30l-112 2a32.1 32.1 0 01-32-32h0a32.1 32.1 0 0132-32zM112 48l64 3c21 1.84 32 11.4 32 29h0c0 17.6-14.4 30-32 30l-64 2a32.09 32.09 0 01-32-32h0a32.09 32.09 0 0132-32zM80 112l96 2c19 .84 32 12.4 32 30h0c0 17.6-13 28.84-32 30l-96 2a32.09 32.09 0 01-32-32h0a32.09 32.09 0 0132-32z'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "thumbsUp":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 01-64-64v-48a64 64 0 0164-64h30a32.34 32.34 0 0027.37-15.4S162 221.81 188 176.78 264 64 272 48c29 0 43 22 34 47.71-10.28 29.39-23.71 54.38-27.46 87.09-.54 4.78 3.14 12 7.95 12L416 205'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M416 271l-80-2c-20-1.84-32-12.4-32-30h0c0-17.6 14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 01416 271zM448 336l-112-2c-18-.84-32-12.41-32-30h0c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0132 32h0a32.1 32.1 0 01-32 32zM400 464l-64-3c-21-1.84-32-11.4-32-29h0c0-17.6 14.4-30 32-30l64-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32zM432 400l-96-2c-19-.84-32-12.4-32-30h0c0-17.6 13-28.84 32-30l96-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32z'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
            </svg>
         );
         break;

      case "title":
         icon = (
            <svg stroke={color} fill={color} viewBox='0 0 45 45'>
               <path d='M21.5 40V13H10V8h28v5H26.5v27Z' />
            </svg>
         );
         break;

      case "tv":
         icon = (
            <svg
               viewBox='0 0 24 24'
               fill='none'
               stroke={color}
               strokeWidth={strokeWidth ? strokeWidth : "2"}
               strokeLinecap='round'
               strokeLinejoin='round'>
               <rect x='2' y='7' width='20' height='15' rx='2' ry='2'></rect>
               <polyline points='17 2 12 7 7 2'></polyline>
            </svg>
         );
         break;

      case "warning":
         icon = (
            <svg viewBox='0 0 512 512'>
               <path
                  d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'
                  fill='none'
                  stroke={color}
                  strokeMiterlimit='10'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path
                  d='M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z'
                  fill='none'
                  stroke={color}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={strokeWidth ? strokeWidth : "32"}
               />
               <path d='M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z' fill={color} />
            </svg>
         );
         break;

      case "web":
         icon = (
            <svg fill={color} viewBox='0 0 16 16'>
               <path d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z' />
            </svg>
         );
         break;
   }

   return <div style={{ width: size, height: size }}>{icon}</div>;
};
