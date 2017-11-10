import React from 'react';

export const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span id={children} className="Description" >{children}</span>
    }

    return (
        /* eslint-disable */
        <a id={children} className="Description" onClick={e => {e.preventDefault(), onClick()}}>
            {children}
        </a>
        /* eslint-enable */
    )
}