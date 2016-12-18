import React, { Component } from 'react';
import './Main.scss';
import BaseSelector from '../BaseSelector/BaseSelector';
import Rates from '../Rates/Rates';
import axios from 'axios';
import config from '../../../config';

const rates = {
  "AED": 3.67246,
  "ALL": 144.529793,
  "ANG": 1.79,
  "AAA": 3.67246,
  "AAB": 144.529793,
  "AAC": 1.79,
  "AAD": 3.67246,
  "AAE": 144.529793,
  "AAF": 1.79
}

export default class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      currencies: {},
      rates: {}
    }
  }

  componentWillMount () {
    axios.get(config.currenciesAPI)
    .then((response) => {
      this.setState({currencies: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get(`${config.latestAPI}?app_id=${config.appId}`)
    .then((response) => {
      this.setState({rates: response.data.rates})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <div className="main">
        I Am The Main Component. {this.state.baseCurrency != '' ? `Your base currency is ${this.state.baseCurrency}` : `Before all, you neede to select a base` }
        <BaseSelector
          currencies={ this.state.currencies }
          onSelection={ this.handleSelection.bind(this) }
        />
        <Rates
          rates={ this.state.rates }
        />
      </div>
    )
  }

  handleSelection (e) {
    console.log(`Ceci est un message du Main: ${e.target.value} a été sélectionné`);
    this.setState({
      baseCurrency: e.target.value
    })
  }


}
