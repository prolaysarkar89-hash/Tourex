import React from 'react';

const WaterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 7c2.21 2.5 4.316 3.922 6.5 4c2.043 .072 3.996 -1.144 6 -3c2.088 -1.942 4.14 -3.37 6.5 -4" />
        <path d="M3 17c2.21 2.5 4.316 3.922 6.5 4c2.043 .072 3.996 -1.144 6 -3c2.088 -1.942 4.14 -3.37 6.5 -4" />
    </svg>
);

export default WaterIcon;