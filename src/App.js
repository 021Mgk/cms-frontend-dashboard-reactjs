import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Home from './components/pages/Home';
import Article from './components/pages/Article';
import Links from './components/pages/Links';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Jalali from './components/pages/Jalali';

import ProtectedRoute from './utils/ProtectedRoute'
import ProtectedLogin from './utils/ProtectedLogin'
import AppRoute from './utils/AppRoute';

import LayoutDefault from './layouts/LayoutDefault';


export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const isAthUser = Cookies.get('user');
    console.log("tttttt" , isAthUser);
    if (isAthUser) {
      setIsAuth(true);
    }
    else {
      setIsAuth(false);
    }
  }, [])
  return (
    <Switch>
      <ProtectedLogin exact path="/login" isAuth={isAuth} component={Login} layout={LayoutDefault} />
      <ProtectedRoute exact path="/article" isAuth={isAuth} component={Article} layout={LayoutDefault} />
      <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
      {/* <AppRoute exact path="/article" component={Article} layout={LayoutDefault} /> */}
      <AppRoute exact path="/links" component={Links} layout={LayoutDefault} />
      <AppRoute exact path="/jalali" component={Jalali} layout={LayoutDefault} />
      <AppRoute exact path="/jalali" component={Jalali} layout={LayoutDefault} />
      <AppRoute path="*" component={NotFound} layout={LayoutDefault} />
    </Switch>
    // <Article />
  );
}
