import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="padding">
      <ul>
        <li>
          <a href="./">Blog</a>
        </li>
        <li>
          <a href="./">About</a>
        </li>
        <li>
          <a href="./">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
