import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './Rates.scss';

import 'react-datepicker/dist/react-datepicker.css';

export default class Rates extends Component {
constructor(props) {
  super(props);
  this.state = {
    latest: true,
    selectedDate: {},
    startDate: moment()
  }
  this.handleChange = this.handleChange.bind(this);
}

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

  handleChange (e) {
    this.setState({startDate: e, latest: e == null}, () => {
      let date = '';
      if(e != null) date = e.toISOString().split('T')[0];
      this.props.onChangeDate(date, e == null);
    });
    //console.log(`date format : ${e.toISOString().split('T')[0]}`);
    //this.props.onChange(e.toISOString().split('T')[0]);

  }

  render () {
    return (
      <div className="rates">
        <div className="title">
          {this.state.latest ? 'Latest exchange rates for the selected currency' : `Exchange rates on ${this.state.startDate.format('L')} ` } <br/><br/>
           Historical rates
           <DatePicker
             onChange={ this.handleChange }
             isClearable={true}
             selected={ this.state.startDate }
             minDate={ moment("1999-01-01") }
             maxDate={moment()}
             showYearDropdown
             showMonthDropdown
             dropdownMode="select"
             dateFormat="YYYY/MM/DD"
             className="datepicker"
           />
        </div>
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
  rates: PropTypes.object,
  onChange: PropTypes.func,
  onChangeDate: PropTypes.func
}
