import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
// import PropTypes from 'prop-types';

class TopNav extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'home'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <Menu pointing secondary size="huge" className="centerMenu">
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="about"
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="contact"
            active={activeItem === 'contact'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="Admin"
              active={activeItem === 'admin'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Cart"
              active={activeItem === 'cart'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}

export default TopNav;
