import React, { Component } from 'react';
import Header from './components/Header';
import PickingArea from './components/PickingArea';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtJg4QwXdm2MKRxt9tb9ATlrm6ISd8Id8",
  authDomain: "secret-buddy-d7ca0.firebaseapp.com",
  projectId: "secret-buddy-d7ca0",
  storageBucket: "secret-buddy-d7ca0.appspot.com",
  messagingSenderId: "715396894708",
  appId: "1:715396894708:web:b146e4db979af68561f3a1",
  measurementId: "G-XNNNZ51DPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
                      <span>Source on Github</span>
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
