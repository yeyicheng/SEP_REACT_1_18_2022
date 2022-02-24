import React from 'react';
import './Header.css';
import EventCounter from '../EventCounter/EventCounter';
export default function Header({hanldePageChange, pagesInfo}) {
  const hanldeNavClick = (e, pageInfo) => {
    e.preventDefault();
    hanldePageChange(pageInfo);
  };
  return (
    <header className="app-header">
      <nav className="app-header__nav">
        <EventCounter/>

        {Object.keys(pagesInfo).map((key) => (
            <a
                style={{color: 'white'}}
                href={key}
                key={key}
                onClick={(e) => hanldeNavClick(e, key)}
            >
              {key}
            </a>
        ))}
      </nav>
    </header>
  );
}
