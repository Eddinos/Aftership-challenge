import React, { Component, PropTypes } from 'react';
import './Rates.scss';

export default class Rates extends Component {
  setRates () {
    let items = [];
    let rates = this.props.rates;
    for (var key in rates) {
      if (rates.hasOwnProperty(key)) {
        items.push(<tr><td>{ key }</td> <td>{ rates[key] }</td></tr>)
      }
    }
    return items;
  }

  render () {
    return (
      <div className="rates">
        <div className="table-container">
          <table>
            { this.setRates() }
          </table>
        </div>
      </div>
    );
  }
}

Rates.PropTypes = {
  rates: PropTypes.object
}
