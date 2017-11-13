/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import TopNav from './components/TopNav';
import Footer from './components/Footer';
import BookList from './components/pages/BookList';
import Cart from './components/pages/Cart';
import BookForm from './components/pages/BookForm';

class App extends Component {

  render() {
    const { location } = this.props;
    return (
      <div className="Site">
        <TopNav />
        <div className="Site-content ui container">
          <Route location={location} exact path="/" component={BookList} />
          <Route location={location} exact path="/admin" component={BookForm} />
          <Route location={location} exact path="/cart" component={Cart} />
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
