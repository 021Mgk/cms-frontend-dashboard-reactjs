import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUserInfo, logout } from '../../actions';


const Header = ({ isAuth, dispatch }) => {

  const location = useLocation();


  const handleLogOut = async () => {
    console.log('handle');
    const resp = await fetch('http://localhost:8080/auth/logout', {
      credentials: 'include',
    });
    const result = await resp.json();
    console.log('wwwww', result);
    if (result.success) {
      console.log(result.success);
      dispatch(logout);
      dispatch(clearUserInfo);
    }
  };

  return (
    <>
      <header className='header'>
        <div className='area'>
          <nav className='navigation'>
            <ul className='navbar'>
              {!isAuth ? (
                <li>
                  <Link to='/login'>ورود</Link>
                </li>
              ) : (
                  <>
                    <li className={location.pathname === "/" ? "active" : null}>
                      <Link to='/'>صفحه اصلی</Link>
                    </li>
                    <li className={location.pathname === "/article" ? "active" : null}>
                      <Link to='/article'>مقالات</Link>
                    </li>
                    <li className={location.pathname === "/links" ? "active" : null}>
                      <Link to='/links'>پیوندها</Link>
                    </li>
                    <li className={location.pathname === "/mylinks" ? "active" : null}>
                      <Link to='/mylinks'>پیوندهای من</Link>
                    </li>
                    <li className={location.pathname === "/map" ? "active" : null}>
                      <Link to='/map'> نقشه</Link>
                    </li>
                    <li className={location.pathname === "/forms" ? "active" : null}>
                      <Link to='/forms'>فرم چند مرحله ای</Link>
                    </li>
                    <li className={location.pathname === "/shahr" ? "active" : null}>
                      <Link to='/shahr'>   فعالیت ها</Link>
                    </li>
                    <li className={location.pathname === "/filemanager" ? "active" : null}>
                      <Link to='/filemanager'>    مدیریت اسناد</Link>
                    </li>
                    <li className={location.pathname === "/scroll" ? "active" : null}>
                      <Link to='/scroll'>    scroll</Link>
                    </li>
                    <li >
                      <Link to='' onClick={handleLogOut}>
                        log out
                    </Link>
                    </li>
                  </>
                )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.login.isAuth,
});

export default connect(mapStateToProps)(Header);
