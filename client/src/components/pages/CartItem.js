import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Grid, Segment } from 'semantic-ui-react';

import { deleteCartItem, updateCartItem } from '../../actions/cart';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onDelete = () => {
    const { _id } = this.props;
    this.props.deleteCartItem(_id, this.props.cart);
  };

  onIncrement = () =>
    this.props.updateCartItem(this.props._id, 1, this.props.cart);
  onDecrement = () =>
    this.props.updateCartItem(this.props._id, -1, this.props.cart);

  render() {
    const { _id, title, price, quantity } = this.props;
    return (
      <Segment key={_id}>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <h5>{title}</h5>
            </Grid.Column>
            <Grid.Column width={4}>
              <span>USD ${price}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <span>qty {quantity}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button.Group>
                <Button icon="minus" onClick={this.onDecrement} />
                <Button icon="plus" onClick={this.onIncrement} />
                <Button negative color="red" onClick={this.onDelete}>
                  Delete
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

CartItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteCartItem, updateCartItem }, dispatch);
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
