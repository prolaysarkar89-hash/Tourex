import React from 'react';

const FoodIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3.5 11h17" />
        <path d="M5 11v-7a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v7" />
        <path d="M8 11v10" />
        <path d="M16 11v10" />
        <path d="M5.5 11a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0z" />
        <path d="M13.5 11a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0z" />
    </svg>
);

export default FoodIcon;