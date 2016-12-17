import React, { Component } from 'react';
import './Main.scss';
import BaseSelector from '../BaseSelector/BaseSelector';
import Rates from '../Rates/Rates';

export default class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      baseCurrency: 'EUR'
    }
  }

  render () {
    return (
      <div className="main">
        I Am The Main Component. Your base currency is { this.state.baseCurrency }
        <BaseSelector
          currencies={{'EUR': 'Euros', 'HKD': 'Hong Kong Dollaz'}}
          onSelection={ this.handleSelection.bind(this) }
        />
        <Rates
          rates={ {
        "AED": 3.67246,
        "ALL": 144.529793,
        "ANG": 1.79
          } }
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
