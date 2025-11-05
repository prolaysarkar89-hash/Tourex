import React from 'react';

const SceneryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M8 18l2 -4l2 4l2 -4l2 4" />
        <path d="M3 18h18" />
        <path d="M12 3l3 3l-3 3l-3 -3z" />
    </svg>
);

export default SceneryIcon;