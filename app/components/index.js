var React = require('react');
var ReactDOM = require('react-dom');
import { Component } from 'react';

class Main extends Component {
  render() {
    return(
      <div>
        Yo people
      </div>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));
