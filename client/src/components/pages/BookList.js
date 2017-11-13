import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'semantic-ui-react';

import { getBooks } from '../../actions/books';
import BookItem from './BookItem';
import Cart from './Cart';

class BookList extends Component {
  componentDidMount() {
    if (this.props.books.length === 0) {
      this.props.getBooks();
    }
  }

  render() {
    const booksList = this.props.books.map(book => (
      <Grid.Column key={book._id}>
        <BookItem
          _id={book._id}
          title={book.title}
          description={book.description}
          image={book.image}
          price={book.price}
        />
      </Grid.Column>
    ));
    return (
      <Grid>
        <Grid.Row style={{ marginTop: '15px' }}>
          <Cart />
        </Grid.Row>
        <Grid.Row columns={3} style={{ marginTop: '25px' }}>{booksList}</Grid.Row>
      </Grid>
    );
  }
}

BookList.propTypes = {
  getBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
