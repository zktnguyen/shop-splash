import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Modal, Button, Icon, Grid, Segment } from 'semantic-ui-react';
import { getCart, emptyCart } from '../../actions/cart';

import CartItem from './CartItem';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    if (this.props.cart.length === 0) {
      this.props.getCart();
    }
  }

  close = () => this.setState({ showModal: false });
  confirm = () => {
    this.setState({ showModal: false });
    this.props.emptyCart();
  }
  open = () => this.setState({ showModal: true });

  renderEmpty = () => <h1>Empty Cart</h1>;

  renderCart = () => {
    const cartItemsList = this.props.cart.map(cartItem => (
      <CartItem
        key={cartItem._id}
        title={cartItem.title}
        price={cartItem.price}
        quantity={cartItem.quantity}
        _id={cartItem._id}
      />
    ));
    return (
      <Grid.Column>
        <Segment.Group>
          <Segment>
            <Header as="h2" content="Cart" icon="shopping cart" />
          </Segment>

          {cartItemsList}

          <Segment>
            <Grid>
              <Grid.Column width={12}>
                <h5>Total: USD ${this.props.total.toFixed(2)}</h5>
              </Grid.Column>
              <Grid.Column width={4}>
                <Modal
                  trigger={<Button onClick={this.open}>Place Order</Button>}
                  open={this.state.showModal}
                  onClose={this.close}
                  basic
                  size="small"
                >
                  <Header
                    icon="hand pointer"
                    content="Your order has been placed."
                  />
                  <Modal.Content>
                    <p>Your total was USD ${this.props.total}</p>
                    <p>You will receive an email confirmation</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="green" inverted onClick={this.confirm}>
                      <Icon name="checkmark" /> Continue
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      </Grid.Column>
    );
  };

  render() {
    return !!this.props.cart[0] ? this.renderCart() : this.renderEmpty();
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  total: PropTypes.number.isRequired,
  getCart: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    total: state.cart.total
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCart, emptyCart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
