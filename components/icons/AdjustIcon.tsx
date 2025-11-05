import React from 'react';

const AdjustIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
       <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
       <path d="M6 4v4" />
       <path d="M6 12v8" />
       <path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
       <path d="M12 4v10" />
       <path d="M12 18v2" />
       <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
       <path d="M18 4v1" />
       <path d="M18 9v11" />
    </svg>
);

export default AdjustIcon;