import React from 'react';
import './Navbar.css';

const Navbar = ({ setActivePage }) => {
  return (
    <nav className="navbar" role="navigation">
      <a href=''>
      <div className="logo">Poke</div>
      </a>
      <ul className="nav-links">
        {/* TODO: Update state on click */}
        <li><button onClick={() => setActivePage('home')}>Home</button></li>
        <li><button onClick={() => setActivePage('about')}>About</button></li>
        <li><button onClick={() => setActivePage('contact')}>Contact</button></li>
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
