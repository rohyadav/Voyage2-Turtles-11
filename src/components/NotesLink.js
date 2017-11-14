import React from 'react';

export const Link = ({ active, children, onClick }) => {
    if (active) {
        return <a id={children} className="highlightedFilter">{children}</a>
    }

    return (
        /* eslint-disable */
        <a id={children} className="Description" onClick={e => {e.preventDefault(), onClick()}}>
            {children}
        </a>
        /* eslint-enable */
    )
}