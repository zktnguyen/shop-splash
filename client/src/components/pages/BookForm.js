import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Grid,
  Segment,
  Form,
  Select,
  Button,
  Dropdown,
  Image
} from 'semantic-ui-react';
import {
  postBook,
  deleteBook,
  getBooks,
  resetButton
} from '../../actions/books';
import api from '../../api';

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        description: '',
        price: 0
      },
      images: [],
      img: '',
      toDelete: -23
    };
    this.onImageSelect = this.onImageSelect.bind(this);
  }

  componentDidMount() {
    if (this.props.books.length === 0) {
      this.props.getBooks();
    }
    api.images
      .get()
      .then(images => {
        this.setState({ images });
      })
      .catch(() =>
        this.setState({
          images: 'error loading image files from the server',
          img: ''
        })
      );
  }

  onChange = e => {
    let val = '';
    if (e.target.name === 'price') {
      val = parseInt(e.target.value, 10);
    } else {
      val = e.target.value;
    }

    this.setState({
      data: { ...this.state.data, [e.target.name]: val }
    });
  };

  onSelect = (e, d) => {
    this.setState({ toDelete: d.value });
  };

  onSubmit = () => {
    this.props.postBook({
      title: this.state.data.title,
      description: this.state.data.description,
      image: this.state.img,
      price: this.state.data.price
    });
  };

  onImageSelect = (e, d) => {
    const img = d.value;
    this.setState({ img: `/images/${img}` });
  };

  deleteBook = () => {
    this.props.deleteBook(this.state.toDelete);
  };

  resetForm = () => {
    // reset the fields
    // dispatch action to reset the submit button
    this.props.resetButton();
    this.setState({ data: { title: '', description: '', price: 0 }, img: '' });
  };

  render() {
    const { data } = this.state;
    const booksList = this.props.books.map(book => ({
      key: book._id,
      value: book._id,
      text: book.title
    }));

    const imgList = this.state.images.map(img => ({
      key: img.name,
      value: img.name,
      text: img.name
    }));
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Segment>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Dropdown
                    placeholder="Select an image"
                    fluid
                    search
                    selection
                    options={imgList}
                    onChange={this.onImageSelect}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Image src={this.state.img} />
                </Grid.Column>
              </Grid.Row>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Form
                error={this.props.validation === 'error'}
                success={this.props.validation === 'success'}
              >
                <Form.Field>
                  <label>Title</label>
                  <input
                    placeholder="Title"
                    name="title"
                    value={data.title}
                    onChange={this.onChange}
                    type="text"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={data.description}
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Button
                  onClick={!this.props.msg ? this.onSubmit : this.resetForm}
                  color={!this.props.style ? 'blue' : this.props.style}
                >
                  {!this.props.msg ? 'Save book' : this.props.msg}
                </Button>
              </Form>
            </Segment>
            <Segment style={{ marginTop: '25px' }}>
              <Select
                placeholder="Select a book"
                search
                selection
                onChange={this.onSelect}
                options={booksList}
              />
              <Button
                style={{ marginLeft: '10px' }}
                color="red"
                onClick={this.deleteBook}
              >
                Delete Book
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
BookForm.defaultProps = {
  msg: null,
  style: null,
  validation: null
};

BookForm.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  postBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  msg: PropTypes.string,
  style: PropTypes.string,
  resetButton: PropTypes.func.isRequired,
  validation: PropTypes.string
};

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { postBook, deleteBook, getBooks, resetButton },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
