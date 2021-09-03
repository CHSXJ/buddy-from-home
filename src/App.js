import React, { Component } from 'react';
import Header from './components/Header';
import PickingArea from './components/PickingArea';

class App extends Component {
  render() {
    return (
      <div>
        <div id="navbarMenu" class="navbar-menu">
          <div className="container">
            <Header title="Find Your Buddy" />
          </div>
          <div class="navbar-end">
              <span class="navbar-item">
                  <a class="button is-outlined" href="#">
                      <span class="icon">
                          <i class="fa fa-github"></i>
                      </span>
                      <span>View Source</span>
                  </a>
              </span>
          </div>
        </div>

        <PickingArea />      

      </div>
    );
  }
}
export default App;
