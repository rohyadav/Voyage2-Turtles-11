import React from 'react';

let Active = './assets/notes@2x.png';
let Pinned = './assets/pin@2x.png';
let Archived = './assets/archive@2x.png';

let ActiveSelected = './assets/notes – 1@2x.png';
let PinnedSelected = './assets/pin – 1@2x.png';
let ArchivedSelected = './assets/archive – 1@2x.png';
let link = "";

export const Link = ({ active, children, onClick }) => {
    if (children === "Pinned") {
        link = Pinned;
    } else if (children ==="Archived") {
        link = Archived;
    } else {
        link = Active;
    }

    if (active) {
        if (children === "Pinned") {
            link = PinnedSelected;
        } else if (children ==="Archived") {
            link = ArchivedSelected;
        } else {
            link = ActiveSelected;
        }
        return (
            <a id={children} className="highlightedFilter">
                <img className="notesFilterIcon" src={link} alt={children}/>
                <br />
                {children}
            </a>
        )
    }

    return (
        /* eslint-disable */
        <a id={children} className="Description" onClick={e => {e.preventDefault(), onClick()}}>
            <img className="notesFilterIcon" src={link} alt={children}/>
            <br />
            {children}
        </a>
        /* eslint-enable */
    )
}