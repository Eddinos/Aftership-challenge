import React, { Component, PropTypes } from 'react';
import './BaseSelector.scss'

export default class BaseSelector extends Component {
  constructor(props) {
      super(props);
      // This binding is necessary to make `this` work in the callback
      this.handleChange = this.handleChange.bind(this);
    }

  // Sets all the options items of the select tag
  setOptions () {
    let currencies = this.props.currencies;
    let items = [];
    for (var key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        items.push(<option value={ [key] } label={ `${currencies[key]} (${key})` } selected={key=='USD'}>{ `${currencies[key]} (${key})` }</option>)
      }
    }
    return items;
  }

  // Handle the change event of select tag
  handleChange (e) {
    this.props.onSelection(e);
  }

  render () {
    return (
      <div className="base-selector">
        <span>Please select your base currency </span>
        <select name="base" onChange={ this.handleChange } className="currency-selection">
          { this.setOptions() }
        </select>
      </div>
    );
  }
}

BaseSelector.propTypes = {
  currencies: PropTypes.object,
  onSelection: PropTypes.func
}
