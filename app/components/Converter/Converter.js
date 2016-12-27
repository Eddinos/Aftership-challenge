import React, { Component, PropTypes } from 'react';
import fx from 'money';
import './Converter.scss'

export default class Converter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: {},
      base: ''
    }
  }

  componentWillReceiveProps () {
    this.setState({
      rates: this.props.rates,
      base: this.props.base
    }, () => {
      fx.base = this.props.base;
      fx.rates = this.props.rates;
      fx.rates[fx.base] = 1;
    })
  }

  convert () {
    if (fx.rates != {}) {
      console.log(fx.rates);
      this.setState({
        result: fx(1).from(fx.base).to('HKD')
      }, () => {console.log(this.state.result);})
    }
    return 'nathin worked'
  }

  setOptions () {
    console.log(this.state);
    let currencies = this.state.rates;
    let items = [];
    for (var key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        items.push(<option value={ key } label={ key } selected={key=='USD'}>{ key }</option>)
      }
    }
    return items;
  }

  handleChange (e) {
    if (fx.rates != {}) {
      console.log(fx.rates);
      this.setState({
        result: fx(1).from(fx.base).to(e.target.value)
      }, () => {console.log(this.state.result);})
    }
    return 'nathin worked'
  }

  render () {
    return (
      <div className="converter">
        <button onClick={this.convert.bind(this)}>Le bouton</button>
        <div>{this.state.result}</div>
        <select onChange={this.handleChange.bind(this)} className="toCurrency">
          {this.setOptions()}
        </select>
      </div>
    )
  }
}

Converter.PropTypes = {
  rates: PropTypes.object,
  base: PropTypes.string
}
