import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, logout, getUserInfo } from './actions/index';

import Home from './components/pages/Home';
import Article from './components/pages/Article';
import Links from './components/pages/Links';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Jalali from './components/pages/Jalali';
import MyLinks from './components/pages/MyLinks';

import Loading from './components/Loading';

import ProtectedRoute from './utils/ProtectedRoute';
import ProtectedLogin from './utils/ProtectedLogin';

import LayoutDefault from './layouts/LayoutDefault';

const App = ({ dispatch, isAuth, userInfo }) => {
  useEffect(() => {
    validToken();
  }, []);

  const validToken = async () => {
    const resp = await fetch('http://localhost:8080/auth/isValid', {
      credentials: 'include',
    });

    if (resp.status === 403) {
      return dispatch(logout);
    }

    const result = await resp.json();
    console.log('wwwww', result);
    if (result.success) {
      console.log(result.success);
      dispatch(login);
      dispatch(getUserInfo(result.userInfo));
    } else {
      dispatch(logout);
    }
  };

  if (isAuth === undefined) {
    return <Loading />;
  }

  return (
    <Switch>
      <ProtectedLogin
        exact
        path='/login'
        isAuth={isAuth}
        component={Login}
        layout={LayoutDefault}
      />
      <ProtectedRoute
        exact
        path='/article'
        isAuth={isAuth}
        component={Article}
        layout={LayoutDefault}
      />
      <ProtectedRoute
        exact
        path='/mylinks'
        isAuth={isAuth}
        component={MyLinks}
        layout={LayoutDefault}
      />
      <ProtectedRoute
        exact
        path='/'
        isAuth={isAuth}
        component={Home}
        layout={LayoutDefault}
      />
      <ProtectedRoute
        exact
        path='/links'
        isAuth={isAuth}
        component={Links}
        layout={LayoutDefault}
      />
      <ProtectedRoute
        exact
        path='/jalali'
        isAuth={isAuth}
        component={Jalali}
        layout={LayoutDefault}
      />
      <ProtectedRoute
        exact
        path='/jalali'
        isAuth={isAuth}
        component={Jalali}
        layout={LayoutDefault}
      />
      <ProtectedRoute path='*' component={NotFound} layout={LayoutDefault} />
    </Switch>
    // <Article />
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.login.isAuth,
});

export default connect(mapStateToProps)(App);
