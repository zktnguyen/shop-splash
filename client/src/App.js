/* eslint-disable */
import React, { Component } from 'react';

import TopNav from './components/TopNav';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="Site">
        <TopNav />
        <div className="Site-content ui container"><h1>Some content</h1></div>
        <Footer />
      </div>
    );
  }
}

export default App;
