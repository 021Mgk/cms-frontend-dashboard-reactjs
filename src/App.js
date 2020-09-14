import React from 'react';
import Article from './components/pages/Article';
import Home from './components/pages/Home';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import LayoutDefault from './layouts/LayoutDefault';

export default function App() {
  return (
       <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/article" component={Article} layout={LayoutDefault} />
        </Switch>
    // <Article />
  );
}
