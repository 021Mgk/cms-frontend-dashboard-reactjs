import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';

const Header = ({ isAuth, dispatch, userInfo }) => {
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
    }
  };

  return (
    <>
      {JSON.stringify(userInfo, null, 4)}
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
                  <li>
                    <Link to='/'>صفحه اصلی</Link>
                  </li>
                  <li>
                    <Link to='/article'>مقالات</Link>
                  </li>
                  <li>
                    <Link to='/links'>پیوندها</Link>
                  </li>
                  <li>
                    <Link to='/mylinks'>پیوندهای من</Link>
                  </li>
                  <li>
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
  userInfo: state.getUserInfo.user,
});

export default connect(mapStateToProps)(Header);
