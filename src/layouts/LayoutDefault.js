import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UserDetail from '../components/layout/UserDetail';
import { connect } from 'react-redux';

const LayoutDefault = ({ children, isAuth }) => (
  <>
    {isAuth ? <UserDetail /> : null}
    <Header />
    <main className="content">
      {children}
    </main>
    <Footer />
  </>
);


const mapStateToProps = state => ({
  isAuth: state.login.isAuth
})

export default connect(mapStateToProps)(LayoutDefault); 