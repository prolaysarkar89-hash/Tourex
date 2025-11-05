import React from 'react';

const BedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M22 17v-3h-20v3" />
      <path d="M2 14v-4a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v4" />
      <path d="M22 19v-2" />
      <path d="M2 19v-2" />
    </svg>
);

export default BedIcon;