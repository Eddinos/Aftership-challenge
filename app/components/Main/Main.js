import React, { Component } from 'react';
import './Main.scss';
import BaseSelector from '../BaseSelector/BaseSelector';
import Rates from '../Rates/Rates';
import axios from 'axios';
import config from '../../../config';
import Modal from 'react-modal';
import Converter from '../Converter/Converter';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    fontFamily            : 'Century Gothic'
  }
};

export default class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      currencies: {},
      rates: {},
      modalIsOpen: false,
      errorMessage: '',
      historicalDate: ''
    }

  }

  openModal () {
    this.setState({modalIsOpen: true})
  }

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  componentWillMount () {
    console.log('Main will mount');
    this.getCurrencies();

    this.getRates();
  }

  handleSelection (e) {
    this.setState({
      baseCurrency: e.target.value
    }, () => {
      console.log(`Ceci est un message du Main: ${this.state.baseCurrency} a été sélectionné`);
      this.getRates()
    });

  }

  getRates (date, latest=true) {
    // If latest is true we make a call for latest rates, else we set up a date
    let promise = latest ? axios.get(`${config.latestRatesAPI}?base=${this.state.baseCurrency}`) : axios.get(`${config.ratesAPI}/${date}?base=${this.state.baseCurrency}`);

    promise.then((response) => {
      this.setState({rates: response.data.rates})
    })
    .catch((error) => {
      if(error.response.status === 422) {
        this.setState({errorMessage: `${error.response.data.error}: Unfortunately, exchange rates are not available yet for this currency`})
        this.openModal();
      }
      else {
        this.setState({errorMessage: `error ${error.response.status}: ${error.response.data.error}`});
        this.openModal();
      }
    })
  }

  getCurrencies () {
    axios.get(config.currenciesAPI)
    .then((response) => {
      this.setState({currencies: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (
      <div className="main">
        I Am The Main Component. {this.state.baseCurrency != '' ? `Your base currency is ${this.state.baseCurrency}` : `Before all, you neede to select a base` }
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
        >
          { this.state.errorMessage }
        </Modal>
        <BaseSelector
          currencies={ this.state.currencies }
          onSelection={ this.handleSelection.bind(this) }
        />
        <div className="conversion">
          <Rates
            rates={ this.state.rates }
            onChangeDate={ this.getRates.bind(this) }
          />
          <Converter
            rates={ this.state.rates }
            base={ this.state.baseCurrency }
          />
        </div>
      </div>
    )
  }
}
