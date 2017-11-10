import React from 'react';

export const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span className="Description" >{children}</span>
    }

    return (
        /* eslint-disable */
        <a className="Description" onClick={e => {e.preventDefault(), onClick()}}>
            {children}
        </a>
        /* eslint-enable */
    )
}