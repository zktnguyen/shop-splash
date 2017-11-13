/* eslint-disable */
import React, { Component } from 'react';

import TopNav from './components/TopNav';
import Footer from './components/Footer';
import BookList from './components/pages/BookList';

class App extends Component {
  render() {
    return (
      <div className="Site">
        <TopNav />
        <div className="Site-content ui container">
          <BookList />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
