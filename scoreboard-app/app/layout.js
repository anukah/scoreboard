import React from 'react';
import { ScoreProvider } from '../context/StoreContext';
import { Roboto } from '@next/font/google'
import '../styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
})

const RootLayout = ({ children }) => {
  return (
    <html>
      <body className={roboto.class}>
        <ScoreProvider>
          {children}
        </ScoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
