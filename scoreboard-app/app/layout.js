import React from 'react';
import { ScoreProvider } from '../context/StoreContext';

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
