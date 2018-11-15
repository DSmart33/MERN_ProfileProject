import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Main from './components/Main';
import CreateProfile from './components/CreateProfile';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* ----------------- COMPONENT ------------------ */

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <CreateProfile />
            <Main />
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App;