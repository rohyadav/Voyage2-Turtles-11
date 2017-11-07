import React from 'react';

export const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span className="Description" >{children}</span>
    }

    return (
        <a className="Description" onClick={e => {e.preventDefault(), onClick()}}>
            {children}
        </a>
    )
}