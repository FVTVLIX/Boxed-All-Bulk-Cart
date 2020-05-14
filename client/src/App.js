import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';

class App extends Component {
  constructor() {
    super()

    this.state = {}
    
  }


  render() {

    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => <Home />} />
          <Route path="/products" />
          <Route path="/add-product" />
          <Route path="/products/:id/edit"  />
          <Route path="/products/:id" />
          <Route path="/login" />
          <Route path="/logout" />
        </Switch>
      </div>
    );
  }
}

export default App;