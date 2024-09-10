import React from 'react';
import { ScoreProvider } from '../context/StoreContext';
import '../styles/globals.css'

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <ScoreProvider>
          {children}
        </ScoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
