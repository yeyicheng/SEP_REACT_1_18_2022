import React from "react";
import "./Header.css";
import EventCounter from "../EventCounter/EventCounter";
const Header = ({ pagesInfo, hanldePageChange }) => {
  const hanldeNavClick = (e, pageInfo) => {
    e.preventDefault();
    hanldePageChange(pageInfo);
  };
  return (
    <header className="app-header">
      <nav className="app-header__nav">
        <EventCounter></EventCounter>

        {Object.keys(pagesInfo).map((key) => (
          <a href={key} key={key} onClick={(e) => hanldeNavClick(e, key)}>
            {key}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
