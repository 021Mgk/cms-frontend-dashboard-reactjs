import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <>
    <Header/>
    <main className="content">
      {children}
    </main>
    <Footer />
  </>
);

export default LayoutDefault;  