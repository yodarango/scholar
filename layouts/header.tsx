import React from 'react';

type headerProps = {
   currPage: string;
};

export default function Header({ currPage }: headerProps) {
   return (
      <div className='header'>
         <div>
            <div className='header-logo'></div>
         </div>
         <h1 className='header-title'>SCHOLAR</h1>
         <h2 className='header-curr-page'>{currPage}</h2>
      </div>
   );
}
