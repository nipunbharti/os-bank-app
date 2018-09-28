import React, { Component } from 'react';

const App = ({ children }) => (
  <>
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
