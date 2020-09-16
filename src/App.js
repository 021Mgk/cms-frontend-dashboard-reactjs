import React from 'react';
import Article from './components/pages/Article';
import Links from './components/pages/Links';

import Home from './components/pages/Home';
import { Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import LayoutDefault from './layouts/LayoutDefault';
import Jalali from './components/pages/Jalali';

export default function App() {
  return (
       <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/article" component={Article} layout={LayoutDefault} />
          <AppRoute exact path="/links" component={Links} layout={LayoutDefault} />
          <AppRoute exact path="/jalali" component={Jalali} layout={LayoutDefault} />
        </Switch>
    // <Article />
  );
}
