import React from 'react';
import { Component } from 'react';
import './App.scss';
import Layout from '../Layout/Layout';
import Main from '../Main/Main';

export default class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Main/>
      </Layout>
    )
  }
}
