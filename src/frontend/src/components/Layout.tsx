import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useFocusOnRouteChange } from '../hooks';

export const Layout: React.FC = () => {
  const mainRef = useFocusOnRouteChange();

  return (
    <div className="ontario-template-application">
      <Header />
      <main
        id="main-content"
        className="ontario-main"
        ref={mainRef}
        tabIndex={-1}
      >
        <div className="ontario-row">
          <div className="ontario-columns ontario-small-12">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
