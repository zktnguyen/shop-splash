import React from 'react';
import { Menu, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TopNav = ({ cartCapacity }) => (
  <Container>
    <Menu pointing secondary size="huge">
      <Menu.Item as={Link} to="/" name="home" />
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/admin" name="Admin" />
        <Menu.Item as={Link} to="/cart">
          Cart{' '}
          {cartCapacity > 0 ? (
            <Icon as="h5" className="cartIcon">
              {cartCapacity}
            </Icon>
          ) : (
            ''
          )}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </Container>
);

TopNav.propTypes = {
  cartCapacity: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    cartCapacity: state.cart.quantity
  };
}

export default connect(mapStateToProps)(TopNav);
