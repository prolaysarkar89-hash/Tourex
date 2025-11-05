import React from 'react';

const CultureIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 9.472l6.985 -4.656a0.5 .5 0 0 1 .53 0l6.985 4.656" />
        <path d="M12 3v6.472" />
        <path d="M18 19.5v-8.5a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8.5" />
        <path d="M13 19.5v-3.5a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3.5" />
        <path d="M6 19.5h12" />
    </svg>
);

export default CultureIcon;