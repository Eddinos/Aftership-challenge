import React, { PropTypes, Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class Layout extends Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
