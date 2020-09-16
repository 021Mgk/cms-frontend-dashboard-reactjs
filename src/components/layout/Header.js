import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className="header">
      <div className="area">
          <nav className="navigation">
              <ul className="navbar">
                <li>
                  <Link to="/" >صفحه اصلی</Link>
                </li>
                <li>
                  <Link to="/article">مقالات</Link>
                </li>
                <li>
                  <Link to="/links" >پیوندها</Link>
                </li>
              </ul>
          </nav>
      </div>
    </header>
  );
}


export default Header;