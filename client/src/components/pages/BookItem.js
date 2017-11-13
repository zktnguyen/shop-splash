import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Image, Button, Grid } from 'semantic-ui-react';

import { addToCart, updateCartItem } from '../../actions/cart';

class BookItem extends Component {
  constructor() {
    super();
    this.handleCart = this.handleCart.bind(this);
  }

  handleCart = () => {
    const book = {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      image: this.props.image,
      price: this.props.price,
      quantity: 1
    };

    const cartIndex = this.props.cart.findIndex(cart => cart._id === book._id);
    if (cartIndex === -1) {
      this.props.addToCart(book);
    } else {
      this.props.updateCartItem(book._id, 1, this.props.cart);
    }
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Grid.Column mobile={16} tablet={5}>
              <Image size="small" src={this.props.image} />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={10}>
              <Card.Header>{this.props.title}</Card.Header>
              <Card.Meta>USD ${this.props.price}</Card.Meta>
              <Card.Description>{this.props.description}</Card.Description>
              <div className="ui">
                <Button floated="left" color="teal" onClick={this.handleCart}>
                  Add to cart
                </Button>
              </div>
            </Grid.Column>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

BookItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addToCart, updateCartItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
