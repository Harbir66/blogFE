import React from 'react';
import './Header.css';

import TitleBar from '../TitleBar';
import NavBar from '../NavBar';

function Header() {
  return (
    <header>
      <TitleBar />
      <NavBar />
    </header>
  );
}

export default Header;
