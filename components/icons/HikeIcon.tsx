import React from 'react';

const HikeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10.5 20.5l-1.5 -1.5" />
        <path d="M13.5 17.5l-1.5 -1.5" />
        <path d="M15.165 14.344l-2.665 -2.665l-4.244 4.243l2.829 2.829l4.244 -4.243l-.164 -.164z" />
        <path d="M12.5 12.5l1.5 1.5" />
        <path d="M14.5 8.5l-1.5 1.5" />
        <path d="M7.5 13.5l1.5 1.5" />
        <path d="M5.5 8.5l4.5 4.5" />
        <path d="M10.758 6.009l2.829 -2.829a2 2 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.828l-2.829 2.829" />
        <path d="M9 4a1 1 0 1 1 2 0a1 1 0 0 1 -2 0z" />
    </svg>
);

export default HikeIcon;